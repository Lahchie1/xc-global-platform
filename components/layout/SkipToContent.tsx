"use client";

/**
 * Skip-to-content link for keyboard and screen reader accessibility.
 * Renders as an off-screen link that becomes visible on focus.
 * Place at the very top of the <body> in the root layout.
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-3 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold focus:text-sm focus:shadow-lg transition-all"
    >
      Skip to main content
    </a>
  );
}

