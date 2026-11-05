import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-surface-container-low border border-border flex items-center justify-center shadow-elevation-1">
            <Compass className="w-12 h-12 text-accent-gold" />
          </div>
        </div>

        {/* Error Code */}
        <div>
          <p className="text-8xl font-bold text-text-primary/10 tracking-tight select-none">
            404
          </p>
          <h1 className="text-2xl font-bold text-text-primary -mt-4">
            Page Not Found
          </h1>
          <p className="mt-3 text-text-secondary text-sm leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let us help you find your way back.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-container transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-white text-text-primary font-semibold text-sm border border-border hover:bg-surface-container-low transition-all shadow-sm"
          >
            Work With Us
          </Link>
        </div>

        {/* Brand Footer */}
        <p className="text-xs text-text-muted">
          XC Global Limited &mdash; Growth &amp; Talent Consultancy
        </p>
      </div>
    </div>
  );
}

