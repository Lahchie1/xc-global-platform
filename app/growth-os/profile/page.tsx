"use client";

import { useState, useEffect } from "react";
import { Building2, Save, CheckCircle2, ShieldCheck, Globe, MapPin, Loader2 } from "lucide-react";

export default function GrowthOSProfilePage() {
  const [profile, setProfile] = useState({
    company_name: "",
    website: "",
    industry: "Fintech",
    company_size: "11-50 employees",
    location: "",
    description: "",
    billing_email: "",
    primary_contact: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/growth/profile");
        if (res.ok) {
          const data = await res.json();
          const p = data.profile;
          const app = data.application;
          const u = data.user;

          setProfile({
            company_name: p?.company_name || app?.company_name || u?.full_name || "",
            website: p?.website || app?.website || "",
            industry: p?.industry || app?.industry || "Fintech",
            company_size: p?.company_size || app?.company_size || "11-50 employees",
            location: p?.location || app?.location || "",
            description: p?.description || app?.challenge_description || "",
            billing_email: u?.email || app?.contact_email || "",
            primary_contact: app?.contact_name ? `${app.contact_name}${app.contact_title ? ` (${app.contact_title})` : ""}` : u?.full_name || "",
          });
        }
      } catch (err) {
        console.warn("Could not load growth profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/growth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update profile.");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert("Error saving company profile: " + err?.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Organization Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Company Profile &amp; Governance
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Manage your corporate identity and commercial parameters in the live database.
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 text-status-success text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Updated in Database</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="w-6 h-6 text-secondary animate-spin" />
          <p className="text-xs text-text-muted">Loading company profile from database...</p>
        </div>
      ) : (
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
                placeholder="e.g. Glory Ltd"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Company Website
              </label>
              <input
                type="text"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                placeholder="https://company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Primary Contact
              </label>
              <input
                type="text"
                value={profile.primary_contact}
                onChange={(e) => setProfile({ ...profile, primary_contact: e.target.value })}
                placeholder="Contact name & title"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Contact Email
              </label>
              <input
                type="email"
                value={profile.billing_email}
                onChange={(e) => setProfile({ ...profile, billing_email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Operating Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="e.g. Lagos, Nigeria"
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Industry Vertical
              </label>
              <select
                value={profile.industry}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
              >
                <option value="Fintech">Fintech &amp; Payments</option>
                <option value="E-Commerce">E-Commerce &amp; DTC</option>
                <option value="Retail">Retail</option>
                <option value="Insurance">Insurance</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Hospitality">Hospitality</option>
                <option value="B2B SaaS">B2B SaaS</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="Web3">Web3 &amp; Crypto</option>
                <option value="Other">Other</option>
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
                <option value="1-10 employees">1 - 10 employees (Pre-seed / Seed)</option>
                <option value="11-50 employees">11 - 50 employees (Series A)</option>
                <option value="51-200 employees">51 - 200 employees (Series B+)</option>
                <option value="200+ employees">200+ employees (Enterprise)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Company Overview &amp; Commercial Challenge
            </label>
            <textarea
              rows={4}
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
              placeholder="Primary acquisition channels, target markets and key growth goals..."
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background resize-none"
            />
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <ShieldCheck className="w-4 h-4 text-status-success" />
              <span>Synced with live GrowthOS tenant parameters in Supabase.</span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-secondary" />
              <span>{saving ? "Saving to Database..." : "Save Company Profile"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
