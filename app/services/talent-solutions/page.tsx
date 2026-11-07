import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Award,
  Users,
  Target,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Search,
  Check,
  Briefcase,
  Layers,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talent Solutions | XC Global Limited",
  description:
    "Find, vet, and place high-performing marketing specialists, fractional growth leads, and embedded growth squads tailored to your business stage.",
};

export default function TalentSolutionsPage() {
  const capabilities = [
    {
      title: "Marketing Talent Recruitment",
      description:
        "Sourcing and hiring verified marketing professionals for early-stage startups and rapid-growth scale-ups across Africa, Europe, and North America.",
      deliverables: [
        "Headhunting performance marketers & paid media leads",
        "Shopify architects & e-commerce store managers",
        "Technical SEO strategists & content heads",
        "Retention, CRM & email lifecycle specialists",
      ],
      icon: Search,
    },
    {
      title: "Marketing Team Building",
      description:
        "Design full growth squads from the ground up, tailored to your business model, customer acquisition channels, and quarterly milestones.",
      deliverables: [
        "Growth squad org chart & compensation benchmarking",
        "Role scoping, skill matrix & hiring priority roadmaps",
        "Cross-functional sprint workflow setup",
        "KPI and attribution dashboard alignment",
      ],
      icon: Users,
    },
    {
      title: "Talent-to-Role Precision Matching",
      description:
        "Eliminate hiring guesswork with our proprietary vetting pipeline that pairs vetted candidates with your exact tech stack, industry, and culture.",
      deliverables: [
        "Stack-specific matching (Meta Ads, HubSpot, Klaviyo, GA4)",
        "Industry vertical experience matching (Fintech, Health, Retail)",
        "Workplace style & timezone compatibility checks",
        "Shortlists presented within 48 to 72 hours",
      ],
      icon: Target,
    },
    {
      title: "Embedded Marketing Placement",
      description:
        "Flexible hiring models including full-time embedded talent, contract-to-hire, and dedicated fractional growth directors who plug directly into your workflow.",
      deliverables: [
        "Full-time permanent hires with placement warranty",
        "Embedded sprint contractors for seasonal surges",
        "Fractional CMO & executive growth advisory",
        "Zero recruitment bloat or extended lock-in contracts",
      ],
      icon: Briefcase,
    },
    {
      title: "Growth Team Leadership & Management",
      description:
        "We don't just place talent and leave. We provide ongoing operational support, weekly sprint governance, and performance oversight.",
      deliverables: [
        "Weekly growth sprint tracking & ledger accountability",
        "Quarterly performance reviews & skill upgrades",
        "Direct escalation channel to XC Global senior partners",
        "Seamless replacement guarantee if needs evolve",
      ],
      icon: Award,
    },
    {
      title: "Pre-Vetted TalentOS Network",
      description:
        "Access an exclusive network of rigorously tested marketing operators who have proven track records scaling tech ventures.",
      deliverables: [
        "Live portfolio & spend ledger verification",
        "Reference checks from founder & leadership alumni",
        "Pre-screened technical assessments & case study reviews",
        "Rapid onboarding with zero warm-up downtime",
      ],
      icon: ShieldCheck,
    },
  ];

  const vettingStages = [
    {
      step: "01",
      title: "Application & Portfolio Audit",
      description:
        "We inspect historical campaign ad accounts, verified spend ledgers, and live case studies. We do not accept theoretical resumes.",
    },
    {
      step: "02",
      title: "Technical Skills Assessment",
      description:
        "Specialists undergo rigorous technical evaluations in attribution modeling, copy mechanics, funnel architecture, and media buying.",
    },
    {
      step: "03",
      title: "Live Problem-Solving Interview",
      description:
        "Candidates solve real-world startup growth bottlenecks live with our senior marketing directors, testing strategic agility and communication.",
    },
    {
      step: "04",
      title: "Top 3% Accreditation",
      description:
        "Only the top 3% of applicants earn an XC Global accreditation and enter our TalentOS network for client placements.",
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
                Practice 03 &bull; Core Service
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                Talent Solutions
              </h1>
              <p className="text-lg sm:text-xl font-medium text-accent-gold">
                Find, vet, and place high-performing marketing specialists who deliver measurable growth from day one.
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed pt-2">
                Hiring great marketers is notoriously difficult. Most recruiters don&apos;t know how to evaluate media buying skills, server-side attribution, or retention funnels. At XC Global, we are marketers ourselves. We screen talent for actual technical execution so you get proven operators ready to produce results immediately.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-container transition-all shadow-sm group"
                >
                  <span>Hire Vetted Marketing Talent</span>
                  <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/register?role=talent"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-low text-text-primary border border-border text-xs sm:text-sm font-semibold hover:bg-surface-container transition-all"
                >
                  <span>Join as a Talent</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Talent Offerings
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Structured Talent Solutions
            </h2>
            <p className="text-sm text-text-secondary max-w-2xl">
              Whether you need an embedded individual specialist or a complete cross-functional growth squad, we have you covered.
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
                        Key Features
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

        {/* The Top 3% Vetting Pipeline */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-14 shadow-card">
            <div className="max-w-2xl mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                The XC Global Standard
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Our Rigorous Top 3% Vetting Process
              </h2>
              <p className="text-sm text-text-secondary">
                We reject 97% of applicants. We only place marketers whose execution skills and track record we would trust with our own company.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vettingStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-container-low border border-border/70 space-y-3 relative"
                >
                  <span className="text-3xl font-extrabold text-secondary/40 font-mono">
                    {stage.step}
                  </span>
                  <h3 className="text-base font-bold text-text-primary">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dual CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-primary text-white rounded-3xl p-8 sm:p-14 border border-secondary/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Hire or Join?</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Hire world-class marketers or advance your career with XC Global.
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Connect with our talent directors to discuss hiring needs or submit your portfolio for accreditation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/onboarding"
                className="px-8 py-3.5 rounded-lg bg-secondary text-primary font-bold text-sm hover:bg-secondary-hover transition-all text-center shadow-lg"
              >
                Hire Marketers
              </Link>
              <Link
                href="/register?role=talent"
                className="px-6 py-3.5 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all text-center ring-1 ring-white/20"
              >
                Apply as Talent
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

