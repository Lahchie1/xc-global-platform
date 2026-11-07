"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  User,
  Upload,
  Save,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Briefcase,
  Globe,
  Phone,
  Mail,
  Calendar,
  Layers,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import Link from "next/link";

function TalentProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOnboarding = searchParams?.get("onboarding") === "true";
  const initialName = searchParams?.get("name") || "";
  const initialEmail = searchParams?.get("email") || "";

  const [profile, setProfile] = useState({
    name: initialName,
    email: initialEmail,
    phone: "",
    country: "",
    work_title: "",
    availability: "Immediate", // Immediate, 1 week, 1 month
    job_type: "Full-time", // Full-time, Part-time, Contract, Internship, Temporary
    job_mode: "Remote", // Remote, Hybrid, On-site
    portfolio_url: "", // optional
    linkedin_url: "",
    bio: "",
    skills: [] as string[],
    cv_name: "",
  });

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [cvFileUploaded, setCvFileUploaded] = useState(false);

  // Load organic profile from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);
        const res = await fetch("/api/talent/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setProfile((prev) => ({
              ...prev,
              name: data.user.full_name || prev.name || initialName,
              email: data.user.email || prev.email || initialEmail,
            }));
          }
          if (data.profile) {
            const p = data.profile;
            setProfile((prev) => ({
              ...prev,
              phone: p.phone || prev.phone,
              country: p.location || prev.country,
              work_title: p.headline || prev.work_title,
              availability: p.availability || prev.availability || "Immediate",
              job_type: p.preferred_roles?.[0] || prev.job_type || "Full-time",
              job_mode: p.preferred_roles?.[1] || prev.job_mode || "Remote",
              portfolio_url: p.portfolio_url || prev.portfolio_url,
              linkedin_url: p.linkedin_url || prev.linkedin_url,
              bio: p.bio || prev.bio,
              skills: Array.isArray(p.skills) && p.skills.length > 0 ? p.skills : prev.skills,
              cv_name: p.cv_url || prev.cv_name,
            }));
          }
        }
      } catch (err) {
        console.warn("Could not load database profile:", err);
      } finally {
        setLoadingData(false);
      }
    }
    loadData();
  }, [initialName, initialEmail]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        cv_name: file.name,
      }));
      setCvFileUploaded(true);
    }
  };

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/talent/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save profile to database.");
      }

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        if (isOnboarding) {
          router.push("/talent-os");
        }
      }, 1200);
    } catch (err: any) {
      alert("Error saving profile: " + err?.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-4xl">
      {/* Onboarding Welcome Banner if coming from sign up */}
      {isOnboarding && (
        <div className="p-5 rounded-2xl bg-primary text-white border border-secondary/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/20 text-secondary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 2 of 2: Profile Setup</span>
            </div>
            <h2 className="text-lg font-bold">Welcome to TalentOS! Complete your primary profile</h2>
            <p className="text-xs text-white/80 max-w-xl">
              Fill in your primary details, availability, work preferences, and CV to be discovered and matched with high-growth venture briefs.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Accreditation &amp; Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Primary Talent Profile &amp; CV
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Your profile is private by default and only presented to vetted XC Global client partners.
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 text-status-success text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Saved to Database</span>
          </div>
        )}
      </div>

      {loadingData ? (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="w-6 h-6 text-secondary animate-spin" />
          <p className="text-xs text-text-muted">Loading profile from database...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-10 space-y-6">
          {/* Section 1: Basic / Primary Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary border-b border-border pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-accent-gold" />
              <span>Primary Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Full Name <span className="text-status-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Josiah Chikwendu"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Email Address <span className="text-status-error">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Phone Number <span className="text-status-error">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="e.g. +234..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Country <span className="text-status-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  placeholder="e.g. Nigeria, United Kingdom, Canada"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>

              {/* Work Title */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Work Title <span className="text-status-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profile.work_title}
                  onChange={(e) => setProfile({ ...profile, work_title: e.target.value })}
                  placeholder="e.g. Senior Growth Marketer / SEO Lead"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Availability, Job Type & Job Mode */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary border-b border-border pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-accent-gold" />
              <span>Work Preferences &amp; Availability</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Availability */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Availability <span className="text-status-error">*</span>
                </label>
                <select
                  value={profile.availability}
                  onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                >
                  <option value="Immediate">Immediate</option>
                  <option value="1 week">1 week</option>
                  <option value="1 month">1 month</option>
                </select>
              </div>

              {/* Job Type Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Job Type <span className="text-status-error">*</span>
                </label>
                <select
                  value={profile.job_type}
                  onChange={(e) => setProfile({ ...profile, job_type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>

              {/* Job Mode Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Job Mode <span className="text-status-error">*</span>
                </label>
                <select
                  value={profile.job_mode}
                  onChange={(e) => setProfile({ ...profile, job_mode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: CV Document Upload */}
          <div className="space-y-3 pt-4 border-t border-border">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary block">
              Upload CV Document <span className="text-status-error">*</span>{" "}
              <span className="text-text-muted font-normal text-[11px]">(PDF, DOC, DOCX - max 5MB)</span>
            </label>
            <div className="p-6 rounded-xl border-2 border-dashed border-border bg-surface-container-low flex flex-col items-center justify-center text-center space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-surface-white border border-border flex items-center justify-center text-accent-gold shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary">
                  {profile.cv_name || "No CV uploaded yet"}
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  {cvFileUploaded ? "File attached ready to save" : profile.cv_name ? "Document attached in database" : "Upload your resume or curriculum vitae"}
                </p>
              </div>
              <label className="px-4 py-2 rounded-lg bg-surface-white border border-border text-xs font-semibold text-text-primary hover:bg-surface-container cursor-pointer shadow-sm transition-colors">
                <span>{profile.cv_name ? "Change CV Document" : "Select CV File"}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Section 4: Portfolio (Optional) & Online Links */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary border-b border-border pb-2 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-accent-gold" />
              <span>Portfolio &amp; Online Links</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                    Portfolio URL
                  </label>
                  <span className="text-[11px] text-text-muted italic">Optional to add</span>
                </div>
                <input
                  type="url"
                  value={profile.portfolio_url}
                  onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
                  placeholder="https://myportfolio.com or Figma/Drive link"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                    LinkedIn Profile URL
                  </label>
                  <span className="text-[11px] text-text-muted italic">Optional</span>
                </div>
                <input
                  type="url"
                  value={profile.linkedin_url}
                  onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Bio & Skills */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Professional Bio &amp; Summary
              </label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Brief overview of your experience, specialities and achievements..."
                className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary block">
                Core Skills &amp; Tools
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
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
                  placeholder="Add skill (e.g. SEO, Meta Ads)"
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
          </div>

          {/* Save footer */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <ShieldCheck className="w-4 h-4 text-status-success shrink-0" />
              <span>Encrypted and verified on XC Global TalentOS.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/talent-os"
                className="px-5 py-2.5 rounded-lg bg-surface-container text-text-secondary text-xs font-semibold hover:bg-surface-container-high transition-colors"
              >
                {isOnboarding ? "Skip for now" : "Back to Dashboard"}
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 sm:flex-none px-7 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4 text-secondary" />
                <span>{saving ? "Saving to Database..." : isOnboarding ? "Complete Profile & Continue" : "Save Talent Profile"}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function TalentOSProfilePage() {
  return (
    <Suspense fallback={<div className="p-10 text-xs text-text-muted">Loading profile...</div>}>
      <TalentProfileContent />
    </Suspense>
  );
}
