import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Fetch users with their corresponding profiles
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select(`
        id,
        email,
        role,
        full_name,
        created_at,
        updated_at
      `)
      .order("created_at", { ascending: false });

    if (usersError) {
      return NextResponse.json({ error: usersError.message }, { status: 500 });
    }

    // Also fetch auth users to retrieve admin_level from user_metadata
    let authMetaMap = new Map<string, any>();
    try {
      const { data: authData } = await supabase.auth.admin.listUsers({ perPage: 1000 });
      if (authData?.users) {
        authMetaMap = new Map(authData.users.map((au) => [au.id, au.user_metadata || {}]));
      }
    } catch {
      // Continue if auth admin list fails
    }

    // Also fetch business profiles and talent profiles to enrich user listing
    const { data: bProfiles } = await supabase.from("business_profiles").select("user_id, company_name");
    const { data: tProfiles } = await supabase.from("talent_profiles").select("user_id, headline, location, skills");

    const bMap = new Map((bProfiles || []).map((b) => [b.user_id, b.company_name]));
    const tMap = new Map((tProfiles || []).map((t) => [t.user_id, t]));

    const enrichedUsers = (users || []).map((u) => {
      let organization = "";
      if (u.role === "business") {
        organization = bMap.get(u.id) || "Client Venture";
      } else if (u.role === "talent") {
        const talent = tMap.get(u.id);
        organization = talent?.headline || "Marketing Talent";
      } else if (u.role === "admin") {
        organization = "XC Global Executive";
      }

      const meta = authMetaMap.get(u.id) || {};
      const admin_level =
        meta.admin_level || (u.role === "admin" ? "super_admin" : null);

      return {
        ...u,
        admin_level,
        organization,
        status: "active",
      };
    });

    return NextResponse.json({ users: enrichedUsers });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch users." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { userId, role, admin_level } = body;

    if (!userId || !role) {
      return NextResponse.json({ error: "userId and role are required." }, { status: 400 });
    }

    const allowedRoles = ["business", "talent", "admin"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }

    const allowedAdminLevels = ["super_admin", "service_admin", "reader_admin", null, undefined];
    if (role === "admin" && admin_level && !["super_admin", "service_admin", "reader_admin"].includes(admin_level)) {
      return NextResponse.json({ error: "Invalid admin_level." }, { status: 400 });
    }

    const resolvedAdminLevel = role === "admin" ? (admin_level || "reader_admin") : null;

    // 1. Update public.users table
    const { error: dbError } = await supabase
      .from("users")
      .update({ role })
      .eq("id", userId);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // Attempt updating admin_level column if present in table
    try {
      await supabase
        .from("users")
        .update({ admin_level: resolvedAdminLevel } as any)
        .eq("id", userId);
    } catch {
      // Column might not exist yet, that is fine
    }

    // 2. Update Supabase Auth user metadata
    try {
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          role,
          admin_level: resolvedAdminLevel,
        },
      });
    } catch (authErr: any) {
      console.warn("Could not update auth user metadata:", authErr?.message);
    }

    return NextResponse.json({ success: true, role, admin_level: resolvedAdminLevel });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update user." },
      { status: 500 }
    );
  }
}
