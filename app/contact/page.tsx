"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Send,
  Loader2,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "general",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background">
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold uppercase tracking-wider mb-4">
            Connect With XC Global
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary max-w-3xl mx-auto leading-tight">
            Let’s discuss your growth and talent strategy.
          </h1>
          <p className="mt-4 text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Have a question or looking to explore an enterprise engagement? Send us a direct message or connect with our partnership leads.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-surface-white rounded-2xl border border-border shadow-card p-8 sm:p-12">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-status-success/10 text-status-success mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary">
                    Message Received
                  </h3>
                  <p className="text-sm text-text-secondary max-w-md mx-auto">
                    Thank you for reaching out. A senior partner will review your inquiry and respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        subject: "general",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-lg bg-surface-container-low text-text-primary text-xs font-semibold hover:bg-surface-container transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        Your Full Name <span className="text-status-error">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Adebayo Ogunlesi"
                        className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        Work Email <span className="text-status-error">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Tech"
                        className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        Topic of Inquiry
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                      >
                        <option value="general">General Partnership</option>
                        <option value="business-onboarding">Engage Marketing Talent</option>
                        <option value="talent-network">Join Talent Network</option>
                        <option value="advisory">Executive Growth Advisory</option>
                        <option value="press">Media & Press</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      Message / Objective <span className="text-status-error">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your venture, current growth objectives, or how we can assist..."
                      className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4 text-secondary" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Info & Offices */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface-white rounded-2xl border border-border shadow-card p-8 space-y-6">
                <h3 className="text-base font-bold text-text-primary">
                  Direct Communications
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-4 h-4 text-accent-gold" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-muted block">Direct Email</span>
                      <a href="mailto:hello@xcglobalhq.com" className="text-sm font-bold text-text-primary hover:underline">
                        hello@xcglobalhq.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                      <MessageSquare className="w-4 h-4 text-accent-gold" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-muted block">WhatsApp Liaison</span>
                      <span className="text-sm font-bold text-text-primary">
                        +234 (0) 800 XC GLOBAL
                      </span>
                      <p className="text-[11px] text-text-muted">Available Mon - Fri, 9am - 6pm WAT</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-4 h-4 text-accent-gold" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-muted block">SLA Response Time</span>
                      <span className="text-sm font-semibold text-text-primary">
                        Under 24 hours guaranteed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Hubs */}
              <div className="bg-surface-white rounded-2xl border border-border shadow-card p-8 space-y-4">
                <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent-gold" />
                  Operating Hubs
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-surface-container-low border border-border/60">
                    <span className="font-bold text-text-primary block">Lagos Commercial Hub</span>
                    <p className="text-text-secondary mt-0.5">Victoria Island, Lagos, Nigeria</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-surface-container-low border border-border/60">
                    <span className="font-bold text-text-primary block">London Advisory Hub</span>
                    <p className="text-text-secondary mt-0.5">Canary Wharf, London, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

