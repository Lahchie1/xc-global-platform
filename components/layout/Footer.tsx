import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block" aria-label="XC Global Home">
              <Logo variant="dark" type="complete" height={38} />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              XC Global Limited is a marketing agency and tech-focused talent firm. We help businesses scale through marketing services, branding, talent placement, and team integration programmes.
            </p>
          </div>

          {/* Services Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">
                  Marketing &amp; Growth
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">
                  Branding &amp; Creative
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">
                  Talent Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-text-secondary hover:text-text-primary transition-colors">
                  Marketing Training
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
                <Link href="/growth-os" className="text-text-secondary hover:text-text-primary flex items-center gap-1 group transition-colors">
                  <span>GrowthOS (Firms)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/talent-os" className="text-text-secondary hover:text-text-primary flex items-center gap-1 group transition-colors">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
