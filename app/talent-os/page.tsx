import Link from "next/link";
import { CurrencyAmount } from "@/components/ui/CurrencyAmount";
import {
  Sparkles,
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileText,
  DollarSign,
} from "lucide-react";

export const metadata = {
  title: "Specialist Dashboard | TalentOS",
  description: "Manage your vetted placement, view curated venture briefs, and track escrow payouts.",
};

export default function TalentOSDashboard() {
  const matchingBriefs = [
    {
      id: "brief-1",
      title: "Series A B2B SaaS — EMEA",
      role: "Product-Led Funnel Optimization & Self-Serve Architecture",
      usd: 8500,
      relevance: "98% Match",
      tags: ["HubSpot", "Mixpanel", "Stripe Billing"],
    },
    {
      id: "brief-2",
      title: "OmniCart Consumer Brand — UK / Africa",
      role: "Shopify Plus CRO & High-Tempo Paid Social Creative Testing",
      usd: 6000,
      relevance: "94% Match",
      tags: ["Shopify Plus", "Klaviyo", "Meta Ads"],
    },
    {
      id: "brief-3",
      title: "Synthetix Protocol — Global Web3",
      role: "Developer Community Onboarding & Technical Content Architecture",
      usd: 7500,
      relevance: "91% Match",
      tags: ["Web3", "Developer Marketing", "Substack"],
    },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Specialist Console
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Welcome back, David K.
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Status: Embedded Lead • Active Contract: ApexPay Technologies Limited
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/talent-os/profile"
            className="px-4 py-2 rounded-lg bg-surface-white border border-border text-xs font-semibold text-text-primary hover:bg-surface-container-low transition-colors shadow-sm"
          >
            Update Profile & CV
          </Link>
          <Link
            href="/talent-os/opportunities"
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
          >
            Browse All Briefs
          </Link>
        </div>
      </div>

      {/* Profile Completeness Alert */}
      <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent-gold" />
            <h3 className="text-xs font-bold text-text-primary">
              Vetted Specialist Profile: 90% Complete
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Upload an updated PDF CV to reach 100% verification and receive top-tier venture invitations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-accent-gold rounded-full w-[90%]" />
          </div>
          <Link
            href="/talent-os/profile"
            className="text-xs font-bold text-text-primary hover:underline"
          >
            Complete
          </Link>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Guaranteed Escrow Payouts
          </span>
          <div className="text-2xl lg:text-3xl font-bold text-text-primary">
            <CurrencyAmount usd={8500} /> <span className="text-xs font-normal text-text-muted">/ month</span>
          </div>
          <p className="text-[11px] text-status-success font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Secured by XC Global Escrow
          </p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Current Embedded Sprint
          </span>
          <div className="text-2xl lg:text-3xl font-bold text-text-primary">
            Sprint #14
          </div>
          <p className="text-[11px] text-text-secondary">
            ApexPay CAPI & Paid Social Acquisition Ramp
          </p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Accreditation Score
          </span>
          <div className="text-2xl lg:text-3xl font-bold text-text-primary">
            Top 3%
          </div>
          <p className="text-[11px] text-text-secondary">
            Verified by 5 completed scale-up engagements
          </p>
        </div>
      </div>

      {/* Curated Matching Opportunities Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              Matching Curated Opportunities
            </h2>
            <p className="text-xs text-text-muted">
              Pre-scoped technology briefs matching your Growth Lead & Attribution profile.
            </p>
          </div>
          <Link
            href="/talent-os/opportunities"
            className="text-xs font-bold text-text-primary hover:text-accent-gold flex items-center gap-1"
          >
            <span>View all 8 briefs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matchingBriefs.map((brief) => (
            <div
              key={brief.id}
              className="bg-surface-white rounded-xl border border-border shadow-card p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary">
                    {brief.title}
                  </span>
                  <span className="text-xs font-mono font-bold text-badge-gold-text bg-badge-gold-bg px-2 py-0.5 rounded">
                    <CurrencyAmount usd={brief.usd} compact suffix=" / mo" />
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">
                  {brief.role}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {brief.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-surface-container-low border border-border text-[11px] text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-[11px] font-bold text-status-success flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {brief.relevance}
                </span>

                <Link
                  href="/talent-os/opportunities"
                  className="px-3 py-1.5 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary-container transition-colors"
                >
                  Review Brief
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

