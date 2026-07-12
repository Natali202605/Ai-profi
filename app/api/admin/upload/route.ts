import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/admin-session";
import {
  isAllowedUploadMime,
  isDocumentFolder,
  registerMediaFile,
  type MediaCategoryId,
} from "@/lib/media-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = formData.get("folder");
    const folder = (typeof folderRaw === "string" ? folderRaw : "cms") as MediaCategoryId;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (!isAllowedUploadMime(folder, file.type, file.name)) {
      return NextResponse.json({ error: "File type not allowed for this category" }, { status: 400 });
    }

    const maxSize = isDocumentFolder(folder) ? 20 * 1024 * 1024 : 8 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: `Max file size is ${maxSize / 1024 / 1024}MB` }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const filename = `${Date.now()}-${safeName}`;
    const subdir = folder === "cms" ? "" : folder;
    const uploadDir = path.join(process.cwd(), "public", "images", "cms", subdir);
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), bytes);

    const url = subdir ? `/images/cms/${subdir}/${filename}` : `/images/cms/${filename}`;
    await registerMediaFile({
      url,
      filename,
      folder,
      mime_type: file.type || undefined,
      size_bytes: file.size,
    });

    return NextResponse.json({ url, filename });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
