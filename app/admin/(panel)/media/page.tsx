import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";

export const metadata: Metadata = {
  title: "Медиатека — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminMediaPage() {
  return (
    <>
      <AdminPageHeader
        title="Медиатека"
        description="Централизованное хранение фото и видео. Загрузка через редакторы доступна уже сейчас."
      />
      <div className="card-glass space-y-4 p-6">
        <p className="text-text-secondary">
          Файлы загружаются в <code className="text-gold">public/images/cms/</code> через поля
          «Загрузить файл» в редакторах первого экрана и контента.
        </p>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Папки, поиск, alt-текст, точка фокуса</li>
          <li>• WebP / AVIF и thumbnails</li>
          <li>• Supabase Storage — следующий этап</li>
        </ul>
      </div>
    </>
  );
}
