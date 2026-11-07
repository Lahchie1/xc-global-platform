import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  TrendingUp,
  Target,
  BarChart3,
  Search,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing & Growth Services | XC Global Limited",
  description:
    "End-to-end marketing systems, go-to-market strategies, paid media acquisition, technical SEO, and conversion rate optimisation to scale your business sustainably.",
};

export default function MarketingGrowthPage() {
  const capabilities = [
    {
      title: "Go-to-Market (GTM) Strategy",
      description:
        "Structured launch strategies, competitive analysis, customer segmentation, and market entry roadmaps that clarify positioning and accelerate product adoption.",
      deliverables: [
        "Ideal Customer Profile (ICP) definition",
        "Market sizing & competitor gap analysis",
        "Channel prioritization & launch milestones",
        "Value proposition & core messaging matrix",
      ],
      icon: Target,
    },
    {
      title: "Paid Media & Performance Acquisition",
      description:
        "High-performance customer acquisition across Google, Meta, TikTok, LinkedIn, and programmatic channels designed to maximize ROAS and lower blended CAC.",
      deliverables: [
        "Full-funnel campaign architecture & creative testing",
        "First-party data tracking & Meta CAPI integration",
        "Real-time spend pacing & bid optimization",
        "Continuous audience retargeting & lookalike models",
      ],
      icon: BarChart3,
    },
    {
      title: "Conversion Rate Optimisation (CRO)",
      description:
        "Data-driven experimentation, behavioral UX audits, and high-converting landing page engineering to turn existing traffic into paying customers.",
      deliverables: [
        "A/B & multivariate landing page testing",
        "Checkout friction & cart abandonment analysis",
        "Heatmap, session recording & click-depth audits",
        "Conversion copywriting & social proof architecture",
      ],
      icon: Zap,
    },
    {
      title: "E-Commerce & Shopify Store Growth",
      description:
        "Turn e-commerce stores into scale-ready revenue engines with tailored store setups, average order value (AOV) levers, and retention flows.",
      deliverables: [
        "Shopify custom architecture & speed optimization",
        "One-click upsell & bundle merchandising",
        "Subscription model integration (Recharge, etc.)",
        "Email & SMS lifecycle automation (Klaviyo)",
      ],
      icon: ShoppingCart,
    },
    {
      title: "Search Engine Optimization (SEO) & Content",
      description:
        "Sustainable inbound organic growth through technical SEO audits, high-intent keyword clustering, and authoritative content engines.",
      deliverables: [
        "Technical site health & Core Web Vitals remediation",
        "Keyword gap & search intent mapping",
        "High-converting blog & resource hubs",
        "Structured schema & internal link graph architecture",
      ],
      icon: Search,
    },
    {
      title: "Marketing Analytics & Attribution Modeling",
      description:
        "Gain absolute clarity on where revenue originates with verified multi-touch attribution, custom dashboards, and server-side tracking.",
      deliverables: [
        "GA4 custom event tracking & BigQuery pipelines",
        "Blended CAC & LTV cohort reporting",
        "Post-purchase attribution surveys",
        "Executive BI dashboards for leadership & investors",
      ],
      icon: TrendingUp,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Audit & Growth Diagnostic",
      description:
        "We analyze your historical data, unit economics, conversion funnels, and current marketing channels to pinpoint the highest-leverage growth opportunities.",
    },
    {
      step: "02",
      title: "Strategy & Systems Blueprint",
      description:
        "We build an actionable 90-day growth roadmap with clear channel allocation, messaging angles, resource requirements, and measurable sprint milestones.",
    },
    {
      step: "03",
      title: "Execution & Agile Sprints",
      description:
        "Our embedded specialists and growth engineers launch campaigns, implement technical improvements, and optimize landing pages in rapid weekly cycles.",
    },
    {
      step: "04",
      title: "Attribution & Scaled Growth",
      description:
        "We continuously analyze acquisition metrics, double down on winning channels, prune inefficiencies, and build compounding momentum.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background" id="main-content">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-14 shadow-card">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold uppercase tracking-wider">
                Practice 01 &bull; Core Service
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                Marketing &amp; Growth Services
              </h1>
              <p className="text-lg sm:text-xl font-medium text-accent-gold">
                Engineered marketing systems that drive predictable customer acquisition and sustainable business scale.
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed pt-2">
                Your business needs more than isolated campaigns or temporary hacks. We combine data-driven acquisition strategy, conversion engineering, and hands-on execution to help high-growth ventures attract customers, improve profitability, and scale both locally and internationally.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-container transition-all shadow-sm group"
                >
                  <span>Build Your Growth Engine</span>
                  <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-low text-text-primary border border-border text-xs sm:text-sm font-semibold hover:bg-surface-container transition-all"
                >
                  <span>Speak with a Growth Director</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Service Provisions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              What We Deliver
            </h2>
            <p className="text-sm text-text-secondary max-w-2xl">
              Comprehensive capabilities covering every layer of modern marketing, acquisition, and revenue growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface-white rounded-2xl border border-border p-7 shadow-card hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6 text-accent-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-3 border-t border-border/60 space-y-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                        Key Deliverables
                      </p>
                      <ul className="space-y-1.5">
                        {item.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-text-secondary">
                            <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-14 shadow-card">
            <div className="max-w-2xl mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                Our Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                How We Partner With You
              </h2>
              <p className="text-sm text-text-secondary">
                A disciplined, milestone-backed approach designed for speed, accountability, and maximum return on investment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-container-low border border-border/70 space-y-3 relative"
                >
                  <span className="text-3xl font-extrabold text-secondary/40 font-mono">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-primary text-white rounded-3xl p-8 sm:p-14 border border-secondary/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Accelerate Growth?</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Let&apos;s build the growth engine your business deserves.
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Connect with our team to review your current acquisition channels and map out a customized marketing roadmap.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/onboarding"
                className="px-8 py-3.5 rounded-lg bg-secondary text-primary font-bold text-sm hover:bg-secondary-hover transition-all text-center shadow-lg"
              >
                Work With Us
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all text-center ring-1 ring-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

