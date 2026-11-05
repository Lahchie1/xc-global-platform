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

export const metadata = {
  title: "Application & Engagement Status | GrowthOS",
  description: "Track your onboarding milestones and active contract status.",
};

export default function GrowthOSStatusPage() {
  const steps = [
    {
      title: "Onboarding Application Submitted",
      date: "October 12, 2026",
      status: "completed",
      description: "Initial company profile and commercial objectives submitted via web portal.",
    },
    {
      title: "Growth Diagnostic & Partner Review",
      date: "October 14, 2026",
      status: "completed",
      description: "Ad attribution audit and current channel unit economics inspected by XC Global partners.",
    },
    {
      title: "Commercial Scope & Terms Approved",
      date: "October 19, 2026",
      status: "completed",
      description: "Master Services Agreement (MSA) and 90-day sprint deliverable agreement executed.",
    },
    {
      title: "Specialist Squad Embedded & Sprint Live",
      date: "October 22, 2026",
      status: "active",
      description: "Growth lead and retention operator deployed into Slack with live ad accounts access.",
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
            Transparent milestone progression for ApexPay Technologies Limited.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-status-success/10 text-status-success text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
          Active In-Sprint Partner
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
                  <Clock className="w-3.5 h-3.5 text-secondary" />
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
                <span>Executed_MSA_ApexPay_2026.pdf</span>
              </div>
              <span className="text-[11px] text-status-success font-semibold">Active</span>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-border/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium text-text-primary">
                <FileText className="w-4 h-4 text-text-muted" />
                <span>Sprint_14_SLA_Deliverables.pdf</span>
              </div>
              <span className="text-[11px] text-status-success font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

