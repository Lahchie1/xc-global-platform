import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("onboarding_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ submissions: data || [] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch submissions." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Submission ID and status are required." },
        { status: 400 }
      );
    }

    if (!["pending", "reviewed", "accepted", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Update status on onboarding_applications
    const { data: updatedApp, error: updateError } = await supabase
      .from("onboarding_applications")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // 2. If accepted, check or create a business_profiles record
    if (status === "accepted" && updatedApp) {
      // Find user if matching contact email exists
      const { data: matchedUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", updatedApp.contact_email)
        .maybeSingle();

      if (matchedUser) {
        await supabase.from("business_profiles").upsert(
          {
            user_id: matchedUser.id,
            company_name: updatedApp.company_name,
            website: updatedApp.website,
            industry: updatedApp.industry,
            company_size: updatedApp.company_size,
            location: updatedApp.location,
            description: updatedApp.challenge_description,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
      }
    }

    return NextResponse.json({
      success: true,
      submission: updatedApp,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update submission." },
      { status: 500 }
    );
  }
}

