"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Universal Scroll Reveal Controller
 * Automatically activates smooth scroll motion for all sections and cards across all pages.
 */
export function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Small timeout to allow DOM to settle after route change
    const timer = setTimeout(() => {
      const candidates = document.querySelectorAll<HTMLElement>(
        "main section, [data-reveal], .scroll-reveal-item"
      );

      if (!candidates.length) return;

      const viewportHeight = window.innerHeight;

      // Create an intersection observer with a balanced margin
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -40px 0px",
          threshold: 0.08,
        }
      );

      candidates.forEach((el) => {
        // Ensure element has the base reveal class
        if (!el.classList.contains("site-reveal")) {
          el.classList.add("site-reveal");
        }

        // If element is already in initial viewport, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.95 && rect.bottom > 0) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }, 40);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

