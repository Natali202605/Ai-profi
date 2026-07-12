import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { AdminContentEditor } from "@/components/admin/AdminContentEditor";

export const metadata: Metadata = {
  title: "Контент сайта — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <>
      <AdminPageHeader
        title="Контент сайта"
        description="Редактирование текстов, услуг, отзывов, FAQ, портфолио и юридических страниц."
      />
      <AdminContentEditor />
    </>
  );
}
