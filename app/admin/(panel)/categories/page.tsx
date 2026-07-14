import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { AdminCategoriesPanel } from "@/components/admin/AdminCategoriesPanel";

export const metadata: Metadata = {
  title: "Категории портфолио — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminCategoriesPage() {
  return (
    <>
      <AdminPageHeader
        title="Категории портфолио"
        description="Названия, slug, описания и SEO для фильтров портфолио."
      />
      <AdminCategoriesPanel />
    </>
  );
}
