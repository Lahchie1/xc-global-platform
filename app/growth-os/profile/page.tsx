"use client";

import { useState } from "react";
import { Building2, Save, CheckCircle2, ShieldCheck, Globe, MapPin } from "lucide-react";

export default function GrowthOSProfilePage() {
  const [profile, setProfile] = useState({
    company_name: "ApexPay Technologies Limited",
    website: "https://apexpay.io",
    industry: "Fintech & Payments",
    company_size: "11-50 employees",
    location: "Lagos, Nigeria & London, UK",
    description:
      "Cross-border remittance, business banking, and treasury rails for mid-market African businesses and diaspora corridors.",
    billing_email: "finance@apexpay.io",
    primary_contact: "Tunde Balogun (Founder & CEO)",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Organization Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Company Profile & Governance
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Manage your corporate identity and engagement parameters visible to XC Global directors.
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 text-status-success text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Updated</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Company Legal Name
            </label>
            <input
              type="text"
              required
              value={profile.company_name}
              onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Company Website
            </label>
            <input
              type="url"
              value={profile.website}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Industry Vertical
            </label>
            <select
              value={profile.industry}
              onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            >
              <option value="Fintech & Payments">Fintech & Payments</option>
              <option value="E-Commerce & DTC">E-Commerce & DTC</option>
              <option value="B2B SaaS">B2B SaaS</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Web3 & Crypto">Web3 & Crypto</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Company Sizing
            </label>
            <select
              value={profile.company_size}
              onChange={(e) => setProfile({ ...profile, company_size: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            >
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees (Series A)</option>
              <option value="51-200 employees">51-200 employees</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Headquarters Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
            Brief Company Overview
          </label>
          <textarea
            rows={4}
            value={profile.description}
            onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-border">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Primary Executive Contact
            </label>
            <input
              type="text"
              value={profile.primary_contact}
              onChange={(e) => setProfile({ ...profile, primary_contact: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Billing & Invoicing Email
            </label>
            <input
              type="email"
              value={profile.billing_email}
              onChange={(e) => setProfile({ ...profile, billing_email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-status-success" />
            <span>Profile changes are encrypted and synced to contract documents.</span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-secondary" />
            <span>{saving ? "Saving Changes..." : "Save Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

