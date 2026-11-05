"use client";

import { useState } from "react";
import { Users, Shield, Building2, Terminal, Plus, Search, CheckCircle2 } from "lucide-react";
import { UserRole } from "@/types/database";

interface ManagedUser {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  organization?: string;
  status: "active" | "invited";
  created_at: string;
}

const mockUsers: ManagedUser[] = [
  {
    id: "usr-1",
    email: "tunde@apexpay.io",
    role: "business",
    full_name: "Tunde Balogun",
    organization: "ApexPay Technologies",
    status: "active",
    created_at: "2026-10-12",
  },
  {
    id: "usr-2",
    email: "david.k@growthspecialists.io",
    role: "talent",
    full_name: "David K.",
    organization: "Senior Growth Lead (Accredited)",
    status: "active",
    created_at: "2026-10-10",
  },
  {
    id: "usr-3",
    email: "folake@omnicart.co",
    role: "business",
    full_name: "Folake Davies",
    organization: "OmniCart Lifestyle Group",
    status: "invited",
    created_at: "2026-10-25",
  },
  {
    id: "usr-4",
    email: "amara.o@retention.studio",
    role: "talent",
    full_name: "Amara O.",
    organization: "Shopify Retention Specialist",
    status: "active",
    created_at: "2026-10-14",
  },
  {
    id: "usr-5",
    email: "admin@xcglobalhq.com",
    role: "admin",
    full_name: "Adebayo Ogunlesi",
    organization: "XC Global Limited",
    status: "active",
    created_at: "2026-10-01",
  },
];

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter((u) => {
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesSearch =
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (u.organization && u.organization.toLowerCase().includes(search.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Directory & RBAC
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            User Accounts & Roles
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Audit registered businesses on GrowthOS, accredited talents on TalentOS, and administrative staff.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["all", "business", "talent", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                roleFilter === r
                  ? "bg-primary text-white"
                  : "bg-surface-white border border-border text-text-secondary hover:bg-surface-container-low"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or company..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 bg-surface-white"
        />
      </div>

      <div className="bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px] bg-surface-container-low/50">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role / Portal</th>
                <th className="py-3.5 px-4">Organization / Specialty</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-text-primary block">{user.full_name}</span>
                    <span className="text-[11px] text-text-muted">{user.email}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        user.role === "admin"
                          ? "bg-primary text-white"
                          : user.role === "talent"
                          ? "bg-badge-gold-bg text-badge-gold-text"
                          : "bg-surface-container text-text-primary border border-border/80"
                      }`}
                    >
                      {user.role === "admin" && <Shield className="w-3 h-3 text-secondary" />}
                      {user.role === "talent" && <Terminal className="w-3 h-3 text-accent-gold" />}
                      {user.role === "business" && <Building2 className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary font-medium">
                    {user.organization || "—"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        user.status === "active"
                          ? "bg-status-success/10 text-status-success"
                          : "bg-status-warning/10 text-status-warning"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-text-muted font-mono">
                    {user.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

