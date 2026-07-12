import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { AdminReviewsPanel } from "@/components/admin/AdminReviewsPanel";

export const metadata: Metadata = {
  title: "Отзывы — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminReviewsPage() {
  return (
    <>
      <AdminPageHeader
        title="Отзывы"
        description="Модерация отзывов клиентов: публикация, отклонение, избранное."
      />
      <AdminReviewsPanel />
    </>
  );
}
