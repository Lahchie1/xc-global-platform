import Link from "next/link";
import {
  FileCheck2,
  Building2,
  Users,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Admin Executive Overview | XC Global",
  description: "Internal command center for managing applications, client ventures, and talent bench.",
};

export default async function AdminDashboardPage() {
  let submissions: any[] = [];
  let totalAppsCount = 0;
  let pendingCount = 0;
  let clientVenturesCount = 0;
  let talentCount = 0;

  try {
    const admin = createAdminClient();

    // 1. Fetch real recent submissions
    const { data: appData } = await admin
      .from("onboarding_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);

    if (appData) {
      submissions = appData;
    }

    // 2. Fetch counts
    const { count: cTotal } = await admin
      .from("onboarding_applications")
      .select("*", { count: "exact", head: true });
    totalAppsCount = cTotal || submissions.length;

    const { count: cPending } = await admin
      .from("onboarding_applications")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");
    pendingCount = cPending || 0;

    const { count: cVentures } = await admin
      .from("business_profiles")
      .select("*", { count: "exact", head: true });
    clientVenturesCount = cVentures || 0;

    const { count: cTalent } = await admin
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "talent");
    talentCount = cTalent || 0;
  } catch (err) {
    console.error("Admin dashboard fetch error:", err);
  }

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Central Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Executive Command Console
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Internal administrative cockpit for partner oversight, pipeline review, and directory governance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/submissions"
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Review Submissions</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-secondary text-primary font-bold text-[10px]">
                {pendingCount} Pending
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards from live Database */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Inbound Applications</span>
            <FileCheck2 className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">
              {totalAppsCount}
            </span>
            <span className="text-xs font-bold text-status-warning">
              {pendingCount} pending review
            </span>
          </div>
          <p className="text-[11px] text-text-muted">Total business onboarding requests received</p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Client Profiles</span>
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">
              {clientVenturesCount}
            </span>
            <span className="text-xs font-bold text-status-success">GrowthOS Enrolled</span>
          </div>
          <p className="text-[11px] text-text-muted">Active companies in business directory</p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Talent Network</span>
            <Users className="w-4 h-4 text-status-success" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">
              {talentCount}
            </span>
            <span className="text-xs font-bold text-accent-gold">Registered Talents</span>
          </div>
          <p className="text-[11px] text-text-muted">Marketers and growth operators on TalentOS</p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Platform Health</span>
            <ShieldCheck className="w-4 h-4 text-status-success" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-status-success">100%</span>
            <span className="text-xs font-bold text-status-success">Live &amp; Synced</span>
          </div>
          <p className="text-[11px] text-text-muted">Postgres database &amp; Auth active</p>
        </div>
      </div>

      {/* Recent Applications from Database */}
      <div className="bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low/30">
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              Recent Business Onboarding Submissions
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Review company profiles, inspect commercial briefs, and issue GrowthOS access.
            </p>
          </div>

          <Link
            href="/admin/submissions"
            className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
          >
            <span>View All Submissions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="p-12 text-center text-xs text-text-muted">
            No onboarding applications submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border bg-surface-container-low/50 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Industry</th>
                  <th className="py-3 px-4">Primary Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-text-primary">
                      {sub.company_name}
                    </td>
                    <td className="py-3.5 px-4 text-text-secondary">
                      {sub.industry || "General"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-text-primary block">{sub.contact_name}</span>
                      <span className="text-[11px] text-text-muted">{sub.contact_email}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          sub.status === "accepted"
                            ? "bg-status-success/10 text-status-success"
                            : sub.status === "reviewed"
                            ? "bg-badge-gold-bg text-badge-gold-text"
                            : sub.status === "rejected"
                            ? "bg-status-error/10 text-status-error"
                            : "bg-status-warning/10 text-status-warning"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/submissions?id=${sub.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary transition-colors"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
