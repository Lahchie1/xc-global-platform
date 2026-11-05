import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  marketingGrowthServices,
  MarketingGrowthService,
} from "@/lib/data/servicesData";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  BarChart3,
  Layers,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return marketingGrowthServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = marketingGrowthServices.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Marketing & Growth Services`,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = marketingGrowthServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Find related or other services for quick cross-links
  const otherServices = marketingGrowthServices
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background" id="main-content">
        {/* Breadcrumb & Top Bar */}
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
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-14">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-14 shadow-card">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold uppercase tracking-wider">
                Marketing &amp; Growth Services
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-accent-gold">
                {service.tagline}
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed pt-2">
                {service.summary}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-container transition-all shadow-sm"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-container-low text-text-primary border border-border text-xs sm:text-sm font-semibold hover:bg-surface-container transition-all"
                >
                  <span>Work With Us</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What Our Service Includes (Deliverables) */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                Comprehensive Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
                What Our {service.title} Includes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-surface-white rounded-2xl p-6 sm:p-7 border border-border shadow-card hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-accent-gold">
                      <CheckCircle2 className="w-5 h-5 text-status-success" />
                    </div>
                    <h3 className="text-base font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional Section: Process Steps (e.g. CRO Approach) */}
        {service.processSteps && service.processSteps.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
            <div className="bg-surface-container-low/70 rounded-3xl border border-border p-8 sm:p-14 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                  Our Methodology
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  Our Approach: Evidence Before Opinions
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary">
                  We don&apos;t optimize based on guesswork. Every recommendation starts with an insight, a clear hypothesis, and a measurable objective.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {service.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-surface-white p-5 rounded-xl border border-border shadow-sm space-y-2"
                  >
                    <span className="text-xl font-bold font-mono text-accent-gold">
                      {step.step}
                    </span>
                    <h4 className="text-sm font-bold text-text-primary">
                      {step.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Optional Section: Metrics Optimized */}
        {service.metrics && service.metrics.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                  Measurable Impact
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
                  What We Optimize For
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {service.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-white rounded-xl p-5 border border-border shadow-card space-y-2"
                  >
                    <BarChart3 className="w-5 h-5 text-accent-gold" />
                    <h3 className="text-sm font-bold text-text-primary">
                      {m.name}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Optional Section: Tailored Offerings */}
        {service.offerings && service.offerings.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                  Flexible Engagement Models
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
                  Support That Fits Your Business
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.offerings.map((offering, idx) => (
                  <div
                    key={idx}
                    className="bg-surface-white rounded-2xl p-7 border border-border shadow-card flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-text-primary">
                        {offering.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {offering.description}
                      </p>
                      <div className="pt-2 border-t border-border/60">
                        <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider block mb-1">
                          Best for:
                        </span>
                        <p className="text-xs text-text-muted leading-relaxed">
                          {offering.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Explore Other Services */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="border-t border-border pt-12 space-y-6">
            <h3 className="text-lg font-bold text-text-primary">
              Explore More Marketing &amp; Growth Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group bg-surface-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                      {other.title}
                    </h4>
                    <p className="text-xs text-text-secondary line-clamp-2">
                      {other.tagline}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-text-primary group-hover:text-accent-gold transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
          <div className="bg-primary text-white rounded-3xl p-8 sm:p-14 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Ready to Accelerate Your {service.title}?
            </h2>
            <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We help you identify what your business needs, bring the right capabilities together, and turn marketing efforts into measurable progress.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-secondary text-primary font-bold text-sm hover:bg-secondary-hover transition-colors shadow-lg"
              >
                <span>Let&apos;s Talk About Your Growth Goals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

