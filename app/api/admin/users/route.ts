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
        organization = talent?.headline || "Marketing Specialist";
      } else if (u.role === "admin") {
        organization = "XC Global Executive";
      }

      return {
        ...u,
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

