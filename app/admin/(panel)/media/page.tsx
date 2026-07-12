import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { AdminMediaPanel } from "@/components/admin/AdminMediaPanel";

export const metadata: Metadata = {
  title: "Медиатека — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader
        title="Медиатека"
        description="Загрузка и просмотр изображений для сайта и редакторов контента."
      />
      <AdminMediaPanel />
    </>
  );
}
