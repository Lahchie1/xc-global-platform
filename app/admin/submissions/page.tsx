"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileCheck2,
  Building2,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  ShieldCheck,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { ApplicationStatus } from "@/types/database";

interface SubmissionItem {
  id: string;
  company_name: string;
  website: string | null;
  industry: string | null;
  company_size: string | null;
  location: string | null;
  contact_name: string;
  contact_title: string | null;
  contact_email: string;
  contact_phone: string | null;
  services_interested: string[] | null;
  challenge_description: string | null;
  how_heard: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at?: string;
}

function SubmissionsContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams?.get("id");

  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(queryId || null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch real submissions from database
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/submissions");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load submissions.");
      }

      const list: SubmissionItem[] = data.submissions || [];
      setSubmissions(list);

      // If queryId is provided, select it; otherwise select the first item
      if (queryId && list.some((item) => item.id === queryId)) {
        setSelectedId(queryId);
      } else if (list.length > 0 && !selectedId) {
        setSelectedId(list[0].id);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load database records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Sync selectedId if queryId changes in URL
  useEffect(() => {
    if (queryId && submissions.some((s) => s.id === queryId)) {
      setSelectedId(queryId);
    }
  }, [queryId, submissions]);

  const handleUpdateStatus = async (status: ApplicationStatus) => {
    if (!selectedId) return;

    try {
      setUpdating(true);
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedId, status }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update status");
      }

      // Update local state to reflect change immediately
      setSubmissions((prev) =>
        prev.map((s) => (s.id === selectedId ? { ...s, status } : s))
      );
    } catch (err: any) {
      alert("Error updating status: " + err?.message);
    } finally {
      setUpdating(false);
    }
  };

  const filtered = submissions.filter((s) => {
    const matchesFilter = statusFilter === "all" || s.status === statusFilter;
    const matchesSearch =
      (s.company_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.contact_email || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.contact_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.industry || "").toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selected = submissions.find((s) => s.id === selectedId) || filtered[0] || null;

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Pipeline Verification
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Business Onboarding Submissions
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Review applicant companies, inspect commercial briefs, and provision GrowthOS access directly from the database.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {["all", "pending", "reviewed", "accepted", "rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                statusFilter === st
                  ? "bg-primary text-white"
                  : "bg-surface-white border border-border text-text-secondary hover:bg-surface-container-low"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input & Status Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, contact person or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 bg-surface-white"
          />
        </div>

        <div className="text-xs text-text-muted">
          Showing <strong>{filtered.length}</strong> of <strong>{submissions.length}</strong> total submissions
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="w-7 h-7 text-secondary animate-spin" />
          <p className="text-xs text-text-muted font-medium">Fetching real submissions from database...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-status-error/10 border border-status-error/20 text-status-error text-xs">
          <p className="font-bold">Failed to load submissions</p>
          <p className="mt-1">{error}</p>
          <button
            onClick={fetchSubmissions}
            className="mt-3 px-4 py-1.5 rounded-lg bg-status-error text-white font-semibold text-xs"
          >
            Retry
          </button>
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-surface-white rounded-2xl border border-border p-12 text-center space-y-3">
          <Building2 className="w-10 h-10 text-text-muted mx-auto" />
          <h3 className="text-base font-bold text-text-primary">No submissions in database yet</h3>
          <p className="text-xs text-text-muted max-w-md mx-auto">
            When businesses submit the onboarding form, their commercial briefs will appear here for review and provisioning.
          </p>
        </div>
      ) : (
        /* Main Split: Submissions Table on Left, Inspector on Right */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submissions List */}
          <div className="lg:col-span-7 bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-6 py-4 bg-surface-container-low/40 border-b border-border flex items-center justify-between text-[11px] text-text-muted font-bold uppercase tracking-wider">
              <span>Company &amp; Contact</span>
              <span>Status</span>
            </div>

            <div className="divide-y divide-border">
              {filtered.map((item) => {
                const isSelected = selected?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`px-6 py-5 cursor-pointer transition-all flex items-center justify-between gap-6 group relative ${
                      isSelected
                        ? "bg-surface-container-low/80 border-l-4 border-l-secondary pl-5 shadow-sm"
                        : "hover:bg-surface-container-low/40 border-l-4 border-l-transparent pl-5"
                    }`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors">
                          {item.company_name}
                        </h4>
                        {isSelected && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-secondary/15 text-secondary">
                            Inspecting
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary truncate">
                        <span className="font-medium text-text-primary">{item.contact_name}</span>{" "}
                        <span className="text-text-muted">({item.contact_email})</span>
                      </p>
                      <div className="flex items-center gap-2 text-xs text-text-muted pt-0.5 flex-wrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container-low border border-border/70 text-[11px] font-medium text-text-secondary">
                          {item.industry || "General"}
                        </span>
                        <span className="text-text-muted/60">•</span>
                        <span className="text-[11px]">{item.company_size || "Not specified"}</span>
                        {item.location && (
                          <>
                            <span className="text-text-muted/60">•</span>
                            <span className="text-[11px]">{item.location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 text-center min-w-[92px] ${
                        item.status === "accepted"
                          ? "bg-status-success/10 text-status-success"
                          : item.status === "reviewed"
                          ? "bg-badge-gold-bg text-badge-gold-text"
                          : item.status === "rejected"
                          ? "bg-status-error/10 text-status-error"
                          : "bg-status-warning/10 text-status-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Details Inspector */}
          {selected ? (
            <div className="lg:col-span-5 bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6 sticky top-24">
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
                    Submission Dossier
                  </span>
                  <h3 className="text-xl font-bold text-text-primary">
                    {selected.company_name}
                  </h3>
                  {selected.website && (
                    <a
                      href={selected.website.startsWith("http") ? selected.website : `https://${selected.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-secondary hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{selected.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selected.status === "accepted"
                      ? "bg-status-success/10 text-status-success"
                      : selected.status === "reviewed"
                      ? "bg-badge-gold-bg text-badge-gold-text"
                      : selected.status === "rejected"
                      ? "bg-status-error/10 text-status-error"
                      : "bg-status-warning/10 text-status-warning"
                  }`}
                >
                  {selected.status}
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Contact Information */}
                <div>
                  <span className="font-bold uppercase tracking-wider text-text-muted block mb-1.5">
                    Primary Contact Information
                  </span>
                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-border/60 space-y-1.5">
                    <p className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                      <User className="w-4 h-4 text-accent-gold" />
                      <span>{selected.contact_name}</span>
                      {selected.contact_title && (
                        <span className="text-xs font-normal text-text-muted">({selected.contact_title})</span>
                      )}
                    </p>
                    <p className="text-text-secondary flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-text-muted" />
                      <a href={`mailto:${selected.contact_email}`} className="hover:text-primary hover:underline">
                        {selected.contact_email}
                      </a>
                    </p>
                    {selected.contact_phone && (
                      <p className="text-text-secondary flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-text-muted" />
                        <a href={`tel:${selected.contact_phone}`} className="hover:text-primary hover:underline">
                          {selected.contact_phone}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Company Specs */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-surface-container-low border border-border/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                      Industry
                    </span>
                    <span className="font-semibold text-text-primary text-xs mt-0.5 block">
                      {selected.industry || "Not specified"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-low border border-border/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block">
                      Company Size
                    </span>
                    <span className="font-semibold text-text-primary text-xs mt-0.5 block">
                      {selected.company_size || "Not specified"}
                    </span>
                  </div>
                </div>

                {/* Services Requested */}
                <div>
                  <span className="font-bold uppercase tracking-wider text-text-muted block mb-1.5">
                    Services of Interest
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.services_interested && selected.services_interested.length > 0 ? (
                      selected.services_interested.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-surface-container border border-border text-[11px] font-medium text-text-primary"
                        >
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-text-muted text-xs">No specific services indicated</span>
                    )}
                  </div>
                </div>

                {/* Challenge Description */}
                <div>
                  <span className="font-bold uppercase tracking-wider text-text-muted block mb-1.5">
                    Commercial Challenge &amp; Growth Goal
                  </span>
                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-border/60 text-text-secondary leading-relaxed">
                    {selected.challenge_description || "No description provided."}
                  </div>
                </div>

                {/* Metadata details */}
                <div className="grid grid-cols-2 gap-2 text-text-muted text-[11px] pt-1">
                  <div>
                    Location: <strong className="text-text-primary">{selected.location || "N/A"}</strong>
                  </div>
                  <div>
                    Source: <strong className="text-text-primary">{selected.how_heard || "Direct"}</strong>
                  </div>
                  <div className="col-span-2">
                    Submitted: <strong className="text-text-primary">{new Date(selected.created_at).toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons to Update Status */}
              <div className="pt-4 border-t border-border space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
                  Update Application Status in Database:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => handleUpdateStatus("reviewed")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                      selected.status === "reviewed"
                        ? "bg-badge-gold-bg text-badge-gold-text border border-badge-gold-text/30"
                        : "bg-surface-container text-text-primary hover:bg-surface-container-high"
                    }`}
                  >
                    Mark Reviewed
                  </button>
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => handleUpdateStatus("accepted")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      selected.status === "accepted"
                        ? "bg-status-success text-white shadow-sm ring-2 ring-status-success/30"
                        : "bg-status-success text-white hover:opacity-90"
                    }`}
                  >
                    Accept Venture
                  </button>
                  <button
                    type="button"
                    disabled={updating}
                    onClick={() => handleUpdateStatus("rejected")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                      selected.status === "rejected"
                        ? "bg-status-error text-white"
                        : "bg-status-error/10 text-status-error hover:bg-status-error/20"
                    }`}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-5 bg-surface-white rounded-2xl border border-border p-8 text-center text-xs text-text-muted">
              Select a business from the list to inspect its dossier.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminSubmissionsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-xs text-text-muted">Loading submissions...</div>}>
      <SubmissionsContent />
    </Suspense>
  );
}
