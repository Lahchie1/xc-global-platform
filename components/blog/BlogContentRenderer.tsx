"use client";

import React from "react";
import { CheckCircle2, Info } from "lucide-react";

interface BlogContentRendererProps {
  content: string;
}

type ParsedBlock =
  | { type: "h"; level: number; text: string }
  | { type: "hr" }
  | { type: "img"; alt: string; src: string }
  | { type: "quote"; isNote: boolean; lines: string[] }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "p"; text: string };

function parseMarkdownToBlocks(content: string): ParsedBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ParsedBlock[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let currentQuote: { type: "quote"; isNote: boolean; lines: string[] } | null = null;
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      blocks.push({ type: "p", text: currentParagraph.join(" ") });
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  }

  function flushQuote() {
    if (currentQuote) {
      blocks.push(currentQuote);
      currentQuote = null;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    // Divider
    if (trimmed === "---" || trimmed === "***") {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push({ type: "hr" });
      continue;
    }

    // Image: ![alt](url)
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      blocks.push({ type: "img", alt: imgMatch[1], src: imgMatch[2] });
      continue;
    }

    // Headings: #, ##, ###, ####
    if (trimmed.startsWith("#")) {
      const hMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
      if (hMatch) {
        flushParagraph();
        flushList();
        flushQuote();
        blocks.push({ type: "h", level: hMatch[1].length, text: hMatch[2] });
        continue;
      }
    }

    // Blockquote
    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      const qText = trimmed.replace(/^>\s*/, "");
      const isNote = qText.includes("💡") || qText.toLowerCase().includes("note:") || qText.toLowerCase().includes("key insight");
      if (!currentQuote) {
        currentQuote = { type: "quote", isNote, lines: [qText] };
      } else {
        if (isNote) currentQuote.isNote = true;
        currentQuote.lines.push(qText);
      }
      continue;
    } else {
      flushQuote();
    }

    // Bullet list item: - , * , + , •
    const bulletMatch = trimmed.match(/^[-*+•]\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    // Numbered list item: 1. , 2.
    const numMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) {
      flushParagraph();
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(numMatch[2]);
      continue;
    }

    // If we were inside a list and hit normal text, flush the list
    flushList();

    // Regular paragraph line
    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushQuote();

  return blocks;
}

export function BlogContentRenderer({ content }: BlogContentRendererProps) {
  if (!content) return null;

  const blocks = parseMarkdownToBlocks(content);

  return (
    <div className="space-y-6 text-base text-text-primary leading-relaxed">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "hr":
            return <hr key={index} className="my-8 border-t border-border" />;

          case "img":
            return (
              <figure key={index} className="my-8 space-y-2">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-container-low shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.src}
                    alt={block.alt || "Blog visual"}
                    className="w-full h-auto max-h-[520px] object-cover"
                    loading="lazy"
                  />
                </div>
                {block.alt && (
                  <figcaption className="text-center text-xs text-text-muted italic">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );

          case "h":
            if (block.level === 1 || block.level === 2) {
              return (
                <h2 key={index} className="text-2xl sm:text-3xl font-bold text-text-primary pt-6 pb-1 tracking-tight">
                  {renderInlineMarkdown(block.text)}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3 key={index} className="text-xl sm:text-2xl font-bold text-text-primary pt-4 pb-1 tracking-tight">
                  {renderInlineMarkdown(block.text)}
                </h3>
              );
            }
            return (
              <h4 key={index} className="text-lg font-bold text-text-primary pt-3 pb-1 tracking-tight">
                {renderInlineMarkdown(block.text)}
              </h4>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className={`p-6 my-6 border-l-4 rounded-r-xl shadow-sm text-sm sm:text-base leading-relaxed ${
                  block.isNote
                    ? "border-accent-gold bg-accent-gold/5 text-text-primary"
                    : "border-secondary bg-surface-white text-text-primary italic"
                }`}
              >
                {block.isNote && (
                  <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-accent-gold mb-2">
                    <Info className="w-4 h-4" />
                    <span>Key Insight</span>
                  </div>
                )}
                <div className="space-y-1">
                  {block.lines.map((l, lIdx) => (
                    <p key={lIdx}>{renderInlineMarkdown(l)}</p>
                  ))}
                </div>
              </blockquote>
            );

          case "ul":
            return (
              <ul key={index} className="space-y-2.5 my-4 bg-surface-white p-6 rounded-xl border border-border">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className="text-xs sm:text-sm text-text-secondary flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                    <span>{renderInlineMarkdown(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={index} className="space-y-2.5 my-4 bg-surface-white p-6 rounded-xl border border-border">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} className="text-xs sm:text-sm text-text-secondary flex items-start gap-3 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-bold text-[11px] text-text-primary shrink-0 mt-0.5">
                      {iIdx + 1}
                    </span>
                    <span>{renderInlineMarkdown(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case "p":
          default:
            return (
              <p key={index} className="text-text-secondary text-sm sm:text-base leading-relaxed">
                {renderInlineMarkdown(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}

/**
 * Parses inline formatting: [link](url), **bold**, *italic*, `code`
 */
function renderInlineMarkdown(text: string): React.ReactNode {
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
