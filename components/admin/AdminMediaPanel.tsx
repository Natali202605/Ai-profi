"use client";

import { useEffect, useState } from "react";
import type { MediaRecord } from "@/lib/media-store";

export function AdminMediaPanel() {
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) throw new Error("Load failed");
      const data = (await res.json()) as { media: MediaRecord[] };
      setMedia(data.media);
    } catch {
      setMessage("Не удалось загрузить медиатеку");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleUpload(file: File) {
    setUploading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("file", file);
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

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-gold">{message}</p> : null}

      <div className="card-glass p-6">
        <label className="btn-secondary inline-flex cursor-pointer">
          {uploading ? "Загрузка..." : "Загрузить изображение"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
            }}
          />
        </label>
        <p className="mt-3 text-sm text-text-secondary">
          Файлы сохраняются в <code className="text-gold">/images/cms/</code>
          {media.length ? " и регистрируются в Supabase media_library при подключённой базе." : "."}
        </p>
      </div>

      {loading ? (
        <div className="card-glass p-6 text-text-secondary">Загрузка...</div>
      ) : media.length === 0 ? (
        <div className="card-glass p-6 text-text-secondary">Файлов пока нет.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <article key={item.id} className="card-glass overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.alt || ""} className="aspect-video w-full object-cover" />
              <div className="space-y-1 p-3">
                <p className="truncate text-sm text-white-text">{item.filename}</p>
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
