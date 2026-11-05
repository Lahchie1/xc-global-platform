"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@/types/database";
import {
  Building2,
  Terminal,
  ArrowRight,
  Mail,
  Lock,
  User,
  Loader2,
  Check,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<UserRole>("business");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "talent" || roleParam === "business") {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          full_name: fullName,
          email,
          password,
          company_name: companyName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      // Redirect directly to the appropriate portal
      if (role === "talent") {
        router.push("/talent-os");
      } else {
        router.push("/growth-os");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block group" aria-label="XC Global Home">
          <Logo variant="dark" type="complete" height={40} priority />
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-text-primary">
          Join the XC Global Ecosystem
        </h2>
        <p className="mt-2 text-xs text-text-secondary">
          Choose your account type to access your specialized portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-surface-white py-8 px-6 sm:px-10 rounded-2xl border border-border shadow-card space-y-6">
          {/* Role Selection Cards */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-text-primary block">
              I am joining as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("business")}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  role === "business"
                    ? "border-primary bg-primary text-white shadow-sm ring-2 ring-primary"
                    : "border-border bg-surface-white text-text-primary hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Building2 className={`w-5 h-5 ${role === "business" ? "text-secondary" : "text-text-muted"}`} />
                  {role === "business" && <Check className="w-4 h-4 text-secondary stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-bold">Business / Firm</div>
                  <div className={`text-[11px] mt-0.5 ${role === "business" ? "text-gray-300" : "text-text-muted"}`}>
                    GrowthOS Access
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole("talent")}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  role === "talent"
                    ? "border-primary bg-primary text-white shadow-sm ring-2 ring-primary"
                    : "border-border bg-surface-white text-text-primary hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Terminal className={`w-5 h-5 ${role === "talent" ? "text-secondary" : "text-text-muted"}`} />
                  {role === "talent" && <Check className="w-4 h-4 text-secondary stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-bold">Specialist Talent</div>
                  <div className={`text-[11px] mt-0.5 ${role === "talent" ? "text-gray-300" : "text-text-muted"}`}>
                    TalentOS Access
                  </div>
                </div>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-lg bg-status-error/10 border border-status-error/20 text-status-error text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. David Adeleke"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>
            </div>

            {role === "business" && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  Company / Organization Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. ApexPay Financial"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                  />
                </div>
              </div>
            )}

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
              <label className="text-xs font-bold uppercase tracking-wider text-text-primary">
                Create Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 pt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight className="w-4 h-4 text-secondary" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-text-secondary border-t border-border">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center p-8"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
