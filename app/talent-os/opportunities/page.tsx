"use client";

import { useState } from "react";
import { Briefcase, Star, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, MapPin } from "lucide-react";
import { useCurrency } from "@/lib/context/CurrencyContext";

export default function TalentOSOpportunitiesPage() {
  const { format } = useCurrency();
  const [applied, setApplied] = useState<string[]>([]);

  const opportunities = [
    {
      id: "opp-1",
      title: "Senior Performance Marketing Lead",
      company: "ApexPay (Series A Fintech)",
      location: "Remote (West Africa / Europe)",
      type: "Embedded Full-Time",
      minUsd: 6000,
      maxUsd: 8500,
      skills: ["Meta Ads", "Google Search", "CAPI", "Attribution Modeling", "Fintech"],
      description:
        "Lead cross-border customer acquisition across Nigeria and the UK for a leading diaspora remittance and business banking app. Oversee dynamic performance media with strict payback governance.",
    },
    {
      id: "opp-2",
      title: "Shopify CRO & Retention Specialist",
      company: "OmniCart (DTC Scale-Up)",
      location: "Remote (Global)",
      type: "Fractional Sprint (3 Months)",
      minUsd: 4500,
      maxUsd: 6000,
      skills: ["Shopify Plus", "Klaviyo", "CRO", "A/B Testing", "Cohort LTV"],
      description:
        "Redesign product page conversion architecture, set up post-purchase automated re-engagement triggers, and reduce 90-day churn for a high-velocity wellness brand.",
    },
    {
      id: "opp-3",
      title: "Product-Led Growth (PLG) Strategist",
      company: "CortexAI (B2B SaaS)",
      location: "Remote (Global)",
      type: "Contract (6 Months)",
      minUsd: 7000,
      maxUsd: 9000,
      skills: ["PLG", "HubSpot", "Stripe Billing", "Mixpanel", "Onboarding Loops"],
      description:
        "Design and execute automated self-serve trial-to-paid conversion funnels for a developer observability platform. Optimize time-to-first-value (TTFV).",
    },
    {
      id: "opp-4",
      title: "Fractional Chief Marketing Officer (fCMO)",
      company: "VanguardOS (Enterprise Logistics)",
      location: "Hybrid (London / Lagos)",
      type: "Executive Fractional (15 hrs/wk)",
      minUsd: 5000,
      maxUsd: 7000,
      skills: ["Executive Strategy", "ABM", "Enterprise Sales", "GTM"],
      description:
        "Guide commercial repositioning, enterprise sales collateral, and hire the permanent growth squad ahead of Series A fundraise.",
    },
  ];

  const handleApply = (id: string) => {
    if (!applied.includes(id)) {
      setApplied([...applied, id]);
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Vetted Opportunities
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Curated Venture Briefs
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Every brief is pre-scoped, verified for funding, and guaranteed with 100% escrow payout protection.
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-surface-container-low border border-border text-xs font-semibold text-text-secondary flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-status-success" />
          <span>No Unpaid Bidding • Zero Race to the Bottom</span>
        </div>
      </div>

      <div className="space-y-6">
        {opportunities.map((opp) => {
          const isApplied = applied.includes(opp.id);
          return (
            <div
              key={opp.id}
              className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/60 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-accent-gold">
                    {opp.company}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                    {opp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {opp.location}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-text-secondary">{opp.type}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <span className="text-base sm:text-lg font-bold font-mono text-text-primary block">
                    {format(opp.minUsd, { compact: true })} - {format(opp.maxUsd, { compact: true })} / month
                  </span>
                  <span className="text-[11px] text-status-success font-semibold flex sm:justify-end items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Escrow Backed
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {opp.description}
              </p>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
                  Required Skill Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {opp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded bg-surface-container-low border border-border text-xs text-text-primary font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-text-muted">
                  Client review response SLA: 48 hours
                </span>

                <button
                  onClick={() => handleApply(opp.id)}
                  disabled={isApplied}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    isApplied
                      ? "bg-status-success/10 text-status-success cursor-default"
                      : "bg-primary text-white hover:bg-primary-container shadow-sm"
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Application Submitted</span>
                    </>
                  ) : (
                    <>
                      <span>Apply with TalentOS Profile</span>
                      <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

