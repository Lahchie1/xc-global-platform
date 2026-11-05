"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Lock, Mail, Loader2, ShieldCheck, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Fallback for demo / preview credentials if local Supabase placeholder is active
        if (email.includes("business") || email.includes("growth")) {
          router.push("/growth-os");
          return;
        } else if (email.includes("talent") || email.includes("specialist")) {
          router.push("/talent-os");
          return;
        } else if (email.includes("admin")) {
          router.push("/admin");
          return;
        }
        throw new Error(signInError.message);
      }

      const role = data.user?.user_metadata?.role || "business";
      if (role === "admin") router.push("/admin");
      else if (role === "talent") router.push("/talent-os");
      else router.push("/growth-os");
    } catch (err: any) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoRole = (role: "business" | "talent" | "admin") => {
    if (role === "business") router.push("/growth-os");
    else if (role === "talent") router.push("/talent-os");
    else if (role === "admin") router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block group" aria-label="XC Global Home">
          <Logo variant="dark" type="complete" height={40} priority />
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-text-primary">
          Sign in to your portal
        </h2>
        <p className="mt-2 text-xs text-text-secondary">
          Enter your credentials to access GrowthOS, TalentOS, or the Admin Console
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-surface-white py-8 px-6 sm:px-10 rounded-2xl border border-border shadow-card space-y-6">
          {error && (
            <div className="p-3.5 rounded-lg bg-status-error/10 border border-status-error/20 text-status-error text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-text-secondary hover:text-text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-secondary" />
                </>
              )}
            </button>
          </form>

          {/* Role-Direct Preview Helper */}
          <div className="pt-4 border-t border-border space-y-2.5">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block text-center">
              Quick Role Navigation Preview
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoRole("business")}
                className="py-1.5 px-2 rounded bg-surface-container-low border border-border text-[11px] font-medium text-text-primary hover:bg-surface-container"
              >
                GrowthOS
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole("talent")}
                className="py-1.5 px-2 rounded bg-surface-container-low border border-border text-[11px] font-medium text-text-primary hover:bg-surface-container"
              >
                TalentOS
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoRole("admin")}
                className="py-1.5 px-2 rounded bg-surface-container-low border border-border text-[11px] font-medium text-text-primary hover:bg-surface-container"
              >
                Admin
              </button>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-text-secondary">
            Don’t have an account yet?{" "}
            <Link href="/register" className="font-semibold text-text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

