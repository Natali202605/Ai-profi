import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";
import { HeroHomepageEditor } from "@/components/admin/HeroHomepageEditor";

export const metadata: Metadata = {
  title: "Первый экран — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminHomepagePage() {
  return (
    <>
      <AdminPageHeader
        title="Первый экран"
        description="Редактирование главной карточки, фото, точки фокуса и карточки профессиональных преимуществ."
        actions={
          <Link href="/#top" target="_blank" className="btn-secondary">
            Preview
          </Link>
        }
      />
      <HeroHomepageEditor />
    </>
  );
}
