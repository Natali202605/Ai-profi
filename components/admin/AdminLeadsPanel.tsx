"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  PROJECT_STATUS_LABELS,
  PROJECT_STATUSES,
  type LeadRecord,
  type ProjectWorkflowStatus,
} from "@/lib/crm-store";

type StatusFilter = ProjectWorkflowStatus | "all";

export function AdminLeadsPanel() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [items, setItems] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?status=${status}`);
      if (!res.ok) throw new Error("Load failed");
      const data = (await res.json()) as { leads: LeadRecord[] };
      setItems(data.leads);
    } catch {
      setMessage("Не удалось загрузить заявки");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void load();
  }, [load]);

  async function updateStatus(id: string, next: ProjectWorkflowStatus) {
    setMessage("");
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    if (!res.ok) {
      setMessage("Не удалось обновить статус");
      return;
    }
    setMessage("Статус заявки обновлён.");
    await load();
  }

  const tabs: { id: StatusFilter; label: string }[] = [
    { id: "all", label: "Все" },
    ...PROJECT_STATUSES.map((item) => ({ id: item, label: PROJECT_STATUS_LABELS[item] })),
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
            className={`rounded-full px-3 py-1.5 text-xs ${
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
        <div className="card-glass p-6 text-text-secondary">Заявок в этом разделе пока нет.</div>
      ) : (
        <div className="space-y-4">
          {items.map((lead) => (
            <article key={lead.id} className="card-glass space-y-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white-text">{lead.name}</p>
                  <p className="text-sm text-text-secondary">{lead.contact}</p>
                  {lead.email ? <p className="text-sm text-text-secondary">{lead.email}</p> : null}
                  {lead.telegram ? <p className="text-xs text-text-secondary">Telegram: {lead.telegram}</p> : null}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gold">{lead.service}</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    {PROJECT_STATUS_LABELS[lead.status]}
                  </p>
                </div>
              </div>

              {lead.description ? (
                <p className="text-sm text-text-secondary">{lead.description}</p>
              ) : null}
              {lead.summary ? <p className="text-sm text-text-secondary">{lead.summary}</p> : null}

              <div className="flex flex-wrap items-center gap-2">
                <label className="text-xs text-text-secondary">Статус:</label>
                <select
                  value={lead.status}
                  onChange={(e) => void updateStatus(lead.id, e.target.value as ProjectWorkflowStatus)}
                  className="glass-input !py-1.5 !text-xs"
                >
                  {PROJECT_STATUSES.map((item) => (
                    <option key={item} value={item}>
                      {PROJECT_STATUS_LABELS[item]}
                    </option>
                  ))}
                </select>
                {lead.clientId ? (
                  <Link href={`/admin/clients?id=${lead.clientId}`} className="text-xs text-gold hover:underline">
                    Карточка клиента →
                  </Link>
                ) : null}
              </div>

              <p className="text-xs text-text-secondary/70">
                {new Date(lead.created_at).toLocaleString("ru-RU")}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
