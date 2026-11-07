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
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Specialist Dashboard | TalentOS",
  description: "Manage your vetted placement, view curated venture briefs, and track opportunities.",
};

export default async function TalentOSDashboard() {
  let userName = "Marketing Specialist";
  let userEmail = "";
  let headline = "Talent Profile Setup Pending";
  let availability = "Not specified";
  let location = "Remote Worldwide";
  let completeness = 20;
  let hasCv = false;
  let opportunities: any[] = [];

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();

    if (user) {
      userEmail = user.email || "";

      // Fetch user profile from database
      const { data: uData } = await admin
        .from("users")
        .select("full_name, email")
        .eq("id", user.id)
        .maybeSingle();

      if (uData?.full_name) {
        userName = uData.full_name;
      }

      // Fetch talent profile from database
      const { data: tData } = await admin
        .from("talent_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (tData) {
        headline = tData.headline || "Vetted Growth Specialist";
        availability = tData.availability || "Immediate";
        location = tData.location || "Remote Worldwide";
        hasCv = Boolean(tData.cv_url);

        // Calculate completeness
        let score = 20; // registered
        if (uData?.full_name) score += 20;
        if (tData.headline) score += 20;
        if (tData.cv_url) score += 20;
        if (tData.skills && tData.skills.length > 0) score += 20;
        completeness = Math.min(score, 100);
      }
    }

    // Fetch live opportunities from database
    const { data: opps } = await admin
      .from("opportunities")
      .select("*")
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(3);

    if (opps && opps.length > 0) {
      opportunities = opps;
    }
  } catch (err) {
    console.error("TalentOS dashboard load error:", err);
  }

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              TalentOS Specialist Console
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-success" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Welcome back, {userName}
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Status: Active Specialist &bull; Availability: {availability} &bull; {location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/talent-os/profile"
            className="px-4 py-2 rounded-lg bg-surface-white border border-border text-xs font-semibold text-text-primary hover:bg-surface-container-low transition-colors shadow-sm"
          >
            Update Profile &amp; CV
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
              Vetted Specialist Profile: {completeness}% Complete
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            {completeness === 100
              ? "Your profile is fully verified and actively eligible for matched client placements."
              : !hasCv
              ? "Upload your CV and finalize your primary skills to reach 100% verification and receive venture briefs."
              : "Complete your profile details to unlock premium venture invitations."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-gold rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <Link
            href="/talent-os/profile"
            className="text-xs font-bold text-text-primary hover:underline"
          >
            {completeness === 100 ? "Edit Profile" : "Complete Profile"}
          </Link>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Accreditation Status
          </span>
          <div className="text-2xl lg:text-3xl font-bold text-text-primary">
            Active
          </div>
          <p className="text-[11px] text-status-success font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified in TalentOS Network
          </p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Primary Work Focus
          </span>
          <div className="text-xl lg:text-2xl font-bold text-text-primary truncate">
            {headline}
          </div>
          <p className="text-[11px] text-text-secondary">
            Tailored to matched scale-up requirements
          </p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block">
            Opportunity Dispatch
          </span>
          <div className="text-2xl lg:text-3xl font-bold text-text-primary">
            Weekly
          </div>
          <p className="text-[11px] text-text-secondary">
            Curated briefs delivered to {userEmail || "your inbox"}
          </p>
        </div>
      </div>

      {/* Curated Opportunities Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              Curated Venture Briefs
            </h2>
            <p className="text-xs text-text-muted">
              Pre-scoped growth and marketing opportunities matching your technical skills.
            </p>
          </div>
          <Link
            href="/talent-os/opportunities"
            className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {opportunities.length === 0 ? (
          <div className="bg-surface-white rounded-2xl border border-border p-10 text-center space-y-3">
            <Briefcase className="w-9 h-9 text-text-muted mx-auto" />
            <h3 className="text-sm font-bold text-text-primary">No new briefs posted this week</h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto">
              Our partners are currently vetting incoming client requirements. New verified briefs will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunities.map((brief) => (
              <div
                key={brief.id}
                className="bg-surface-white rounded-xl border border-border shadow-card p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-text-primary">
                      {brief.company_name}
                    </span>
                    {brief.budget && (
                      <span className="text-xs font-mono font-bold text-badge-gold-text bg-badge-gold-bg px-2 py-0.5 rounded">
                        {brief.budget}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-text-primary leading-snug">
                    {brief.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {brief.description || "Growth marketing and scale-up execution mandate."}
                  </p>
                  {brief.skills_required && Array.isArray(brief.skills_required) && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {brief.skills_required.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-surface-container text-[10px] text-text-secondary font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {brief.location || "Remote"}
                  </span>
                  <Link
                    href={`/talent-os/opportunities`}
                    className="text-xs font-bold text-primary group-hover:text-secondary flex items-center gap-1 transition-colors"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
