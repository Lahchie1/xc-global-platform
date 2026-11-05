import Link from "next/link";
import { Briefcase, CheckCircle2, Clock, Plus, ArrowRight } from "lucide-react";
import { CurrencyAmount } from "@/components/ui/CurrencyAmount";

export const metadata = {
  title: "Services & Engagements | GrowthOS",
  description: "Manage your active marketing sprint packages and embedded personnel.",
};

export default function GrowthOSServicesPage() {
  const activeSprints = [
    {
      name: "Q4 Core Customer Acquisition & CAPI Attribution Ramp",
      cadence: "Oct 15 - Dec 31, 2026",
      status: "Active",
      usdBudget: 12500,
      suffix: " / month retainer",
      scope: [
        "Meta Ads dynamic scaling across Nigerian and UK remit corridors",
        "Weekly 20-angle creative testing sprint framework",
        "Server-side attribution implementation on AWS / Cloudflare",
        "Weekly performance scorecard reviewed directly with Founders",
      ],
      lead: "David K. (Fractional Lead)",
    },
    {
      name: "Retention Loops & Shopify VIP Cohort Marketing",
      cadence: "Oct 20 - Nov 30, 2026",
      status: "Active",
      usdBudget: 6500,
      suffix: " / month sprint",
      scope: [
        "Klaviyo post-purchase automated re-engagement triggers",
        "A/B testing VIP tier discounts vs cash back rewards",
        "Monthly churn audit and cohort decay diagnostics",
      ],
      lead: "Amara O. (Retention Specialist)",
    },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Contracted Engagements
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Active Services & Sprints
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Overview of commercial practices deployed into ApexPay Technologies.
          </p>
        </div>

        <Link
          href="/growth-os/messages"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-secondary" />
          <span>Request Scope Addendum</span>
        </Link>
      </div>

      <div className="space-y-6">
        {activeSprints.map((sprint, idx) => (
          <div
            key={idx}
            className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
              <div>
                <span className="text-xs font-semibold text-text-muted">
                  {sprint.cadence}
                </span>
                <h3 className="text-lg font-bold text-text-primary mt-0.5">
                  {sprint.name}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-text-primary bg-surface-container-low px-3 py-1 rounded-full border border-border/60">
                  <CurrencyAmount usd={sprint.usdBudget} suffix={sprint.suffix} />
                </span>
                <span className="px-2.5 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-bold">
                  {sprint.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Contracted Sprint Deliverables:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-secondary">
                {sprint.scope.map((item, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 bg-surface-container-low/50 p-2.5 rounded-lg border border-border/40">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border/40">
              <span>Sprint Operator Lead: <strong className="text-text-primary">{sprint.lead}</strong></span>
              <span className="text-status-success font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Next KPI review: Friday 4PM
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

