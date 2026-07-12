"use client";

import { useCallback, useEffect, useState } from "react";
import { MEDIA_CATEGORIES, getMediaCategoryLabel, type MediaRecord } from "@/lib/media-store";

export function AdminMediaPanel() {
  const [folder, setFolder] = useState<string>("all");
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const query = folder !== "all" ? `?folder=${folder}` : "";
      const res = await fetch(`/api/admin/media${query}`);
      if (!res.ok) throw new Error("Load failed");
      const data = (await res.json()) as { media: MediaRecord[] };
      setMedia(data.media);
    } catch {
      setMessage("Не удалось загрузить медиатеку");
    } finally {
      setLoading(false);
    }
  }, [folder]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleUpload(file: File) {
    setUploading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder === "all" ? "cms" : folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      setMessage("Файл загружен.");
      await load();
    } catch {
      setMessage("Не удалось загрузить файл");
    } finally {
      setUploading(false);
    }
  }

  const accept =
    folder === "documents" || folder === "presentations" || folder === "client_materials"
      ? "image/*,.pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
      : "image/*";

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-gold">{message}</p> : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFolder("all")}
          className={`rounded-full px-3 py-1.5 text-xs ${
            folder === "all" ? "bg-gold text-plum" : "bg-plum/40 text-text-secondary"
          }`}
        >
          Все
        </button>
        {MEDIA_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFolder(cat.id)}
            className={`rounded-full px-3 py-1.5 text-xs ${
              folder === cat.id ? "bg-gold text-plum" : "bg-plum/40 text-text-secondary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="card-glass p-6">
        <label className="btn-secondary inline-flex cursor-pointer">
          {uploading ? "Загрузка..." : "Загрузить файл"}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
            }}
          />
        </label>
        <p className="mt-3 text-sm text-text-secondary">
          Категория:{" "}
          <span className="text-gold">
            {folder === "all" ? "Общие (CMS)" : getMediaCategoryLabel(folder)}
          </span>
          . Изображения до 8 MB, документы до 20 MB.
        </p>
      </div>

      {loading ? (
        <div className="card-glass p-6 text-text-secondary">Загрузка...</div>
      ) : media.length === 0 ? (
        <div className="card-glass p-6 text-text-secondary">Файлов в этой категории пока нет.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <article key={item.id} className="card-glass overflow-hidden">
              {item.mime_type?.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp)$/i.test(item.filename) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={item.alt || ""} className="aspect-video w-full object-cover" />
              ) : (
                <div className="flex aspect-video items-center justify-center bg-plum/40 text-sm text-text-secondary">
                  {item.filename}
                </div>
              )}
              <div className="space-y-1 p-3">
                <p className="truncate text-sm text-white-text">{item.filename}</p>
                <p className="text-xs text-gold">{getMediaCategoryLabel(item.folder)}</p>
                <p className="truncate text-xs text-text-secondary">{item.url}</p>
                {item.size_bytes ? (
                  <p className="text-xs text-text-secondary/70">
                    {(item.size_bytes / 1024).toFixed(0)} KB
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
