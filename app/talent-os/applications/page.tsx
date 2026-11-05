import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, FileCheck } from "lucide-react";
import { CurrencyAmount } from "@/components/ui/CurrencyAmount";

export const metadata = {
  title: "My Applications | TalentOS",
  description: "Track the status of your applications to curated client briefs.",
};

export default function TalentOSApplicationsPage() {
  const applications = [
    {
      company: "ApexPay Technologies",
      role: "Senior Performance Marketing Lead",
      appliedDate: "October 10, 2026",
      status: "Accepted & Placed",
      statusColor: "bg-status-success/10 text-status-success",
      notes: "Contract active. Embedded in client squad as of Oct 22, 2026.",
      usd: 8500,
    },
    {
      company: "OmniCart Brand",
      role: "Shopify CRO & Retention Specialist",
      appliedDate: "October 26, 2026",
      status: "Shortlisted",
      statusColor: "bg-badge-gold-bg text-badge-gold-text",
      notes: "Client review completed. Managing partner scheduling 30-min chemistry call.",
      usd: 6000,
    },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Venture Submissions
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Application Pipeline
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Monitor real-time status of your profile submissions to venture partners.
          </p>
        </div>

        <Link
          href="/talent-os/opportunities"
          className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
        >
          View More Briefs
        </Link>
      </div>

      <div className="space-y-4">
        {applications.map((app, idx) => (
          <div
            key={idx}
            className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
              <div>
                <span className="text-xs font-bold text-accent-gold">
                  {app.company}
                </span>
                <h3 className="text-lg font-bold text-text-primary mt-0.5">
                  {app.role}
                </h3>
                <span className="text-[11px] text-text-muted">
                  Submitted on {app.appliedDate}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-text-primary bg-surface-container-low px-3 py-1 rounded-full border border-border/60">
                  <CurrencyAmount usd={app.usd} compact suffix=" / mo" />
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${app.statusColor}`}>
                  {app.status}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low border border-border/60 text-xs text-text-secondary flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
              <span>{app.notes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

