"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Subscription failed. Please try again.");
      }

      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full border-b border-border bg-gradient-to-b from-surface-container-low/50 via-surface-white to-surface-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <div className="relative rounded-3xl bg-primary text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border border-primary/20">
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-accent-gold/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-white/10 text-secondary text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
              <Mail className="w-3.5 h-3.5" />
              <span>Executive Dispatch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Grow Smarter. Scale Faster.
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
              Get practical tips, proven marketing strategies and business growth insights delivered straight to your inbox
            </p>

            {submitted ? (
              <div className="pt-4 flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-white/10 border border-white/15 text-white animate-in zoom-in-95">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-white">You&apos;re subscribed!</h4>
                <p className="text-xs text-gray-300 max-w-sm">
                  Welcome aboard. Expect practical frameworks and growth insights in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2 max-w-md mx-auto space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-2.5 bg-white/10 p-1.5 rounded-xl border border-white/15 shadow-inner">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter your business email"
                    className="w-full px-4 py-3 rounded-lg bg-transparent text-white placeholder-gray-400 text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-secondary text-primary font-bold text-xs uppercase tracking-wider hover:bg-secondary/90 transition-all shadow-md shrink-0 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Growth Tips</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <p className="text-xs text-status-error font-medium">{error}</p>
                )}

                <p className="text-[11px] text-gray-400">
                  Zero spam. Curated exclusively for founders and operators. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
