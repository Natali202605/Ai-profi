import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { getAdminSession } from "@/lib/admin-session";
import { getLeadsForAdmin } from "@/lib/admin-leads";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Dashboard — Админ-панель",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const leads = await getLeadsForAdmin();
  const newLeads = leads.length;

  const quickLinks = [
    { href: "/admin/homepage", label: "Изменить первый экран" },
    { href: "/admin/content", label: "Редактор контента" },
    { href: "/admin/leads", label: "Проверить заявки" },
    { href: "/admin/reviews", label: "Модерация отзывов" },
    { href: "/admin/media", label: "Загрузить фото" },
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description={`Вы вошли как ${session?.email}. Управляйте контентом сайта без изменения кода.`}
        actions={
          <Link href="/" target="_blank" className="btn-secondary">
            Посмотреть сайт
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card-glass p-5">
          <p className="text-xs uppercase tracking-wider text-text-secondary">Новые заявки</p>
          <p className="mt-2 font-heading text-3xl text-gold">{newLeads}</p>
        </div>
        <div className="card-glass p-5">
          <p className="text-xs uppercase tracking-wider text-text-secondary">Отзывы на модерации</p>
          <p className="mt-2 font-heading text-3xl text-white-text">—</p>
          <p className="mt-1 text-xs text-text-secondary">Этап 3: форма на сайте</p>
        </div>
        <div className="card-glass p-5">
          <p className="text-xs uppercase tracking-wider text-text-secondary">База данных</p>
          <p className="mt-2 text-lg text-white-text">
            {isSupabaseConfigured() ? "Supabase подключён" : "Локальный режим"}
          </p>
        </div>
        <div className="card-glass p-5">
          <p className="text-xs uppercase tracking-wider text-text-secondary">Публикация</p>
          <p className="mt-2 text-lg text-white-text">JSON + Supabase</p>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 font-heading text-xl text-white-text">Быстрые действия</h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="btn-secondary">
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-heading text-xl text-white-text">Последние заявки</h2>
          <Link href="/admin/leads" className="text-sm text-gold hover:underline">
            Все заявки →
          </Link>
        </div>
        {leads.length === 0 ? (
          <div className="card-glass p-6 text-text-secondary">
            Заявок пока нет. Они появятся после отправки форм на сайте.
          </div>
        ) : (
          <div className="space-y-3">
            {leads.slice(0, 3).map((lead, index) => (
              <article key={`${lead.name}-${index}`} className="card-glass p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white-text">{lead.name}</p>
                    <p className="text-sm text-text-secondary">{lead.contact}</p>
                  </div>
                  <p className="text-xs text-gold">{lead.service || "Без услуги"}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
