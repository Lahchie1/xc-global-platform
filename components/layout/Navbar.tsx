"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  User,
  ChevronDown,
  TrendingUp,
  Palette,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const majorServices = [
  {
    name: "Marketing & Growth Services",
    href: "/services/marketing-growth",
    tagline: "GTM strategy, paid acquisition, SEO & conversion systems",
    icon: TrendingUp,
  },
  {
    name: "Branding & Creative Services",
    href: "/services/branding-creative",
    tagline: "Visual identity, brand guidelines, decks & creative direction",
    icon: Palette,
  },
  {
    name: "Talent Solutions",
    href: "/services/talent-solutions",
    tagline: "Recruitment, team building & embedded growth specialists",
    icon: User,
  },
  {
    name: "Marketing Training & Team Integration",
    href: "/services/training-integration",
    tagline: "6-month structured training & workplace culture integration",
    icon: GraduationCap,
  },
];

const otherNavLinks = [
  { name: "Industries", href: "/industries" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          triggerRef.current?.focus();
        }
        if (servicesDropdownOpen) {
          setServicesDropdownOpen(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, servicesDropdownOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <header
      className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-border/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)]"
      role="banner"
    >
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="XC Global — Go to homepage"
        >
          <Logo variant="dark" type="complete" height={36} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Main navigation"
        >
          {/* Services Dropdown Item */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-1">
              <Link
                href="/services"
                className={`text-sm font-medium py-2 transition-colors flex items-center gap-1 ${
                  isServicesActive
                    ? "text-text-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
                aria-haspopup="true"
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
              </Link>
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                className={`p-1 rounded-md transition-colors ${
                  servicesDropdownOpen
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-primary"
                }`}
                aria-label="Toggle services menu"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-secondary" : ""
                  }`}
                />
              </button>
            </div>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full -left-4 w-96 pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="bg-surface-white rounded-2xl border border-border shadow-2xl p-3 space-y-1">
                  <div className="px-3 py-2 border-b border-border/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                      Our 4 Core Practices
                    </span>
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
                    >
                      <span>Overview</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="pt-1 space-y-1">
                    {majorServices.map((service) => {
                      const Icon = service.icon;
                      const isActive = pathname === service.href;
                      return (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                            isActive
                              ? "bg-surface-container-low text-text-primary"
                              : "hover:bg-surface-container-low text-text-primary"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 mt-0.5 text-accent-gold">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-text-primary leading-tight">
                              {service.name}
                            </p>
                            <p className="text-[11px] text-text-muted leading-relaxed line-clamp-1">
                              {service.tagline}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-border/60 px-3 py-2 bg-surface-container-low/50 rounded-xl">
                    <Link
                      href="/onboarding"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-center justify-between text-xs font-semibold text-text-primary hover:text-secondary transition-colors"
                    >
                      <span>Need a custom engagement?</span>
                      <span className="text-[11px] text-secondary font-bold">
                        Work With Us &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Navigation Links */}
          {otherNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-text-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/register?role=talent"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Join as Talent
          </Link>

          <Link
            href="/login"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-surface-white text-sm font-medium text-text-primary border border-border shadow-sm hover:bg-surface-container-low transition-colors"
          >
            Client Login
          </Link>

          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-container transition-all shadow-sm group"
          >
            <span>Work With Us</span>
            <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/login"
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary"
            aria-label="Login"
          >
            <User className="w-5 h-5" />
          </Link>
          <button
            ref={triggerRef}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-text-primary hover:bg-surface-container"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`lg:hidden border-b border-border bg-surface-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[85vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <nav
            className="flex flex-col space-y-1"
            aria-label="Mobile navigation"
          >
            {/* Mobile Services Accordion */}
            <div className="border-b border-border/40 pb-1">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-semibold text-text-primary hover:bg-surface-container-low transition-colors"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180 text-secondary" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="pl-3 pr-1 py-2 space-y-1 bg-surface-container-low/40 rounded-xl my-1">
                  <Link
                    href="/services"
                    className="block text-xs font-bold text-secondary uppercase tracking-wider py-1.5 px-2"
                  >
                    View All Services Overview &rarr;
                  </Link>
                  {majorServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="flex items-center gap-2.5 py-2 px-2 rounded-lg text-xs font-semibold text-text-primary hover:bg-surface-container"
                      >
                        <Icon className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                        <span>{service.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other Mobile Links */}
            {otherNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-base font-medium py-2.5 px-3 rounded-lg border-b border-border/40 transition-colors ${
                    isActive
                      ? "text-text-primary font-semibold bg-surface-container-low"
                      : "text-text-primary hover:bg-surface-container-low"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/onboarding"
              className="w-full py-3 rounded-lg bg-primary text-white text-center font-semibold text-sm shadow-sm hover:bg-primary-container transition-colors"
            >
              Work With Us
            </Link>

            <Link
              href="/register?role=talent"
              className="w-full py-3 rounded-lg bg-surface-container-low text-text-primary text-center font-semibold text-sm border border-border hover:bg-surface-container transition-colors"
            >
              Join as Talent
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
