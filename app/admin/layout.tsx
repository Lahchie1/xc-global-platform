"use client";

import { PortalShell } from "@/components/layout/PortalShell";
import {
  LayoutDashboard,
  FileCheck2,
  Users,
  BookOpen,
  Shield,
} from "lucide-react";

const navItems = [
  { name: "Executive Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Onboarding Submissions", href: "/admin/submissions", icon: FileCheck2 },
  { name: "Manage Users & Roles", href: "/admin/users", icon: Users },
  { name: "Blog & Publications", href: "/admin/blog", icon: BookOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      navItems={navItems}
      portalName="XC Global"
      portalSubtitle="Admin Console"
      userBadge={{ initials: "AD", name: "Managing Director", subtitle: "Super Admin" }}
      sidebarBg="bg-primary border-r border-white/10"
      activeClass="bg-secondary text-primary font-bold"
      footerExtra={
        <div className="flex items-center gap-1.5 px-1 py-1">
          <Shield className="w-3.5 h-3.5 text-secondary" />
          <span className="text-[11px] font-semibold text-secondary">Super Admin Access</span>
        </div>
      }
    >
      {children}
    </PortalShell>
  );
}
