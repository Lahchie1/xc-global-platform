import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Palette,
  Layers,
  Sparkles,
  FileText,
  Presentation,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Eye,
  PenTool,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branding & Creative Services | XC Global Limited",
  description:
    "Distinctive brand strategy, visual identity systems, comprehensive brand guidelines, pitch deck design, and high-impact marketing collateral.",
};

export default function BrandingCreativePage() {
  const offerings = [
    {
      title: "Brand Strategy & Positioning",
      description:
        "Define your core reason for being, articulate your unique value proposition, and carve out an unmistakable market position that commands attention.",
      deliverables: [
        "Brand purpose, vision & core mission statements",
        "Market positioning & competitive differentiation",
        "Audience persona mapping & emotional drivers",
        "Tone of voice, key messaging & copywriting pillars",
      ],
      icon: Sparkles,
    },
    {
      title: "Logo & Visual Identity Systems",
      description:
        "Craft timeless logos and flexible visual design systems that look striking across mobile screens, billboards, web apps, and printed collateral.",
      deliverables: [
        "Primary logo, logomark, secondary badges & favicons",
        "Color palette psychology & accessible contrast scales",
        "Typographic hierarchy & font pairings",
        "Iconography & dynamic graphic asset libraries",
      ],
      icon: PenTool,
    },
    {
      title: "Comprehensive Brand Guidelines",
      description:
        "The complete rulebook for your brand, ensuring every internal team member and external partner represents your business with pristine consistency.",
      deliverables: [
        "Digital brand guideline document (Figma & PDF)",
        "Clear usage rules, spacing & clear-space specifications",
        "Color reproduction codes (HEX, RGB, CMYK, Pantone)",
        "Photography styling & visual tone rules",
      ],
      icon: Layers,
    },
    {
      title: "Pitch Decks & Investor Presentations",
      description:
        "Compelling narrative architecture and publication-grade deck designs that help founders raise capital and secure enterprise partnerships.",
      deliverables: [
        "Investor seed & Series A/B narrative decks",
        "Enterprise sales & partnership pitch decks",
        "Data visualization, charts & product mockups",
        "Editable Google Slides & Keynote templates",
      ],
      icon: Presentation,
    },
    {
      title: "Marketing Collateral & Print Stationery",
      description:
        "Professional offline and physical collateral that reinforces your institutional credibility in client meetings and industry conferences.",
      deliverables: [
        "Executive business cards & corporate letterheads",
        "One-pagers, brochures & case study templates",
        "Conference booth graphics & retractable banners",
        "Packaging, merchandise & branded swag design",
      ],
      icon: FileText,
    },
    {
      title: "Social Media Brand Kits & Creative Direction",
      description:
        "Turn your digital presence into a cohesive visual experience with on-brand templates, motion graphics, and overarching campaign creative direction.",
      deliverables: [
        "Instagram, LinkedIn & X post/story Figma templates",
        "Cover artwork, profile banners & highlight icons",
        "Creative campaign concepts & storyboard direction",
        "Video bumper & motion graphic design elements",
      ],
      icon: Eye,
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
                Practice 02 &bull; Core Service
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
                Branding &amp; Creative Services
              </h1>
              <p className="text-lg sm:text-xl font-medium text-accent-gold">
                Build a distinctive, coherent brand foundation that builds immediate trust and authority.
              </p>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed pt-2">
                A great product without a distinctive brand gets lost in the noise. We build identity systems, guidelines, investor decks, and creative collateral that communicate quality, inspire confidence in customers, and give your sales and marketing teams the assets they need to win.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-container transition-all shadow-sm group"
                >
                  <span>Build Your Brand Foundation</span>
                  <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-low text-text-primary border border-border text-xs sm:text-sm font-semibold hover:bg-surface-container transition-all"
                >
                  <span>Request Creative Portfolio</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Creative Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Full-Spectrum Brand Craft
            </h2>
            <p className="text-sm text-text-secondary max-w-2xl">
              From foundational strategy to polished investor pitch decks, we ensure every touchpoint reflects excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, idx) => {
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

        {/* Why Branding Matters with XC Global */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-14 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                  Strategic Advantage
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  Designed for Conversion, Not Just Decoration
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  We bridge the gap between creative visual artistry and hard-headed commercial performance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-border/70 space-y-2.5">
                <h3 className="text-base font-bold text-text-primary">
                  Positioning Clarity
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Eliminate confusion. When buyers, partners, or investors encounter your brand, they instantly grasp who you are and why you lead.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-border/70 space-y-2.5">
                <h3 className="text-base font-bold text-text-primary">
                  Enterprise-Grade Polish
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Whether presenting to institutional investors or enterprise clients, every slide, doc, and digital asset reflects world-class execution standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-primary text-white rounded-3xl p-8 sm:p-14 border border-secondary/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Elevate Your Brand?</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Let&apos;s create an identity that stands out and sells.
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Partner with XC Global to establish a memorable, credible, and scalable brand presence across all channels.
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
                Book Discovery Call
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

