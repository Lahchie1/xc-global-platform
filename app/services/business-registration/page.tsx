import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  Compass,
  FileSpreadsheet,
  FolderSync,
  HelpCircle,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CAC Business Registration & Compliance Support | XC Global Limited",
  description:
    "Make your business official with the right guidance. End-to-end CAC business name registration, limited liability company (LLC) incorporation, and post-registration compliance support.",
};

export default function BusinessRegistrationPage() {
  const capabilities = [
    {
      number: "01",
      title: "Business Name Registration",
      tagline: "Register your business name with the Corporate Affairs Commission.",
      description:
        "Ideal for sole proprietors, freelancers, and small business operators establishing their commercial identity quickly and legally.",
      deliverables: [
        "Business name selection and availability checks",
        "Name reservation support",
        "Registration information and documentation",
        "CAC application guidance",
        "Registration document support",
      ],
      icon: FileText,
    },
    {
      number: "02",
      title: "Limited Liability Company Registration",
      tagline: "Get support with incorporating your business as a limited liability company.",
      description:
        "Designed for venture-backed startups, corporate enterprises, and scale-ups requiring formal corporate governance, share capital, and director structuring.",
      deliverables: [
        "Company name checks and reservation",
        "Company structure guidance",
        "Director and shareholder information",
        "Incorporation documentation",
        "CAC application support",
      ],
      icon: Building2,
    },
    {
      number: "03",
      title: "Registration Documentation & Application Support",
      tagline: "Get the necessary information and documents organised for your registration.",
      description:
        "Eliminate bureaucratic delays and avoidable errors through our rigorous pre-submission verification and guided filing process.",
      deliverables: [
        "Registration requirements assessment",
        "Document preparation and review",
        "Application guidance and submission support",
        "Follow-up throughout the process",
      ],
      icon: FileSpreadsheet,
    },
    {
      number: "04",
      title: "Post-Registration Documentation Support",
      tagline: "Get assistance understanding and organising important business registration records.",
      description:
        "Stay compliant from day one with organised corporate registers, status reports, and essential statutory guidance.",
      deliverables: [
        "CAC document guidance",
        "Accessing and organising incorporation records",
        "Company status information",
        "Guidance on post-registration obligations",
      ],
      icon: FolderSync,
    },
  ];

  const advantages = [
    {
      title: "Simplified Process",
      description:
        "Get clear guidance on registration requirements and application steps without bureaucratic confusion or delays.",
      icon: Compass,
    },
    {
      title: "Right Business Structure",
      description:
        "Understand your registration options and choose a structure that suits your commercial vision, tax posture, and scale.",
      icon: ShieldCheck,
    },
    {
      title: "Organised Documentation",
      description:
        "Prepare required identification, shareholder structures, and statutory paperwork with fewer avoidable errors.",
      icon: FileCheck2,
    },
    {
      title: "Support Beyond Registration",
      description:
        "Access XC Global's wider business, marketing, growth, and talent placement services as your company develops.",
      icon: Sparkles,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background" id="main-content">
        {/* Breadcrumb Navigation */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Core Services</span>
          </Link>
        </section>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-14 shadow-card">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Service Pillar 05 &bull; Business Formalisation</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                CAC Business Registration &amp; Compliance Support
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-accent-gold">
                Make your business official with the right guidance and support.
              </p>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                At XC Global Limited, we help entrepreneurs, startups and established businesses navigate the Nigerian business registration process, from choosing the right structure to preparing documents and completing CAC registration.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-container transition-all shadow-sm"
                >
                  <span>Get Your Business Registered</span>
                  <ArrowRight className="w-4 h-4 text-secondary" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-surface-white border border-border text-text-primary font-semibold text-sm hover:bg-surface-container-low transition-all shadow-sm"
                >
                  <PhoneCall className="w-4 h-4 text-accent-gold" />
                  <span>Speak With Our Team</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Capabilities */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Registration Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Business Registration &amp; Formalisation
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
              We support businesses through the registration process, helping them establish a recognised business identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.number}
                  className="bg-surface-white rounded-2xl border border-border p-8 shadow-card flex flex-col justify-between space-y-6 hover:border-accent-gold/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary font-bold text-sm">
                        <Icon className="w-5 h-5 text-accent-gold" />
                      </span>
                      <span className="text-xs font-mono font-bold text-text-muted bg-surface-container-low px-2.5 py-1 rounded-md">
                        {cap.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-text-primary">
                      {cap.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-text-secondary">
                      {cap.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {cap.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
                        Key Deliverables
                      </h4>
                      <ul className="space-y-2">
                        {cap.deliverables.map((d, dIdx) => (
                          <li
                            key={dIdx}
                            className="text-xs sm:text-sm text-text-secondary flex items-start gap-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Link
                      href="/onboarding"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors"
                    >
                      <span>Inquire for {cap.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Strategic Advantage */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="bg-surface-container-low/70 rounded-3xl border border-border p-8 sm:p-14 space-y-10">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                Strategic Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                More Than Registration. A Stronger Foundation for Business.
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                We make business formalisation simpler through practical guidance and structured support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((adv, idx) => {
                const AdvIcon = adv.icon;
                return (
                  <div
                    key={idx}
                    className="bg-surface-white rounded-2xl border border-border p-6 shadow-sm space-y-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                      <AdvIcon className="w-4 h-4 text-accent-gold" />
                    </div>
                    <h3 className="text-base font-bold text-text-primary">
                      {adv.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-6">
          <div className="bg-primary text-white rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                Ready to Make Your Business Official?
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Let&apos;s help you take the first step.
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Whether you&apos;re launching a new venture or formalising an existing business, we&apos;re ready to support your registration journey.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/onboarding"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-secondary text-primary font-bold text-sm hover:bg-secondary-hover transition-colors shadow-lg"
                >
                  Start Your Registration
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/10 text-white border border-white/20 font-semibold text-sm hover:bg-white/20 transition-colors"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

