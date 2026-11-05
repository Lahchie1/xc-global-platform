"use client";

import { PortalShell } from "@/components/layout/PortalShell";
import {
  LayoutDashboard,
  Building2,
  FileCheck2,
  Briefcase,
  MessageSquare,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navItems = [
  { name: "Overview Dashboard", href: "/growth-os", icon: LayoutDashboard },
  { name: "Company Profile", href: "/growth-os/profile", icon: Building2 },
  { name: "Application Status", href: "/growth-os/status", icon: FileCheck2 },
  { name: "Services & Engagements", href: "/growth-os/services", icon: Briefcase },
  { name: "Messages & Support", href: "/growth-os/messages", icon: MessageSquare },
  { name: "Settings", href: "/growth-os/settings", icon: Settings },
];

export default function GrowthOSLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      navItems={navItems}
      portalName="GrowthOS"
      portalSubtitle="Client Portal"
      userBadge={{ initials: "AP", name: "ApexPay Ltd", subtitle: "Verified Client" }}
      footerExtra={
        <div className="flex items-center gap-1.5 px-1 py-1">
          <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
          <span className="text-[11px] font-semibold text-status-success">Verified Client</span>
        </div>
      }
    >
      {children}
    </PortalShell>
  );
}
