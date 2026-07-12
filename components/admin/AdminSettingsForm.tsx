"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { Field } from "@/components/admin/AdminFields";

export function AdminSettingsForm({ supabaseConfigured }: { supabaseConfigured: boolean }) {
  const [accountEmail, setAccountEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/account");
      if (res.ok) {
        const data = (await res.json()) as { email: string };
        setAccountEmail(data.email);
        setNewEmail(data.email);
      }
    }
    void load();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    if (newPassword && newPassword !== confirmPassword) {
      setMessage("Новые пароли не совпадают.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newEmail: newEmail !== accountEmail ? newEmail : undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string; email?: string; message?: string };
      if (!res.ok) throw new Error(data.error);
      setAccountEmail(data.email || newEmail);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage(data.message || "Настройки аккаунта обновлены.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось обновить аккаунт.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Настройки"
        description="Аккаунт администратора и статус интеграций."
      />

      {message ? <p className="mb-4 text-sm text-gold">{message}</p> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-glass space-y-4 p-6">
          <h2 className="font-heading text-lg text-white-text">Аккаунт</h2>
          <Field label="Email" value={newEmail} onChange={setNewEmail} type="email" />
          <Field
            label="Текущий пароль"
            value={currentPassword}
            onChange={setCurrentPassword}
            type="password"
          />
          <Field label="Новый пароль" value={newPassword} onChange={setNewPassword} type="password" />
          <Field
            label="Повтор нового пароля"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type="password"
          />
          <button type="button" onClick={() => void handleSave()} disabled={saving} className="btn-primary">
            {saving ? "Сохранение..." : "Сохранить аккаунт"}
          </button>
        </div>

        <div className="card-glass space-y-4 p-6">
          <h2 className="font-heading text-lg text-white-text">Интеграции</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-border-subtle pb-3">
              <span className="text-text-secondary">Supabase</span>
              <span className="text-white-text">
                {supabaseConfigured ? "Подключён" : "Локальный режим"}
              </span>
            </div>
            <div className="flex justify-between gap-4 border-b border-border-subtle pb-3">
              <span className="text-text-secondary">Хранение контента</span>
              <span className="text-white-text">site_content + JSON</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-text-secondary">Деплой с API</span>
              <span className="text-white-text">Vercel</span>
            </div>
          </div>
          <p className="text-xs text-text-secondary/80">
            GitHub Pages публикует только статическую папку HTML/. Админ-панель работает в
            Next.js на Vercel.
          </p>
        </div>
      </div>
    </>
  );
}
