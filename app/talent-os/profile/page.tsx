"use client";

import { useState } from "react";
import {
  User,
  Upload,
  Save,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";

export default function TalentOSProfilePage() {
  const [profile, setProfile] = useState({
    full_name: "David K.",
    headline: "Senior Growth Marketing Lead & Attribution Architect",
    email: "david.k@growthspecialists.io",
    phone: "+234 812 345 6789",
    location: "Lagos, Nigeria (Remote Worldwide)",
    years_of_experience: 8,
    availability: "Immediate (Full-Time or Fractional)",
    linkedin_url: "https://linkedin.com/in/david-growth-lead",
    portfolio_url: "https://davidk.growthcase.study",
    bio: "8+ years scaling fintech and B2B SaaS ventures across Africa and the UK. Specialist in server-side attribution, Meta/Google arbitrage, and cohort LTV optimization.",
    skills: [
      "Growth Engineering",
      "Meta Ads",
      "Google Search & Display",
      "Attribution Modeling",
      "Mixpanel",
      "CAPI Implementation",
      "Klaviyo Retention",
    ],
    preferred_roles: [
      "Embedded Senior Growth Lead",
      "Fractional CMO",
      "Attribution Specialist",
    ],
    cv_name: "David_K_Senior_Growth_Lead_CV_2026.pdf",
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

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
            Accreditation & Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Specialist Profile & CV
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Your profile is private by default and only presented to vetted XC Global client partners.
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 text-status-success text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-10 space-y-6">
        {/* Core Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Full Name
            </label>
            <input
              type="text"
              required
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Professional Headline
            </label>
            <input
              type="text"
              required
              value={profile.headline}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Direct Email
            </label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Years of Experience
            </label>
            <input
              type="number"
              value={profile.years_of_experience}
              onChange={(e) => setProfile({ ...profile, years_of_experience: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Location & Timezone
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Availability Status
            </label>
            <select
              value={profile.availability}
              onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            >
              <option value="Immediate (Full-Time or Fractional)">Available Immediately</option>
              <option value="Available in 2 Weeks">Available in 2 Weeks</option>
              <option value="Fractional Only (10-20 hrs/week)">Fractional Only (10-20 hrs/week)</option>
              <option value="Currently Placed">Currently Placed on Engagement</option>
            </select>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
            Executive Bio & Summary
          </label>
          <textarea
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background resize-none"
          />
        </div>

        {/* Skills Tag Selector */}
        <div className="space-y-2 pt-2 border-t border-border">
          <label className="text-xs font-bold uppercase tracking-wider text-text-primary block">
            Core Technical Skills & Tooling (Max 20)
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-surface-container-low border border-border text-xs font-semibold text-text-primary flex items-center gap-1.5"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-text-muted hover:text-status-error"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. Liquid, Python)"
              className="flex-1 px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-lg bg-surface-container-high text-xs font-bold text-text-primary hover:bg-surface-container"
            >
              Add
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-border">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={profile.linkedin_url}
              onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Portfolio / Case Studies URL
            </label>
            <input
              type="url"
              value={profile.portfolio_url}
              onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
            />
          </div>
        </div>

        {/* CV / Resume Upload Box */}
        <div className="pt-2 border-t border-border space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-text-primary block">
            CV / Resume Document (PDF or DOC, max 5MB)
          </label>
          <div className="p-6 rounded-xl border-2 border-dashed border-border bg-surface-container-low flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-surface-white border border-border flex items-center justify-center text-accent-gold shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-primary">
                Current File: {profile.cv_name}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">
                Drag and drop a new PDF or click to browse
              </p>
            </div>
            <label className="px-4 py-2 rounded-lg bg-surface-white border border-border text-xs font-semibold text-text-primary hover:bg-surface-container cursor-pointer shadow-sm">
              <span>Select New Document</span>
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
            </label>
          </div>
        </div>

        {/* Save footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-status-success" />
            <span>Encrypted in Supabase Storage with strict RLS permissions.</span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-secondary" />
            <span>{saving ? "Saving..." : "Save Talent Profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

