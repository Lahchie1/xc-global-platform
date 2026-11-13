import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { marketingGrowthServices } from "@/lib/data/servicesData";
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing & Growth Services | XC Global Limited",
  description:
    "End-to-end marketing systems, go-to-market strategies, paid media acquisition, technical SEO, and conversion rate optimisation to scale your business sustainably.",
};

export default function MarketingGrowthPage() {
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

        {/* All 9 Marketing & Growth Services */}
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
            {marketingGrowthServices.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-surface-white rounded-2xl border border-border p-7 shadow-card hover:shadow-md hover:border-accent-gold/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-accent-gold bg-surface-container-low px-2.5 py-1 rounded-md border border-border/60">
                      01.{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-text-muted group-hover:text-accent-gold flex items-center gap-1 transition-colors">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-gold transition-colors pt-1">
                    {service.title}
                  </h3>

                  <p className="text-xs font-medium text-text-muted">
                    {service.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-border/60 flex items-center justify-between text-xs text-text-primary font-semibold">
                  <span>{service.deliverables.length} core deliverables</span>
                  <span className="w-7 h-7 rounded-full bg-surface-container-low flex items-center justify-center text-text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
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

