import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  CreditCard,
  ShoppingBag,
  Cpu,
  Boxes,
  Activity,
  ArrowRight,
  ShieldCheck,
  Building,
  Globe2,
  GraduationCap,
  Users,
  Megaphone,
  Landmark,
} from "lucide-react";

export const metadata = {
  title: "Industries We Serve",
  description:
    "XC Global works with technology-focused businesses across Fintech, E-commerce, SaaS, AI, Web3, Online Marketplaces, IT Services, HR Firms, EdTech, Marketing Agencies, and Digital Asset Companies.",
};

export default function IndustriesPage() {
  const industries = [
    {
      icon: CreditCard,
      title: "Fintech",
      subtitle: "Neo-banking, Payments, Remittance & Lending",
      description:
        "Fintech customer acquisition requires navigating high compliance barriers, establishing instant trust, and balancing CAC with transacting volumes. We help fintech businesses grow their active user base efficiently.",
      highlights: [
        "KYC conversion funnel optimisation",
        "High-trust paid media for financial products",
        "CAC-to-deposit and active user growth strategies",
      ],
    },
    {
      icon: ShoppingBag,
      title: "E-commerce",
      subtitle: "DTC Brands, Online Retailers & Shopify Merchants",
      description:
        "We help e-commerce brands build multi-channel acquisition strategies, improve store conversion, and develop retention programmes that drive repeat purchases and long-term revenue growth.",
      highlights: [
        "Shopify store development and conversion optimisation",
        "Paid media across Meta, TikTok, and Google",
        "Email and retention marketing via Klaviyo",
      ],
    },
    {
      icon: Building,
      title: "SaaS",
      subtitle: "B2B & B2C Software Products",
      description:
        "We align marketing with pipeline growth and ARR targets. From self-serve product-led funnels to sales-assisted enterprise acquisition, we help SaaS businesses attract and convert the right customers.",
      highlights: [
        "Trial-to-paid activation strategies",
        "Demand generation and inbound marketing",
        "Account-based marketing for enterprise deals",
      ],
    },
    {
      icon: Cpu,
      title: "AI",
      subtitle: "AI Applications, APIs & Machine Learning Tools",
      description:
        "AI products face intense competition and technically sophisticated audiences. We help AI companies communicate their value clearly, build developer and enterprise audiences, and grow adoption.",
      highlights: [
        "Technical content marketing and thought leadership",
        "Developer community building and product onboarding",
        "Enterprise lead generation and pilot acquisition",
      ],
    },
    {
      icon: Boxes,
      title: "Web3",
      subtitle: "Protocols, DeFi, NFT & Consumer Crypto",
      description:
        "We help Web3 and digital asset companies build genuine user communities, communicate real product value, and develop sustainable acquisition strategies beyond speculation-driven growth.",
      highlights: [
        "Community-to-user onboarding programmes",
        "Narrative building for institutional and retail audiences",
        "Cross-border digital asset marketing",
      ],
    },
    {
      icon: Globe2,
      title: "Online Marketplaces",
      subtitle: "B2B & B2C Platforms, Aggregators & Exchanges",
      description:
        "Marketplace growth requires solving a dual-sided acquisition challenge. We help marketplaces attract both supply and demand while optimising for the metrics that drive platform health.",
      highlights: [
        "Supply and demand side acquisition strategy",
        "Platform engagement and retention programmes",
        "Multi-market and cross-border expansion",
      ],
    },
    {
      icon: Landmark,
      title: "IT Services",
      subtitle: "Managed Services, Consulting & Technology Solutions",
      description:
        "We help IT services firms build stronger market positioning, generate qualified leads, and develop the marketing capabilities that support business development and client acquisition.",
      highlights: [
        "Lead generation and pipeline marketing",
        "Thought leadership and content marketing",
        "Account-based marketing for enterprise clients",
      ],
    },
    {
      icon: Users,
      title: "HR Firms",
      subtitle: "Recruitment, Staffing & Talent Solutions",
      description:
        "HR and talent firms need to attract both clients and candidates simultaneously. We help HR businesses build their brand, generate client leads, and develop marketing strategies that support business growth.",
      highlights: [
        "B2B lead generation for recruitment firms",
        "Employer brand and candidate attraction marketing",
        "Digital marketing for HR technology platforms",
      ],
    },
    {
      icon: GraduationCap,
      title: "EdTech",
      subtitle: "Online Education, eLearning & Professional Development",
      description:
        "EdTech marketing requires building trust, communicating learning outcomes clearly, and converting interested learners into enrolled students. We help EdTech businesses grow enrolments and improve learner retention.",
      highlights: [
        "Student acquisition and enrolment marketing",
        "Content marketing and SEO for educational brands",
        "Lifecycle marketing to improve course completion",
      ],
    },
    {
      icon: Megaphone,
      title: "Marketing Agencies",
      subtitle: "Digital Agencies, Creative Studios & Consultancies",
      description:
        "Marketing agencies need to grow their own client base while delivering for others. We help agencies build stronger positioning, generate inbound leads, and develop the marketing systems that support new business growth.",
      highlights: [
        "Agency positioning and differentiation strategy",
        "Lead generation and new business development",
        "Marketing systems and operational support",
      ],
    },
    {
      icon: Boxes,
      title: "Digital Asset Companies",
      subtitle: "Crypto Exchanges, Wallets & Blockchain Infrastructure",
      description:
        "Digital asset companies operate in a fast-moving, regulatory-sensitive environment. We help digital asset businesses build credible brands, grow user bases, and navigate marketing in a complex landscape.",
      highlights: [
        "Compliant digital marketing for regulated markets",
        "User acquisition and retention for exchanges and wallets",
        "Brand credibility and community building",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background">
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold uppercase tracking-wider mb-4">
            Focus Industry: Technology
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary max-w-3xl mx-auto leading-tight">
            We work with technology-focused businesses across 11 sectors.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Our services are built for the unique growth challenges of tech businesses. Whether you are a founder scaling your first product or an established company entering new markets, we understand your sector.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div
                  key={i}
                  className="bg-surface-white rounded-xl p-8 border border-border shadow-card hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6 text-accent-gold" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-text-primary">
                        {ind.title}
                      </h2>
                      <p className="text-xs font-semibold text-text-muted mt-0.5">
                        {ind.subtitle}
                      </p>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {ind.description}
                    </p>
                    <div className="pt-2 border-t border-border/60">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-primary mb-2">
                        How we help:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-text-secondary">
                        {ind.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/40">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary hover:text-accent-gold transition-colors"
                    >
                      <span>Talk to us about your sector</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 text-center">
          <div className="bg-primary rounded-2xl p-10 border border-border space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
              Work With Us
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Working in a sector we haven&apos;t listed?
            </h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto">
              If your business is technology-focused and needs marketing, growth, or talent support — we would like to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-primary text-xs font-bold hover:bg-secondary/90 transition-colors shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
