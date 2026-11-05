import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { marketingGrowthServices } from "@/lib/data/servicesData";
import {
  TrendingUp,
  Palette,
  Award,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "Services — Marketing, Talent & Training",
  description:
    "XC Global offers marketing & growth services, branding, talent solutions, and marketing training & team integration for tech-focused businesses.",
};

export default function ServicesPage() {
  const otherCategories = [
    {
      id: "branding-creative",
      icon: Palette,
      number: "02",
      title: "Branding & Creative Services",
      tagline: "Build a distinctive, coherent brand foundation.",
      description:
        "For businesses that need to build or strengthen their brand foundation with identity systems, guidelines, pitch decks, and sales collateral.",
      services: [
        "Brand Strategy",
        "Brand Guidelines",
        "Logo Design",
        "Visual Identity Systems",
        "Business Card & Letterhead Design",
        "Marketing & Sales Collateral",
        "Pitch Deck & Sales Presentation Design",
        "Social Media Brand Kits",
        "Creative Direction",
      ],
    },
    {
      id: "talent-solutions",
      icon: Award,
      number: "03",
      title: "Talent Solutions",
      tagline: "Find and build the right marketing talent for your growth needs.",
      description:
        "We help businesses find, vet, and place high-performing marketing specialists and growth leaders tailored to their stage.",
      services: [
        "Marketing Talent Recruitment",
        "Marketing Team Building",
        "Talent-to-Role Matching",
        "Marketing Talent Placement",
        "Growth Team Leadership",
      ],
    },
    {
      id: "training",
      icon: GraduationCap,
      number: "04",
      title: "Marketing Training & Team Integration",
      tagline: "Equipping marketers to perform, adapt, and drive sustainable growth.",
      description:
        "Our minimum 6-month training and integration programme supports marketing executives and professionals while they are already working within a company.",
      services: [
        "Technical Marketing Skills – Paid media, SEO, CRO, analytics, content, social media, e-commerce, GTM strategy",
        "Soft Skills Development – Communication, collaboration, problem-solving, presentation, stakeholder management",
        "Workplace Application – Practical training based on the employee's actual responsibilities and objectives",
        "Company Culture Integration – Helping professionals adapt to company values, processes, and ways of working",
        "Performance & Growth Support – Ongoing guidance, feedback, mentorship, and performance development",
        "Team Integration – Helping newly hired or existing marketing professionals become productive, collaborative members",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background" id="main-content">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold uppercase tracking-wider mb-4">
            Our Core Practices
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary max-w-3xl mx-auto leading-tight">
            Marketing, Talent &amp; Training &mdash; Built for Sustainable Growth.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            We help ambitious businesses build, launch, optimize, and scale their marketing engines while recruiting and developing the high-performing teams that sustain that growth.
          </p>
        </section>

        {/* 01. Marketing & Growth Services — REDESIGNED INTERACTIVE & CLICKABLE SHOWCASE */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-14 shadow-card space-y-10">
            {/* Header of 01 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/80">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary font-bold text-xs">
                    <TrendingUp className="w-4 h-4 text-accent-gold" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                    Pillar 01
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
                  Marketing &amp; Growth Services
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We help businesses build, launch, optimize, and scale their marketing engines. Click any service below to explore full capabilities, deliverables, methodology, and engagement options.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-all shadow-sm"
                >
                  <span>Inquire About Growth</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Clickable Card Grid for all 9 Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketingGrowthServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative bg-surface-container-low/60 hover:bg-surface-white rounded-2xl p-6 sm:p-7 border border-border/80 hover:border-accent-gold/50 shadow-sm hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-accent-gold bg-surface-white px-2.5 py-1 rounded-md border border-border/60">
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

                  <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-xs text-text-primary font-semibold">
                    <span>{service.deliverables.length} core deliverables</span>
                    <span className="w-7 h-7 rounded-full bg-surface-white flex items-center justify-center text-text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars 02, 03, 04 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          {otherCategories.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-surface-white rounded-3xl border border-border shadow-card p-8 sm:p-12 transition-all hover:shadow-md"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6 text-accent-gold" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                      Pillar {service.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                      {service.title}
                    </h2>
                    <p className="text-xs font-semibold text-text-muted">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                    <div className="pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
                      >
                        <span>Talk to Us</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-7 bg-surface-container-low/60 rounded-2xl p-6 sm:p-8 border border-border/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-4">
                      Services Included
                    </h3>
                    <ul className="space-y-3">
                      {service.services.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-text-primary"
                        >
                          <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Training Tagline Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-14">
          <div className="bg-surface-container-low rounded-2xl border border-border p-6 sm:p-8 text-center">
            <p className="text-base sm:text-lg font-semibold text-text-primary italic">
              &ldquo;We don&apos;t just help companies hire marketing professionals. We help them develop and retain them.&rdquo;
            </p>
          </div>
        </section>

        {/* Closing CTA Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
          <div className="bg-primary text-white rounded-3xl p-8 sm:p-14 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Build a Marketing Engine That Moves Your Business Forward
            </h2>
            <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your next stage of growth requires more than disconnected marketing activities. It takes the right strategy, coordinated execution, and continuous optimisation. We help you identify what your business needs, bring the right capabilities together, and turn marketing efforts into measurable progress.
            </p>
            <div className="pt-4">
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
