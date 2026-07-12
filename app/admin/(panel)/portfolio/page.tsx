import type { Metadata } from "next";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPanelLayout";

export const metadata: Metadata = {
  title: "Портфолио — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminPortfolioPage() {
  return (
    <>
      <AdminPageHeader
        title="Портфолио"
        description="Управление категориями и проектами. CRUD через Supabase — следующий этап."
      />
      <div className="card-glass space-y-4 p-6">
        <p className="text-text-secondary">
          Сейчас проекты хранятся в коде (<code className="text-gold">data/portfolio.ts</code>).
          Здесь появится создание категорий, загрузка обложек и публикация проектов.
        </p>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>• AI-видео, AI-изображения, Сайты, Чат-боты, ВКонтакте, Художественные проекты</li>
          <li>• Черновики, preview, SEO на каждый проект</li>
          <li>• Связь с медиатекой</li>
        </ul>
        <Link href="/admin/content" className="btn-secondary inline-flex">
          Редактировать тексты портфолио
        </Link>
      </div>
    </>
  );
}
