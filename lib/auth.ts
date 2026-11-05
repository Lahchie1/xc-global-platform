import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types/database";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Fetch role and details from public.users table
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    ...user,
    role: (profile?.role as UserRole) || (user.user_metadata?.role as UserRole) || "business",
    full_name: profile?.full_name || user.user_metadata?.full_name || null,
  };
}

export function getRoleDashboardPath(role: UserRole): string {
  switch (role) {
    case "business":
      return "/growth-os";
    case "talent":
      return "/talent-os";
    case "admin":
      return "/admin";
    default:
      return "/login";
  }
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?error=${encodeURIComponent("Please sign in to access this area.")}`);
  }

  if (!allowedRoles.includes(user.role)) {
    // If unauthorized, redirect to their assigned dashboard
    redirect(getRoleDashboardPath(user.role));
  }

  return user;
}

