"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminPortfolioProject } from "@/lib/portfolio-store";
import { Field } from "@/components/admin/AdminFields";

export function AdminPortfolioPanel() {
  const [projects, setProjects] = useState<AdminPortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    category: "video",
    categoryLabel: "AI-видео",
    shortDescription: "",
    task: "",
    solution: "",
    cover: "/images/bg-watercolor.png",
    services: "AI-видео",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/portfolio");
      if (!res.ok) throw new Error("Load failed");
      const data = (await res.json()) as { projects: AdminPortfolioProject[] };
      setProjects(data.projects);
    } catch {
      setMessage("Не удалось загрузить проекты");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function updateProject(project: AdminPortfolioProject, patch: Partial<AdminPortfolioProject>) {
    setMessage("");
    const res = await fetch("/api/admin/portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: project.id,
        slug: project.slug,
        status: patch.status,
        featured: patch.featured,
      }),
    });
    if (!res.ok) {
      setMessage("Не удалось обновить проект");
      return;
    }
    setMessage("Проект обновлён. Страницы портфолио пересобраны.");
    await load();
  }

  async function createProject() {
    setMessage("");
    const res = await fetch("/api/admin/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        services: form.services.split(",").map((item) => item.trim()).filter(Boolean),
        featured: false,
        status: "draft",
      }),
    });
    if (!res.ok) {
      setMessage("Не удалось создать проект");
      return;
    }
    setShowForm(false);
    setMessage("Проект создан как черновик.");
    await load();
  }

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-gold">{message}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Скрыть форму" : "Добавить проект"}
        </button>
      </div>

      {showForm ? (
        <div className="card-glass space-y-4 p-6">
          <h2 className="font-heading text-lg text-white-text">Новый проект</h2>
          <Field label="Slug (URL)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
          <Field label="Название" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field
            label="Краткое описание"
            value={form.shortDescription}
            onChange={(v) => setForm({ ...form, shortDescription: v })}
            multiline
          />
          <Field label="Обложка (URL)" value={form.cover} onChange={(v) => setForm({ ...form, cover: v })} />
          <Field
            label="Услуги через запятую"
            value={form.services}
            onChange={(v) => setForm({ ...form, services: v })}
          />
          <button type="button" className="btn-primary" onClick={() => void createProject()}>
            Сохранить черновик
          </button>
        </div>
      ) : null}

      {loading ? (
        <div className="card-glass p-6 text-text-secondary">Загрузка...</div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <article key={`${project.source}-${project.slug}`} className="card-glass p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white-text">{project.title}</p>
                  <p className="text-sm text-text-secondary">
                    {project.categoryLabel} · {project.source} · {project.status}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="btn-secondary !py-2 !text-xs"
                    onClick={() =>
                      void updateProject(project, {
                        status: project.status === "published" ? "draft" : "published",
                      })
                    }
                  >
                    {project.status === "published" ? "Скрыть" : "Опубликовать"}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary !py-2 !text-xs"
                    onClick={() => void updateProject(project, { featured: !project.featured })}
                  >
                    {project.featured ? "Убрать из избранного" : "В избранное"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
