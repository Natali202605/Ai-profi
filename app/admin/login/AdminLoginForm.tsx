"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminAuthShell } from "@/components/layout/SiteChrome";

const REMEMBER_EMAIL_KEY = "admin_remember_email";
const REMEMBER_PASSWORD_KEY = "admin_remember_password";
const REMEMBER_FLAG_KEY = "admin_remember_enabled";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedRemember = localStorage.getItem(REMEMBER_FLAG_KEY) === "true";
    const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY) || "";
    const savedPassword = localStorage.getItem(REMEMBER_PASSWORD_KEY) || "";
    setRemember(savedRemember);
    if (savedRemember) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Не удалось войти");
        return;
      }

      if (remember) {
        localStorage.setItem(REMEMBER_FLAG_KEY, "true");
        localStorage.setItem(REMEMBER_EMAIL_KEY, email);
        localStorage.setItem(REMEMBER_PASSWORD_KEY, password);
      } else {
        localStorage.removeItem(REMEMBER_FLAG_KEY);
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
        localStorage.removeItem(REMEMBER_PASSWORD_KEY);
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Ошибка сети. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminAuthShell
      title="Вход в админ-панель"
      subtitle="Введите email и пароль администратора."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-text-secondary">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="glass-input w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm text-text-secondary">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="glass-input w-full"
            required
          />
        </div>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          Запомнить логин и пароль на этом устройстве
        </label>
        {error ? <p className="text-sm text-peach">{error}</p> : null}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link href="/admin/forgot-password" className="text-link">
          Забыли пароль?
        </Link>
      </p>
    </AdminAuthShell>
  );
}
