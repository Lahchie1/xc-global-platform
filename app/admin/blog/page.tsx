"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  CheckCircle2,
  Eye,
  Edit3,
  Trash2,
  Globe,
  Loader2,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Minus,
  Sparkles,
  X,
  ExternalLink,
  Upload,
  FileImage,
} from "lucide-react";
import { BlogPost } from "@/types/database";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Editor states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  // Image Modal states
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Link Modal states
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data.posts || []);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openNewPost = () => {
    setEditingPostId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCoverImage("");
    setPublished(true);
    setEditorTab("write");
    setIsEditorOpen(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");
    setCoverImage(post.cover_image || "");
    setPublished(post.published);
    setEditorTab("write");
    setIsEditorOpen(true);
  };

  // Helper to insert markdown text at cursor position
  const insertTextAtCursor = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setContent((prev) => prev + "\n\n" + before + defaultText + after);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || defaultText;
    const replacement = before + selected + after;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 50);
  };

  // List insertion handler
  const handleInsertList = (ordered: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      const template = ordered
        ? "\n1. Step one\n2. Step two\n3. Step three\n"
        : "\n- First point\n- Second point\n- Third point\n";
      setContent((prev) => prev + template);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);

    if (selected.trim()) {
      const lines = selected.split("\n");
      const formatted = lines
        .map((l, idx) =>
          ordered
            ? `${idx + 1}. ${l.replace(/^[-*•\d.]\s*/, "")}`
            : `- ${l.replace(/^[-*•\d.]\s*/, "")}`
        )
        .join("\n");
      const newContent = content.substring(0, start) + formatted + content.substring(end);
      setContent(newContent);
    } else {
      const template = ordered
        ? "\n1. Step one\n2. Step two\n3. Step three\n"
        : "\n- First point\n- Second point\n- Third point\n";
      insertTextAtCursor(template, "", "");
    }
  };

  // Image Selection Handler (from PC)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      if (!imageCaption) {
        setImageCaption(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
      }
    }
  };

  // Upload image from PC or insert URL
  const handleConfirmInsertImage = async () => {
    if (imageTab === "upload") {
      if (!selectedFile) {
        alert("Please select an image file from your computer");
        return;
      }

      setUploadingImage(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("/api/admin/blog/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");

        const finalUrl = data.url;
        const caption = imageCaption.trim() || "Article Visual";
        const markdown = `\n\n![${caption}](${finalUrl})\n\n`;

        insertTextAtCursor(markdown, "", "");
        closeImageModal();
      } catch (err: any) {
        alert(err?.message || "Failed to upload picture");
      } finally {
        setUploadingImage(false);
      }
    } else {
      // URL Tab
      if (!imageUrl.trim()) return;
      const markdown = `\n\n![${imageCaption.trim() || "Article Visual"}](${imageUrl.trim()})\n\n`;
      insertTextAtCursor(markdown, "", "");
      closeImageModal();
    }
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedFile(null);
    setFilePreview(null);
    setImageUrl("");
    setImageCaption("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Cover Image Upload from PC
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/blog/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Cover upload failed");

      setCoverImage(data.url);
    } catch (err: any) {
      alert(err?.message || "Failed to upload cover picture");
    } finally {
      setCoverUploading(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    const text = linkText.trim() || linkUrl.trim();
    const markdown = `[${text}](${linkUrl.trim()})`;
    insertTextAtCursor(markdown, "", "");
    setLinkUrl("");
    setLinkText("");
    setLinkModalOpen(false);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      alert("Title and slug are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        id: editingPostId,
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage || null,
        published,
      };

      const res = await fetch("/api/admin/blog", {
        method: editingPostId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save post");

      await fetchPosts();
      setIsEditorOpen(false);
    } catch (err: any) {
      alert(err?.message || "Failed to save article");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const res = await fetch("/api/admin/blog", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: post.id,
          published: !post.published,
        }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchPosts();
    } catch (err: any) {
      alert(err?.message || "Failed to toggle publish status");
    }
  };

  const handleDeletePost = async (id: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      await fetchPosts();
    } catch (err: any) {
      alert(err?.message || "Failed to delete article");
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-gold">
            Content Marketing &amp; Insights
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            Blog &amp; Publications Studio
          </h1>
          <p className="text-xs text-text-muted mt-0.5">
            Draft, format, upload pictures directly from your PC at intervals, embed references, and publish insights.
          </p>
        </div>

        <button
          onClick={openNewPost}
          className="px-4 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-secondary" />
          <span>New Article</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {isEditorOpen && (
        <div className="bg-surface-white rounded-2xl border border-border shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-text-primary">
                {editingPostId ? "Edit Article" : "Compose New Article"}
              </h3>
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setEditorTab("write")}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    editorTab === "write"
                      ? "bg-surface-white text-primary shadow-sm"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  Write &amp; Format
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab("preview")}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    editorTab === "preview"
                      ? "bg-surface-white text-primary shadow-sm"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  Live Preview
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsEditorOpen(false)}
              className="p-1 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-container-low transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSavePost} className="space-y-5">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Article Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingPostId) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "")
                      );
                    }
                  }}
                  placeholder="e.g. Precision Growth Architecture for High-Velocity Ventures"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Slug URL</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="precision-growth-architecture"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background font-mono"
                />
              </div>
            </div>

            {/* Excerpt & Cover Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Summary / Excerpt</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="1-2 sentences summarizing the core growth principle..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-text-muted">Cover Image</label>
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={coverUploading}
                    className="text-[11px] font-bold text-secondary hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    {coverUploading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Upload className="w-3 h-3" />
                    )}
                    <span>{coverUploading ? "Uploading..." : "Upload from PC"}</span>
                  </button>
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                </div>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://... or click 'Upload from PC'"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background font-mono"
                />
              </div>
            </div>

            {/* Formatting Toolbar */}
            {editorTab === "write" ? (
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-surface-container-low border border-border text-xs">
                  <span className="text-[10px] font-bold uppercase text-text-muted mr-1">Format:</span>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("## ", "", "Section Heading")}
                    className="p-1.5 rounded hover:bg-surface-white border border-transparent hover:border-border text-text-secondary hover:text-text-primary"
                    title="Heading 2"
                  >
                    <Heading2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("### ", "", "Subheading")}
                    className="p-1.5 rounded hover:bg-surface-white border border-transparent hover:border-border text-text-secondary hover:text-text-primary"
                    title="Heading 3"
                  >
                    <Heading3 className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("**", "**", "bold text")}
                    className="p-1.5 rounded hover:bg-surface-white border border-transparent hover:border-border text-text-secondary hover:text-text-primary"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("*", "*", "italic text")}
                    className="p-1.5 rounded hover:bg-surface-white border border-transparent hover:border-border text-text-secondary hover:text-text-primary"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("> ", "", "Insightful executive quote or framework")}
                    className="p-1.5 rounded hover:bg-surface-white border border-transparent hover:border-border text-text-secondary hover:text-text-primary"
                    title="Blockquote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  {/* Fixed Bullet List with Multiline support */}
                  <button
                    type="button"
                    onClick={() => handleInsertList(false)}
                    className="p-1.5 rounded hover:bg-surface-white border border-transparent hover:border-border text-text-secondary hover:text-text-primary flex items-center gap-1 font-semibold"
                    title="Bullet List (- item)"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  {/* Fixed Numbered List */}
                  <button
                    type="button"
                    onClick={() => handleInsertList(true)}
                    className="p-1.5 rounded hover:bg-surface-white border border-transparent hover:border-border text-text-secondary hover:text-text-primary flex items-center gap-1 font-semibold"
                    title="Numbered List (1. item)"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("\n\n---\n\n", "")}
                    className="p-1.5 rounded hover:bg-surface-white border border-transparent hover:border-border text-text-secondary hover:text-text-primary"
                    title="Divider Break"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-border mx-1" />
                  {/* Picture Addition from PC */}
                  <button
                    type="button"
                    onClick={() => {
                      setImageTab("upload");
                      setImageModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-secondary/10 text-secondary hover:bg-secondary/20 font-semibold text-xs transition-colors"
                    title="Upload picture from PC or URL"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Insert Picture (PC / URL)</span>
                  </button>
                  {/* Link Embedding */}
                  <button
                    type="button"
                    onClick={() => setLinkModalOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/20 font-semibold text-xs transition-colors"
                    title="Embed Hyperlink"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Embed Link</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-text-muted flex items-center justify-between">
                    <span>Article Content</span>
                    <span className="text-[11px] font-normal text-text-muted">
                      Use toolbar buttons to insert pictures, bullet lists, and links anywhere
                    </span>
                  </label>
                  <textarea
                    ref={textareaRef}
                    rows={14}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write article content here. Use the toolbar above to upload pictures from your PC at intervals, format headings, create bullet lists, and embed links..."
                    className="w-full p-4 rounded-xl border border-border text-xs font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-primary bg-background resize-y"
                  />
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-border bg-surface-white min-h-[380px]">
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="pb-4 border-b border-border">
                    <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                      Article Preview
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1">
                      {title || "Untitled Article"}
                    </h2>
                    {excerpt && <p className="text-xs sm:text-sm text-text-secondary mt-2 italic">{excerpt}</p>}
                  </div>
                  {content ? (
                    <BlogContentRenderer content={content} />
                  ) : (
                    <p className="text-xs text-text-muted italic py-8 text-center">
                      Content is empty. Type in the write tab to preview visuals, bullet points, and text.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-text-primary">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span>Publish immediately to xcglobalhq.com/blog</span>
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-container-low transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors disabled:opacity-60 flex items-center gap-2 shadow-sm"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingPostId ? "Update Article" : "Publish Article"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Picture Addition Modal (Upload from PC or Web Link) */}
      {imageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface-white rounded-2xl border border-border shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-secondary" />
                  Insert Picture at Interval
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Upload photos, infometrics, or diagrams from your computer.
                </p>
              </div>
              <button onClick={closeImageModal} className="text-text-muted hover:text-text-primary">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Tabs: PC Upload vs Web Link */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-border text-xs font-semibold">
              <button
                type="button"
                onClick={() => setImageTab("upload")}
                className={`flex-1 py-1.5 rounded-md text-center transition-colors ${
                  imageTab === "upload"
                    ? "bg-surface-white text-primary font-bold shadow-sm"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                Upload from PC
              </button>
              <button
                type="button"
                onClick={() => setImageTab("url")}
                className={`flex-1 py-1.5 rounded-md text-center transition-colors ${
                  imageTab === "url"
                    ? "bg-surface-white text-primary font-bold shadow-sm"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                Web Link (URL)
              </button>
            </div>

            <div className="space-y-3">
              {imageTab === "upload" ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {!filePreview ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-border hover:border-secondary/60 rounded-xl p-8 text-center cursor-pointer transition-colors bg-surface-container-low/40 hover:bg-surface-container-low space-y-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-text-primary">
                        Click to select image from your computer
                      </p>
                      <p className="text-[11px] text-text-muted">
                        Supports PNG, JPG, WEBP up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="relative rounded-xl overflow-hidden border border-border bg-surface-container-low max-h-48 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setFilePreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-text-muted text-center truncate">
                        {selectedFile?.name} ({(selectedFile?.size ? selectedFile.size / 1024 : 0).toFixed(0)} KB)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-text-muted">Image Asset URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or public image URL"
                    className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background font-mono"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Caption &amp; Alt Description</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="e.g. Figure 1: CAC Payback Period Optimization"
                  className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={closeImageModal}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmInsertImage}
                disabled={uploadingImage || (imageTab === "upload" ? !selectedFile : !imageUrl.trim())}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploadingImage && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{uploadingImage ? "Uploading..." : "Insert Picture"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embed Link Modal */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface-white rounded-2xl border border-border shadow-xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-accent-gold" />
                  Embed Link
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Embed internal or external references and sources.
                </p>
              </div>
              <button
                onClick={() => setLinkModalOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Destination URL</label>
                <input
                  type="url"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://xcglobalhq.com/services or external resource"
                  className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-text-muted">Anchor / Display Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. XC Global Talent Solutions"
                  className="w-full px-3 py-2 rounded-lg border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-background"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-xs font-semibold text-text-secondary hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                disabled={!linkUrl.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors disabled:opacity-50"
              >
                Embed Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publications Table */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
          <Loader2 className="w-7 h-7 text-secondary animate-spin" />
          <p className="text-xs text-text-muted font-medium">Loading published articles from database...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-status-error/10 border border-status-error/20 text-status-error text-xs">
          <p className="font-bold">Failed to load articles</p>
          <p className="mt-1">{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-3 px-4 py-1.5 rounded-lg bg-status-error text-white font-semibold text-xs"
          >
            Retry
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-surface-white rounded-2xl border border-border p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-text-muted mx-auto" />
          <h3 className="text-base font-bold text-text-primary">No articles published yet</h3>
          <p className="text-xs text-text-muted">Click &ldquo;New Article&rdquo; above to publish your first analysis.</p>
        </div>
      ) : (
        <div className="bg-surface-white rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px] bg-surface-container-low/50">
                  <th className="py-3.5 px-4">Title &amp; Path</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-text-primary block text-sm">{post.title}</span>
                      <span className="text-[11px] text-text-muted font-mono">/blog/{post.slug}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          post.published
                            ? "bg-status-success/10 text-status-success hover:bg-status-success/20"
                            : "bg-surface-container text-text-muted hover:bg-surface-container-high"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-text-muted">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-container-low transition-colors"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => openEditPost(post)}
                          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-container-low transition-colors"
                          title="Edit Article & Format"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id, post.title)}
                          className="p-1.5 rounded-lg text-status-error/70 hover:text-status-error hover:bg-status-error/10 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
