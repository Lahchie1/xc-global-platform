import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If using placeholder keys during local dev without active Supabase backend, allow routing
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protect Portal Routes
  const isGrowthOS = pathname.startsWith("/growth-os");
  const isTalentOS = pathname.startsWith("/talent-os");
  const isAdmin = pathname.startsWith("/admin");
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password");

  if ((isGrowthOS || isTalentOS || isAdmin) && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user) {
    const role = user.user_metadata?.role || "business";

    // If authenticated user visits login or register, send them to their dashboard
    if (isAuthRoute) {
      if (role === "admin") return NextResponse.redirect(new URL("/admin", request.url));
      if (role === "talent") return NextResponse.redirect(new URL("/talent-os", request.url));
      return NextResponse.redirect(new URL("/growth-os", request.url));
    }

    // Role-based route access controls
    if (isGrowthOS && role !== "business" && role !== "admin") {
      return NextResponse.redirect(new URL("/talent-os", request.url));
    }
    if (isTalentOS && role !== "talent" && role !== "admin") {
      return NextResponse.redirect(new URL("/growth-os", request.url));
    }
    if (isAdmin && role !== "admin") {
      return NextResponse.redirect(new URL(role === "talent" ? "/talent-os" : "/growth-os", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/growth-os/:path*",
    "/talent-os/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
