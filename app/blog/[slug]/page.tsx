import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, Calendar, Clock, Share2, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const fallbackArticle = {
  title: "The Death of Blended CAC: Why Precision Growth Engineering Wins",
  slug: "the-death-of-blended-cac",
  published_at: "2026-10-24T12:00:00Z",
  author: "XC Global Growth Architecture Pod",
  readingTime: "6 min read",
  content: `
For nearly a decade, venture-backed startups relied on blended Customer Acquisition Cost (CAC) to obscure inefficient paid media acquisition. When capital was virtually free, scale took precedence over payback periods. Today, that playbook is broken.

### 1. The Anatomy of Attribution Blindness

Blended CAC takes total marketing expenditures and divides them by total new accounts or customers. On the surface, it looks like a clean executive metric. In reality, it introduces three fatal blind spots:

1. **Organic Brand Tailwinds Mask Decaying Paid Performance:** A strong founder Twitter following or PR spike artificially lowers paid channel acquisition costs on paper.
2. **Channel Cannibalization:** Paid search campaigns for your own brand name claim credit for users who were already navigating directly to your site.
3. **Delayed Churn Visibility:** Top-line customer volume disguises cohort deterioration in months two and three.

### 2. The Shift to Channel-Level Payback Periods

Modern tech ventures require high-velocity acquisition architecture, algorithmic attribution, and structured growth engineering tied directly to enterprise valuation. 

> "If a marketing channel does not demonstrate positive net contribution margin within a verifiable 90-day window, continuing to fund it is speculative gambling, not growth marketing."

Instead of blended averages, leading growth leads monitor:
- **Fully Loaded Paid CAC:** Including media spend, creative production, and agency/operator fees.
- **First-Transaction Payback:** Exact cash recovery timeline per cohort.
- **LTV/CAC on a Gross Margin Basis:** Calculating lifetime value strictly on retained gross profit rather than top-line revenue.

### 3. How XC Global Solves This for Venture Scale-Ups

XC Global bridges marketing leaders and specialized execution talent directly into your commercial squad. Through our managed infrastructure, we:
- Implement clean server-side CAPI tracking and data warehouse piping.
- Structure weekly creative testing cadences (20+ hooks per sprint).
- Replace vague agency retainers with milestone-driven sprint objectives tracked inside **GrowthOS**.
  `,
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      post = data;
    }
  } catch {
    // fallback
  }

  if (!post && slug === fallbackArticle.slug) {
    post = fallbackArticle;
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background">
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all dispatches</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-6 pb-8 border-b border-border">
            <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
              <span className="px-2.5 py-0.5 rounded-full bg-badge-gold-bg text-badge-gold-text font-bold">
                Growth Engineering
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.published_at)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 6 min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  XC
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-primary">
                    XC Global Editorial Team
                  </h4>
                  <p className="text-[11px] text-text-muted">
                    Reviewed by Senior Growth Partners
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="py-10 space-y-6 text-base text-text-primary leading-relaxed">
            {post.content.split("\n\n").map((block: string, index: number) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl sm:text-2xl font-bold text-text-primary pt-4">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("> ")) {
                return (
                  <blockquote
                    key={index}
                    className="p-6 my-6 border-l-4 border-secondary bg-surface-white rounded-r-xl shadow-sm text-sm sm:text-base font-medium italic text-text-primary"
                  >
                    {block.replace("> ", "")}
                  </blockquote>
                );
              }
              if (block.includes("1. **") || block.includes("- **")) {
                const lines = block.split("\n");
                return (
                  <ul key={index} className="space-y-2.5 my-4 bg-surface-white p-6 rounded-xl border border-border">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx} className="text-xs sm:text-sm text-text-secondary flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                        <span>{line.replace(/^[0-9]\.\s|\-\s/, "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Engagement Callout Box */}
          <div className="my-12 p-8 rounded-2xl bg-surface-container-low border border-border space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
              Need Help With Growth Execution?
            </span>
            <h3 className="text-xl font-bold text-text-primary">
              Audit your customer acquisition economics with an embedded XC Global lead.
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary">
              We deploy proven growth directors and performance operators to inspect your attribution stack and eliminate waste.
            </p>
            <div className="pt-2">
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
              >
                <span>Request Growth Audit (Work With Us)</span>
                <ArrowRight className="w-4 h-4 text-secondary" />
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

