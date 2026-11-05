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
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Executive Overview | XC Global",
  description: "Internal command center for managing applications, client ventures, and talent bench.",
};

const defaultSubmissions = [
  {
    id: "sub-1",
    company_name: "ApexPay Technologies",
    industry: "Fintech",
    contact_name: "Tunde Balogun",
    contact_email: "tunde@apexpay.io",
    status: "accepted",
    created_at: "2026-10-12T14:30:00Z",
  },
  {
    id: "sub-2",
    company_name: "OmniCart Lifestyle",
    industry: "E-Commerce",
    contact_name: "Folake Davies",
    contact_email: "folake@omnicart.co",
    status: "reviewed",
    created_at: "2026-10-25T11:15:00Z",
  },
  {
    id: "sub-3",
    company_name: "Synthetix Protocols",
    industry: "Web3 & Crypto",
    contact_name: "Liam Thorne",
    contact_email: "liam@synthetix.org",
    status: "pending",
    created_at: "2026-10-30T09:40:00Z",
  },
  {
    id: "sub-4",
    company_name: "CortexAI Health",
    industry: "AI / HealthTech",
    contact_name: "Dr. Zainab Aliyu",
    contact_email: "zainab@cortexai.health",
    status: "pending",
    created_at: "2026-10-31T08:20:00Z",
  },
];

export default async function AdminDashboardPage() {
  let submissions = defaultSubmissions;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("onboarding_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (data && data.length > 0) {
      submissions = data;
    }
  } catch {
    // fallback
  }

  const pendingCount = submissions.filter((s) => s.status === "pending").length;

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
            Internal administrative cockpit for partner oversight, pipeline review, and content management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/submissions"
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Review Submissions</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-secondary text-primary font-bold text-[10px]">
                {pendingCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Inbound Applications</span>
            <FileCheck2 className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">14</span>
            <span className="text-xs font-bold text-status-warning">{pendingCount} pending review</span>
          </div>
          <p className="text-[11px] text-text-muted">Total business onboarding requests received</p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Active Client Ventures</span>
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">6</span>
            <span className="text-xs font-bold text-status-success">100% Retained</span>
          </div>
          <p className="text-[11px] text-text-muted">Active companies on GrowthOS infrastructure</p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Specialists on Bench</span>
            <Users className="w-4 h-4 text-status-success" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">28</span>
            <span className="text-xs font-bold text-status-success">Vetted Top 3%</span>
          </div>
          <p className="text-[11px] text-text-muted">Accredited growth marketers and leads</p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Published Research</span>
            <BookOpen className="w-4 h-4 text-text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold text-text-primary">4</span>
            <span className="text-xs font-bold text-text-secondary">Articles Live</span>
          </div>
          <p className="text-[11px] text-text-muted">Field research & thought leadership</p>
        </div>
      </div>

      {/* Recent Onboarding Applications Queue */}
      <div className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              Recent Business Onboarding Submissions
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Review company profiles, assign account statuses, and issue GrowthOS access.
            </p>
          </div>
          <Link
            href="/admin/submissions"
            className="text-xs font-bold text-text-primary hover:text-accent-gold flex items-center gap-1"
          >
            <span>View full submission table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px]">
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
                    {sub.industry || "Technology"}
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
                          : "bg-status-warning/10 text-status-warning"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/submissions?id=${sub.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-text-primary hover:text-accent-gold"
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
      </div>
    </div>
  );
}

