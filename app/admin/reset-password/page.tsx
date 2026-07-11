"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminAuthShell } from "@/components/layout/SiteChrome";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Не удалось обновить пароль");
        return;
      }
      setMessage(data.message || "Пароль обновлён.");
      setTimeout(() => router.push("/admin/login"), 1800);
    } catch {
      setError("Ошибка сети. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <AdminAuthShell title="Ссылка недействительна" subtitle="Запросите восстановление пароля заново.">
        <Link href="/admin/forgot-password" className="btn-primary inline-flex w-full justify-center">
          Запросить ссылку
        </Link>
      </AdminAuthShell>
    );
  }

  return (
    <AdminAuthShell title="Новый пароль" subtitle="Придумайте новый пароль для входа в админ-панель.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-2 block text-sm text-text-secondary">
            Новый пароль
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="glass-input w-full"
            minLength={8}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm text-text-secondary">
            Повторите пароль
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="glass-input w-full"
            minLength={8}
            required
          />
        </div>
        {error ? <p className="text-sm text-peach">{error}</p> : null}
        {message ? <p className="text-sm text-gold">{message}</p> : null}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Сохранение..." : "Сохранить пароль"}
        </button>
      </form>
    </AdminAuthShell>
  );
}

export default function AdminResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1e2860]" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
