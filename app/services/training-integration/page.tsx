import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  GraduationCap,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Training & Team Integration | XC Global Limited",
  description:
    "A minimum 6-month structured programme supporting marketing professionals while embedded in your company, combining technical skills, workplace application, culture integration, and executive mentorship.",
};

export default function TrainingIntegrationPage() {
  const pillars = [
    {
      title: "Technical Marketing Mastery",
      description:
        "Deep, execution-oriented training in modern marketing stacks directly relevant to your quarterly business targets.",
      deliverables: [
        "Paid media strategy & media buying (Meta, Google, TikTok, LinkedIn)",
        "Search engine optimization (SEO) & authoritative content creation",
        "Conversion rate optimization (CRO) & landing page architecture",
        "E-commerce growth, retention mechanics & Shopify management",
        "Marketing analytics, server-side CAPI tracking & attribution modeling",
      ],
      icon: BookOpen,
    },
    {
      title: "Executive Soft Skills & Communication",
      description:
        "Developing well-rounded professionals who can articulate insights, manage stakeholders, and collaborate smoothly across departments.",
      deliverables: [
        "Executive presentation skills & data-backed storytelling",
        "Cross-functional collaboration with engineering & sales teams",
        "Constructive conflict resolution & stakeholder alignment",
        "Agile project management & sprint timeline ownership",
      ],
      icon: HeartHandshake,
    },
    {
      title: "Workplace & Real-World Application",
      description:
        "No theoretical tests or passive seminars. Training is built directly around the employee's actual daily tasks, ad accounts, and company KPIs.",
      deliverables: [
        "Live optimization audits on company campaigns and funnels",
        "Custom workflow playbooks tailored to your business model",
        "Direct problem-solving sessions on active marketing bottlenecks",
        "Weekly deliverable reviews and actionable constructive feedback",
      ],
      icon: Compass,
    },
    {
      title: "Company Culture & Operational Integration",
      description:
        "Helping professionals assimilate into your organization's core values, internal communication cadence, and operating rhythm.",
      deliverables: [
        "Adaptation to company communication tools (Slack, Notion, Linear)",
        "Alignment with leadership expectations and company values",
        "Autonomous initiative and ownership of assigned marketing areas",
        "Seamless team integration to prevent friction or siloed working",
      ],
      icon: Users,
    },
    {
      title: "Continuous Mentorship & Growth Support",
      description:
        "Ongoing executive coaching and support from seasoned XC Global marketing directors throughout the entire 6-month journey.",
      deliverables: [
        "Dedicated 1-on-1 mentorship sessions twice a month",
        "Quarterly competency evaluations & skill milestone tracking",
        "Career trajectory guidance and skill-gap identification",
        "Direct escalation support when complex technical issues arise",
      ],
      icon: TrendingUp,
    },
    {
      title: "Team Performance & Productivity Governance",
      description:
        "We partner with founders and marketing heads to ensure the programme delivers transparent, measurable impact on team output.",
      deliverables: [
        "Monthly executive reports on trainee progress and achievements",
        "Benchmarked productivity and speed-to-delivery improvements",
        "Long-term talent retention and reduced employee turnover",
        "Institutionalized knowledge documentation that stays with your firm",
      ],
      icon: GraduationCap,
    },
  ];

  const timelinePhases = [
    {
      phase: "Months 1–2",
      title: "Assessment & Baseline Alignment",
      description:
        "Audit existing skills, establish individual baseline metrics, align with company objectives, and initiate foundational technical modules.",
    },
    {
      phase: "Months 3–4",
      title: "Applied Execution & Sprint Cadence",
      description:
        "Hands-on execution on live campaigns. Focus on CRO, paid media scaling, data attribution, and cross-departmental presentation.",
    },
    {
      phase: "Months 5–6",
      title: "Autonomous Leadership & Optimization",
      description:
        "Transition to full autonomy, advanced strategic planning, culture championing, and long-term sustainable growth systems.",
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
                Practice 04 &bull; Core Service
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                Marketing Training &amp; Team Integration
              </h1>
              <p className="text-lg sm:text-xl font-medium text-accent-gold">
                A minimum 6-month structured programme equipping marketing professionals to perform, adapt, and drive sustainable growth.
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed pt-2">
                Hiring talent is only half the battle; retaining and elevating them to perform at their absolute peak is where competitive advantage is won. Our signature 6-month programme supports marketing executives while they are actively working inside your company, transforming them into high-performing, culture-aligned contributors.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-container transition-all shadow-sm group"
                >
                  <span>Enroll Your Marketing Team</span>
                  <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-low text-text-primary border border-border text-xs sm:text-sm font-semibold hover:bg-surface-container transition-all"
                >
                  <span>Request Programme Syllabus</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Pillars */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Programme Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              The 6 Pillars of Integration
            </h2>
            <p className="text-sm text-text-secondary max-w-2xl">
              We address technical capabilities, soft skills, workplace application, and organizational alignment simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((item, idx) => {
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
                        Core Coverage
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

        {/* Why 6 Months? */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-14 shadow-card">
            <div className="max-w-3xl mb-12 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                The 6-Month Commitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                Why a Minimum 6-Month Programme?
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                One-day workshops and theoretical crash courses fail because habits are not formed and knowledge fades. A structured 6-month embedded timeline allows for deep behavioral change, live campaign iteration across multiple sales cycles, and irreversible skill compounding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {timelinePhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface-container-low border border-border/70 space-y-3 relative"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-gold block">
                    {phase.phase}
                  </span>
                  <h3 className="text-base font-bold text-text-primary">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {phase.description}
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
                <span>Invest in Your Marketing Talent</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Turn your marketing team into a high-impact growth engine.
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Speak with our integration directors to structure a 6-month programme tailored to your company goals and team structure.
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
                Book Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

