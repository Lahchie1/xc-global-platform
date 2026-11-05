"use client";

import { PortalShell } from "@/components/layout/PortalShell";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileCheck,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { name: "Specialist Dashboard", href: "/talent-os", icon: LayoutDashboard },
  { name: "Specialist Profile & CV", href: "/talent-os/profile", icon: User },
  { name: "Curated Opportunities", href: "/talent-os/opportunities", icon: Briefcase },
  { name: "My Applications", href: "/talent-os/applications", icon: FileCheck },
  { name: "Account Settings", href: "/talent-os/settings", icon: Settings },
];

export default function TalentOSLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      navItems={navItems}
      portalName="TalentOS"
      portalSubtitle="Specialist Console"
      userBadge={{ initials: "DK", name: "David K.", subtitle: "Vetted · Top 3%" }}
      footerExtra={
        <div className="flex items-center gap-1.5 px-1 py-1">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" />
          <span className="text-[11px] font-semibold text-badge-gold-text">Vetted Specialist</span>
        </div>
      }
    >
      {children}
    </PortalShell>
  );
}
