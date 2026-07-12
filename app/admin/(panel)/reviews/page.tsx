import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";

export const metadata: Metadata = {
  title: "Отзывы — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminReviewsPage() {
  return (
    <>
      <AdminPageHeader
        title="Отзывы"
        description="Модерация отзывов клиентов. Публичная форма и статусы — этап 3 по ТЗ."
      />
      <div className="card-glass space-y-4 p-6">
        <p className="text-text-secondary">
          Планируемые разделы: Новые, На модерации, Опубликованные, Отклонённые, Дополнения.
        </p>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• Форма отзыва на сайте с рейтингом и вложениями</li>
          <li>• Модерация перед публикацией</li>
          <li>• Дополнение отзыва по защищённой ссылке</li>
        </ul>
        <Link href="/admin/content" className="btn-secondary inline-flex">
          Редактировать текущие отзывы
        </Link>
      </div>
    </>
  );
}
