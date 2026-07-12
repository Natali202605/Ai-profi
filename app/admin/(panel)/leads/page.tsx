import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { getLeadsForAdmin } from "@/lib/admin-leads";

export const metadata: Metadata = {
  title: "Заявки — Админ-панель",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const leads = await getLeadsForAdmin();

  return (
    <>
      <AdminPageHeader
        title="Заявки"
        description="Заявки с формы на сайте и из чат-бота. Полное управление статусами — в следующем этапе."
      />

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
                  {"email" in lead && lead.email ? (
                    <p className="text-sm text-text-secondary">{String(lead.email)}</p>
                  ) : null}
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
    </>
  );
}
