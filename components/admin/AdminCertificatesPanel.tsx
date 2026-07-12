"use client";

import { useCallback, useEffect, useState } from "react";
import type { CertificateRecord } from "@/lib/certificates-store";
import { Field, ImageField } from "@/components/admin/AdminFields";
import { Eye, EyeOff, Trash2 } from "lucide-react";

export function AdminCertificatesPanel() {
  const [items, setItems] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<CertificateRecord | null>(null);
  const [form, setForm] = useState({
    title: "",
    organization: "",
    year: String(new Date().getFullYear()),
    direction: "",
    description: "",
    image: "/images/bg-watercolor.png",
    verify_url: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certificates");
      if (!res.ok) throw new Error("Load failed");
      const data = (await res.json()) as { certificates: CertificateRecord[] };
      setItems(data.certificates);
    } catch {
      setMessage("Не удалось загрузить сертификаты");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save(id: string, patch: Partial<CertificateRecord>) {
    setMessage("");
    const res = await fetch("/api/admin/certificates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (!res.ok) {
      setMessage("Не удалось сохранить сертификат");
      return;
    }
    setMessage("Сертификат обновлён. Главная страница пересобрана.");
    await load();
  }

  async function create() {
    setMessage("");
    const res = await fetch("/api/admin/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, verify_url: form.verify_url || undefined }),
    });
    if (!res.ok) {
      setMessage("Не удалось добавить сертификат");
      return;
    }
    setShowForm(false);
    setForm({
      title: "",
      organization: "",
      year: String(new Date().getFullYear()),
      direction: "",
      description: "",
      image: "/images/bg-watercolor.png",
      verify_url: "",
    });
    setMessage("Сертификат добавлен.");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Удалить сертификат?")) return;
    const res = await fetch(`/api/admin/certificates?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("Не удалось удалить");
      return;
    }
    setMessage("Сертификат удалён.");
    await load();
  }

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-gold">{message}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Скрыть форму" : "Добавить сертификат"}
        </button>
      </div>

      {showForm ? (
        <div className="card-glass space-y-4 p-6">
          <Field label="Название" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field
            label="Организация"
            value={form.organization}
            onChange={(v) => setForm({ ...form, organization: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Год" value={form.year} onChange={(v) => setForm({ ...form, year: v })} />
            <Field
              label="Направление"
              value={form.direction}
              onChange={(v) => setForm({ ...form, direction: v })}
            />
          </div>
          <Field
            label="Описание"
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
            multiline
          />
          <ImageField
            label="Изображение"
            value={form.image}
            onChange={(v) => setForm({ ...form, image: v })}
          />
          <Field
            label="Ссылка подтверждения (необязательно)"
            value={form.verify_url}
            onChange={(v) => setForm({ ...form, verify_url: v })}
          />
          <button type="button" className="btn-primary" onClick={() => void create()}>
            Сохранить сертификат
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="card-glass p-6 text-text-secondary">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="card-glass p-6 text-text-secondary">Сертификатов пока нет.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="card-glass overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
              <div className="space-y-3 p-4">
                <div>
                  <p className="font-medium text-white-text">{item.title}</p>
                  <p className="text-xs text-text-secondary">
                    {item.organization} · {item.year}
                  </p>
                  <p className="mt-1 text-xs text-gold">{item.direction}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-secondary !py-1.5 !text-xs"
                    onClick={() => setPreview(item)}
                  >
                    Preview
                  </button>
                  <button
                    type="button"
                    className="btn-secondary !py-1.5 !text-xs"
                    onClick={() => void save(item.id, { visible: !item.visible })}
                  >
                    {item.visible ? (
                      <>
                        <EyeOff className="mr-1 inline h-3 w-3" /> Скрыть
                      </>
                    ) : (
                      <>
                        <Eye className="mr-1 inline h-3 w-3" /> Показать
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary !py-1.5 !text-xs text-red-300"
                    onClick={() => void remove(item.id)}
                  >
                    <Trash2 className="mr-1 inline h-3 w-3" /> Удалить
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {preview ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-plum/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="card-glass max-h-[90vh] max-w-2xl overflow-y-auto p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.image} alt={preview.title} className="mb-4 w-full rounded-xl" />
            <p className="font-heading text-xl text-white-text">{preview.title}</p>
            <p className="text-sm text-text-secondary">
              {preview.organization} · {preview.year}
            </p>
            <p className="mt-2 text-sm text-gold">{preview.direction}</p>
            <p className="mt-2 text-sm text-text-secondary">{preview.description}</p>
            {preview.verify_url ? (
              <a href={preview.verify_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-gold">
                Ссылка подтверждения →
              </a>
            ) : null}
            <button type="button" className="btn-secondary mt-4" onClick={() => setPreview(null)}>
              Закрыть
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
