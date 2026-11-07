"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Shield,
  Building2,
  Terminal,
  Search,
  CheckCircle2,
  Loader2,
  Mail,
  Calendar,
} from "lucide-react";
import { UserRole } from "@/types/database";

interface ManagedUser {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  organization?: string;
  status: "active" | "invited";
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load users");
      }

      setUsers(data.users || []);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesSearch =
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.organization || "").toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Directory &amp; RBAC
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            User Accounts &amp; Roles
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Audit registered businesses on GrowthOS, accredited talents on TalentOS, and administrative staff from the live database.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 bg-surface-white"
          />
        </div>

        <div className="text-xs text-text-muted">
          Showing <strong>{filtered.length}</strong> of <strong>{users.length}</strong> active users
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="w-7 h-7 text-secondary animate-spin" />
          <p className="text-xs text-text-muted font-medium">Fetching real user directory from database...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-status-error/10 border border-status-error/20 text-status-error text-xs">
          <p className="font-bold">Failed to load directory</p>
          <p className="mt-1">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-3 px-4 py-1.5 rounded-lg bg-status-error text-white font-semibold text-xs"
          >
            Retry
          </button>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-surface-white rounded-2xl border border-border p-12 text-center space-y-2">
          <Users className="w-10 h-10 text-text-muted mx-auto" />
          <h3 className="text-base font-bold text-text-primary">No users found</h3>
          <p className="text-xs text-text-muted">No user accounts exist in the database yet.</p>
        </div>
      ) : (
        <div className="bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-container-low/50 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Organization / Headline</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((u) => {
                const RoleIcon =
                  u.role === "business"
                    ? Building2
                    : u.role === "talent"
                    ? Terminal
                    : Shield;

                const roleBadgeClass =
                  u.role === "admin"
                    ? "bg-accent-gold/15 text-text-primary border-accent-gold/30"
                    : u.role === "talent"
                    ? "bg-badge-gold-bg text-badge-gold-text border-badge-gold-text/20"
                    : "bg-surface-container text-text-primary border-border";

                return (
                  <tr key={u.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs text-text-primary shrink-0">
                          {(u.full_name || u.email || "U").substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">
                            {u.full_name || "Account User"}
                          </p>
                          <p className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{u.email}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${roleBadgeClass}`}
                      >
                        <RoleIcon className="w-3 h-3" />
                        <span>{u.role}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-text-secondary font-medium">
                      {u.organization || "Direct Access"}
                    </td>

                    <td className="py-4 px-4 text-text-muted">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : "N/A"}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-status-success/10 text-status-success">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
