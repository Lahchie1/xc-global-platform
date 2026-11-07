import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, FileCheck, Briefcase } from "lucide-react";

export const metadata = {
  title: "My Applications | TalentOS",
  description: "Track the status of your applications to curated client briefs.",
};

export default function TalentOSApplicationsPage() {
  // Real organic state: new talent users start with no active brief submissions
  const applications: any[] = [];

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
          Browse Open Briefs
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="bg-surface-white rounded-2xl border border-border shadow-card p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mx-auto text-text-muted">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">
              No Active Brief Applications Yet
            </h3>
            <p className="text-xs text-text-secondary max-w-md mx-auto mt-1">
              You haven&apos;t submitted your profile to any venture briefs yet. Complete your profile and apply directly to pre-scoped client opportunities.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/talent-os/profile"
              className="px-4 py-2 rounded-lg border border-border text-xs font-bold text-text-primary hover:bg-surface-container-low transition-colors"
            >
              Complete Profile
            </Link>
            <Link
              href="/talent-os/opportunities"
              className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5 text-secondary" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app, idx) => (
            <div
              key={idx}
              className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-4"
            >
              {/* Dynamic render */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
