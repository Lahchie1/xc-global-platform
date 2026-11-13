"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { requireRole } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_SENDERS = new Set([
  "hello@xcglobalhq.com",
  "talent@xcglobalhq.com",
  "partnerships@xcglobalhq.com",
  "support@xcglobalhq.com",
]);

const REPLY_TO = "xcglobalproject@gmail.com";

export type SendAdminEmailState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseEmailList(value: string) {
  return value
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

function bodyToHtml(body: string) {
  const trimmed = body.trim();
  if (!trimmed) return "";

  // If it already looks like HTML, render as-is (trusted admin-only input)
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }

  const paragraphs = trimmed.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return paragraphs
    .map((p) => `<p style="margin:0 0 16px 0;">${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

function renderBrandedTemplate(subject: string, bodyHtml: string) {
  const safeSubject = escapeHtml(subject);
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeSubject}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${safeSubject}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f4f6;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(17,24,39,0.06);">
            <tr>
              <td style="background:#0f172a;padding:28px 32px;border-bottom:3px solid #DB833A;">
                <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#DB833A;font-weight:700;margin-bottom:6px;">XC Global Limited</div>
                <div style="font-size:22px;line-height:1.3;color:#ffffff;font-weight:700;">${safeSubject}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;font-size:15px;line-height:1.75;color:#374151;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <p style="margin:0 0 6px 0;font-size:12px;color:#6b7280;line-height:1.6;">
                  XC Global Limited &middot; Marketing, Talent &amp; Growth Partner
                </p>
                <p style="margin:0;font-size:12px;color:#9ca3af;">
                  &copy; 2026 XC Global Limited. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
          <div style="max-width:640px;margin-top:12px;font-size:11px;color:#9ca3af;line-height:1.6;text-align:center;">
            This message was sent by XC Global Limited. Replies to this email are directed to xcglobalproject@gmail.com.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendAdminEmail(
  _prevState: SendAdminEmailState,
  formData: FormData
): Promise<SendAdminEmailState> {
  try {
    const user = await requireRole(["admin"]);

    const senderAddress = String(formData.get("senderAddress") || "").trim().toLowerCase();
    const toRaw = String(formData.get("to") || "").trim();
    const ccRaw = String(formData.get("cc") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const body = String(formData.get("body") || "").trim();

    const fieldErrors: Record<string, string> = {};

    if (!ALLOWED_SENDERS.has(senderAddress)) {
      fieldErrors.senderAddress = "Select a valid sender address.";
    }

    const recipients = parseEmailList(toRaw);
    if (recipients.length === 0) {
      fieldErrors.to = "At least one recipient email is required.";
    } else if (recipients.some((email) => !isValidEmail(email))) {
      fieldErrors.to = "One or more recipient emails are invalid.";
    }

    const ccEmails = parseEmailList(ccRaw);
    if (ccEmails.some((email) => !isValidEmail(email))) {
      fieldErrors.cc = "One or more CC emails are invalid.";
    }

    if (!subject) {
      fieldErrors.subject = "Subject is required.";
    }

    if (!body) {
      fieldErrors.body = "Message body is required.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, message: "Please fix the highlighted fields.", fieldErrors };
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder") {
      return {
        ok: false,
        message: "RESEND_API_KEY is not configured. Set a valid API key to send emails.",
      };
    }

    const bodyHtml = bodyToHtml(body);
    const html = renderBrandedTemplate(subject, bodyHtml);

    const sendResult = await resend.emails.send({
      from: `XC Global <${senderAddress}>`,
      to: recipients,
      ...(ccEmails.length > 0 ? { cc: ccEmails } : {}),
      replyTo: REPLY_TO,
      subject,
      html,
    });

    if ((sendResult as any)?.error) {
      const errMsg =
        (sendResult as any).error?.message ||
        "Resend failed to send the email. Please try again.";
      return { ok: false, message: errMsg };
    }

    const resendMessageId = (sendResult as any)?.data?.id || null;
    const recipientEmail = recipients.join(", ");

    const adminClient = createAdminClient();
    const { error: insertError } = await adminClient.from("sent_emails").insert({
      sender_address: senderAddress,
      recipient_email: recipientEmail,
      cc_emails: ccEmails.length > 0 ? ccEmails : null,
      subject,
      body_html: html,
      resend_message_id: resendMessageId,
      status: "sent",
      sent_by: user.id,
    });

    if (insertError) {
      return {
        ok: false,
        message:
          "Email sent, but failed to log it in sent_emails. Check database permissions/schema: " +
          insertError.message,
      };
    }

    revalidatePath("/admin/emails");

    return {
      ok: true,
      message: `Email sent successfully to ${recipientEmail}.`,
    };
  } catch (error: any) {
    const message =
      error?.message ||
      "Failed to send email. Please try again or check server configuration.";
    return { ok: false, message };
  }
}

export async function getSentEmails() {
  await requireRole(["admin"]);

  const adminClient = createAdminClient();
  const { data, error } = await adminClient
    .from("sent_emails")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    throw new Error(error.message || "Failed to load sent emails.");
  }

  return data || [];
}
