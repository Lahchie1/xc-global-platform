import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const subjectLabels: Record<string, string> = {
      general: "General Enquiry",
      business: "Business Partnership",
      talent: "Talent Placement",
      press: "Press & Media",
    };

    const subjectLabel = subjectLabels[subject] ?? "General Enquiry";

    // Only attempt email send if API key is configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_placeholder") {
      const fromEmail = process.env.NOTIFICATION_EMAIL_FROM || "notifications@xcglobalhq.com";
      const toEmail = process.env.NOTIFICATION_EMAIL_TO || "admin@xcglobalhq.com";

      await resend.emails.send({
        from: fromEmail.includes("<") ? fromEmail : `XC Global <${fromEmail}>`,
        to: [toEmail],
        replyTo: email,
        subject: `[${subjectLabel}] New Contact from ${name}${company ? ` — ${company}` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
            <div style="background: #111827; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #DB833A; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
                XC Global — New Contact Submission
              </h1>
            </div>
            <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #6b7280; width: 120px;">Category</td>
                  <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: 600;">${subjectLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #6b7280;">Name</td>
                  <td style="padding: 8px 0; font-size: 13px; color: #111827;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #6b7280;">Email</td>
                  <td style="padding: 8px 0; font-size: 13px; color: #111827;"><a href="mailto:${email}" style="color: #DB833A;">${email}</a></td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; font-weight: 600; color: #6b7280;">Company</td>
                  <td style="padding: 8px 0; font-size: 13px; color: #111827;">${company}</td>
                </tr>` : ""}
              </table>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <h3 style="font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Message</h3>
              <p style="font-size: 14px; color: #374151; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
              <div style="margin-top: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; font-size: 12px; color: #9ca3af;">
                Received via xcglobalhq.com/contact • ${new Date().toUTCString()}
              </div>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

