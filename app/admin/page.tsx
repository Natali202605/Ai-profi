import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminContentEditor } from "@/components/admin/AdminContentEditor";
import { getAdminSession } from "@/lib/admin-session";
import { getLeadsForAdmin } from "@/lib/admin-leads";

export const metadata: Metadata = {
  title: "Админ-панель",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const leads = await getLeadsForAdmin();

  return (
    <AdminShell title="Панель администратора">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-glass p-6 lg:col-span-1">
          <p className="text-sm text-text-secondary">Вы вошли как</p>
          <p className="mt-2 font-medium text-white-text">{session?.email}</p>
        </div>
        <div className="card-glass p-6 lg:col-span-2">
          <p className="text-sm text-text-secondary">Разделы</p>
          <ul className="mt-4 space-y-2 text-sm text-text-secondary">
            <li>• Заявки с сайта</li>
            <li>• Редактор контента, фото и текстов</li>
            <li>• FAQ, портфолио и юридические страницы</li>
            <li>• Смена логина и пароля</li>
          </ul>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="heading-display mb-4 text-2xl text-white-text">Заявки</h2>
        {leads.length === 0 ? (
          <div className="card-glass p-6 text-text-secondary">
            Заявок пока нет. Они появятся после отправки форм на сайте.
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead, index) => (
              <article key={`${lead.name}-${index}`} className="card-glass p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white-text">{lead.name}</p>
                    <p className="text-sm text-text-secondary">{lead.contact}</p>
                  </div>
                  <p className="text-xs text-gold">{lead.service || "Без услуги"}</p>
                </div>
                {"description" in lead && lead.description ? (
                  <p className="mt-3 text-sm text-text-secondary">{lead.description}</p>
                ) : null}
                {"summary" in lead && lead.summary ? (
                  <p className="mt-3 text-sm text-text-secondary">{lead.summary}</p>
                ) : null}
                {lead.createdAt ? (
                  <p className="mt-3 text-xs text-text-secondary/70">{lead.createdAt}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>

      <AdminContentEditor />
    </AdminShell>
  );
}
