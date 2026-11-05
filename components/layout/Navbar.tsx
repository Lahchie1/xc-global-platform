"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Industries", href: "/industries" },
  { name: "About Us", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

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
          className="hidden lg:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
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
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <nav
            className="flex flex-col space-y-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
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
              className="w-full py-3 rounded-lg bg-surface-container-low text-text-primary border border-border text-center font-medium text-sm hover:bg-surface-container transition-colors"
            >
              Join as Talent
            </Link>
            <Link
              href="/login"
              className="w-full py-2.5 text-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Client Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
