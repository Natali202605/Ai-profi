import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { AdminLeadsPanel } from "@/components/admin/AdminLeadsPanel";

export const metadata: Metadata = {
  title: "Заявки — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return (
    <>
      <AdminPageHeader
        title="Заявки"
        description="Заявки с формы и чат-бота. Управление статусами и переход к карточке клиента."
      />
      <AdminLeadsPanel />
    </>
  );
}
