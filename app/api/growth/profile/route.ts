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

    // 1. Get user details
    const { data: userData } = await admin
      .from("users")
      .select("id, email, full_name, role")
      .eq("id", user.id)
      .single();

    // 2. Get business profile
    const { data: bProfile } = await admin
      .from("business_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    // 3. Also check if there is an onboarding application matching this email
    const { data: application } = await admin
      .from("onboarding_applications")
      .select("*")
      .eq("contact_email", user.email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    return NextResponse.json({
      user: userData || { id: user.id, email: user.email },
      profile: bProfile || null,
      application: application || null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch business profile" },
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
      company_name,
      website,
      industry,
      company_size,
      location,
      description,
    } = body;

    const admin = createAdminClient();

    const { data: updatedProfile, error: profileError } = await admin
      .from("business_profiles")
      .upsert(
        {
          user_id: user.id,
          company_name: company_name || "Client Venture",
          website: website || null,
          industry: industry || null,
          company_size: company_size || null,
          location: location || null,
          description: description || null,
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
      { error: err?.message || "Failed to save business profile" },
      { status: 500 }
    );
  }
}

