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
  RotateCcw,
  RotateCw,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Link2,
  ImagePlus,
  MoreVertical,
  Table as TableIcon,
  Quote as QuoteIcon,
  Video as VideoIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Indent as IndentIcon,
  Outdent as OutdentIcon,
  Upload,
  FileSpreadsheet,
  Code2,
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
  { value: "hello@xcglobalhq.com", label: "hello@xcglobalhq.com (General / Growth)" },
  { value: "talent@xcglobalhq.com", label: "talent@xcglobalhq.com (Talent Operations)" },
  { value: "partnerships@xcglobalhq.com", label: "partnerships@xcglobalhq.com (Partnerships)" },
  { value: "support@xcglobalhq.com", label: "support@xcglobalhq.com (Support)" },
];

const TEMPLATES = [
  {
    id: "blank",
    name: "Blank Email",
    subject: "",
    bodyHtml: "<p><br/></p>",
  },
  {
    id: "client-onboarding",
    name: "Client Onboarding Follow-Up",
    subject: "Welcome to XC Global — Next Steps for Your Onboarding",
    bodyHtml: `<p>Hi {{Client Name}},</p>
<p>Thank you for submitting your onboarding information to XC Global Limited. We're excited to learn more about {{Company Name}} and explore how we can support your growth goals.</p>
<p><strong>Next steps:</strong></p>
<ul>
  <li>Our team will review your submission and current priorities.</li>
  <li>We'll schedule a discovery call to align on scope, timelines, and success metrics.</li>
  <li>You'll receive a recommended engagement plan tailored to your needs.</li>
</ul>
<p>If you have any immediate questions or additional context to share, simply reply to this email.</p>
<p>Best regards,<br/><strong>{{Your Name}}</strong><br/>XC Global Limited</p>`,
  },
  {
    id: "talent-interview",
    name: "Talent Interview Invite",
    subject: "Interview Invitation — {{Role}} at XC Global",
    bodyHtml: `<p>Hi {{Candidate Name}},</p>
<p>Thank you for your interest in opportunities with XC Global Limited. We would like to invite you to interview for the <strong>{{Role}}</strong> position.</p>
<p><strong>Interview details:</strong></p>
<ul>
  <li><strong>Date:</strong> {{Date}}</li>
  <li><strong>Time:</strong> {{Time}} ({{Timezone}})</li>
  <li><strong>Format:</strong> {{Video Call / In-person}}</li>
  <li><strong>Meeting link/location:</strong> {{Link or Address}}</li>
</ul>
<p>Please reply to this email to confirm your availability or suggest an alternative time.</p>
<p>We look forward to speaking with you.</p>
<p>Best regards,<br/><strong>{{Your Name}}</strong><br/>XC Global Talent Team</p>`,
  },
  {
    id: "partnership-inquiry",
    name: "Partnership Inquiry",
    subject: "Exploring a Partnership with {{Company Name}}",
    bodyHtml: `<p>Hi {{Contact Name}},</p>
<p>I hope you're doing well. I'm reaching out from XC Global Limited regarding a potential partnership with {{Company Name}}.</p>
<p>We believe there may be a strong opportunity to collaborate around {{Area of Collaboration}}, and we'd welcome a conversation to explore how we can create value together.</p>
<p>Would you be available for a brief call next week? Please let us know a few times that work for you.</p>
<p>Warm regards,<br/><strong>{{Your Name}}</strong><br/>XC Global Limited</p>`,
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
  if (!trimmed || trimmed === "<p><br></p>" || trimmed === "<p><br/></p>") {
    bodyHtml = '<p style="margin:0;color:#9ca3af;">Start typing your message to preview it here...</p>';
  } else if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    bodyHtml = trimmed;
  } else {
    bodyHtml = trimmed
      .split(/\n{2,}/)
      .map((p) => `<p style="margin:0 0 18px 0;line-height:1.75;font-size:15px;color:#374151;">${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
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
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>
                      <p style="margin:0 0 4px 0;font-size:12px;color:#6b7280;line-height:1.6;">XC Global Limited &middot; Marketing, Talent &amp; Growth Partner</p>
                      <p style="margin:0;font-size:12px;color:#9ca3af;">&copy; ${new Date().getFullYear()} XC Global Limited. All rights reserved.</p>
                    </td>
                    <td align="right" valign="top">
                      <a href="https://xcglobalhq.com/unsubscribe" style="display:inline-block;padding:5px 10px;border-radius:6px;border:1px solid #d1d5db;background:#ffffff;color:#6b7280;font-size:11px;font-weight:600;text-decoration:none;">
                        Unsubscribe
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div style="max-width:640px;margin-top:12px;font-size:11px;color:#9ca3af;line-height:1.6;text-align:center;">
            This email was sent by XC Global Limited. <a href="https://xcglobalhq.com/unsubscribe" style="color:#6b7280;text-decoration:underline;">Unsubscribe</a>
          </div>
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
  const editorRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  const [emails, setEmails] = useState<SentEmail[]>(initialEmails);
  const [state, setState] = useState<SendAdminEmailState>(initialState);

  // Compose state
  const [senderAddress, setSenderAddress] = useState(SENDER_OPTIONS[0].value);
  const [to, setTo] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [cc, setCc] = useState("");
  const [showBcc, setShowBcc] = useState(false);
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [templateId, setTemplateId] = useState("blank");
  const [showPreview, setShowPreview] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  // Toolbar & Modals state
  const [formatBlockValue, setFormatBlockValue] = useState<"Paragraph" | "Header 1" | "Header 2" | "Header 3">("Paragraph");
  const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Customer List CSV Upload state
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [parsedEmails, setParsedEmails] = useState<string[]>([]);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvTargetField, setCsvTargetField] = useState<"bcc" | "to">("bcc");
  const [csvSuccessMessage, setCsvSuccessMessage] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const savedSelectionRange = useRef<Range | null>(null);

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

  // Sync editor content on initial load or template change
  useEffect(() => {
    if (editorRef.current && body !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = body;
    }
  }, [body]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      setBody(editorRef.current.innerHTML);
    }
  };

  // Helper to save selection range before opening modal
  const saveRange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreRange = () => {
    if (savedSelectionRange.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelectionRange.current);
      }
    }
  };

  // Formatting actions
  const execCmd = (command: string, value: string | undefined = undefined) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleEditorInput();
  };

  const handleFormatBlock = (tag: "p" | "h1" | "h2" | "h3", label: "Paragraph" | "Header 1" | "Header 2" | "Header 3") => {
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, tag);
    setFormatBlockValue(label);
    setFormatDropdownOpen(false);
    handleEditorInput();
  };

  const openLinkModal = () => {
    saveRange();
    const sel = window.getSelection();
    const selectedText = sel ? sel.toString() : "";
    setLinkText(selectedText);
    setLinkUrl("");
    setLinkModalOpen(true);
  };

  const applyLink = () => {
    editorRef.current?.focus();
    restoreRange();
    if (!linkUrl.trim()) return;

    const url = linkUrl.trim().startsWith("http") ? linkUrl.trim() : `https://${linkUrl.trim()}`;
    const textToInsert = linkText.trim() || url;

    // Insert styled link tag
    const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#DB833A;text-decoration:underline;font-weight:600;">${escapeHtml(textToInsert)}</a>`;
    document.execCommand("insertHTML", false, linkHtml);
    handleEditorInput();
    setLinkModalOpen(false);
  };

  // Image Upload from PC
  const handleImageUploadFromPC = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/blog/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      editorRef.current?.focus();
      restoreRange();

      const imgHtml = `<p style="margin:16px 0;"><img src="${data.url}" alt="Uploaded visual" style="max-width:100%;height:auto;border-radius:10px;display:block;border:1px solid #e5e7eb;" /></p><p><br/></p>`;
      document.execCommand("insertHTML", false, imgHtml);
      handleEditorInput();
    } catch (err: any) {
      alert(err?.message || "Failed to upload image from PC");
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  // Insert Table
  const insertTable = () => {
    editorRef.current?.focus();
    setMoreMenuOpen(false);
    const tableHtml = `
      <table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:14px;border:1px solid #e5e7eb;">
        <thead>
          <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;">
            <th style="padding:10px 14px;text-align:left;font-weight:700;color:#0f172a;border-right:1px solid #e2e8f0;">Column 1</th>
            <th style="padding:10px 14px;text-align:left;font-weight:700;color:#0f172a;border-right:1px solid #e2e8f0;">Column 2</th>
            <th style="padding:10px 14px;text-align:left;font-weight:700;color:#0f172a;">Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:10px 14px;color:#334155;border-right:1px solid #e2e8f0;">Item A</td>
            <td style="padding:10px 14px;color:#334155;border-right:1px solid #e2e8f0;">Details A</td>
            <td style="padding:10px 14px;color:#334155;">Status A</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:10px 14px;color:#334155;border-right:1px solid #e2e8f0;">Item B</td>
            <td style="padding:10px 14px;color:#334155;border-right:1px solid #e2e8f0;">Details B</td>
            <td style="padding:10px 14px;color:#334155;">Status B</td>
          </tr>
        </tbody>
      </table>
      <p><br/></p>
    `;
    document.execCommand("insertHTML", false, tableHtml);
    handleEditorInput();
  };

  // Insert Quote
  const insertQuote = () => {
    editorRef.current?.focus();
    setMoreMenuOpen(false);
    const sel = window.getSelection();
    const selected = sel ? sel.toString().trim() : "";
    const quoteContent = selected || "Insert memorable quotation or strategic takeaway here...";
    const quoteHtml = `<blockquote style="border-left:4px solid #DB833A;background:#f8fafc;padding:14px 18px;margin:18px 0;border-radius:0 8px 8px 0;font-style:italic;color:#334155;">${escapeHtml(quoteContent)}</blockquote><p><br/></p>`;
    document.execCommand("insertHTML", false, quoteHtml);
    handleEditorInput();
  };

  // Video embed
  const applyVideoEmbed = () => {
    if (!videoUrl.trim()) return;
    editorRef.current?.focus();
    restoreRange();

    const title = videoTitle.trim() || "Watch Video Overview";
    const vUrl = videoUrl.trim();
    const videoCardHtml = `
      <div style="margin:20px 0;padding:20px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;text-align:center;">
        <div style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:8px;">🎬 ${escapeHtml(title)}</div>
        <p style="margin:0 0 14px 0;font-size:13px;color:#64748b;">Click below to watch on external player</p>
        <a href="${vUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:9px 20px;border-radius:8px;background:#0f172a;color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.02em;">
          ▶ Open Video Resource
        </a>
      </div>
      <p><br/></p>
    `;
    document.execCommand("insertHTML", false, videoCardHtml);
    handleEditorInput();
    setVideoModalOpen(false);
    setVideoUrl("");
    setVideoTitle("");
  };

  // Customer List CSV / Excel Upload Parser (Item 7)
  const handleCsvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = String(event.target?.result || "");
      // Regex extract all valid email addresses across CSV / TSV / text lines
      const emailMatches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const unique = Array.from(new Set(emailMatches.map((m) => m.trim().toLowerCase())));

      if (unique.length === 0) {
        alert("No valid email addresses found in the selected file.");
        return;
      }

      setParsedEmails(unique);
      setCsvModalOpen(true);
    };
    reader.readAsText(file);
    if (csvInputRef.current) csvInputRef.current.value = "";
  };

  const handleApplyCsvEmails = () => {
    if (parsedEmails.length === 0) return;

    const emailString = parsedEmails.join(", ");

    if (csvTargetField === "bcc") {
      setShowBcc(true);
      setBcc((prev) => (prev.trim() ? `${prev.trim()}, ${emailString}` : emailString));
      setCsvSuccessMessage(`✓ Imported ${parsedEmails.length} email addresses into BCC.`);
    } else {
      setTo((prev) => (prev.trim() ? `${prev.trim()}, ${emailString}` : emailString));
      setCsvSuccessMessage(`✓ Imported ${parsedEmails.length} email addresses into To.`);
    }

    setCsvModalOpen(false);
    setTimeout(() => setCsvSuccessMessage(""), 5000);
  };

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
    setBody(tpl.bodyHtml);
  };

  const handleSubmit = (formData: FormData) => {
    formData.set("senderAddress", senderAddress);
    formData.set("to", to);
    formData.set("cc", cc);
    formData.set("bcc", bcc);
    formData.set("subject", subject);
    formData.set("body", body);

    startTransition(async () => {
      const result = await sendAdminEmail(initialState, formData);
      setState(result);
      if (result.ok) {
        setTo("");
        setCc("");
        setBcc("");
        setSubject("");
        setBody("<p><br/></p>");
        setTemplateId("blank");
        setShowCc(false);
        setShowBcc(false);
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
            Broadcast formatted dispatches, interview invites, and client notices using official @xcglobalhq.com inboxes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => csvInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-surface-white text-xs font-bold text-text-primary hover:bg-surface-container-low transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-accent-gold" />
            <span>Upload Customer List (CSV)</span>
          </button>
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv, .txt, .xlsx, .xls"
            onChange={handleCsvFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {loadError && (
        <div className="p-4 rounded-xl bg-status-error/10 border border-status-error/20 text-status-error text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{loadError}</span>
        </div>
      )}

      {csvSuccessMessage && (
        <div className="p-4 rounded-xl bg-status-success/10 border border-status-success/20 text-status-success text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{csvSuccessMessage}</span>
        </div>
      )}

      {/* Main Grid: Composer on Left, History on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Composer Column */}
        <div className="lg:col-span-7 bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent-gold" />
              <h2 className="text-base font-bold text-text-primary">New Outbound Message</h2>
            </div>

            {/* Template selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-text-muted">Template:</span>
              <select
                value={templateId}
                onChange={(e) => applyTemplate(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-border text-xs bg-surface-container-low text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <form
            ref={formRef}
            action={handleSubmit}
            className="space-y-4"
          >
            {/* Sender Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                From
              </label>
              <select
                name="senderAddress"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {SENDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
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
                  To (Recipients)
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCc((v) => !v)}
                    className="text-[11px] font-semibold text-secondary hover:underline inline-flex items-center gap-1"
                  >
                    {showCc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    <span>{showCc ? "Hide CC" : "Add CC"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBcc((v) => !v)}
                    className="text-[11px] font-semibold text-secondary hover:underline inline-flex items-center gap-1"
                  >
                    {showBcc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    <span>{showBcc ? "Hide BCC" : "Add BCC"}</span>
                  </button>
                </div>
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
              <p className="text-[11px] text-text-muted">
                Comma-separated for multiple recipients. Use &quot;Upload Customer List&quot; above to import CSV contacts.
              </p>
              {fieldErrors.to && <p className="text-[11px] text-status-error">{fieldErrors.to}</p>}
            </div>

            {/* CC */}
            {showCc && (
              <div className="space-y-1.5 animate-in fade-in">
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

            {/* BCC (Item 3) */}
            {showBcc && (
              <div className="space-y-1.5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    BCC (Blind Carbon Copy)
                  </label>
                  <span className="text-[10px] text-accent-gold font-bold">Recommended for customer broadcast lists</span>
                </div>
                <input
                  name="bcc"
                  type="text"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  placeholder="bcc1@customer.com, bcc2@customer.com"
                  className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    fieldErrors.bcc ? "border-status-error" : "border-border"
                  }`}
                />
                <p className="text-[11px] text-text-muted">Recipients cannot see each other&apos;s email addresses.</p>
                {fieldErrors.bcc && <p className="text-[11px] text-status-error">{fieldErrors.bcc}</p>}
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
                placeholder="Email subject line"
                className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  fieldErrors.subject ? "border-status-error" : "border-border"
                }`}
              />
              {fieldErrors.subject && (
                <p className="text-[11px] text-status-error">{fieldErrors.subject}</p>
              )}
            </div>

            {/* Message Body with Rich Toolbar (Item 11, matching attached image) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Message Body
                </label>
                <button
                  type="button"
                  onClick={() => setIsHtmlMode((prev) => !prev)}
                  className="text-[11px] font-semibold text-text-muted hover:text-text-primary flex items-center gap-1"
                >
                  <Code2 className="w-3 h-3" />
                  <span>{isHtmlMode ? "Switch to Rich Editor" : "View HTML Source"}</span>
                </button>
              </div>

              {/* Toolbar & Editor Box Container */}
              <div className="rounded-xl border border-border bg-surface-white shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/20">
                {/* Visual Toolbar (Matches attached image) */}
                {!isHtmlMode && (
                  <div className="flex items-center px-3 py-2 border-b border-border bg-surface-white text-gray-700 gap-1 flex-wrap relative select-none">
                    {/* Undo */}
                    <button
                      type="button"
                      onClick={() => execCmd("undo")}
                      className="p-1.5 rounded hover:bg-surface-container-low text-gray-600 hover:text-black transition-colors"
                      title="Undo"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Redo */}
                    <button
                      type="button"
                      onClick={() => execCmd("redo")}
                      className="p-1.5 rounded hover:bg-surface-container-low text-gray-600 hover:text-black transition-colors"
                      title="Redo"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    {/* Divider 1 */}
                    <div className="w-px h-5 bg-border mx-1" />

                    {/* Format Dropdown (Paragraph, H1, H2, H3) */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setFormatDropdownOpen((v) => !v);
                          setMoreMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-2.5 py-1 rounded text-xs font-medium text-gray-800 hover:bg-surface-container-low border border-transparent hover:border-border transition-colors"
                      >
                        <span>{formatBlockValue}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                      </button>

                      {formatDropdownOpen && (
                        <div className="absolute left-0 top-full mt-1 w-36 bg-surface-white rounded-lg border border-border shadow-lg py-1 z-30">
                          <button
                            type="button"
                            onClick={() => handleFormatBlock("p", "Paragraph")}
                            className="w-full text-left px-3 py-1.5 text-xs text-gray-800 hover:bg-surface-container-low font-normal"
                          >
                            Paragraph
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFormatBlock("h1", "Header 1")}
                            className="w-full text-left px-3 py-1.5 text-sm text-gray-900 hover:bg-surface-container-low font-bold"
                          >
                            Header 1
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFormatBlock("h2", "Header 2")}
                            className="w-full text-left px-3 py-1.5 text-xs text-gray-900 hover:bg-surface-container-low font-bold"
                          >
                            Header 2
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFormatBlock("h3", "Header 3")}
                            className="w-full text-left px-3 py-1.5 text-xs text-gray-900 hover:bg-surface-container-low font-semibold"
                          >
                            Header 3
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Divider 2 */}
                    <div className="w-px h-5 bg-border mx-1" />

                    {/* Bold */}
                    <button
                      type="button"
                      onClick={() => execCmd("bold")}
                      className="px-2 py-1 rounded hover:bg-surface-container-low text-gray-900 font-bold text-sm transition-colors"
                      title="Bold (Ctrl+B)"
                    >
                      B
                    </button>

                    {/* Italic */}
                    <button
                      type="button"
                      onClick={() => execCmd("italic")}
                      className="px-2 py-1 rounded hover:bg-surface-container-low text-gray-900 italic font-serif text-sm transition-colors"
                      title="Italic (Ctrl+I)"
                    >
                      I
                    </button>

                    {/* Divider 3 */}
                    <div className="w-px h-5 bg-border mx-1" />

                    {/* Link */}
                    <button
                      type="button"
                      onClick={openLinkModal}
                      className="p-1.5 rounded hover:bg-surface-container-low text-gray-700 hover:text-black transition-colors"
                      title="Insert or Embed Link on Word"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>

                    {/* Image Upload from PC */}
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="p-1.5 rounded hover:bg-surface-container-low text-gray-700 hover:text-black transition-colors flex items-center gap-1"
                      title="Upload and Insert Picture from Computer"
                    >
                      {isUploadingImage ? (
                        <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                      ) : (
                        <ImagePlus className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUploadFromPC}
                      className="hidden"
                    />

                    {/* Divider 4 */}
                    <div className="w-px h-5 bg-border mx-1" />

                    {/* 3-dots more menu */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen((v) => !v);
                          setFormatDropdownOpen(false);
                        }}
                        className="p-1.5 rounded hover:bg-surface-container-low text-gray-700 hover:text-black transition-colors"
                        title="More formatting options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {moreMenuOpen && (
                        <div className="absolute right-0 top-full mt-1 w-52 bg-surface-white rounded-xl border border-border shadow-xl py-1.5 z-30 divide-y divide-border/60">
                          <div className="py-1">
                            <button
                              type="button"
                              onClick={insertTable}
                              className="w-full text-left px-3.5 py-1.5 text-xs text-text-primary hover:bg-surface-container-low flex items-center gap-2"
                            >
                              <TableIcon className="w-3.5 h-3.5 text-secondary" />
                              <span>Insert Table (3x3)</span>
                            </button>
                            <button
                              type="button"
                              onClick={insertQuote}
                              className="w-full text-left px-3.5 py-1.5 text-xs text-text-primary hover:bg-surface-container-low flex items-center gap-2"
                            >
                              <QuoteIcon className="w-3.5 h-3.5 text-accent-gold" />
                              <span>Quote Block</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                saveRange();
                                setMoreMenuOpen(false);
                                setVideoModalOpen(true);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-xs text-text-primary hover:bg-surface-container-low flex items-center gap-2"
                            >
                              <VideoIcon className="w-3.5 h-3.5 text-primary" />
                              <span>Add Video Link</span>
                            </button>
                          </div>

                          <div className="py-1">
                            <button
                              type="button"
                              onClick={() => {
                                execCmd("insertUnorderedList");
                                setMoreMenuOpen(false);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-xs text-text-primary hover:bg-surface-container-low flex items-center gap-2"
                            >
                              <ListIcon className="w-3.5 h-3.5 text-text-muted" />
                              <span>Bullet Points</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                execCmd("insertOrderedList");
                                setMoreMenuOpen(false);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-xs text-text-primary hover:bg-surface-container-low flex items-center gap-2"
                            >
                              <ListOrderedIcon className="w-3.5 h-3.5 text-text-muted" />
                              <span>Numbered List</span>
                            </button>
                          </div>

                          <div className="py-1">
                            <button
                              type="button"
                              onClick={() => {
                                execCmd("indent");
                                setMoreMenuOpen(false);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-xs text-text-primary hover:bg-surface-container-low flex items-center gap-2"
                            >
                              <IndentIcon className="w-3.5 h-3.5 text-text-muted" />
                              <span>Increase Indent</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                execCmd("outdent");
                                setMoreMenuOpen(false);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-xs text-text-primary hover:bg-surface-container-low flex items-center gap-2"
                            >
                              <OutdentIcon className="w-3.5 h-3.5 text-text-muted" />
                              <span>Decrease Indent</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Editable Surface (contentEditable) */}
                {isHtmlMode ? (
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    className="w-full p-4 font-mono text-xs text-text-primary bg-background focus:outline-none resize-y min-h-[260px]"
                  />
                ) : (
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleEditorInput}
                    className="p-5 min-h-[260px] text-sm text-text-primary focus:outline-none leading-relaxed space-y-4 empty:before:content-['Type_your_message_here...'] empty:before:text-text-muted select-text"
                    style={{
                      lineHeight: "1.75",
                    }}
                  />
                )}
              </div>

              {/* Hidden input to submit HTML value */}
              <input type="hidden" name="body" value={body} />
              {fieldErrors.body && <p className="text-[11px] text-status-error">{fieldErrors.body}</p>}
            </div>

            {/* Status Message */}
            {state.message && (
              <div
                className={`p-3.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                  state.ok
                    ? "bg-status-success/10 border border-status-success/20 text-status-success"
                    : "bg-status-error/10 border border-status-error/20 text-status-error"
                }`}
              >
                {state.ok ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{state.message}</span>
              </div>
            )}

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
        </div>

        {/* History Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-surface-white rounded-2xl border border-border shadow-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-accent-gold" />
                <h3 className="text-sm font-bold text-text-primary">Sent Emails Log</h3>
              </div>
              <span className="text-xs text-text-muted font-semibold">
                {filteredEmails.length} logged
              </span>
            </div>

            {/* Search and Filter */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search recipient, subject, sender..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-border text-xs bg-surface-container-low focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                {["all", "sent", "failed"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize transition-colors ${
                      statusFilter === status
                        ? "bg-primary text-white"
                        : "bg-surface-container text-text-secondary hover:bg-surface-container-high"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            {filteredEmails.length === 0 ? (
              <div className="py-12 text-center text-text-muted space-y-2">
                <Inbox className="w-8 h-8 mx-auto text-text-muted/60" />
                <p className="text-xs font-medium">No sent emails match your filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-[580px] overflow-y-auto pr-1">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => openDrawer(email)}
                    className="py-3 px-2 rounded-lg hover:bg-surface-container-low/70 transition-colors cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                        {email.subject}
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-status-success/10 text-status-success shrink-0">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Sent</span>
                      </span>
                    </div>

                    <p className="text-[11px] text-text-secondary line-clamp-1">
                      To: {email.recipient_email}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-text-muted pt-0.5">
                      <span>From: {email.sender_address.split("@")[0]}</span>
                      <span>
                        {email.created_at
                          ? new Date(email.created_at).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Link Insertion Modal */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface-white rounded-2xl border border-border shadow-xl w-full max-w-sm p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-accent-gold" />
                  Embed Link on Words
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Transform selected text or phrases into a clickable URL.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Display Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Schedule Discovery Call"
                  className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Destination URL</label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://xcglobalhq.com/onboarding"
                  className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLink}
                disabled={!linkUrl.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors disabled:opacity-50"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface-white rounded-2xl border border-border shadow-xl w-full max-w-sm p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <VideoIcon className="w-4 h-4 text-primary" />
                  Add Video Card
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Embed video link with callout box.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Video Title</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g. XC Global Overview Video"
                  className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Video URL</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyVideoEmbed}
                disabled={!videoUrl.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors disabled:opacity-50"
              >
                Insert Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV / Excel Customer List Modal (Item 7) */}
      {csvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface-white rounded-2xl border border-border shadow-xl w-full max-w-md p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-accent-gold" />
                  Import Customer Email List
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Parsed from <strong>{csvFileName}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCsvModalOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-border space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-text-primary">
                <span>Total Valid Contacts Found:</span>
                <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[11px]">
                  {parsedEmails.length} emails
                </span>
              </div>
              <div className="max-h-32 overflow-y-auto text-[11px] font-mono text-text-muted p-2 rounded bg-surface-white border border-border/60">
                {parsedEmails.slice(0, 10).join(", ")}
                {parsedEmails.length > 10 && ` ...and ${parsedEmails.length - 10} more`}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-text-muted">Target Recipient Field</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCsvTargetField("bcc")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    csvTargetField === "bcc"
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "border-border hover:bg-surface-container-low"
                  }`}
                >
                  <p className="text-xs font-bold text-text-primary">Add to BCC</p>
                  <p className="text-[11px] text-accent-gold font-semibold mt-0.5">Recommended (Protects Privacy)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setCsvTargetField("to")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    csvTargetField === "to"
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "border-border hover:bg-surface-container-low"
                  }`}
                >
                  <p className="text-xs font-bold text-text-primary">Add to To</p>
                  <p className="text-[11px] text-text-muted mt-0.5">Visible to all recipients</p>
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCsvModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyCsvEmails}
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
              >
                Apply Contacts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-white rounded-2xl border border-border shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary">Email Preview</h3>
                <p className="text-xs text-text-muted">Branded template rendered for recipients</p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1 rounded-lg text-text-muted hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-surface-container-low/40">
              <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                <iframe
                  title="Email Preview"
                  srcDoc={previewHtml}
                  className="w-full h-[520px] border-0"
                />
              </div>
            </div>

            <div className="px-6 py-3 border-t border-border bg-surface-white flex justify-end">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sent Email Details Drawer */}
      {drawerOpen && selectedEmail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-white w-full max-w-xl h-full shadow-2xl flex flex-col border-l border-border animate-in slide-in-from-right duration-200">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent-gold">
                  Dispatch Details
                </span>
                <h3 className="text-base font-bold text-text-primary mt-0.5 line-clamp-1">
                  {selectedEmail.subject}
                </h3>
              </div>
              <button
                onClick={closeDrawer}
                className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-container-low"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="space-y-3 bg-surface-container-low p-4 rounded-xl text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted font-semibold">From:</span>
                  <span className="font-bold text-text-primary">{selectedEmail.sender_address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted font-semibold">To:</span>
                  <span className="font-bold text-text-primary">{selectedEmail.recipient_email}</span>
                </div>
                {selectedEmail.cc_emails && selectedEmail.cc_emails.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-muted font-semibold">CC:</span>
                    <span className="text-text-primary">{selectedEmail.cc_emails.join(", ")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-text-muted font-semibold">Status:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-status-success/10 text-status-success">
                    {selectedEmail.status || "Sent"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted font-semibold">Sent At:</span>
                  <span className="text-text-primary">
                    {new Date(selectedEmail.created_at).toLocaleString()}
                  </span>
                </div>
                {selectedEmail.resend_message_id && (
                  <div className="flex justify-between items-center pt-1 border-t border-border/60">
                    <span className="text-text-muted font-semibold">Message ID:</span>
                    <span className="font-mono text-[11px] text-text-muted select-all">
                      {selectedEmail.resend_message_id}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Rendered HTML Body
                </h4>
                <div className="rounded-xl border border-border overflow-hidden bg-white">
                  <iframe
                    title="Sent Message"
                    srcDoc={selectedEmail.body_html}
                    className="w-full h-96 border-0"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={closeDrawer}
                className="px-4 py-2 rounded-lg bg-surface-container text-text-primary text-xs font-bold hover:bg-surface-container-high"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
