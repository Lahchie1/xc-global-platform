import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Attempt to store in Supabase contact/subscribers if available
    try {
      const adminClient = createAdminClient();
      await adminClient.from("newsletter_subscribers").upsert(
        {
          email: email.toLowerCase().trim(),
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );
    } catch {
      // Table might not exist yet, continue gracefully
    }

    // Send notification or welcome email via Resend if configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_placeholder") {
      try {
        const notifyTo = process.env.NOTIFICATION_EMAIL_TO || "xcglobalproject@gmail.com";
        const fromEmail = process.env.NOTIFICATION_EMAIL_FROM || "hello@xcglobalhq.com";

        await resend.emails.send({
          from: fromEmail.includes("<") ? fromEmail : `XC Global <${fromEmail}>`,
          to: [notifyTo],
          subject: `[New Newsletter Subscriber] ${email}`,
          html: `
            <div style="font-family: sans-serif; padding: 24px; color: #111827;">
              <h2 style="color: #DB833A; margin: 0 0 12px 0;">New Newsletter Subscriber</h2>
              <p style="font-size: 15px; margin: 0 0 8px 0;">A user has subscribed to <strong>Grow Smarter. Scale Faster.</strong>:</p>
              <p style="font-size: 16px; font-weight: bold; color: #111827;">${email}</p>
              <p style="font-size: 12px; color: #6b7280; margin-top: 16px;">Timestamp: ${new Date().toUTCString()}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Could not send subscriber notification via Resend:", emailErr);
      }
    }

    return NextResponse.json({ ok: true, message: "Subscribed successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}
