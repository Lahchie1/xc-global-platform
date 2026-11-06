import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ShieldCheck,
  Target,
  Compass,
  Users,
  CheckCircle2,
  ArrowRight,
  Globe2,
  HeartHandshake,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us | XC Global Limited",
  description:
    "XC Global Limited is a fast-growing marketing agency and tech-focused human resources/talent training firm solving real problems for businesses and talents.",
};

export default function AboutPage() {
  const values = [
    {
      icon: HeartHandshake,
      title: "We Are Humanized",
      description:
        "We are not building a tech ecosystem, we are building a humanized firm that solves real problems for both businesses and talents.",
    },
    {
      icon: TrendingUp,
      title: "Growth at the Intersection",
      description:
        "Our work sits at the intersection of growth, talent, and execution, helping businesses attract customers and build the teams that sustain growth.",
    },
    {
      icon: Compass,
      title: "Closing the Experience Gap",
      description:
        "We help close the experience gap that prevents talented professionals from accessing meaningful opportunities through practical training and mentorship.",
    },
    {
      icon: Target,
      title: "Built for Startups",
      description:
        "We believe more startups should succeed not just in Africa, but around the world. We partner with ambitious startups to accelerate sustainable growth.",
    },
  ];

  const clients = [
    { name: "ZendWallet", url: "https://zendwallet.com/" },
    { name: "Ori Lifestyle", url: "https://orilifestyle.com/" },
    { name: "VitalSwap", url: "https://www.vitalswap.com/" },
    { name: "Altisure Insurance Brokers", url: "https://altisure.com/" },
    { name: "Currency Options", url: "https://currencyoptions.ca/" },
    { name: "Apothékary", url: "https://www.apothekary.com/" },
    { name: "Seller Africa", url: "https://sellerafrica.com/" },
    { name: "Euracare", url: "https://euracarehealth.com/" },
    { name: "Mouka", url: "https://mouka.com/" },
  ];

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold uppercase tracking-wider mb-4">
            About XC Global Limited
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary max-w-4xl mx-auto leading-tight">
            Building a Humanized Firm at the Intersection of Growth, Talent, and Execution.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We are not building a tech ecosystem, we are building a humanized firm that solves real problems for both businesses and talents.
          </p>
        </section>

        {/* Narrative Section: What We Do */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="bg-surface-white rounded-2xl border border-border shadow-card p-8 sm:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                  Who We Are
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                  Marketing agency & tech-focused talent training firm.
                </h2>
                <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                  <p>
                    XC Global Limited is a fast-growing marketing agency and tech-focused human resources/talent training firm. We specialize in paid media marketing, go-to-market (GTM) strategy, growth team management, and Shopify development and management for brands looking to scale locally and globally.
                  </p>
                  <p>
                    Alongside our marketing services, we support future-forward tech companies by recruiting and building high-performing marketing teams. Our work sits at the intersection of growth, talent, and execution, helping businesses not only attract customers but also build the teams that sustain that growth.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-text-primary font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-status-success" />
                    <span>Paid Media & GTM Strategy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-status-success" />
                    <span>Shopify Development & Growth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-status-success" />
                    <span>Marketing Talent & Training</span>
                  </div>
                </div>
              </div>

              {/* Callout Card: Why We Do What We Do */}
              <div className="bg-surface-container-low rounded-xl p-8 border border-border/80 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-accent-gold">
                    Why We Do What We Do
                  </span>
                  <div className="text-3xl sm:text-4xl font-bold text-text-primary">
                    Over 70%
                  </div>
                  <p className="text-xs font-semibold text-status-error uppercase tracking-wider">
                    Startup failure rate in Africa
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed pt-2">
                    We believe more startups should succeed not just in Africa, but around the world. That&apos;s why we partner with ambitious startups to accelerate sustainable growth while helping close the experience gap that often prevents talented professionals from accessing meaningful opportunities.
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Through professional training, mentorship, and workplace integration, we&apos;re equipping the next generation of marketers and growth professionals with practical skills to thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Client Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Trusted by Brands We&apos;ve Helped Grow
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Proud to partner with scaling ventures and high-performing consumer brands.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {clients.map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-surface-white border border-border shadow-sm hover:shadow-md hover:border-primary/40 text-center font-semibold text-sm text-text-primary hover:text-accent-gold transition-all"
              >
                {client.name}
              </a>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Our Operating Standards
            </span>
            <h2 className="text-3xl font-bold text-text-primary">
              Principles that guide our partnerships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface-white rounded-xl p-6 border border-border shadow-card hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5 text-accent-gold" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">
                    {val.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Global Footprint */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="bg-primary text-white rounded-2xl p-8 sm:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary">
                  <Globe2 className="w-4 h-4" />
                  Global Operating Footprint
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Pan-African Roots, Global Horizon
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Headquartered in Lagos with operational presence and remote specialist talent supporting brands to reach new markets and scale sustainably.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-left">
                <div className="bg-surface-white/10 p-5 rounded-xl border border-white/10">
                  <h4 className="font-bold text-secondary text-sm">Lagos Hub</h4>
                  <p className="text-xs text-gray-300 mt-1">Lagos, Nigeria</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Commercial & Talent Operations</p>
                </div>
                <div className="bg-surface-white/10 p-5 rounded-xl border border-white/10">
                  <h4 className="font-bold text-secondary text-sm">Global Reach</h4>
                  <p className="text-xs text-gray-300 mt-1">UK, North America & Beyond</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Cross-Border Market Strategy</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-300">
                Want to partner with us or explore an engagement?
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-secondary text-primary font-bold text-xs hover:bg-secondary-hover transition-colors"
              >
                <span>Get in Touch</span>
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
