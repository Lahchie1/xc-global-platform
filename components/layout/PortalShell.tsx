"use client";

/**
 * Reusable portal layout shell — renders:
 *  - Desktop: fixed left sidebar (w-64)
 *  - Mobile: sticky top bar (brand + hamburger) + slide-down drawer
 *
 * Props mirror GrowthOS / TalentOS / Admin patterns.
 */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface UserBadge {
  initials: string;
  name: string;
  subtitle: string;
}

interface PortalShellProps {
  children: React.ReactNode;
  navItems: NavItem[];
  portalName: string;
  portalSubtitle: string;
  userBadge: UserBadge;
  /** Tailwind bg class for the sidebar, defaults to bg-surface-white */
  sidebarBg?: string;
  /** Tailwind text class for active nav item, defaults to bg-primary text-white */
  activeClass?: string;
  /** Extra node rendered below nav links (e.g. a badge card) */
  footerExtra?: React.ReactNode;
}

export function PortalShell({
  children,
  navItems,
  portalName,
  portalSubtitle,
  userBadge,
  sidebarBg = "bg-surface-white border-r border-border",
  activeClass = "bg-primary text-white",
  footerExtra,
}: PortalShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // offline fallback — continue anyway
    }
    router.push("/login");
  };

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              isActive
                ? activeClass
                : "text-text-secondary hover:bg-surface-container-low hover:text-text-primary"
            }`}
          >
            <Icon
              className={`w-4 h-4 shrink-0 ${isActive ? "opacity-80" : "text-text-muted"}`}
            />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden md:flex md:w-64 ${sidebarBg} flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto`}
        aria-label="Portal navigation"
      >
        <div>
          {/* Brand */}
          <div className="h-16 px-6 border-b border-border/60 flex items-center">
            <Link href="/" className="flex items-center gap-3" aria-label="Go to homepage">
              <Logo
                variant={sidebarBg.includes("bg-primary") ? "white" : "dark"}
                type="mark"
                height={32}
                width={32}
              />
              <div className="flex flex-col leading-tight">
                <span className={`font-bold text-sm ${sidebarBg.includes("bg-primary") ? "text-white" : "text-text-primary"}`}>{portalName}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-accent-gold">
                  {portalSubtitle}
                </span>
              </div>
            </Link>
          </div>
          {/* Nav */}
          <nav className="p-3 space-y-0.5" aria-label={`${portalName} navigation`}>
            <NavLinks />
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/60 space-y-3">
          {footerExtra}
          {/* Currency Switcher */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">Currency</span>
            <CurrencySelector variant="portal" />
          </div>
          {/* User chip */}
          <div className="p-3 rounded-xl bg-surface-container-low border border-border/70 flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
              {userBadge.initials}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-xs font-bold text-text-primary truncate">{userBadge.name}</p>
              <p className="text-[10px] text-text-muted truncate">{userBadge.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-1 text-[11px]">
            <Link
              href="/"
              className="font-medium text-text-muted hover:text-text-primary flex items-center gap-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleSignOut}
              className="font-semibold text-status-error hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Mobile Shell ── */}
      <div className="flex-1 flex flex-col min-h-screen md:hidden">
        {/* Mobile top bar */}
        <header className={`${sidebarBg} h-14 px-4 flex items-center justify-between border-b border-border sticky top-0 z-40`}>
          <Link href="/" className="flex items-center gap-2.5" aria-label="Go to homepage">
            <Logo
              variant={sidebarBg.includes("bg-primary") ? "white" : "dark"}
              type="mark"
              height={26}
              width={26}
            />
            <div className="leading-tight">
              <p className={`text-xs font-bold ${sidebarBg.includes("bg-primary") ? "text-white" : "text-text-primary"}`}>{portalName}</p>
              <p className="text-[9px] uppercase font-bold tracking-wider text-accent-gold">{portalSubtitle}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <CurrencySelector variant="compact" />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 rounded-lg text-text-primary hover:bg-surface-container transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile drawer */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-screen" : "max-h-0"} bg-surface-white border-b border-border`}
          aria-hidden={!mobileOpen}
        >
          <nav className="p-3 space-y-0.5" aria-label={`${portalName} mobile navigation`}>
            <NavLinks />
          </nav>
          <div className="px-4 pb-4 flex items-center justify-between text-[11px] border-t border-border pt-3">
            <Link href="/" className="font-medium text-text-muted hover:text-text-primary flex items-center gap-1">
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleSignOut}
              className="font-semibold text-status-error hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign out</span>
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" id="main-content">
          {children}
        </main>
      </div>

      {/* ── Desktop page content ── */}
      <main className="hidden md:block flex-1 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
