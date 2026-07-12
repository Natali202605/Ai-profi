import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { AdminCertificatesPanel } from "@/components/admin/AdminCertificatesPanel";

export const metadata: Metadata = {
  title: "Сертификаты — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminCertificatesPage() {
  return (
    <>
      <AdminPageHeader
        title="Сертификаты"
        description="Добавление, редактирование, порядок и видимость сертификатов на главной странице."
      />
      <AdminCertificatesPanel />
    </>
  );
}
