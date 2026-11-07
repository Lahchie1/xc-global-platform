import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();

    // 1. Get user details from users table
    const { data: userData } = await admin
      .from("users")
      .select("id, email, full_name, role")
      .eq("id", user.id)
      .single();

    // 2. Get talent profile from talent_profiles table
    const { data: profileData } = await admin
      .from("talent_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    return NextResponse.json({
      user: userData || { id: user.id, email: user.email },
      profile: profileData || null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      country,
      work_title,
      availability,
      job_type,
      job_mode,
      portfolio_url,
      linkedin_url,
      bio,
      skills,
      cv_name,
    } = body;

    const admin = createAdminClient();

    // 1. Update full_name in users table if provided
    if (name) {
      await admin.from("users").update({ full_name: name }).eq("id", user.id);
    }

    // 2. Upsert talent_profiles
    const { data: updatedProfile, error: profileError } = await admin
      .from("talent_profiles")
      .upsert(
        {
          user_id: user.id,
          headline: work_title || null,
          location: country || null,
          availability: availability || null,
          preferred_roles: job_type ? [job_type, job_mode].filter(Boolean) : [],
          bio: bio || null,
          skills: skills || [],
          portfolio_url: portfolio_url || null,
          linkedin_url: linkedin_url || null,
          cv_url: cv_name || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to save profile" },
      { status: 500 }
    );
  }
}

