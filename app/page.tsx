import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CurrencyAmount } from "@/components/ui/CurrencyAmount";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Check,
  Star,
  ShieldCheck,
  Zap,
  Lock,
  Building2,
  User,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="w-full pt-20 bg-background overflow-hidden" id="main-content">
        {/* ── Hero Section with Mountain Background ── */}
        <section className="relative w-full overflow-hidden min-h-[82vh] flex items-center">
          {/* Background Image: PNG positioned so the mountain peak stands out on the right */}
          <Image
            src="/hero-bg.png"
            alt="Mountain landscape — XC Global"
            fill
            priority
            className="object-cover object-right md:object-[80%_center] select-none pointer-events-none"
            sizes="100vw"
          />
          {/* Layered directional overlay: rich dark contrast on left for text, opening up on right for the mountain peak */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 via-45% to-primary/20 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-primary/30 z-[2]" />

          {/* Hero Content — Left Aligned */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 w-full">
            <div className="max-w-2xl text-left space-y-6">

              {/* Cohort Badge Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm shadow-sm ring-1 ring-white/20">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
                </span>
                <span className="text-xs text-white/90 uppercase tracking-wider font-semibold">
                  Marketing Agency &amp; Talent Firm
                </span>
                <span className="text-white/40 text-xs">|</span>
                <span className="text-xs text-secondary font-semibold">
                  Trusted by 8+ Brands
                </span>
              </div>

              {/* Hero Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-tight text-white leading-[1.12]">
                Building the Marketing Systems and{" "}
                <span className="relative inline-block text-white">
                  Growth Teams
                  <span className="absolute bottom-1.5 left-0 w-full h-[5px] bg-secondary/70 -z-10 rounded-sm" />
                </span>{" "}
                That Help Businesses Scale Globally
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-white/75 max-w-xl leading-relaxed">
                We combine strategy, marketing and growth talent to help startups reach new markets and scale sustainably.
              </p>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
                <Link
                  href="/onboarding"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-secondary text-primary font-bold text-sm flex items-center justify-center gap-3 shadow-lg hover:bg-secondary-hover transition-all group"
                >
                  <span>Work With Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/register?role=talent"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold text-sm ring-1 ring-white/25 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Join as Talent</span>
                  <ShieldCheck className="w-4 h-4 text-white/70" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ── Trusted Brands Box (Placed Between Hero and Key Metrics) ── */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 sm:-mt-10 mb-4 relative z-20 w-full">
          <div className="bg-surface-white rounded-2xl border border-border shadow-elevation-1 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-3.5 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low border border-border flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-text-primary">
                    Trusted by High-Growth Brands
                  </p>
                  <p className="text-[11px] text-text-muted">
                    Across 11 Tech &amp; Scale-up Sectors
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 items-center">
                {[
                  { name: "ZendWallet", sector: "Fintech/Web3", url: "https://zendwallet.com/" },
                  { name: "Ori Lifestyle", sector: "E-commerce", url: "https://orilifestyle.com/" },
                  { name: "VitalSwap", sector: "Fintech", url: "https://www.vitalswap.com/" },
                  { name: "Altisure Insurance Brokers", sector: "Insurance", url: "https://altisure.com/" },
                  { name: "Currency Options", sector: "Fintech/Web3", url: "https://currencyoptions.ca/" },
                  { name: "Apothékary", sector: "E-commerce", url: "https://www.apothekary.com/" },
                  { name: "Seller Africa", sector: "Online Marketplace", url: "https://sellerafrica.com/" },
                  { name: "Euracare", sector: "Healthcare", url: "https://euracarehealth.com/" },
                  { name: "Mouka", sector: "Manufacturing", url: "https://mouka.com/" },
                ].map((client) => (
                  <a
                    key={client.name}
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low border border-border hover:bg-surface-white hover:border-secondary/40 hover:shadow-sm transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-text-primary group-hover:text-secondary transition-colors">
                      {client.name}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted bg-surface-container px-1.5 py-0.5 rounded group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                      {client.sector}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Strip */}
        <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 */}
            <div className="bg-surface-white rounded-xl p-6 shadow-card border border-border flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-accent-gold-hover" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Institutional Velocity
                  </span>
                  <TrendingUp className="w-5 h-5 text-accent-gold" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-2 flex items-baseline">
                  <CurrencyAmount usd={120000000} compact suffix="+" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Revenue Influenced
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Through high-velocity acquisition architecture, algorithmic attribution, and structured growth engineering.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-text-muted">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span>Verified quarterly ledger data</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-surface-white rounded-xl p-6 shadow-card border border-border flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Execution Standards
                  </span>
                  <Award className="w-5 h-5 text-text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-2">
                  Top 3<span className="text-text-muted">%</span>
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Vetted Talent Placement
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Growth leads, performance marketers, Shopify architects, and retention engineers rigorously screened for tech scale-ups.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-text-muted">
                <Zap className="w-4 h-4 text-status-success" />
                <span>Deployable within 72 hours</span>
              </div>
            </div>

            {/* Metric 3: GrowthOS */}
            <div className="bg-surface-white rounded-xl p-6 shadow-card border border-border flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Client Platform
                  </span>
                  <Building2 className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-2">
                  GrowthOS
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Build, Manage &amp; Scale
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Comprehensive strategy, marketing operations, and dedicated teams to grow your business sustainably.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-text-muted">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span>Structured growth systems</span>
              </div>
            </div>

            {/* Metric 4: TalentOS */}
            <div className="bg-surface-white rounded-xl p-6 shadow-card border border-border flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary-tint" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Talent Platform
                  </span>
                  <User className="w-5 h-5 text-primary-tint" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-2">
                  TalentOS
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  Career Opportunities
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Connect marketing skills with ambitious businesses, career training, and vetted job placements.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-text-muted">
                <Lock className="w-4 h-4 text-status-success" />
                <span>Zero opaque freelancing</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Sector Specialization ── */}
        <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-12 py-8 w-full" delay={100}>
          <div className="flex flex-col items-center gap-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Sector Specialization
            </p>
            <div className="flex flex-wrap gap-2.5 items-center justify-center">
              {[
                "Fintech",
                "E-commerce",
                "SaaS",
                "AI",
                "Web3",
                "Online Marketplaces",
                "IT Services",
                "HR Firms",
                "EdTech",
                "Marketing Agencies",
                "Digital Asset Companies",
              ].map((sector) => (
                <span
                  key={sector}
                  className="px-4 py-2 rounded-lg bg-surface-white border border-border text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-primary/30 hover:shadow-sm transition-all cursor-default"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Core Capabilities Section */}
        <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 w-full" delay={80}>
          <div className="flex flex-col mb-12 gap-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-high text-text-primary text-xs font-bold uppercase tracking-wider w-fit">
              OUR SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Comprehensive marketing services and talent solutions.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              We help ambitious businesses build, launch, optimize, and scale their marketing engines while recruiting and developing high-performing teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Capability 1 */}
            <div className="bg-surface-white p-8 rounded-xl shadow-card border border-border hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-badge-gold-bg transition-colors">
                  <TrendingUp className="w-6 h-6 text-text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-badge-gold-text mb-2 block">
                  01. Marketing & Growth Services
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  Marketing & Growth Systems
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Build, launch, optimize, and scale your marketing engine with GTM strategy, paid media across Google/Meta/TikTok, technical SEO, and conversion optimization.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Go-to-Market (GTM) & Paid Media Strategy",
                    "Shopify Store Development & E-commerce Growth",
                    "Conversion Rate Optimisation (CRO) & Analytics",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-text-primary">
                      <Check className="w-4 h-4 text-status-success shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/services/marketing-growth"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors"
              >
                <span>Explore practice</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Capability 2 */}
            <div className="bg-surface-white p-8 rounded-xl shadow-card border border-border hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-surface-container-high transition-colors">
                  <Award className="w-6 h-6 text-text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">
                  02. Branding & Creative Services
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  Branding & Visual Identity
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Build and strengthen your brand foundation with identity systems, guidelines, pitch decks, collateral, social media brand kits, and creative direction.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Brand Strategy & Comprehensive Brand Guidelines",
                    "Logo Design & Visual Identity Systems",
                    "Pitch Decks, Sales Collateral & Brand Kits",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-text-primary">
                      <Check className="w-4 h-4 text-status-success shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/services/branding-creative"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors"
              >
                <span>Explore practice</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Capability 3 */}
            <div className="bg-surface-white p-8 rounded-xl shadow-card border border-border hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-surface-container-high transition-colors">
                  <ShieldCheck className="w-6 h-6 text-text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2 block">
                  03. Talent Solutions
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  Marketing Talent Recruitment
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Find and build the right marketing talent for your specific growth needs through rigorous sourcing, role-matching, and team leadership.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Marketing Talent Recruitment & Team Building",
                    "Precise Talent-to-Role Matching & Placement",
                    "Growth Team Leadership & Ongoing Management",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-text-primary">
                      <Check className="w-4 h-4 text-status-success shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/services/talent-solutions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors"
              >
                <span>Explore practice</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Capability 4 */}
            <div className="bg-surface-white p-8 rounded-xl shadow-card border border-border hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-badge-gold-bg transition-colors">
                  <Layers className="w-6 h-6 text-text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-badge-gold-text mb-2 block">
                  04. Training & Integration
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  Marketing Training & Team Integration
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  A minimum 6-month programme supporting marketing executives while working within your firm, developing technical skills, soft skills, and workplace alignment.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Technical marketing skills tailored to company objectives",
                    "Soft skills, workplace application & culture integration",
                    "Ongoing mentorship, performance & growth support",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-text-primary">
                      <Check className="w-4 h-4 text-status-success shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/services/training-integration"
                className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors"
              >
                <span>Explore practice</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Operating Systems: GrowthOS & TalentOS */}
        <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full" delay={80}>
          <div className="bg-surface-white rounded-2xl shadow-card border border-border overflow-hidden">
            <div className="p-8 sm:p-12 border-b border-border bg-surface-container-low/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-badge-gold-text bg-badge-gold-bg px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    The XC Global Ecosystem
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mt-3">
                    Purpose-built infrastructure for business scale &amp; talent development.
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: GrowthOS */}
              <div className="p-8 sm:p-12 lg:border-r border-border flex flex-col justify-between space-y-8 bg-surface-white">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-text-primary" />
                      <span className="text-xl font-bold text-text-primary tracking-tight">
                        GrowthOS
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-semibold bg-surface-container text-text-primary">
                      For Businesses
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary leading-snug">
                      Build, Manage and Scale Your Business with the Right Growth Team.
                    </h3>
                    <p className="text-sm font-medium text-text-secondary leading-relaxed">
                      From marketing strategy and customer acquisition to hiring and training marketing professionals, we help businesses build the systems and teams needed to grow locally and globally.
                    </p>
                  </div>

                  {/* Supporting Copy */}
                  <div className="p-4 rounded-xl bg-surface-container-low border border-border/70 space-y-2 text-xs text-text-secondary leading-relaxed">
                    <p>
                      Your business needs more than marketing campaigns to grow. It needs the right strategy, skilled professionals, and consistent execution.
                    </p>
                    <p className="font-medium text-text-primary">
                      At XC Global, we bring these elements together to help you attract customers, improve performance, and build sustainable growth.
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-2.5 pt-1 text-xs text-text-secondary">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
                      <span>End-to-end go-to-market and paid acquisition architecture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
                      <span>Dedicated, vetted marketing specialists embedded in your workflow</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/services"
                  className="w-full py-3.5 px-6 rounded-lg bg-primary text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-sm"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right: TalentOS */}
              <div className="p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-surface-white">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-6 h-6 text-accent-gold" />
                      <span className="text-xl font-bold text-text-primary tracking-tight">
                        TalentOS
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-semibold bg-badge-gold-bg text-badge-gold-text">
                      For Talents
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-text-primary leading-snug">
                      Turn Your Marketing Skills into Real Career Opportunities.
                    </h3>
                    <p className="text-sm font-medium text-text-secondary leading-relaxed">
                      Get discovered by growing businesses, develop practical marketing skills, and access opportunities to work with brands looking for talented professionals.
                    </p>
                  </div>

                  {/* Supporting Copy */}
                  <div className="p-4 rounded-xl bg-surface-container-low border border-border/70 space-y-2 text-xs text-text-secondary leading-relaxed">
                    <p>
                      Your skills deserve the right opportunities.
                    </p>
                    <p>
                      Whether you&apos;re starting your marketing career or looking to take the next step, we help you build your professional experience, improve your skills, and connect with businesses that need your expertise.
                    </p>
                    <p className="font-medium text-text-primary">
                      Through professional training, talent development, and recruitment opportunities, we help you move closer to your career goals.
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-2.5 pt-1 text-xs text-text-secondary">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
                      <span>Curated venture briefs with verified compensation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
                      <span>6-month structured training &amp; career mentorship programmes</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/register?role=talent"
                  className="w-full py-3.5 px-6 rounded-lg bg-surface-white text-text-primary border border-border font-semibold text-sm flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all shadow-sm"
                >
                  <span>Join as a Talent</span>
                  <Award className="w-4 h-4 text-accent-gold" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Client Testimonial & Social Proof Section */}
        <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full" delay={60}>
          <div className="bg-surface-container-low rounded-2xl p-8 sm:p-14 border border-border relative overflow-hidden">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6">
              <div className="flex items-center gap-1 text-accent-gold">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-accent-gold" />
                ))}
              </div>

              <blockquote className="text-2xl sm:text-3xl font-medium tracking-tight text-text-primary leading-snug">
                “XC Global deployed a growth lead and scaled our customer acquisition by{" "}
                <span className="underline decoration-secondary decoration-4 underline-offset-4 font-bold">
                  3.4x in 90 days
                </span>
                . Their managed model is completely unmatched compared to traditional digital agencies.”
              </blockquote>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <div className="w-14 h-14 rounded-full bg-surface-white border border-border flex items-center justify-center text-text-primary font-bold text-lg shadow-sm">
                  TB
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-text-primary text-base">Tunde Balogun</h4>
                  <p className="text-xs text-text-secondary">Founder & CEO at KudaScale (Fintech)</p>
                </div>
                <div className="sm:ml-4 sm:pl-4 sm:border-l border-border flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Series A Verified Partner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Final Conversion Call to Action */}
        <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 w-full" delay={60}>
          <div className="bg-primary text-white rounded-2xl p-8 sm:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                GET STARTED TODAY
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Ready to institutionalize your growth engine?
              </h2>
              <p className="text-base text-gray-300 leading-relaxed">
                Connect with our partnership directors to deploy dedicated marketing leaders or apply to join our specialist bench.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-secondary text-primary font-bold text-sm hover:bg-secondary-hover transition-colors shadow-lg"
              >
                Start Business Onboarding
              </Link>
              <Link
                href="/register?role=talent"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-surface-white/10 text-white border border-white/20 font-semibold text-sm hover:bg-surface-white/20 transition-colors"
              >
                Apply as Specialist Talent
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </>
  );
}
