import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { AdminClientsPanel } from "@/components/admin/AdminClientsPanel";

export const metadata: Metadata = {
  title: "Клиенты — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminClientsPage() {
  return (
    <>
      <AdminPageHeader
        title="Клиенты"
        description="CRM-карточки: контакты, проекты, заявки, документы и история взаимодействия."
      />
      <Suspense fallback={<div className="card-glass p-6 text-text-secondary">Загрузка...</div>}>
        <AdminClientsPanel />
      </Suspense>
    </>
  );
}
