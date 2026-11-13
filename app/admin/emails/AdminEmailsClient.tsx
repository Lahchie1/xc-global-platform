"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Send,
  Inbox,
  Search,
  Filter,
  X,
  Eye,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  FileText,
  Clock,
} from "lucide-react";
import { sendAdminEmail, type SendAdminEmailState } from "@/app/actions/admin-email";

export interface SentEmail {
  id: string;
  sender_address: string;
  recipient_email: string;
  cc_emails: string[] | null;
  subject: string;
  body_html: string;
  resend_message_id: string | null;
  status: string | null;
  sent_by: string | null;
  created_at: string;
}

interface Props {
  initialEmails: SentEmail[];
  loadError?: string | null;
}

const SENDER_OPTIONS = [
  { value: "hello@xcglobalhq.com", label: "hello@xcglobalhq.com" },
  { value: "talent@xcglobalhq.com", label: "talent@xcglobalhq.com" },
  { value: "partnerships@xcglobalhq.com", label: "partnerships@xcglobalhq.com" },
  { value: "support@xcglobalhq.com", label: "support@xcglobalhq.com" },
];

const TEMPLATES = [
  {
    id: "blank",
    name: "Blank Email",
    subject: "",
    body: "",
  },
  {
    id: "client-onboarding",
    name: "Client Onboarding Follow-Up",
    subject: "Welcome to XC Global — Next Steps for Your Onboarding",
    body: `Hi {{Client Name}},

Thank you for submitting your onboarding information to XC Global Limited. We're excited to learn more about {{Company Name}} and explore how we can support your growth goals.

Next steps:
- Our team will review your submission and current priorities.
- We'll schedule a discovery call to align on scope, timelines, and success metrics.
- You'll receive a recommended engagement plan tailored to your needs.

If you have any immediate questions or additional context to share, simply reply to this email.

Best regards,
{{Your Name}}
XC Global Limited`,
  },
  {
    id: "talent-interview",
    name: "Talent Interview Invite",
    subject: "Interview Invitation — {{Role}} at XC Global",
    body: `Hi {{Candidate Name}},

Thank you for your interest in opportunities with XC Global Limited. We would like to invite you to interview for the {{Role}} position.

Interview details:
- Date: {{Date}}
- Time: {{Time}} ({{Timezone}})
- Format: {{Video Call / In-person}}
- Meeting link/location: {{Link or Address}}

Please reply to this email to confirm your availability or suggest an alternative time.

We look forward to speaking with you.

Best regards,
{{Your Name}}
XC Global Talent Team`,
  },
  {
    id: "partnership-inquiry",
    name: "Partnership Inquiry",
    subject: "Exploring a Partnership with {{Company Name}}",
    body: `Hi {{Contact Name}},

I hope you're doing well. I'm reaching out from XC Global Limited regarding a potential partnership with {{Company Name}}.

We believe there may be a strong opportunity to collaborate around {{Area of Collaboration}}, and we'd welcome a conversation to explore how we can create value together.

Would you be available for a brief call next week? Please let us know a few times that work for you.

Warm regards,
{{Your Name}}
XC Global Limited`,
  },
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPreviewHtml(subject: string, body: string) {
  const safeSubject = escapeHtml(subject || "Email Preview");
  const trimmed = body.trim();
  let bodyHtml = "";
  if (!trimmed) {
    bodyHtml = '<p style="margin:0;color:#9ca3af;">Start typing your message to preview it here...</p>';
  } else if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    bodyHtml = trimmed;
  } else {
    bodyHtml = trimmed
      .split(/\n{2,}/)
      .map((p) => `<p style="margin:0 0 16px 0;">${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }

  return `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f3f4f6;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(17,24,39,0.06);">
            <tr>
              <td style="background:#0f172a;padding:24px 28px;border-bottom:3px solid #DB833A;">
                <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#DB833A;font-weight:700;margin-bottom:6px;">XC Global Limited</div>
                <div style="font-size:20px;line-height:1.3;color:#ffffff;font-weight:700;">${safeSubject}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;font-size:15px;line-height:1.75;color:#374151;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <p style="margin:0 0 6px 0;font-size:12px;color:#6b7280;line-height:1.6;">XC Global Limited &middot; Marketing, Talent &amp; Growth Partner</p>
                <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; 2026 XC Global Limited. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

const initialState: SendAdminEmailState = { ok: false, message: "" };

export function AdminEmailsClient({ initialEmails, loadError }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const [emails, setEmails] = useState<SentEmail[]>(initialEmails);
  const [state, setState] = useState<SendAdminEmailState>(initialState);

  // Compose state
  const [senderAddress, setSenderAddress] = useState(SENDER_OPTIONS[0].value);
  const [to, setTo] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [templateId, setTemplateId] = useState("blank");
  const [showPreview, setShowPreview] = useState(false);

  // History state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEmail, setSelectedEmail] = useState<SentEmail | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setEmails(initialEmails);
  }, [initialEmails]);

  useEffect(() => {
    if (!state.message) return;
    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, message: "" }));
    }, 6000);
    return () => clearTimeout(timer);
  }, [state.message, state.ok]);

  const filteredEmails = useMemo(() => {
    const q = search.trim().toLowerCase();
    return emails.filter((email) => {
      const matchesStatus =
        statusFilter === "all" || (email.status || "sent").toLowerCase() === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      return (
        email.recipient_email.toLowerCase().includes(q) ||
        email.sender_address.toLowerCase().includes(q) ||
        email.subject.toLowerCase().includes(q) ||
        (email.resend_message_id || "").toLowerCase().includes(q)
      );
    });
  }, [emails, search, statusFilter]);

  const applyTemplate = (id: string) => {
    setTemplateId(id);
    const tpl = TEMPLATES.find((t) => t.id === id);
    if (!tpl) return;
    setSubject(tpl.subject);
    setBody(tpl.body);
  };

  const handleSubmit = (formData: FormData) => {
    // Ensure controlled values are submitted
    formData.set("senderAddress", senderAddress);
    formData.set("to", to);
    formData.set("cc", cc);
    formData.set("subject", subject);
    formData.set("body", body);

    startTransition(async () => {
      const result = await sendAdminEmail(initialState, formData);
      setState(result);
      if (result.ok) {
        setTo("");
        setCc("");
        setSubject("");
        setBody("");
        setTemplateId("blank");
        setShowCc(false);
        formRef.current?.reset();
        router.refresh();
      }
    });
  };

  const openDrawer = (email: SentEmail) => {
    setSelectedEmail(email);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedEmail(null), 200);
  };

  const previewHtml = buildPreviewHtml(subject, body);
  const fieldErrors = state.fieldErrors || {};

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Communications
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Admin Email Composer
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Send branded emails via Resend and review the sent communications log.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-white border border-border text-xs text-text-secondary">
          <Mail className="w-4 h-4 text-accent-gold" />
          <span>Replies route to <strong className="text-text-primary">xcglobalproject@gmail.com</strong></span>
        </div>
      </div>

      {/* Feedback banner */}
      {state.message && (
        <div
          className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
            state.ok
              ? "bg-status-success/10 border-status-success/20 text-status-success"
              : "bg-status-error/10 border-status-error/20 text-status-error"
          }`}
          role={state.ok ? "status" : "alert"}
        >
          {state.ok ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-semibold">{state.ok ? "Success" : "Unable to send email"}</p>
            <p className="text-xs mt-0.5 opacity-90">{state.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setState(initialState)}
            className="p-1 rounded hover:bg-black/5"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Compose Panel */}
        <section className="xl:col-span-5 bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center">
                <Send className="w-4 h-4 text-accent-gold" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary">Compose Email</h2>
                <p className="text-[11px] text-text-muted">Branded XC Global template applied automatically</p>
              </div>
            </div>
          </div>

          <form ref={formRef} action={handleSubmit} className="space-y-4">
            {/* Template selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Quick Template
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={templateId}
                  onChange={(e) => applyTemplate(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                >
                  {TEMPLATES.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* From */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                From
              </label>
              <select
                name="senderAddress"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  fieldErrors.senderAddress ? "border-status-error" : "border-border"
                }`}
              >
                {SENDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    XC Global &lt;{opt.label}&gt;
                  </option>
                ))}
              </select>
              {fieldErrors.senderAddress && (
                <p className="text-[11px] text-status-error">{fieldErrors.senderAddress}</p>
              )}
            </div>

            {/* To */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  To
                </label>
                <button
                  type="button"
                  onClick={() => setShowCc((v) => !v)}
                  className="text-[11px] font-semibold text-secondary hover:underline inline-flex items-center gap-1"
                >
                  {showCc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  <span>{showCc ? "Hide CC" : "Add CC"}</span>
                </button>
              </div>
              <input
                name="to"
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com, another@example.com"
                className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  fieldErrors.to ? "border-status-error" : "border-border"
                }`}
              />
              <p className="text-[11px] text-text-muted">Comma-separated for multiple recipients.</p>
              {fieldErrors.to && <p className="text-[11px] text-status-error">{fieldErrors.to}</p>}
            </div>

            {/* CC */}
            {showCc && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  CC
                </label>
                <input
                  name="cc"
                  type="text"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  placeholder="cc@example.com"
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    fieldErrors.cc ? "border-status-error" : "border-border"
                  }`}
                />
                {fieldErrors.cc && <p className="text-[11px] text-status-error">{fieldErrors.cc}</p>}
              </div>
            )}

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Subject
              </label>
              <input
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  fieldErrors.subject ? "border-status-error" : "border-border"
                }`}
              />
              {fieldErrors.subject && (
                <p className="text-[11px] text-status-error">{fieldErrors.subject}</p>
              )}
            </div>

            {/* Body */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Message
                </label>
                <span className="text-[11px] text-text-muted">Plain text or HTML supported</span>
              </div>
              <textarea
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={10}
                placeholder="Write your message here. Use blank lines for paragraphs, or paste HTML for advanced formatting."
                className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 leading-relaxed resize-y min-h-[220px] ${
                  fieldErrors.body ? "border-status-error" : "border-border"
                }`}
              />
              {fieldErrors.body && <p className="text-[11px] text-status-error">{fieldErrors.body}</p>}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface-white text-text-primary text-sm font-semibold hover:bg-surface-container-low transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Email</span>
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-container transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed sm:ml-auto"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Sent History */}
        <section className="xl:col-span-7 bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-border space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center">
                  <Inbox className="w-4 h-4 text-accent-gold" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">Sent History</h2>
                  <p className="text-[11px] text-text-muted">
                    {emails.length} logged email{emails.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </div>

            {loadError && (
              <div className="p-3 rounded-lg bg-status-warning/10 border border-status-warning/20 text-xs text-status-warning flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  Could not load sent history: {loadError}. Ensure the <code className="font-mono">sent_emails</code> table and RLS policies exist in Supabase.
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search recipient, sender, subject, or message ID..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="relative sm:w-44">
                <Filter className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                >
                  <option value="all">All statuses</option>
                  <option value="sent">Sent</option>
                  <option value="failed">Failed</option>
                  <option value="queued">Queued</option>
                </select>
                <ChevronDown className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/40 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">Recipient</th>
                  <th className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">Sender Alias</th>
                  <th className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">Subject</th>
                  <th className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">Date Sent</th>
                  <th className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-text-muted">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEmails.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-text-muted">
                        <Inbox className="w-8 h-8" />
                        <p className="text-sm font-medium text-text-primary">No emails found</p>
                        <p className="text-xs">Sent emails will appear here once logged.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEmails.map((email) => {
                    const status = (email.status || "sent").toLowerCase();
                    return (
                      <tr
                        key={email.id}
                        onClick={() => openDrawer(email)}
                        className="hover:bg-surface-container-low/40 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-text-primary truncate max-w-[220px]">
                            {email.recipient_email}
                          </p>
                          {email.cc_emails && email.cc_emails.length > 0 && (
                            <p className="text-[11px] text-text-muted mt-0.5">
                              CC: {email.cc_emails.join(", ")}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-text-secondary">{email.sender_address}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-text-primary truncate max-w-[260px]">{email.subject}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <Clock className="w-3.5 h-3.5 text-text-muted" />
                            <span>{new Date(email.created_at).toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              status === "sent"
                                ? "bg-status-success/10 text-status-success"
                                : status === "failed"
                                ? "bg-status-error/10 text-status-error"
                                : "bg-status-warning/10 text-status-warning"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPreview(false)} />
          <div className="relative w-full max-w-3xl bg-surface-white rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-container-low/40">
              <div>
                <h3 className="text-base font-bold text-text-primary">Email Preview</h3>
                <p className="text-xs text-text-muted">Branded XC Global template</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-lg hover:bg-surface-container text-text-muted hover:text-text-primary"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 bg-[#f3f4f6]">
              <iframe
                title="Email preview"
                srcDoc={previewHtml}
                className="w-full h-[70vh] border-0"
                sandbox=""
              />
            </div>
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      {selectedEmail && (
        <div className={`fixed inset-0 z-50 ${drawerOpen ? "" : "pointer-events-none"}`}>
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
              drawerOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeDrawer}
          />
          <aside
            className={`absolute right-0 top-0 h-full w-full max-w-2xl bg-surface-white border-l border-border shadow-2xl transform transition-transform duration-200 flex flex-col ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
            aria-label="Email details"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-container-low/40">
              <div className="min-w-0 pr-4">
                <h3 className="text-base font-bold text-text-primary truncate">{selectedEmail.subject}</h3>
                <p className="text-xs text-text-muted truncate">To: {selectedEmail.recipient_email}</p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 rounded-lg hover:bg-surface-container text-text-muted hover:text-text-primary shrink-0"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-surface-container-low border border-border/60 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-text-muted block">From</span>
                  <span className="text-text-primary font-semibold">{selectedEmail.sender_address}</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-border/60 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-text-muted block">Status</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-status-success/10 text-status-success">
                    {(selectedEmail.status || "sent").toLowerCase()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-border/60 space-y-1 sm:col-span-2">
                  <span className="font-bold uppercase tracking-wider text-text-muted block">Recipients</span>
                  <span className="text-text-primary">{selectedEmail.recipient_email}</span>
                  {selectedEmail.cc_emails && selectedEmail.cc_emails.length > 0 && (
                    <div className="text-text-secondary mt-1">CC: {selectedEmail.cc_emails.join(", ")}</div>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-border/60 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-text-muted block">Date Sent</span>
                  <span className="text-text-primary">{new Date(selectedEmail.created_at).toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-border/60 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-text-muted block">Resend Message ID</span>
                  <div className="flex items-center gap-2">
                    <span className="text-text-primary font-mono text-[11px] break-all">
                      {selectedEmail.resend_message_id || "—"}
                    </span>
                    {selectedEmail.resend_message_id && (
                      <button
                        type="button"
                        onClick={() => navigator.clipboard?.writeText(selectedEmail.resend_message_id || "")}
                        className="p-1 rounded hover:bg-surface-container text-text-muted hover:text-text-primary"
                        title="Copy Message ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Rendered Email</span>
                <div className="rounded-xl border border-border overflow-hidden bg-[#f3f4f6]">
                  <iframe
                    title="Sent email content"
                    srcDoc={selectedEmail.body_html}
                    className="w-full h-[520px] border-0"
                    sandbox=""
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
