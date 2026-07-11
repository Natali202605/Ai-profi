"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} className="btn-secondary">
      Выйти
    </button>
  );
}

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1e2860] pt-24 pb-16">
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Admin panel</p>
            <h1 className="heading-display mt-2 text-4xl text-white-text">{title}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-secondary">
              На сайт
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
