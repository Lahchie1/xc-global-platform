import Link from "next/link";
import { CurrencyAmount } from "@/components/ui/CurrencyAmount";
import {
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "GrowthOS Client Dashboard",
  description: "Monitor active acquisition sprints, unit economics, and embedded operators.",
};

export default function GrowthOSDashboard() {
  const sprintDeliverables = [
    {
      title: "Meta Ads Dynamic Product Ad (DPA) Catalog Optimization",
      status: "completed",
      operator: "David K.",
      date: "Oct 28",
    },
    {
      title: "CAPI Server-Side Data Warehouse Tracking Implementation",
      status: "completed",
      operator: "David K.",
      date: "Oct 29",
    },
    {
      title: "Klaviyo VIP Post-Purchase Cohort Retention Sequence",
      status: "in_progress",
      operator: "Amara O.",
      date: "Due Nov 2",
    },
    {
      title: "Q4 High-Tempo Creative Testing Sprint (15 New Angle Hooks)",
      status: "in_progress",
      operator: "David K.",
      date: "Due Nov 4",
    },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Active Client Engagement
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            ApexPay Commercial Growth Hub
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Engagement Model: Embedded Squad + Fractional CMO Oversight • Q4 Sprint #14
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/growth-os/status"
            className="px-4 py-2 rounded-lg bg-surface-white border border-border text-xs font-semibold text-text-primary hover:bg-surface-container-low transition-colors shadow-sm"
          >
            Engagement Status
          </Link>
          <Link
            href="/growth-os/messages"
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
          >
            Direct Partner Slack / Ping
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Blended Paid CAC</span>
            <Target className="w-4 h-4 text-status-success" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">
              <CurrencyAmount usd={29.80} />
            </span>
            <span className="text-xs font-bold text-status-success">
              -<CurrencyAmount usd={4.40} /> vs target
            </span>
          </div>
          <p className="text-[11px] text-text-muted">
            Target set at <CurrencyAmount usd={34.20} /> per verified funded account
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Active Sprint Velocity</span>
            <Clock className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">92%</span>
            <span className="text-xs font-bold text-text-secondary">Sprint #14</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-status-success rounded-full w-[92%]" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Media Spend Governed</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">
              <CurrencyAmount usd={48500} />
            </span>
            <span className="text-xs text-text-muted font-mono">/ mo</span>
          </div>
          <p className="text-[11px] text-text-muted">Across Meta, Google Search & Apple Search Ads</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Deployed Specialists</span>
            <Users className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">2 Leads</span>
            <span className="text-xs font-bold text-status-success">Fully Embedded</span>
          </div>
          <p className="text-[11px] text-text-muted">Growth Lead + Shopify & Retention Operator</p>
        </div>
      </div>

      {/* Grid: Sprint Deliverables + Deployed Pod */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Deliverables List */}
        <div className="lg:col-span-8 bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-text-primary">
                Current Sprint Deliverables & Milestones
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Sprint 14: Cohort Retention & CAPI Data Pipeline Synchronization
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-badge-gold-bg text-badge-gold-text text-xs font-bold">
              Active Sprint
            </span>
          </div>

          <div className="space-y-3">
            {sprintDeliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border bg-surface-container-low/60 flex items-center justify-between gap-4 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {item.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-status-success shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-text-primary">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      Operator: <span className="font-semibold text-text-secondary">{item.operator}</span> • {item.date}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.status === "completed"
                      ? "bg-status-success/10 text-status-success"
                      : "bg-badge-gold-bg text-badge-gold-text"
                  }`}
                >
                  {item.status === "completed" ? "Verified" : "In Progress"}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-text-muted border-t border-border">
            <span>Next Sprint Planning: November 4, 2026 (10:00 AM WAT)</span>
            <Link
              href="/growth-os/services"
              className="font-bold text-text-primary hover:text-accent-gold transition-colors flex items-center gap-1"
            >
              <span>View all sprints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Deployed Specialists Pod */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-white rounded-2xl border border-border shadow-card p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-status-success" />
              Your Dedicated Pod
            </h3>

            {/* Operator 1 */}
            <div className="p-3.5 rounded-xl border border-border bg-surface-container-low flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                DK
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-text-primary">David K.</h4>
                <p className="text-[11px] text-text-muted">Senior Fractional Growth Lead</p>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-status-success font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                  Active in Client Slack
                </div>
              </div>
            </div>

            {/* Operator 2 */}
            <div className="p-3.5 rounded-xl border border-border bg-surface-container-low flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0">
                AO
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-text-primary">Amara O.</h4>
                <p className="text-[11px] text-text-muted">Shopify & Retention Specialist</p>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-status-success font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                  Active in Client Slack
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/growth-os/services"
                className="w-full py-2.5 rounded-lg border border-border bg-surface-white text-xs font-bold text-text-primary flex items-center justify-center gap-1.5 hover:bg-surface-container-low transition-colors"
              >
                <span>Request Squad Expansion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-surface-container-low rounded-2xl border border-border p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary">
              <Sparkles className="w-4 h-4 text-accent-gold" />
              <span>Unit Economics Guarantee</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              All data streamed into GrowthOS is validated quarterly against client ledger and raw ad account APIs. Zero estimated estimations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

