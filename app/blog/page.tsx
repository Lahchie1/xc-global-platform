import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { BlogPost } from "@/types/database";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog & Research",
  description:
    "Institutional perspectives, tactical acquisition frameworks, and talent insights for high-growth tech founders.",
};

const defaultPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Death of Blended CAC: Why Precision Growth Engineering Wins",
    slug: "the-death-of-blended-cac",
    excerpt:
      "In the post-ZIRP reality, relying on blended customer acquisition cost obscures broken unit economics. Discover how precision acquisition and algorithmic attribution protect venture capital.",
    content: "",
    published: true,
    published_at: "2026-10-24T12:00:00Z",
    created_at: "2026-10-24T12:00:00Z",
    updated_at: "2026-10-24T12:00:00Z",
  },
  {
    id: "post-2",
    title: "The 72-Hour Embedded Talent Playbook: How Scale-Ups Outpace Bureaucracy",
    slug: "the-72-hour-embedded-talent-playbook",
    excerpt:
      "Why traditional 60-day recruitment cycles kill startup momentum, and how embedding pre-vetted marketing operators unlocks rapid commercial sprint execution.",
    content: "",
    published: true,
    published_at: "2026-10-18T10:00:00Z",
    created_at: "2026-10-18T10:00:00Z",
    updated_at: "2026-10-18T10:00:00Z",
  },
  {
    id: "post-3",
    title: "Product-Led Growth in Emerging Markets: Overcoming Low-Trust Barriers",
    slug: "product-led-growth-emerging-markets",
    excerpt:
      "Self-serve SaaS models in emerging markets face unique friction in payment trust and onboarding. Here is how leading fintechs design high-converting onboarding loops.",
    content: "",
    published: true,
    published_at: "2026-10-05T09:00:00Z",
    created_at: "2026-10-05T09:00:00Z",
    updated_at: "2026-10-05T09:00:00Z",
  },
];

export default async function BlogPage() {
  let posts: BlogPost[] = defaultPosts;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (data && data.length > 0) {
      posts = data;
    }
  } catch {
    // fallback to defaultPosts
  }

  const featured = posts[0];
  const remaining = posts.slice(1);

  return (
    <>
      <Navbar />

      <main className="w-full pt-28 pb-20 bg-background">
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-badge-gold-bg text-badge-gold-text text-xs font-semibold uppercase tracking-wider mb-4">
            Research & Thought Leadership
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary max-w-3xl mx-auto leading-tight">
            Field notes on modern growth, talent systems, and unit economics.
          </h1>
          <p className="mt-4 text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Written by practitioners embedded inside venture-backed tech startups, fintechs, and high-volume digital brands.
          </p>
        </section>

        {/* Featured Post */}
        {featured && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="block bg-surface-white rounded-2xl border border-border shadow-card p-8 sm:p-12 hover:shadow-md transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="px-2.5 py-0.5 rounded-full bg-badge-gold-bg text-badge-gold-text font-bold">
                      Featured Analysis
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featured.published_at || featured.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> 6 min read
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                    {featured.title}
                  </h2>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs font-bold text-text-primary">
                    <span>Read full dispatch</span>
                    <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-8 border border-border flex flex-col justify-center items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base">
                    XC
                  </div>
                  <h4 className="font-bold text-sm text-text-primary">
                    XC Global Research Pod
                  </h4>
                  <p className="text-xs text-text-muted">
                    Published for Founders, CMOs & Venture Operators
                  </p>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Remaining Posts Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-surface-white rounded-xl p-6 border border-border shadow-card hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-gold transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-text-primary">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-secondary group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

