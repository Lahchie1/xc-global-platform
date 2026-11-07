import Link from "next/link";
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
  Building2,
  FileCheck2,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "GrowthOS Client Dashboard | XC Global",
  description: "Monitor active acquisition sprints, unit economics, and embedded operators.",
};

export default async function GrowthOSDashboard() {
  let companyName = "Your Business";
  let industry = "Technology";
  let companySize = "11-50 employees";
  let location = "Lagos, Nigeria";
  let applicationStatus = "pending";
  let servicesInterested: string[] = ["Growth & Performance Marketing"];
  let contactName = "";
  let contactEmail = "";
  let hasApplication = false;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();

    if (user) {
      contactEmail = user.email || "";

      // 1. Check business_profiles
      const { data: bProfile } = await admin
        .from("business_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (bProfile) {
        companyName = bProfile.company_name;
        industry = bProfile.industry || industry;
        companySize = bProfile.company_size || companySize;
        location = bProfile.location || location;
      }

      // 2. Check onboarding_applications by user email
      const { data: appData } = await admin
        .from("onboarding_applications")
        .select("*")
        .eq("contact_email", user.email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (appData) {
        hasApplication = true;
        companyName = appData.company_name || companyName;
        industry = appData.industry || industry;
        companySize = appData.company_size || companySize;
        location = appData.location || location;
        applicationStatus = appData.status;
        contactName = appData.contact_name;
        if (Array.isArray(appData.services_interested) && appData.services_interested.length > 0) {
          servicesInterested = appData.services_interested;
        }
      } else if (!bProfile) {
        // Fallback to latest submitted application if user is testing in admin mode
        const { data: latestApp } = await admin
          .from("onboarding_applications")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (latestApp) {
          hasApplication = true;
          companyName = latestApp.company_name;
          industry = latestApp.industry || industry;
          companySize = latestApp.company_size || companySize;
          location = latestApp.location || location;
          applicationStatus = latestApp.status;
          contactName = latestApp.contact_name;
          contactEmail = latestApp.contact_email;
          if (Array.isArray(latestApp.services_interested) && latestApp.services_interested.length > 0) {
            servicesInterested = latestApp.services_interested;
          }
        }
      }
    }
  } catch (err) {
    console.error("GrowthOS dashboard load error:", err);
  }

  const statusLabel =
    applicationStatus === "accepted"
      ? "Active Engagement"
      : applicationStatus === "reviewed"
      ? "Under Review by Partners"
      : "Application Pending Review";

  const statusBadgeColor =
    applicationStatus === "accepted"
      ? "bg-status-success/10 text-status-success"
      : applicationStatus === "reviewed"
      ? "bg-badge-gold-bg text-badge-gold-text"
      : "bg-status-warning/10 text-status-warning";

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              GrowthOS Client Console
            </span>
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                applicationStatus === "accepted" ? "bg-status-success" : "bg-status-warning"
              }`}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            {companyName} Commercial Growth Hub
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Industry: {industry} &bull; Operating Footprint: {location} &bull; Sizing: {companySize}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/growth-os/profile"
            className="px-4 py-2 rounded-lg bg-surface-white border border-border text-xs font-semibold text-text-primary hover:bg-surface-container-low transition-colors shadow-sm"
          >
            Manage Profile
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
          >
            Direct Partner WhatsApp
          </Link>
        </div>
      </div>

      {/* 4 Organic Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Account Standing</span>
            <ShieldCheck className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-text-primary capitalize">
              {applicationStatus}
            </span>
          </div>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusBadgeColor}`}>
            {statusLabel}
          </span>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Industry Sector</span>
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="text-xl font-bold text-text-primary">
            {industry}
          </div>
          <p className="text-[11px] text-text-muted">Tailored growth benchmarks active</p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Company Scale</span>
            <Users className="w-4 h-4 text-status-success" />
          </div>
          <div className="text-xl font-bold text-text-primary">
            {companySize}
          </div>
          <p className="text-[11px] text-text-muted">Operating footprint: {location}</p>
        </div>

        <div className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span className="font-semibold uppercase tracking-wider">Requested Practices</span>
            <Target className="w-4 h-4 text-accent-gold" />
          </div>
          <div className="text-xl font-bold text-text-primary">
            {servicesInterested.length} Practices
          </div>
          <p className="text-[11px] text-text-muted">Scoped for your business model</p>
        </div>
      </div>

      {/* Main Split: Engagement Overview & Services Scoped */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Engagement Roadmap & Onboarding Status */}
        <div className="lg:col-span-8 bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                Engagement Trajectory
              </span>
              <h2 className="text-lg font-bold text-text-primary mt-0.5">
                Onboarding &amp; Execution Roadmap
              </h2>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusBadgeColor}`}>
              {applicationStatus}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-border/70 space-y-2">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span>Step 1: Onboarding Submission Received</span>
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed pl-6">
                Your company profile for <strong>{companyName}</strong> has been saved directly to our verified partner registry.
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${
              applicationStatus === "reviewed" || applicationStatus === "accepted"
                ? "bg-surface-container-low border-border/70"
                : "bg-surface-white border-border/60"
            }`}>
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-gold" />
                <span>Step 2: Partner Diagnostic &amp; Commercial Review</span>
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed pl-6">
                Our growth directors analyze your unit economics, acquisition funnels, and team requirements against our benchmark datasets. Guaranteed SLA response time under 3 hours.
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${
              applicationStatus === "accepted"
                ? "bg-surface-container-low border-border/70"
                : "bg-surface-white border-border/60"
            }`}>
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span>Step 3: Dedicated Squad Activation &amp; Sprint 01</span>
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed pl-6">
                Vetted growth leads are deployed, ad attribution tracking is configured, and weekly sprints begin with guaranteed executive transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Selected Practices & Direct Contact */}
        <div className="lg:col-span-4 bg-surface-white rounded-2xl border border-border shadow-card p-6 space-y-5">
          <div className="pb-3 border-b border-border">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Active Scope
            </span>
            <h3 className="text-base font-bold text-text-primary mt-0.5">
              Services of Interest
            </h3>
          </div>

          <div className="space-y-2">
            {servicesInterested.map((srv, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-surface-container-low border border-border/60 text-xs font-semibold text-text-primary flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                <span>{srv}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border space-y-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-text-muted block">
              Direct Assistance:
            </span>
            <p className="text-text-secondary leading-relaxed">
              Have questions regarding your onboarding review? Contact our client advisory desk directly:
            </p>
            <div className="p-3 rounded-xl bg-surface-container-low border border-border/60 space-y-1">
              <p className="font-bold text-text-primary">WhatsApp Liaison</p>
              <a
                href="https://wa.me/2348086457842"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary font-bold hover:underline block"
              >
                +2348086457842
              </a>
              <p className="text-[11px] text-text-muted">Response within 3 hours guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
