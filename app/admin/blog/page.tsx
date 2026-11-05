"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Plus, CheckCircle2, Eye, Edit3, Trash2, Globe } from "lucide-react";
import { BlogPost } from "@/types/database";

const initialPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Death of Blended CAC: Why Precision Growth Engineering Wins",
    slug: "the-death-of-blended-cac",
    excerpt:
      "In the era of privacy changes and high interest rates, relying on blended customer acquisition costs hides unsustainable unit economics.",
    content: "Full markdown analysis...",
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
    content: "Full markdown analysis...",
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
      "Self-serve SaaS models in emerging markets face unique friction in payment trust and onboarding.",
    content: "Full markdown analysis...",
    published: true,
    published_at: "2026-10-05T09:00:00Z",
    created_at: "2026-10-05T09:00:00Z",
    updated_at: "2026-10-05T09:00:00Z",
  },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleTogglePublish = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      slug: newSlug || newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt: newExcerpt,
      content: newContent,
      published: true,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setIsCreating(false);
    setNewTitle("");
    setNewSlug("");
    setNewExcerpt("");
    setNewContent("");
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Content Marketing
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Blog & Research Publications
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Manage thought leadership dispatches, field notes, and case studies published on xcglobalhq.com.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-secondary" />
          <span>{isCreating ? "Cancel" : "New Article"}</span>
        </button>
      </div>

      {/* Create New Post Form */}
      {isCreating && (
        <form onSubmit={handleCreatePost} className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold text-text-primary">Publish New Dispatch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-text-muted">Article Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                  setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                }}
                placeholder="e.g. Unit Economics in 2026 Tech Scaling"
                className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-text-muted">Slug URL</label>
              <input
                type="text"
                required
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="unit-economics-2026-tech-scaling"
                className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background font-mono"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-text-muted">Summary / Excerpt</label>
            <input
              type="text"
              value={newExcerpt}
              onChange={(e) => setNewExcerpt(e.target.value)}
              placeholder="Brief 1-2 sentence teaser for previews..."
              className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-text-muted">Content (Markdown)</label>
            <textarea
              rows={6}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Write analysis in standard Markdown..."
              className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background resize-none"
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container"
            >
              Publish Instantly
            </button>
          </div>
        </form>
      )}

      {/* Publications Table */}
      <div className="bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px] bg-surface-container-low/50">
                <th className="py-3.5 px-4">Title & Slug</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-text-primary block">{post.title}</span>
                    <span className="text-[11px] text-text-muted font-mono">/blog/{post.slug}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleTogglePublish(post.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        post.published
                          ? "bg-status-success/10 text-status-success"
                          : "bg-surface-container text-text-muted"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-text-muted">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 p-1 text-text-muted hover:text-text-primary"
                      title="View live post"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

