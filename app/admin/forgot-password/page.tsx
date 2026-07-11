"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminAuthShell } from "@/components/layout/SiteChrome";

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Не удалось отправить письмо");
        return;
      }
      setMessage(data.message || "Письмо отправлено.");
    } catch {
      setError("Ошибка сети. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminAuthShell
      title="Восстановление пароля"
      subtitle="На email администратора будет отправлена ссылка для смены пароля."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-text-secondary">
            Email администратора
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="glass-input w-full"
            required
          />
        </div>
        {error ? <p className="text-sm text-peach">{error}</p> : null}
        {message ? <p className="text-sm text-gold">{message}</p> : null}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Отправка..." : "Отправить ссылку"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link href="/admin/login" className="text-link">
          Вернуться ко входу
        </Link>
      </p>
    </AdminAuthShell>
  );
}
