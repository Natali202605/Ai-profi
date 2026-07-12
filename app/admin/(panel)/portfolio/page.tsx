import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { AdminPortfolioPanel } from "@/components/admin/AdminPortfolioPanel";

export const metadata: Metadata = {
  title: "Портфолио — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminPortfolioPage() {
  return (
    <>
      <AdminPageHeader
        title="Портфолио"
        description="Управление проектами: публикация, черновики, избранное и добавление новых работ."
      />
      <AdminPortfolioPanel />
    </>
  );
}
