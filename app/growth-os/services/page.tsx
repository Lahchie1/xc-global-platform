import Link from "next/link";
import { Briefcase, CheckCircle2, Clock, Plus, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { CurrencyAmount } from "@/components/ui/CurrencyAmount";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Services & Engagements | GrowthOS",
  description: "Manage your active marketing sprint packages and embedded personnel.",
};

export default async function GrowthOSServicesPage() {
  let companyName = "Your Business";
  let industry = "Technology";
  let servicesInterested: string[] = [];
  let status = "pending";

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();

    if (user) {
      // 1. Check business_profiles
      const { data: bProfile } = await admin
        .from("business_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (bProfile) {
        companyName = bProfile.company_name;
        industry = bProfile.industry || industry;
      }

      // 2. Check onboarding_applications
      const { data: appData } = await admin
        .from("onboarding_applications")
        .select("*")
        .eq("contact_email", user.email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (appData) {
        companyName = appData.company_name || companyName;
        industry = appData.industry || industry;
        status = appData.status || status;
        if (Array.isArray(appData.services_interested) && appData.services_interested.length > 0) {
          servicesInterested = appData.services_interested;
        }
      } else if (!bProfile) {
        // Fallback for previewing
        const { data: latestApp } = await admin
          .from("onboarding_applications")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (latestApp) {
          companyName = latestApp.company_name || companyName;
          industry = latestApp.industry || industry;
          status = latestApp.status || status;
          if (Array.isArray(latestApp.services_interested) && latestApp.services_interested.length > 0) {
            servicesInterested = latestApp.services_interested;
          }
        }
      }
    }
  } catch (err) {
    console.error("Services page fetch error:", err);
  }

  // Map service names to organic deliverable scopes
  const serviceScopeMap: Record<string, string[]> = {
    "Growth Strategy": [
      "End-to-end customer acquisition and commercial diagnostic",
      "Unit economics audit (CAC, LTV, payback hurdles)",
      "Channel architecture & budget allocation blueprint",
      "Bi-weekly executive strategy session with Managing Director",
    ],
    "Performance Marketing": [
      "Paid acquisition scaling across Meta, Google Search & Display",
      "Dynamic creative sprint framework (weekly testing matrix)",
      "Server-side attribution setup & conversion tracking audit",
      "Real-time performance dashboard synced to GrowthOS",
    ],
    "Creative & Content Production": [
      "High-converting visual assets tailored for paid social funnels",
      "Direct-response video creatives and hooks",
      "Brand positioning collateral & landing page copy",
      "Continuous creative iteration based on cohort metrics",
    ],
    "SEO & Content Marketing": [
      "Technical SEO audit and crawl budget optimization",
      "Commercial intent keyword research and content pipeline",
      "High-authority backlink building and digital PR strategy",
      "Monthly organic traffic & conversion attribution reporting",
    ],
    "Retention & Lifecycle Marketing": [
      "Automated email & SMS post-purchase re-engagement flows",
      "VIP cohort segmentation and churn mitigation loops",
      "Loyalty and referral incentives modeling",
      "Monthly cohort retention decay audit",
    ],
    "Talent Placements": [
      "Access to pre-vetted marketing operators & specialists",
      "Rigorous technical and portfolio screening by XC Global leads",
      "Structured onboarding and continuous sprint supervision",
      "Flexible fractional or embedded staffing models",
    ],
  };

  const isAccepted = status === "accepted";

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Commercial Practices
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Services & Engagements
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Overview of commercial practices tailored for {companyName}.
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

      {servicesInterested.length === 0 ? (
        <div className="bg-surface-white rounded-2xl border border-border p-10 text-center space-y-4">
          <Building2 className="w-12 h-12 text-text-muted mx-auto" />
          <h3 className="text-base font-bold text-text-primary">
            No Specific Services Selected Yet
          </h3>
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            Your application is being evaluated for customized growth advisory and performance marketing deployment.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
          >
            <span>Explore all XC Global service provisions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {servicesInterested.map((service, idx) => {
            const deliverables = serviceScopeMap[service] || [
              "Custom commercial strategy tailored to business model",
              "Channel audit and execution blueprint",
              "Bi-weekly sprint progress checkpoints",
            ];

            return (
              <div
                key={idx}
                className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
                  <div>
                    <span className="text-xs font-semibold text-text-muted">
                      {industry} Focus Practice
                    </span>
                    <h3 className="text-lg font-bold text-text-primary mt-0.5">
                      {service}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isAccepted
                          ? "bg-status-success/10 text-status-success"
                          : "bg-badge-gold-bg text-badge-gold-text"
                      }`}
                    >
                      {isAccepted ? "Active Practice" : "Scope Under Review"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                    Practice Deliverables & Architecture:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-secondary">
                    {deliverables.map((item, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-start gap-2 bg-surface-container-low/50 p-2.5 rounded-lg border border-border/40"
                      >
                        <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-muted">
                  <span>
                    Managed by <strong className="text-text-primary">XC Global Growth Advisory Team</strong>
                  </span>
                  <Link
                    href="/growth-os/messages"
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-accent-gold transition-colors"
                  >
                    <span>Discuss sprint timeline with lead</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
