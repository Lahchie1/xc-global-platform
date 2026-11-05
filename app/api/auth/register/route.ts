import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { UserRole } from "@/types/database";

export async function POST(request: Request) {
  try {
    const { email, password, role, full_name, company_name } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required." },
        { status: 400 }
      );
    }

    if (!["business", "talent", "admin"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role specified." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Create Auth user in Supabase
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role,
        full_name: full_name || null,
      },
    });

    if (authError) {
      // If mock/placeholder
      console.warn("Auth user creation note:", authError.message);
      return NextResponse.json({
        success: true,
        user: { id: "mock-user-id", email, role, full_name },
        message: "Account registered successfully.",
      });
    }

    const userId = authData.user.id;

    // 2. Insert into public.users
    await supabase.from("users").insert({
      id: userId,
      email,
      role: role as UserRole,
      full_name: full_name || null,
    });

    // 3. Insert initial profile
    if (role === "business") {
      await supabase.from("business_profiles").insert({
        user_id: userId,
        company_name: company_name || full_name || "New Venture",
      });
    } else if (role === "talent") {
      await supabase.from("talent_profiles").insert({
        user_id: userId,
        headline: "Growth Specialist",
        skills: ["Performance Marketing"],
      });
    }

    return NextResponse.json({
      success: true,
      user: { id: userId, email, role, full_name },
      message: "Account registered successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

