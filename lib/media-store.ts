import { readdir, stat } from "fs/promises";
import path from "path";
import { supabaseRest, isSupabaseReady } from "@/lib/supabase/rest";

export const MEDIA_CATEGORIES = [
  { id: "specialist", label: "Фото специалиста" },
  { id: "portfolio", label: "Портфолио" },
  { id: "certificates", label: "Сертификаты" },
  { id: "documents", label: "Документы" },
  { id: "presentations", label: "Презентации" },
  { id: "client_materials", label: "Материалы клиентов" },
  { id: "cms", label: "Общие (CMS)" },
] as const;

export type MediaCategoryId = (typeof MEDIA_CATEGORIES)[number]["id"];

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

async function listLocalCmsFiles(folder?: string): Promise<MediaRecord[]> {
  const baseDir = path.join(process.cwd(), "public", "images", "cms");
  const folders = folder ? [folder] : MEDIA_CATEGORIES.map((item) => item.id);

  const records: MediaRecord[] = [];

  for (const folderName of folders) {
    const dir = path.join(baseDir, folderName === "cms" ? "" : folderName);
    try {
      const files = await readdir(dir);
      for (const filename of files) {
        const filePath = path.join(dir, filename);
        const info = await stat(filePath);
        if (!info.isFile()) continue;
        const url =
          folderName === "cms"
            ? `/images/cms/${filename}`
            : `/images/cms/${folderName}/${filename}`;
        records.push({
          id: `${folderName}-${filename}`,
          url,
          filename,
          folder: folderName,
          alt: null,
          mime_type: null,
          size_bytes: info.size,
          created_at: info.mtime.toISOString(),
        });
      }
    } catch {
      // folder may not exist yet
    }
  }

  return records.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function listMediaLibrary(folder?: string): Promise<MediaRecord[]> {
  if (isSupabaseReady()) {
    const filter = folder && folder !== "all" ? `&folder=eq.${folder}` : "";
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(
      `media_library?select=*&order=created_at.desc&limit=200${filter}`,
    );
    if (ok && data?.length) return data.map(mapRow);
  }
  return listLocalCmsFiles(folder && folder !== "all" ? folder : undefined);
}

export async function registerMediaFile(input: {
  url: string;
  filename: string;
  folder?: string;
  mime_type?: string;
  size_bytes?: number;
  alt?: string;
}) {
  const folder = input.folder || "cms";

  if (isSupabaseReady()) {
    const payload = {
      url: input.url,
      filename: input.filename,
      folder,
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
  }

  return {
    id: `${folder}-${input.filename}`,
    url: input.url,
    filename: input.filename,
    folder,
    alt: input.alt || null,
    mime_type: input.mime_type || null,
    size_bytes: input.size_bytes || null,
    created_at: new Date().toISOString(),
  } satisfies MediaRecord;
}

export async function updateMediaFile(
  id: string,
  patch: Partial<Pick<MediaRecord, "alt" | "folder">>,
) {
  if (!isSupabaseReady()) return null;

  const { data, ok } = await supabaseRest<Record<string, unknown>[]>(`media_library?id=eq.${id}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(patch),
  });

  if (ok && data?.[0]) return mapRow(data[0]);
  return null;
}

export function getMediaCategoryLabel(folder: string | null) {
  return MEDIA_CATEGORIES.find((item) => item.id === folder)?.label || folder || "Без категории";
}

export function isDocumentFolder(folder: string) {
  return ["documents", "presentations", "client_materials"].includes(folder);
}

export function isAllowedUploadMime(folder: string, mime: string, filename: string) {
  if (mime.startsWith("image/")) return true;

  if (!isDocumentFolder(folder)) return false;

  const ext = path.extname(filename).toLowerCase();
  const allowed = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".zip", ".rar", ".txt"];
  return allowed.includes(ext);
}
