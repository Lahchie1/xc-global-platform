import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type
    const mimeType = file.type || "image/jpeg";
    if (!mimeType.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 10MB" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name ? file.name.split(".").pop() : "jpg";
    const cleanExt = (ext || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const fileName = `blog_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${cleanExt}`;

    const supabase = createAdminClient();

    // Ensure bucket exists
    try {
      await supabase.storage.createBucket("blog-images", { public: true });
    } catch {
      // already exists
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(uploadData.path);

    return NextResponse.json({
      url: urlData.publicUrl,
      fileName,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}

