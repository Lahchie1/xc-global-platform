import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  User,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Application & Engagement Status | GrowthOS",
  description: "Track your onboarding milestones and active contract status.",
};

export default async function GrowthOSStatusPage() {
  let companyName = "Your Business";
  let status = "pending";
  let submissionDate = "Recently";
  let contactName = "";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();

    if (user) {
      // Check business_profiles
      const { data: bProfile } = await admin
        .from("business_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (bProfile) {
        companyName = bProfile.company_name;
      }

      // Check onboarding_applications
      const { data: appData } = await admin
        .from("onboarding_applications")
        .select("*")
        .eq("contact_email", user.email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (appData) {
        companyName = appData.company_name || companyName;
        status = appData.status || "pending";
        contactName = appData.contact_name || "";
        if (appData.created_at) {
          submissionDate = new Date(appData.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        }
      } else if (!bProfile) {
        // Fallback to latest submitted application for previewing
        const { data: latestApp } = await admin
          .from("onboarding_applications")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (latestApp) {
          companyName = latestApp.company_name || companyName;
          status = latestApp.status || "pending";
          contactName = latestApp.contact_name || "";
          if (latestApp.created_at) {
            submissionDate = new Date(latestApp.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
          }
        }
      }
    }
  } catch (err) {
    console.error("Status page fetch error:", err);
  }

  const isAccepted = status === "accepted";
  const isReviewed = status === "reviewed" || isAccepted;

  const steps = [
    {
      title: "Onboarding Application Submitted",
      date: submissionDate,
      status: "completed",
      description: "Initial company profile and commercial objectives submitted via web portal.",
    },
    {
      title: "Growth Diagnostic & Partner Review",
      date: isReviewed ? "Completed" : "In Progress",
      status: isReviewed ? "completed" : "active",
      description: "Channel unit economics, commercial targets, and team structure evaluated by XC Global partners.",
    },
    {
      title: "Commercial Scope & Terms Approved",
      date: isAccepted ? "Executed" : "Upcoming",
      status: isAccepted ? "completed" : "pending",
      description: "Master Services Agreement (MSA) and sprint deliverable scope finalized.",
    },
    {
      title: "Specialist Squad Embedded & Sprint Live",
      date: isAccepted ? "Active" : "Upcoming",
      status: isAccepted ? "active" : "pending",
      description: "Dedicated growth lead deployed into direct client liaison channel.",
    },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Lifecycle & Verification
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Engagement & Application Status
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Transparent milestone progression for {companyName}.
          </p>
        </div>

        <span
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${
            isAccepted
              ? "bg-status-success/10 text-status-success"
              : status === "reviewed"
              ? "bg-badge-gold-bg text-badge-gold-text"
              : "bg-surface-container text-text-secondary"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isAccepted
                ? "bg-status-success animate-pulse"
                : status === "reviewed"
                ? "bg-accent-gold"
                : "bg-text-muted"
            }`}
          />
          {status === "accepted"
            ? "Active In-Sprint Partner"
            : status === "reviewed"
            ? "Dossier Under Review"
            : "Application Pending"}
        </span>
      </div>

      {/* Timeline Card */}
      <div className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-10 space-y-8">
        <h2 className="text-base font-bold text-text-primary">
          Engagement Onboarding Milestones
        </h2>

        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <div
                className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center ${
                  step.status === "completed"
                    ? "bg-status-success text-white ring-4 ring-status-success/20"
                    : step.status === "active"
                    ? "bg-primary text-white ring-4 ring-secondary/30"
                    : "bg-surface-container text-text-muted"
                }`}
              >
                {step.status === "completed" ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Clock
                    className={`w-3.5 h-3.5 ${
                      step.status === "active" ? "text-secondary" : "text-text-muted"
                    }`}
                  />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-text-primary">{step.title}</h3>
                  <span className="text-[11px] font-mono text-text-muted">({step.date})</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Director Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-white rounded-xl border border-border shadow-card p-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Assigned Managing Director
          </span>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base">
              AO
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary">Adebayo Ogunlesi</h4>
              <p className="text-xs text-text-secondary">Managing Partner • Commercial Strategy</p>
              <a href="mailto:a.ogunlesi@xcglobalhq.com" className="text-xs text-accent-gold hover:underline">
                a.ogunlesi@xcglobalhq.com
              </a>
            </div>
          </div>
          <div className="pt-2 border-t border-border/60 text-xs text-text-muted">
            Direct escalation channel for contract adjustments and sprint approvals.
          </div>
        </div>

        <div className="bg-surface-white rounded-xl border border-border shadow-card p-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Governance & Legal Documents
          </span>
          <div className="space-y-2.5">
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-border/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-text-primary">
                <FileText className="w-4 h-4 text-text-muted" />
                <span>
                  {isAccepted
                    ? `${companyName.replace(/\s+/g, "_")}_Executed_MSA.pdf`
                    : "Submitted_Growth_Application_Brief.pdf"}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  isAccepted ? "text-status-success" : "text-badge-gold-text"
                }`}
              >
                {isAccepted ? "Active" : "Under Review"}
              </span>
            </div>
            {isAccepted && (
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-border/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-medium text-text-primary">
                  <FileText className="w-4 h-4 text-text-muted" />
                  <span>Sprint_Deliverables_SLA.pdf</span>
                </div>
                <span className="text-[11px] text-status-success font-semibold">Active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
