"use client";

import { useCallback, useEffect, useState } from "react";
import type { TestimonialRecord } from "@/lib/testimonials-store";

type StatusFilter = "all" | "pending" | "published" | "rejected";

export function AdminReviewsPanel() {
  const [status, setStatus] = useState<StatusFilter>("pending");
  const [items, setItems] = useState<TestimonialRecord[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews?status=${status}`);
      if (!res.ok) throw new Error("Load failed");
      const data = (await res.json()) as {
        testimonials: TestimonialRecord[];
        pendingCount: number;
      };
      setItems(data.testimonials);
      setPendingCount(data.pendingCount);
    } catch {
      setMessage("Не удалось загрузить отзывы");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function moderate(id: string, patch: Partial<TestimonialRecord>) {
    setMessage("");
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (!res.ok) {
      setMessage("Не удалось обновить отзыв");
      return;
    }
    setMessage("Отзыв обновлён. Главная страница пересобрана.");
    await load();
  }

  const tabs: { id: StatusFilter; label: string }[] = [
    { id: "pending", label: `Новые (${pendingCount})` },
    { id: "published", label: "Опубликованные" },
    { id: "rejected", label: "Отклонённые" },
    { id: "all", label: "Все" },
  ];

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-gold">{message}</p> : null}

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setStatus(tab.id)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider ${
              status === tab.id
                ? "bg-gold text-plum"
                : "bg-plum/40 text-text-secondary hover:text-white-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card-glass p-6 text-text-secondary">Загрузка...</div>
      ) : items.length === 0 ? (
        <div className="card-glass p-6 text-text-secondary">Отзывов в этом разделе пока нет.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="card-glass space-y-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white-text">{item.name}</p>
                  <p className="text-sm text-text-secondary">
                    {[item.role, item.company].filter(Boolean).join(" · ") || "Клиент"}
                  </p>
                  <p className="mt-1 text-xs text-gold">
                    {item.service} · {item.rating}/5 · {item.status}
                  </p>
                </div>
                <p className="text-xs text-text-secondary/70">
                  {new Date(item.created_at).toLocaleString("ru-RU")}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">«{item.full_text}»</p>
              <div className="flex flex-wrap gap-2">
                {item.status !== "published" ? (
                  <button
                    type="button"
                    className="btn-primary !py-2 !text-xs"
                    onClick={() => void moderate(item.id, { status: "published" })}
                  >
                    Опубликовать
                  </button>
                ) : null}
                {item.status !== "rejected" ? (
                  <button
                    type="button"
                    className="btn-secondary !py-2 !text-xs"
                    onClick={() => void moderate(item.id, { status: "rejected" })}
                  >
                    Отклонить
                  </button>
                ) : null}
                <button
                  type="button"
                  className="btn-secondary !py-2 !text-xs"
                  onClick={() => void moderate(item.id, { is_featured: !item.is_featured })}
                >
                  {item.is_featured ? "Убрать из избранного" : "В избранное"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
