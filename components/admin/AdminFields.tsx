"use client";

import { useState } from "react";

export function Field({
  label,
  value,
  onChange,
  multiline,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
  type?: string;
}) {
  const cls =
    "mt-1 w-full rounded-xl border border-border-subtle bg-plum/30 px-4 py-2.5 text-sm text-white-text outline-none focus:border-gold/50";
  return (
    <label className="block text-sm">
      <span className="text-text-secondary">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-text-secondary/70">{hint}</span> : null}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={cls} />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch {
      alert("Не удалось загрузить изображение");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Field label={label} value={value} onChange={onChange} />
      <div className="flex flex-wrap items-center gap-3">
        <label className="btn-secondary cursor-pointer !py-2 !text-xs">
          {uploading ? "Загрузка..." : "Загрузить файл"}
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
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover" />
        ) : null}
      </div>
    </div>
  );
}

export function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-text-secondary">{label}</p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[index] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded-xl border border-border-subtle bg-plum/30 px-3 py-2 text-sm text-white-text outline-none focus:border-gold/50"
            />
            <button
              type="button"
              className="btn-secondary !px-3 !py-2 !text-xs"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn-secondary !py-2 !text-xs"
          onClick={() => onChange([...items, ""])}
        >
          + Добавить строку
        </button>
      </div>
    </div>
  );
}
