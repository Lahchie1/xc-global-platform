"use client";

import { useState, useEffect } from "react";
import { Briefcase, Star, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, MapPin, Loader2 } from "lucide-react";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface Opportunity {
  id: string;
  title: string;
  company_name: string;
  location: string;
  role_type: string;
  budget: string;
  skills_required: string[];
  description: string;
}

export default function TalentOSOpportunitiesPage() {
  const { format } = useCurrency();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState<string[]>([]);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const res = await fetch("/api/talent/opportunities");
        if (res.ok) {
          const data = await res.json();
          setOpportunities(data.opportunities || []);
        }
      } catch (err) {
        console.error("Error fetching opportunities:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOpportunities();
  }, []);

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

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-text-muted">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
          <span className="text-xs font-semibold">Loading verified venture briefs...</span>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="bg-surface-white rounded-2xl border border-border p-12 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-text-muted mx-auto" />
          <h3 className="text-base font-bold text-text-primary">No Open Briefs At This Moment</h3>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            New commercial briefs from high-growth ventures are posted weekly after partner verification. Check back shortly!
          </p>
        </div>
      ) : (
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
                      {opp.company_name}
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
                      <span className="font-semibold text-text-secondary">{opp.role_type}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="text-base sm:text-lg font-bold font-mono text-text-primary block">
                      {opp.budget || "Competitive Compensation"}
                    </span>
                    <span className="text-[11px] text-status-success font-semibold flex sm:justify-end items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Escrow Backed
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {opp.description}
                </p>

                {opp.skills_required && opp.skills_required.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
                      Required Skill Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.skills_required.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded bg-surface-container-low border border-border text-xs text-text-primary font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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
      )}
    </div>
  );
}
