"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service in production
    console.error("[XC Global Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-status-error/10 border border-status-error/20 flex items-center justify-center shadow-elevation-1">
            <AlertTriangle className="w-12 h-12 text-status-error" />
          </div>
        </div>

        {/* Message */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Something Went Wrong
          </h1>
          <p className="mt-3 text-text-secondary text-sm leading-relaxed">
            An unexpected error occurred. Our team has been notified. You can
            try reloading the page or return to the homepage.
          </p>
          {error?.digest && (
            <p className="mt-2 text-[11px] font-mono text-text-muted bg-surface-container-low border border-border rounded-lg px-3 py-1.5 inline-block">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-container transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-white text-text-primary font-semibold text-sm border border-border hover:bg-surface-container-low transition-all shadow-sm"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Contact support */}
        <p className="text-xs text-text-muted">
          Persistent issues?{" "}
          <Link
            href="/contact"
            className="text-accent-gold hover:underline font-medium"
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}

