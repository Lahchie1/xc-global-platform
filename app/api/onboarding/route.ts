import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      company_name,
      website,
      industry,
      company_size,
      location,
      contact_name,
      contact_title,
      contact_email,
      contact_phone,
      services_interested,
      challenge_description,
      how_heard,
    } = body;

    // Validation
    if (!company_name || !contact_name || !contact_email) {
      return NextResponse.json(
        { error: "Company name, contact name, and contact email are required." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Insert into onboarding_applications
    const { data: application, error: dbError } = await supabase
      .from("onboarding_applications")
      .insert({
        company_name,
        website: website || null,
        industry: industry || null,
        company_size: company_size || null,
        location: location || null,
        contact_name,
        contact_title: contact_title || null,
        contact_email,
        contact_phone: contact_phone || null,
        services_interested: services_interested || [],
        challenge_description: challenge_description || null,
        how_heard: how_heard || null,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.warn("Database insert note (falling back to mock if offline):", dbError.message);
    }

    // 2. Send email notification via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && !resendApiKey.includes("placeholder")) {
      try {
        const resend = new Resend(resendApiKey);
        const fromEmail = process.env.NOTIFICATION_EMAIL_FROM || "onboarding@xcglobalhq.com";
        const toEmail = process.env.NOTIFICATION_EMAIL_TO || "admin@xcglobalhq.com";

        await resend.emails.send({
          from: fromEmail.includes("<") ? fromEmail : `XC Global <${fromEmail}>`,
          to: toEmail,
          subject: `New Onboarding Submission: ${company_name}`,
          html: `
            <h2>New Business Onboarding Application</h2>
            <p><strong>Company:</strong> ${company_name}</p>
            <p><strong>Website:</strong> ${website || "N/A"}</p>
            <p><strong>Industry:</strong> ${industry || "N/A"}</p>
            <p><strong>Size:</strong> ${company_size || "N/A"}</p>
            <p><strong>Location:</strong> ${location || "N/A"}</p>
            <hr />
            <p><strong>Contact Person:</strong> ${contact_name} (${contact_title || "N/A"})</p>
            <p><strong>Email:</strong> ${contact_email}</p>
            <p><strong>Phone:</strong> ${contact_phone || "N/A"}</p>
            <p><strong>Services:</strong> ${(services_interested || []).join(", ")}</p>
            <p><strong>Brief:</strong> ${challenge_description || "N/A"}</p>
          `,
        });
      } catch (emailErr) {
        console.warn("Resend email notification warning:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      applicationId: application?.id || "mock-app-id",
      message: "Application submitted successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

