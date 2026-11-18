"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MailCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <Navbar />

      <main className="w-full pt-32 pb-24 bg-background min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="bg-surface-white rounded-3xl border border-border p-8 sm:p-10 shadow-card text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-accent-gold mx-auto">
              <MailCheck className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-text-primary">
                Email Preferences
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Manage your communication settings or opt out of outbound marketing updates from XC Global Limited.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-status-success/10 border border-status-success/20 space-y-3">
                <CheckCircle2 className="w-8 h-8 text-status-success mx-auto" />
                <h3 className="text-sm font-bold text-text-primary">
                  You have been unsubscribed
                </h3>
                <p className="text-xs text-text-secondary">
                  <strong>{email}</strong> has been removed from our general broadcast list. You will no longer receive marketing communications.
                </p>
                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors"
                  >
                    <span>Return to Homepage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm bg-surface-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
                >
                  Unsubscribe from All Updates
                </button>

                <p className="text-[11px] text-text-muted text-center pt-2">
                  Essential transactional communications (e.g. account logins and active placement agreements) are unaffected.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
