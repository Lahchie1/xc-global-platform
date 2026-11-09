"use client";

import React from "react";
import { CheckCircle2, Info } from "lucide-react";

interface BlogContentRendererProps {
  content: string;
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  if (!content) return null;

  // Split content by double newlines into blocks
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="space-y-6 text-base text-text-primary leading-relaxed">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Divider
        if (trimmed === "---" || trimmed === "***") {
          return <hr key={index} className="my-8 border-t border-border" />;
        }

        // Image: ![alt](url)
        const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          const alt = imgMatch[1];
          const src = imgMatch[2];
          return (
            <figure key={index} className="my-8 space-y-2">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-container-low shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || "Blog visual"}
                  className="w-full h-auto max-h-[520px] object-cover"
                  loading="lazy"
                />
              </div>
              {alt && (
                <figcaption className="text-center text-xs text-text-muted italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        }

        // Heading 2
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl sm:text-3xl font-bold text-text-primary pt-6 pb-1 tracking-tight">
              {renderInlineMarkdown(trimmed.replace("## ", ""))}
            </h2>
          );
        }

        // Heading 3
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl sm:text-2xl font-bold text-text-primary pt-4 pb-1 tracking-tight">
              {renderInlineMarkdown(trimmed.replace("### ", ""))}
            </h3>
          );
        }

        // Blockquote / Callout
        if (trimmed.startsWith("> ")) {
          const quoteText = trimmed.replace(/^>\s*/gm, "");
          const isNote = quoteText.includes("💡") || quoteText.toLowerCase().includes("note:");
          return (
            <blockquote
              key={index}
              className={`p-6 my-6 border-l-4 rounded-r-xl shadow-sm text-sm sm:text-base leading-relaxed ${
                isNote
                  ? "border-accent-gold bg-accent-gold/5 text-text-primary"
                  : "border-secondary bg-surface-white text-text-primary italic"
              }`}
            >
              {isNote && (
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-accent-gold mb-2">
                  <Info className="w-4 h-4" />
                  <span>Key Insight</span>
                </div>
              )}
              <div>{renderInlineMarkdown(quoteText)}</div>
            </blockquote>
          );
        }

        // Unordered list
        if (trimmed.split("\n").every((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "))) {
          const items = trimmed.split("\n");
          return (
            <ul key={index} className="space-y-2.5 my-4 bg-surface-white p-6 rounded-xl border border-border">
              {items.map((line, lIdx) => (
                <li key={lIdx} className="text-xs sm:text-sm text-text-secondary flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                  <span>{renderInlineMarkdown(line.replace(/^[-*]\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Numbered list
        if (trimmed.split("\n").every((l) => /^\d+\.\s+/.test(l.trim()))) {
          const items = trimmed.split("\n");
          return (
            <ol key={index} className="space-y-2.5 my-4 bg-surface-white p-6 rounded-xl border border-border">
              {items.map((line, lIdx) => (
                <li key={lIdx} className="text-xs sm:text-sm text-text-secondary flex items-start gap-3 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-bold text-[11px] text-text-primary shrink-0 mt-0.5">
                    {lIdx + 1}
                  </span>
                  <span>{renderInlineMarkdown(line.replace(/^\d+\.\s+/, ""))}</span>
                </li>
              ))}
            </ol>
          );
        }

        // Standard paragraph
        return (
          <p key={index} className="text-text-secondary text-sm sm:text-base leading-relaxed">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Parses inline formatting: [link](url), **bold**, *italic*, `code`
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  // Regex pattern matching:
  // 1. [text](url)
  // 2. **bold**
  // 3. *italic*
  // 4. `code`
  const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Link: [text](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkHref = linkMatch[2];
      return (
        <a
          key={i}
          href={linkHref}
          target={linkHref.startsWith("http") ? "_blank" : undefined}
          rel={linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-secondary font-semibold underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
        >
          {linkText}
        </a>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-bold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={i} className="italic text-text-primary">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline code: `text`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs text-text-primary">
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}
