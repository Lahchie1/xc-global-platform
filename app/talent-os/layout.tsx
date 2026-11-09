"use client";

import { useEffect, useState } from "react";
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
  { name: "Talent Dashboard", href: "/talent-os", icon: LayoutDashboard },
  { name: "Talent Profile & CV", href: "/talent-os/profile", icon: User },
  { name: "Curated Opportunities", href: "/talent-os/opportunities", icon: Briefcase },
  { name: "My Applications", href: "/talent-os/applications", icon: FileCheck },
  { name: "Account Settings", href: "/talent-os/settings", icon: Settings },
];

export default function TalentOSLayout({ children }: { children: React.ReactNode }) {
  const [badge, setBadge] = useState({
    initials: "TO",
    name: "Talent Member",
    subtitle: "Marketing Professional",
  });

  useEffect(() => {
    async function loadTalentInfo() {
      try {
        const res = await fetch("/api/talent/profile");
        if (res.ok) {
          const data = await res.json();
          const name = data.full_name || (data.email ? data.email.split("@")[0] : "Talent Member");
          const initials = name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((w: string) => w[0].toUpperCase())
            .join("") || "TO";

          setBadge({
            initials,
            name,
            subtitle: data.headline || "Talent Member",
          });
        }
      } catch (err) {
        // Fallback default
      }
    }
    loadTalentInfo();
  }, []);

  return (
    <PortalShell
      navItems={navItems}
      portalName="TalentOS"
      portalSubtitle="Talent Console"
      userBadge={badge}
      footerExtra={
        <div className="flex items-center gap-1.5 px-1 py-1">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" />
          <span className="text-[11px] font-semibold text-badge-gold-text">Vetted Talent</span>
        </div>
      }
    >
      {children}
    </PortalShell>
  );
}
