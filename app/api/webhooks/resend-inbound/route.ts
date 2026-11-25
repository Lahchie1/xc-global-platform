import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

    // 1. Signature Verification with Svix if secret is configured
    if (webhookSecret) {
      const svixId = req.headers.get("svix-id");
      const svixTimestamp = req.headers.get("svix-timestamp");
      const svixSignature = req.headers.get("svix-signature");

      if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json(
          { error: "Missing svix signature headers" },
          { status: 401 }
        );
      }

      try {
        const wh = new Webhook(webhookSecret);
        wh.verify(rawBody, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        });
      } catch (err: any) {
        console.error("Resend inbound webhook signature verification failed:", err?.message);
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
    }

    const payload = JSON.parse(rawBody);
    const emailData = payload.data || payload;
    const resendEmailId = emailData.email_id || emailData.id;

    if (!resendEmailId) {
      // Event received but no email ID to process (e.g. general ping)
      return NextResponse.json({ received: true, ignored: true });
    }

    // Parse 'from' field to separate name and email
    let fromEmail = "";
    let fromName: string | null = null;
    const rawFrom = emailData.from;

    if (typeof rawFrom === "string") {
      const match = rawFrom.match(/^(.*?)\s*<(.+?)>$/);
      if (match) {
        fromName = match[1].replace(/^["']|["']$/g, "").trim() || null;
        fromEmail = match[2].trim();
      } else {
        fromEmail = rawFrom.trim();
      }
    } else if (Array.isArray(rawFrom) && rawFrom.length > 0) {
      fromEmail = String(rawFrom[0]);
    } else if (rawFrom && typeof rawFrom === "object") {
      fromEmail = rawFrom.email || String(rawFrom);
      fromName = rawFrom.name || null;
    }

    // Parse 'to' field
    let toEmail = "hello@xcglobalhq.com";
    const rawTo = emailData.to;
    if (Array.isArray(rawTo) && rawTo.length > 0) {
      toEmail = String(rawTo[0]);
    } else if (typeof rawTo === "string") {
      toEmail = rawTo;
    }

    const subject = emailData.subject || "(No Subject)";
    let bodyText = emailData.text || null;
    let bodyHtml = emailData.html || null;

    // 2. Fetch full body content from Resend if not included in webhook metadata
    if ((!bodyHtml && !bodyText) && process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch(
          `https://api.resend.com/emails/receiving/${resendEmailId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
          }
        );
        if (resendRes.ok) {
          const detail = await resendRes.json();
          bodyText = detail.text || bodyText;
          bodyHtml = detail.html || bodyHtml;
        } else {
          // Fallback to resend.emails.get()
          const sdkRes = await resend.emails.get(resendEmailId);
          if (sdkRes.data) {
            bodyText = (sdkRes.data as any).text || bodyText;
            bodyHtml = (sdkRes.data as any).html || bodyHtml;
          }
        }
      } catch (fetchErr) {
        console.warn("Could not fetch full email body from Resend API:", fetchErr);
      }
    }

    // 3. Insert email into public.received_emails
    const adminClient = createAdminClient();
    const { error: insertError } = await adminClient
      .from("received_emails")
      .upsert(
        {
          resend_email_id: resendEmailId,
          from_email: fromEmail || "unknown@sender.com",
          from_name: fromName,
          to_email: toEmail,
          subject,
          body_text: bodyText,
          body_html: bodyHtml,
          is_read: false,
          received_at: emailData.created_at || new Date().toISOString(),
        },
        { onConflict: "resend_email_id" }
      );

    if (insertError) {
      console.error("Failed to insert received email:", insertError.message);
      return NextResponse.json(
        { error: insertError.message, ok: false },
        { status: 500 }
      );
    }

    // 4. Return 200 OK quickly
    return NextResponse.json({ ok: true, id: resendEmailId }, { status: 200 });
  } catch (error: any) {
    console.error("Resend inbound webhook error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
