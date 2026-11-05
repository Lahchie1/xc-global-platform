"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Building2,
  Target,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    company_name: "",
    website: "",
    industry: "Fintech",
    company_size: "11-50 employees",
    location: "",
    services_interested: ["Growth & Performance Marketing"],
    challenge_description: "",
    how_heard: "",
    contact_name: "",
    contact_title: "",
    contact_email: "",
    contact_phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const availableServices = [
    "Growth & Performance Marketing",
    "Vetted Talent Placement (Embedded)",
    "Fractional CMO / Executive Advisory",
    "Marketing Training & Squad Upskilling",
    "Conversion Rate Optimization (CRO)",
    "Attribution & Data Pipeline Setup",
  ];

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services_interested.includes(service);
      return {
        ...prev,
        services_interested: exists
          ? prev.services_interested.filter((s) => s !== service)
          : [...prev.services_interested, service],
      };
    });
  };

  const validateStep = (step: number) => {
    setError(null);
    if (step === 1) {
      if (!formData.company_name.trim()) {
        setError("Company Name is required.");
        return false;
      }
    }
    if (step === 2) {
      if (formData.services_interested.length === 0) {
        setError("Please select at least one service of interest.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.contact_name.trim() || !formData.contact_email.trim()) {
        setError("Contact Name and Work Email are required.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
        setError("Please enter a valid work email address.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit onboarding form.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Business Onboarding
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Work With XC Global
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto">
              Tell us about your venture and growth goals. Our partners will review your submission and initiate your GrowthOS portal access.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary transition-all duration-300 -z-10"
                style={{
                  width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
                }}
              />

              {[
                { step: 1, title: "Company", icon: Building2 },
                { step: 2, title: "Needs & Goals", icon: Target },
                { step: 3, title: "Contact & Review", icon: UserCheck },
              ].map((s) => {
                const Icon = s.icon;
                const isCompleted = currentStep > s.step;
                const isCurrent = currentStep === s.step;
                return (
                  <div key={s.step} className="flex flex-col items-center bg-background px-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        isCompleted
                          ? "bg-primary text-white"
                          : isCurrent
                          ? "bg-primary text-white ring-4 ring-secondary/30"
                          : "bg-surface-white text-text-muted border border-border"
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5 text-secondary" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span
                      className={`text-[11px] font-semibold mt-2 ${
                        isCurrent ? "text-text-primary" : "text-text-muted"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card Container */}
          <div className="bg-surface-white rounded-2xl border border-border shadow-card p-8 sm:p-12">
            {submitted ? (
              /* Success State */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-status-success/10 text-status-success mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
                    Application Received
                  </h2>
                  <p className="text-sm text-text-secondary max-w-md mx-auto">
                    Thank you. We have received your onboarding details for <strong>{formData.company_name}</strong>. Our team will review your application and send your <strong>GrowthOS</strong> credentials to <strong>{formData.contact_email}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-border text-xs text-text-secondary max-w-md mx-auto flex items-center gap-2 text-left">
                  <ShieldCheck className="w-5 h-5 text-status-success shrink-0" />
                  <span>
                    Your business profile is provisioned privately. A dedicated partnership director will reach out within 24 business hours.
                  </span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-surface-container-low text-text-primary text-xs font-semibold hover:bg-surface-container transition-colors"
                  >
                    Return to Home
                  </Link>
                  <Link
                    href="/login"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors"
                  >
                    Client Sign In
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-lg bg-status-error/10 border border-status-error/20 text-status-error text-xs font-medium">
                    {error}
                  </div>
                )}

                {/* STEP 1: COMPANY DETAILS */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="text-lg font-bold text-text-primary">
                        Step 1: Company Profile & Sizing
                      </h3>
                      <p className="text-xs text-text-muted mt-1">
                        Tell us about your organization and current operating footprint.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                          Company Name <span className="text-status-error">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company_name}
                          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                          placeholder="e.g. KudaScale"
                          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                            Company Website
                          </label>
                          <input
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://company.com"
                            className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                            Primary Industry
                          </label>
                          <select
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                          >
                            <option value="Fintech">Fintech & Payments</option>
                            <option value="E-Commerce">E-Commerce & DTC</option>
                            <option value="B2B SaaS">B2B SaaS & Enterprise</option>
                            <option value="AI">Artificial Intelligence</option>
                            <option value="Web3">Web3 & Digital Assets</option>
                            <option value="HealthTech">HealthTech</option>
                            <option value="Other">Other Technology</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                            Company Size
                          </label>
                          <select
                            value={formData.company_size}
                            onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                          >
                            <option value="1-10 employees">1 - 10 employees (Pre-seed / Seed)</option>
                            <option value="11-50 employees">11 - 50 employees (Series A)</option>
                            <option value="51-200 employees">51 - 200 employees (Series B+)</option>
                            <option value="200+ employees">200+ employees (Enterprise)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                            Operating Location
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. Lagos, Nigeria / London, UK"
                            className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: NEEDS & OBJECTIVES */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="text-lg font-bold text-text-primary">
                        Step 2: Needs & Service Requirements
                      </h3>
                      <p className="text-xs text-text-muted mt-1">
                        Select the growth capabilities you are looking to deploy.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-primary block">
                        Service Interests (Select all that apply) <span className="text-status-error">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {availableServices.map((service) => {
                          const isSelected = formData.services_interested.includes(service);
                          return (
                            <button
                              type="button"
                              key={service}
                              onClick={() => handleServiceToggle(service)}
                              className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                                isSelected
                                  ? "border-primary bg-primary text-white shadow-sm"
                                  : "border-border bg-surface-white text-text-primary hover:border-text-secondary"
                              }`}
                            >
                              <span>{service}</span>
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center border ${
                                  isSelected
                                    ? "bg-secondary border-secondary text-primary"
                                    : "border-border"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                          Brief Challenge / Primary Goal
                        </label>
                        <textarea
                          rows={4}
                          value={formData.challenge_description}
                          onChange={(e) =>
                            setFormData({ ...formData, challenge_description: e.target.value })
                          }
                          placeholder="e.g. Scaling customer acquisition from ₦25M to ₦90M/mo, decreasing blended CAC, or finding an embedded Shopify CRO specialist..."
                          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background resize-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                          How did you hear about XC Global?
                        </label>
                        <select
                          value={formData.how_heard}
                          onChange={(e) => setFormData({ ...formData, how_heard: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                        >
                          <option value="">Select option (optional)</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Founder Referral">Founder / Investor Referral</option>
                          <option value="Search">Search / Web</option>
                          <option value="Event">Event / Conference</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT PERSON & REVIEW */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="border-b border-border pb-4">
                      <h3 className="text-lg font-bold text-text-primary">
                        Step 3: Primary Contact & Submission
                      </h3>
                      <p className="text-xs text-text-muted mt-1">
                        Where should we send your GrowthOS portal access credentials?
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                            Contact Full Name <span className="text-status-error">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.contact_name}
                            onChange={(e) =>
                              setFormData({ ...formData, contact_name: e.target.value })
                            }
                            placeholder="e.g. Sarah Jenkins"
                            className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                            Job Title / Role
                          </label>
                          <input
                            type="text"
                            value={formData.contact_title}
                            onChange={(e) =>
                              setFormData({ ...formData, contact_title: e.target.value })
                            }
                            placeholder="e.g. Co-Founder & CEO"
                            className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                            Work Email Address <span className="text-status-error">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.contact_email}
                            onChange={(e) =>
                              setFormData({ ...formData, contact_email: e.target.value })
                            }
                            placeholder="sarah@company.com"
                            className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={formData.contact_phone}
                            onChange={(e) =>
                              setFormData({ ...formData, contact_phone: e.target.value })
                            }
                            placeholder="+234 or +44..."
                            className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                          />
                        </div>
                      </div>

                      {/* Review Summary Box */}
                      <div className="mt-4 p-4 rounded-xl bg-surface-container-low border border-border/80 space-y-2 text-xs">
                        <span className="font-bold text-text-primary block">
                          Summary of Application:
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-text-secondary">
                          <div>Company: <strong>{formData.company_name}</strong></div>
                          <div>Industry: <strong>{formData.industry}</strong></div>
                          <div className="col-span-2">
                            Services: <strong>{formData.services_interested.join(", ")}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Navigation Buttons */}
                <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-5 py-2.5 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-container-low flex items-center gap-2 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <Link
                      href="/"
                      className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
                    >
                      Cancel
                    </Link>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container flex items-center gap-2 transition-colors ml-auto shadow-sm"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-container flex items-center gap-2 transition-all ml-auto shadow-md disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Onboarding Application</span>
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

