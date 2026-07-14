"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioCategoryMeta } from "@/lib/portfolio-categories-store";
import { Field } from "@/components/admin/AdminFields";

export function AdminCategoriesPanel() {
  const [categories, setCategories] = useState<PortfolioCategoryMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error("fail");
      const data = (await res.json()) as { categories: PortfolioCategoryMeta[] };
      setCategories(data.categories);
    } catch {
      setMessage("Не удалось загрузить категории");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setMessage("");
    const res = await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categories }),
    });
    if (!res.ok) {
      setMessage("Ошибка сохранения");
      return;
    }
    setMessage("Категории сохранены");
    await load();
  }

  function update(index: number, patch: Partial<PortfolioCategoryMeta>) {
    setCategories((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  }

  function addCategory() {
    const id = `cat-${Date.now()}`;
    setCategories((prev) => [
      ...prev,
      {
        id,
        label: "Новая категория",
        slug: id,
        description: "",
        order: prev.length,
      },
    ]);
  }

  function remove(index: number) {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  }

  if (loading) {
    return <div className="card-glass p-6 text-text-secondary">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-gold">{message}</p> : null}
      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={addCategory}>
          Добавить категорию
        </button>
        <button type="button" className="btn-secondary" onClick={() => void save()}>
          Сохранить
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat, index) => (
          <article key={cat.id} className="card-glass space-y-3 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-white-text">{cat.label || cat.id}</p>
              <button type="button" className="btn-secondary !py-2 !text-xs" onClick={() => remove(index)}>
                Удалить
              </button>
            </div>
            <Field label="ID" value={cat.id} onChange={(v) => update(index, { id: v })} />
            <Field label="Название" value={cat.label} onChange={(v) => update(index, { label: v })} />
            <Field label="Slug" value={cat.slug} onChange={(v) => update(index, { slug: v })} />
            <Field
              label="Описание"
              value={cat.description}
              onChange={(v) => update(index, { description: v })}
              multiline
            />
            <Field
              label="SEO title"
              value={cat.seoTitle || ""}
              onChange={(v) => update(index, { seoTitle: v })}
            />
            <Field
              label="SEO description"
              value={cat.seoDescription || ""}
              onChange={(v) => update(index, { seoDescription: v })}
              multiline
            />
            <Field
              label="Порядок"
              value={String(cat.order)}
              onChange={(v) => update(index, { order: Number(v) || 0 })}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
