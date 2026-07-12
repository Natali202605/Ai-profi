import { readdir, stat } from "fs/promises";
import path from "path";
import { supabaseRest, isSupabaseReady } from "@/lib/supabase/rest";

export type MediaRecord = {
  id: string;
  url: string;
  filename: string;
  folder: string | null;
  alt: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
};

function mapRow(row: Record<string, unknown>): MediaRecord {
  return {
    id: String(row.id),
    url: String(row.url),
    filename: String(row.filename || ""),
    folder: row.folder ? String(row.folder) : null,
    alt: row.alt ? String(row.alt) : null,
    mime_type: row.mime_type ? String(row.mime_type) : null,
    size_bytes: row.size_bytes ? Number(row.size_bytes) : null,
    created_at: String(row.created_at || new Date().toISOString()),
  };
}

async function listLocalCmsFiles(): Promise<MediaRecord[]> {
  const dir = path.join(process.cwd(), "public", "images", "cms");
  try {
    const files = await readdir(dir);
    const records: MediaRecord[] = [];
    for (const filename of files) {
      const filePath = path.join(dir, filename);
      const info = await stat(filePath);
      if (!info.isFile()) continue;
      records.push({
        id: filename,
        url: `/images/cms/${filename}`,
        filename,
        folder: "cms",
        alt: null,
        mime_type: null,
        size_bytes: info.size,
        created_at: info.mtime.toISOString(),
      });
    }
    return records.sort((a, b) => b.created_at.localeCompare(a.created_at));
  } catch {
    return [];
  }
}

export async function listMediaLibrary(): Promise<MediaRecord[]> {
  if (isSupabaseReady()) {
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(
      "media_library?select=*&order=created_at.desc&limit=200",
    );
    if (ok && data?.length) return data.map(mapRow);
  }
  return listLocalCmsFiles();
}

export async function registerMediaFile(input: {
  url: string;
  filename: string;
  mime_type?: string;
  size_bytes?: number;
  alt?: string;
}) {
  if (!isSupabaseReady()) return null;

  const payload = {
    url: input.url,
    filename: input.filename,
    folder: "cms",
    mime_type: input.mime_type || null,
    size_bytes: input.size_bytes || null,
    alt: input.alt || null,
    created_at: new Date().toISOString(),
  };

  const { data, ok } = await supabaseRest<Record<string, unknown>[]>("media_library", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(payload),
  });

  if (ok && data?.[0]) return mapRow(data[0]);
  return null;
}
