"use client";

import { useState } from "react";
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
} from "lucide-react";
import { ApplicationStatus } from "@/types/database";

interface SubmissionItem {
  id: string;
  company_name: string;
  website: string;
  industry: string;
  company_size: string;
  location: string;
  contact_name: string;
  contact_title: string;
  contact_email: string;
  contact_phone: string;
  services_interested: string[];
  challenge_description: string;
  how_heard: string;
  status: ApplicationStatus;
  created_at: string;
}

const mockSubmissions: SubmissionItem[] = [
  {
    id: "sub-1",
    company_name: "ApexPay Technologies Limited",
    website: "https://apexpay.io",
    industry: "Fintech & Payments",
    company_size: "11-50 employees",
    location: "Lagos, Nigeria & London, UK",
    contact_name: "Tunde Balogun",
    contact_title: "Founder & CEO",
    contact_email: "tunde@apexpay.io",
    contact_phone: "+234 801 234 5678",
    services_interested: ["Growth & Performance Marketing", "Attribution & Data Pipeline Setup"],
    challenge_description:
      "Scaling customer acquisition across Nigerian and UK corridors while maintaining first-transaction payback under 45 days. Seeking embedded growth lead.",
    how_heard: "Founder Referral",
    status: "accepted" as ApplicationStatus,
    created_at: "2026-10-12T14:30:00Z",
  },
  {
    id: "sub-2",
    company_name: "OmniCart Lifestyle Group",
    website: "https://omnicart.co",
    industry: "E-Commerce & DTC",
    company_size: "11-50 employees",
    location: "London, UK",
    contact_name: "Folake Davies",
    contact_title: "Head of Digital Growth",
    contact_email: "folake@omnicart.co",
    contact_phone: "+44 20 7946 0912",
    services_interested: ["Conversion Rate Optimization (CRO)", "Vetted Talent Placement (Embedded)"],
    challenge_description:
      "Shopify Plus theme overhaul and post-purchase automated re-engagement flows to boost repeat orders.",
    how_heard: "LinkedIn",
    status: "reviewed" as ApplicationStatus,
    created_at: "2026-10-25T11:15:00Z",
  },
  {
    id: "sub-3",
    company_name: "Synthetix Protocols",
    website: "https://synthetix.org",
    industry: "Web3 & Crypto",
    company_size: "1-10 employees",
    location: "Zug, Switzerland / Remote",
    contact_name: "Liam Thorne",
    contact_title: "Ecosystem Lead",
    contact_email: "liam@synthetix.org",
    contact_phone: "+41 41 555 1234",
    services_interested: ["Fractional CMO / Executive Advisory", "Marketing Training & Squad Upskilling"],
    challenge_description:
      "Developer community acquisition and narrative repositioning ahead of mainnet token migration.",
    how_heard: "Search / Web",
    status: "pending" as ApplicationStatus,
    created_at: "2026-10-30T09:40:00Z",
  },
  {
    id: "sub-4",
    company_name: "CortexAI Health Systems",
    website: "https://cortexai.health",
    industry: "AI & HealthTech",
    company_size: "11-50 employees",
    location: "Nairobi, Kenya",
    contact_name: "Dr. Zainab Aliyu",
    contact_title: "Managing Director",
    contact_email: "zainab@cortexai.health",
    contact_phone: "+254 700 123456",
    services_interested: ["Growth & Performance Marketing", "Vetted Talent Placement (Embedded)"],
    challenge_description:
      "Enterprise clinic acquisition for AI diagnostics assistant with HIPAA / NDPR compliance tracking.",
    how_heard: "Event / Conference",
    status: "pending" as ApplicationStatus,
    created_at: "2026-10-31T08:20:00Z",
  },
];

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(mockSubmissions);
  const [selectedId, setSelectedId] = useState<string>(mockSubmissions[0].id);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = submissions.filter((s) => {
    const matchesFilter = statusFilter === "all" || s.status === statusFilter;
    const matchesSearch =
      s.company_name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact_email.toLowerCase().includes(search.toLowerCase()) ||
      s.contact_name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const selected = submissions.find((s) => s.id === selectedId) || submissions[0];

  const handleUpdateStatus = (status: ApplicationStatus) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === selectedId ? { ...s, status } : s))
    );
  };

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
            Review applicant companies, inspect commercial briefs, and provision GrowthOS access.
          </p>
        </div>

        <div className="flex items-center gap-2">
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

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by company, contact person or email..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 bg-surface-white"
        />
      </div>

      {/* Main Split: Submissions Table on Left, Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Submissions List */}
        <div className="lg:col-span-7 bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="px-6 py-4 bg-surface-container-low/40 border-b border-border flex items-center justify-between text-[11px] text-text-muted font-bold uppercase tracking-wider">
            <span>Company & Contact</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-border">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`px-6 py-5 cursor-pointer transition-all flex items-center justify-between gap-6 group relative ${
                  selectedId === item.id
                    ? "bg-surface-container-low/70 border-l-4 border-l-primary pl-5"
                    : "hover:bg-surface-container-low/40 border-l-4 border-l-transparent pl-5"
                }`}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors">
                    {item.company_name}
                  </h4>
                  <p className="text-xs text-text-secondary truncate">
                    <span className="font-medium text-text-primary">{item.contact_name}</span>{" "}
                    <span className="text-text-muted">({item.contact_email})</span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-text-muted pt-0.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container-low border border-border/70 text-[11px] font-medium text-text-secondary">
                      {item.industry}
                    </span>
                    <span className="text-text-muted/60">•</span>
                    <span className="text-[11px]">{item.company_size}</span>
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
            ))}
          </div>
        </div>

        {/* Selected Details Inspector */}
        <div className="lg:col-span-5 bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between border-b border-border pb-4">
            <div>
              <span className="text-xs font-bold uppercase text-accent-gold">
                Submission Dossier
              </span>
              <h3 className="text-xl font-bold text-text-primary mt-1">
                {selected.company_name}
              </h3>
              <a
                href={selected.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-text-muted hover:underline flex items-center gap-1 mt-0.5"
              >
                <Globe className="w-3 h-3" />
                <span>{selected.website}</span>
              </a>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
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
            <div>
              <span className="font-bold uppercase tracking-wider text-text-muted block mb-1">
                Primary Contact Information
              </span>
              <div className="p-3 rounded-xl bg-surface-container-low border border-border/60 space-y-1">
                <p className="font-bold text-text-primary">
                  {selected.contact_name} ({selected.contact_title})
                </p>
                <p className="text-text-secondary">{selected.contact_email}</p>
                <p className="text-text-secondary">{selected.contact_phone}</p>
              </div>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-text-muted block mb-1">
                Services of Interest
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selected.services_interested.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-surface-container border border-border text-[11px] font-medium text-text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-text-muted block mb-1">
                Challenge & Commercial Goal
              </span>
              <p className="p-3 rounded-xl bg-surface-container-low border border-border/60 text-text-secondary leading-relaxed">
                {selected.challenge_description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-text-muted text-[11px]">
              <div>Location: <strong>{selected.location}</strong></div>
              <div>Source: <strong>{selected.how_heard}</strong></div>
            </div>
          </div>

          {/* Action Buttons to Update Status */}
          <div className="pt-4 border-t border-border space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">
              Update Application Status:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleUpdateStatus("reviewed")}
                className="py-2 px-3 rounded-lg bg-surface-container text-text-primary text-xs font-bold hover:bg-surface-container-high transition-colors"
              >
                Mark Reviewed
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("accepted")}
                className="py-2 px-3 rounded-lg bg-status-success text-white text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Accept Venture
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus("rejected")}
                className="py-2 px-3 rounded-lg bg-status-error/10 text-status-error text-xs font-bold hover:bg-status-error/20 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

