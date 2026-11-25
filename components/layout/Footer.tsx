import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NewsletterSection } from "./NewsletterSection";

// Social Media SVGs
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/xcglobal/",
      icon: LinkedInIcon,
      hoverClass: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/xcglobalhq",
      icon: InstagramIcon,
      hoverClass: "hover:text-[#E4405F] hover:bg-[#E4405F]/10",
    },
    {
      name: "Facebook",
      href: "http://facebook.com/xcglobalhq",
      icon: FacebookIcon,
      hoverClass: "hover:text-[#1877F2] hover:bg-[#1877F2]/10",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@xcglobalhq",
      icon: TikTokIcon,
      hoverClass: "hover:text-[#000000] hover:bg-black/10 dark:hover:text-white",
    },
  ];

  return (
    <footer className="border-t border-border bg-surface-white">
      {/* Email Signup Section before main footer */}
      <NewsletterSection />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block" aria-label="XC Global Home">
              <Logo variant="dark" type="complete" height={38} />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              XC Global Limited is a marketing agency and tech-focused talent firm. We help businesses scale through marketing services, branding, talent placement, and team integration programmes.
            </p>
            <div className="pt-2 space-y-1 text-xs text-text-muted">
              <p className="font-semibold text-text-primary">Operating Hubs</p>
              <p>HQ: Lagos, Nigeria</p>
              <p>International Office: Delhi, India</p>
            </div>

            {/* Social Media Links */}
            <div className="pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`XC Global on ${s.name}`}
                      title={s.name}
                      className={`w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-text-secondary transition-all ${s.hoverClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Services Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services/marketing-growth" className="text-text-secondary hover:text-text-primary transition-colors">
                  Marketing &amp; Growth
                </Link>
              </li>
              <li>
                <Link href="/services/branding-creative" className="text-text-secondary hover:text-text-primary transition-colors">
                  Branding &amp; Creative
                </Link>
              </li>
              <li>
                <Link href="/services/talent-solutions" className="text-text-secondary hover:text-text-primary transition-colors">
                  Talent Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/training-integration" className="text-text-secondary hover:text-text-primary transition-colors">
                  Marketing Training
                </Link>
              </li>
              {/* Item 8: Company Registration placed right before Industries We Serve */}
              <li>
                <Link href="/services/business-registration" className="text-text-secondary hover:text-text-primary transition-colors font-medium">
                  Company Registration
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-text-secondary hover:text-text-primary transition-colors">
                  Industries We Serve
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Portals
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/login?redirect=%2Fgrowth-os" className="text-text-secondary hover:text-text-primary flex items-center gap-1 group transition-colors">
                  <span>GrowthOS (Firms)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/login?redirect=%2Ftalent-os" className="text-text-secondary hover:text-text-primary flex items-center gap-1 group transition-colors">
                  <span>TalentOS (Talents)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/onboarding" className="text-text-secondary hover:text-text-primary transition-colors">
                  Work With Us
                </Link>
              </li>
              <li>
                <Link href="/register?role=talent" className="text-text-secondary hover:text-text-primary transition-colors">
                  Join as Talent
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-text-secondary hover:text-text-primary transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">
                  About XC Global
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-text-primary transition-colors">
                  Blog &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/2348086457842"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors font-medium"
                >
                  +2348086457842 (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@xcglobalhq.com"
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  hello@xcglobalhq.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} XC Global Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">
              Terms of Service
            </Link>
            <Link href="/unsubscribe" className="hover:text-text-secondary transition-colors">
              Unsubscribe
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
