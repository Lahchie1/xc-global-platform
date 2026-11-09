"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Shield,
  Building2,
  User,
  Search,
  CheckCircle2,
  Loader2,
  Mail,
  ChevronDown,
  X,
  Crown,
  BookOpen,
  Wrench,
} from "lucide-react";
import { UserRole, AdminLevel } from "@/types/database";

interface ManagedUser {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  organization?: string;
  admin_level?: AdminLevel | null;
  status: "active" | "invited";
  created_at: string;
}

type TabType = "all" | "business" | "talent" | "admin";

const ADMIN_LEVEL_LABELS: Record<AdminLevel, { label: string; icon: React.ElementType; color: string }> = {
  super_admin: { label: "Super Admin", icon: Crown, color: "text-accent-gold bg-accent-gold/10 border-accent-gold/30" },
  service_admin: { label: "Service Admin", icon: Wrench, color: "text-secondary bg-secondary/10 border-secondary/30" },
  reader_admin: { label: "Reader Admin", icon: BookOpen, color: "text-text-muted bg-surface-container border-border" },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("business");
  const [search, setSearch] = useState("");
  const [grantModal, setGrantModal] = useState<{ user: ManagedUser } | null>(null);
  const [grantRole, setGrantRole] = useState<UserRole>("admin");
  const [grantAdminLevel, setGrantAdminLevel] = useState<AdminLevel>("reader_admin");
  const [grantLoading, setGrantLoading] = useState(false);
  const [grantSuccess, setGrantSuccess] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load users");
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
    const matchesTab = activeTab === "all" || u.role === activeTab;
    const matchesSearch =
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.organization || "").toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: users.length,
    business: users.filter((u) => u.role === "business").length,
    talent: users.filter((u) => u.role === "talent").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  const handleGrantAccess = async () => {
    if (!grantModal) return;
    setGrantLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: grantModal.user.id,
          role: grantRole,
          admin_level: grantRole === "admin" ? grantAdminLevel : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setGrantSuccess(true);
      await fetchUsers();
      setTimeout(() => {
        setGrantModal(null);
        setGrantSuccess(false);
      }, 1500);
    } catch (err: any) {
      alert(err?.message || "Failed to update user role");
    } finally {
      setGrantLoading(false);
    }
  };

  const tabs: { key: TabType; label: string; icon: React.ElementType }[] = [
    { key: "business", label: "Business Users", icon: Building2 },
    { key: "talent", label: "Talent Users", icon: User },
    { key: "admin", label: "Admins & Staff", icon: Shield },
    { key: "all", label: "All Accounts", icon: Users },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Directory &amp; RBAC
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            User Accounts &amp; Roles
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Manage business accounts on GrowthOS, talent accounts on TalentOS, and administrative staff from the live database.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors -mb-px ${
              activeTab === key
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
            <span
              className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                activeTab === key ? "bg-primary text-white" : "bg-surface-container text-text-muted"
              }`}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search bar */}
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
          Showing <strong>{filtered.length}</strong> of <strong>{users.length}</strong> users
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="w-7 h-7 text-secondary animate-spin" />
          <p className="text-xs text-text-muted font-medium">Fetching user directory from database...</p>
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
      ) : filtered.length === 0 ? (
        <div className="bg-surface-white rounded-2xl border border-border p-12 text-center space-y-2">
          <Users className="w-10 h-10 text-text-muted mx-auto" />
          <h3 className="text-base font-bold text-text-primary">No users found</h3>
          <p className="text-xs text-text-muted">
            {search ? "No users match your search." : `No ${activeTab === "all" ? "" : activeTab + " "}users registered yet.`}
          </p>
        </div>
      ) : (
        <div className="bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-surface-container-low/50 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">
                  {activeTab === "talent"
                    ? "Headline"
                    : activeTab === "business"
                    ? "Company"
                    : "Organization / Headline"}
                </th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((u) => {
                const RoleIcon =
                  u.role === "business" ? Building2 : u.role === "talent" ? User : Shield;

                const roleBadgeClass =
                  u.role === "admin"
                    ? "bg-accent-gold/15 text-text-primary border-accent-gold/30"
                    : u.role === "talent"
                    ? "bg-badge-gold-bg text-badge-gold-text border-badge-gold-text/20"
                    : "bg-surface-container text-text-primary border-border";

                const adminInfo = u.role === "admin" && u.admin_level
                  ? ADMIN_LEVEL_LABELS[u.admin_level]
                  : null;

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
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border w-fit ${roleBadgeClass}`}
                        >
                          <RoleIcon className="w-3 h-3" />
                          <span>{u.role}</span>
                        </span>
                        {adminInfo && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border w-fit ${adminInfo.color}`}>
                            <adminInfo.icon className="w-2.5 h-2.5" />
                            {adminInfo.label}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-text-secondary font-medium">
                      {u.organization || "—"}
                    </td>

                    <td className="py-4 px-4 text-text-muted">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : "N/A"}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => {
                          setGrantModal({ user: u });
                          setGrantRole(u.role);
                          setGrantAdminLevel(
                            (u.admin_level as AdminLevel) || "reader_admin"
                          );
                          setGrantSuccess(false);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border text-[11px] font-semibold text-text-secondary hover:bg-surface-container-low hover:text-text-primary transition-colors"
                      >
                        <Shield className="w-3 h-3" />
                        Manage Access
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Grant Admin Access Modal */}
      {grantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface-white rounded-2xl border border-border shadow-xl w-full max-w-sm p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary">Manage Access</h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {grantModal.user.full_name || grantModal.user.email}
                </p>
              </div>
              <button
                onClick={() => setGrantModal(null)}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {grantSuccess ? (
              <div className="py-6 flex flex-col items-center gap-3 text-center">
                <CheckCircle2 className="w-8 h-8 text-status-success" />
                <p className="text-xs font-semibold text-text-primary">Access updated successfully</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-text-muted">Role</label>
                    <select
                      value={grantRole}
                      onChange={(e) => setGrantRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                    >
                      <option value="business">Business</option>
                      <option value="talent">Talent</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {grantRole === "admin" && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-text-muted">Admin Level</label>
                      <select
                        value={grantAdminLevel}
                        onChange={(e) => setGrantAdminLevel(e.target.value as AdminLevel)}
                        className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                      >
                        <option value="super_admin">Super Admin — Full access, can grant/revoke admin access</option>
                        <option value="service_admin">Service Admin — Can manage users & submissions</option>
                        <option value="reader_admin">Reader Admin — Read-only access</option>
                      </select>
                      <div className="mt-2 p-3 rounded-lg bg-surface-container-low text-[11px] text-text-muted space-y-1">
                        {grantAdminLevel === "super_admin" && <p>🔑 Full platform access. Can grant or revoke admin permissions for any user.</p>}
                        {grantAdminLevel === "service_admin" && <p>🔧 Can review submissions, manage users and content. Cannot grant admin access.</p>}
                        {grantAdminLevel === "reader_admin" && <p>📖 Read-only access to all dashboards. No write or action permissions.</p>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setGrantModal(null)}
                    className="flex-1 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-container-low transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGrantAccess}
                    disabled={grantLoading}
                    className="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {grantLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
