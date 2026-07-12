"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DOCUMENT_TYPE_LABELS,
  PROJECT_STATUS_LABELS,
  PROJECT_STATUSES,
  type ClientProjectRecord,
  type ClientRecord,
  type LeadRecord,
  type ProjectDocumentRecord,
  type ProjectDocumentType,
  type ProjectWorkflowStatus,
} from "@/lib/crm-store";

type ClientDetail = {
  client: ClientRecord;
  leads: LeadRecord[];
  projects: ClientProjectRecord[];
  documents: ProjectDocumentRecord[];
};

export function AdminClientsPanel() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("id");

  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [detail, setDetail] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [docForm, setDocForm] = useState({
    projectId: "",
    type: "contract" as ProjectDocumentType,
    title: "",
    url: "",
    filename: "",
  });

  const loadClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clients");
      if (!res.ok) throw new Error("Load failed");
      const data = (await res.json()) as { clients: ClientRecord[] };
      setClients(data.clients);
    } catch {
      setMessage("Не удалось загрузить клиентов");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDetail = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/clients?id=${id}`);
      if (!res.ok) throw new Error("Load failed");
      const data = (await res.json()) as ClientDetail;
      setDetail(data);
      if (data.projects[0]) {
        setDocForm((prev) => ({ ...prev, projectId: data.projects[0].id }));
      }
    } catch {
      setMessage("Не удалось загрузить карточку клиента");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedId) {
      void loadDetail(selectedId);
    } else {
      void loadClients();
    }
  }, [selectedId, loadClients, loadDetail]);

  async function updateProjectStatus(id: string, status: ProjectWorkflowStatus) {
    const res = await fetch("/api/admin/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      setMessage("Не удалось обновить проект");
      return;
    }
    setMessage("Статус проекта обновлён.");
    if (selectedId) await loadDetail(selectedId);
  }

  async function addDocument() {
    if (!detail || !docForm.projectId || !docForm.url) {
      setMessage("Укажите проект и ссылку на документ");
      return;
    }
    const res = await fetch("/api/admin/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: docForm.projectId,
        clientId: detail.client.id,
        type: docForm.type,
        title: docForm.title || DOCUMENT_TYPE_LABELS[docForm.type],
        url: docForm.url,
        filename: docForm.filename || docForm.title,
      }),
    });
    if (!res.ok) {
      setMessage("Не удалось добавить документ");
      return;
    }
    setMessage("Документ добавлен.");
    setDocForm((prev) => ({ ...prev, title: "", url: "", filename: "" }));
    await loadDetail(detail.client.id);
  }

  async function uploadDocument(file: File) {
    if (!detail) return;
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "documents");
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = (await res.json()) as { url?: string; filename?: string; error?: string };
    if (!res.ok || !data.url) {
      setMessage(data.error || "Не удалось загрузить файл");
      return;
    }
    setDocForm((prev) => ({
      ...prev,
      url: data.url || "",
      filename: data.filename || file.name,
      title: prev.title || file.name,
    }));
    setMessage("Файл загружен — нажмите «Добавить документ».");
  }

  if (selectedId && detail) {
    const { client, leads, projects, documents } = detail;

    return (
      <div className="space-y-6">
        {message ? <p className="text-sm text-gold">{message}</p> : null}

        <div className="card-glass p-6">
          <p className="text-xs uppercase tracking-wider text-gold">Клиент</p>
          <h2 className="mt-2 font-heading text-2xl text-white-text">{client.name}</h2>
          <div className="mt-3 grid gap-1 text-sm text-text-secondary sm:grid-cols-2">
            <p>Телефон: {client.contact}</p>
            {client.email ? <p>Email: {client.email}</p> : null}
            {client.telegram ? <p>Telegram: {client.telegram}</p> : null}
            {client.vk ? <p>ВКонтакте: {client.vk}</p> : null}
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="card-glass p-5">
            <h3 className="mb-3 font-heading text-lg text-white-text">Заявки</h3>
            {leads.length === 0 ? (
              <p className="text-sm text-text-secondary">Нет заявок</p>
            ) : (
              <ul className="space-y-3">
                {leads.map((lead) => (
                  <li key={lead.id} className="rounded-xl bg-plum/30 p-3 text-sm">
                    <p className="text-white-text">{lead.service}</p>
                    <p className="text-text-secondary">{PROJECT_STATUS_LABELS[lead.status]}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card-glass p-5">
            <h3 className="mb-3 font-heading text-lg text-white-text">Проекты</h3>
            {projects.length === 0 ? (
              <p className="text-sm text-text-secondary">Нет проектов</p>
            ) : (
              <ul className="space-y-3">
                {projects.map((project) => (
                  <li key={project.id} className="rounded-xl bg-plum/30 p-3 text-sm">
                    <p className="text-white-text">{project.title}</p>
                    <select
                      value={project.status}
                      onChange={(e) =>
                        void updateProjectStatus(project.id, e.target.value as ProjectWorkflowStatus)
                      }
                      className="glass-input mt-2 !py-1 !text-xs"
                    >
                      {PROJECT_STATUSES.map((item) => (
                        <option key={item} value={item}>
                          {PROJECT_STATUS_LABELS[item]}
                        </option>
                      ))}
                    </select>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="card-glass p-5">
          <h3 className="mb-3 font-heading text-lg text-white-text">Документы проекта</h3>
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <select
              value={docForm.projectId}
              onChange={(e) => setDocForm({ ...docForm, projectId: e.target.value })}
              className="glass-input !text-sm"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            <select
              value={docForm.type}
              onChange={(e) =>
                setDocForm({ ...docForm, type: e.target.value as ProjectDocumentType })
              }
              className="glass-input !text-sm"
            >
              {Object.entries(DOCUMENT_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Название документа"
              value={docForm.title}
              onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
              className="glass-input !text-sm"
            />
            <input
              type="text"
              placeholder="URL или загрузите файл"
              value={docForm.url}
              onChange={(e) => setDocForm({ ...docForm, url: e.target.value })}
              className="glass-input !text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="btn-secondary inline-flex cursor-pointer !text-xs">
              Загрузить файл
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.zip"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void uploadDocument(file);
                }}
              />
            </label>
            <button type="button" className="btn-primary !text-xs" onClick={() => void addDocument()}>
              Добавить документ
            </button>
          </div>

          {documents.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {documents.map((doc) => (
                <li key={doc.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-plum/30 p-3 text-sm">
                  <div>
                    <p className="text-white-text">{doc.title}</p>
                    <p className="text-xs text-text-secondary">
                      {DOCUMENT_TYPE_LABELS[doc.type]} · {doc.filename}
                    </p>
                  </div>
                  <a href={doc.url} target="_blank" rel="noreferrer" className="text-xs text-gold hover:underline">
                    Открыть →
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="card-glass p-5">
          <h3 className="mb-3 font-heading text-lg text-white-text">История взаимодействия</h3>
          <ul className="space-y-2 text-sm">
            {projects.flatMap((project) =>
              project.history.map((entry) => (
                <li key={entry.id} className="text-text-secondary">
                  <span className="text-gold">{new Date(entry.at).toLocaleString("ru-RU")}</span>
                  {" — "}
                  {entry.action}
                  {entry.detail ? `: ${entry.detail}` : ""}
                </li>
              )),
            )}
          </ul>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-gold">{message}</p> : null}

      {loading ? (
        <div className="card-glass p-6 text-text-secondary">Загрузка...</div>
      ) : clients.length === 0 ? (
        <div className="card-glass p-6 text-text-secondary">
          Клиентов пока нет. Они появятся после первых заявок с сайта.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {clients.map((client) => (
            <a
              key={client.id}
              href={`/admin/clients?id=${client.id}`}
              className="card-glass block p-5 transition-colors hover:border-gold/30"
            >
              <p className="font-medium text-white-text">{client.name}</p>
              <p className="text-sm text-text-secondary">{client.contact}</p>
              {client.email ? <p className="text-xs text-text-secondary">{client.email}</p> : null}
              <p className="mt-2 text-xs text-gold">
                Обновлено: {new Date(client.updated_at).toLocaleString("ru-RU")}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
