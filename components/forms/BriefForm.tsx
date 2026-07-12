"use client";

import type { UseFormRegister } from "react-hook-form";
import type { LeadFormData } from "@/lib/validation";

type BriefFormProps = {
  service: string;
  register: UseFormRegister<LeadFormData>;
};

const briefQuestions: Record<string, { id: string; label: string; placeholder: string }[]> = {
  "AI-видео": [
    { id: "brief_goal", label: "Цель видео", placeholder: "Реклама, презентация..." },
    { id: "brief_duration", label: "Желаемая длительность", placeholder: "30 сек, 1 мин..." },
    { id: "brief_platform", label: "Площадка", placeholder: "ВКонтакте, Reels..." },
  ],
  "AI-изображения": [
    { id: "brief_count", label: "Количество", placeholder: "5, 10, серия..." },
    { id: "brief_format", label: "Формат", placeholder: "Квадрат, сторис, баннер..." },
    { id: "brief_purpose", label: "Назначение", placeholder: "Реклама, соцсети, сайт..." },
  ],
  Сайт: [
    { id: "brief_type", label: "Тип сайта", placeholder: "Лендинг, портфолио..." },
    { id: "brief_pages", label: "Количество страниц", placeholder: "1, 3, 5..." },
    { id: "brief_functions", label: "Необходимые функции", placeholder: "Форма, блог..." },
  ],
  "Оформление ВКонтакте": [
    { id: "brief_vk_link", label: "Ссылка на страницу", placeholder: "https://vk.com/..." },
    { id: "brief_vk_theme", label: "Тематика", placeholder: "Услуги, бренд..." },
    { id: "brief_vk_goal", label: "Цель оформления", placeholder: "Запуск, обновление..." },
  ],
  "Чат-бот": [
    { id: "brief_type", label: "Где нужен бот", placeholder: "Сайт, ВКонтакте..." },
    { id: "brief_functions", label: "Основные задачи", placeholder: "Заявки, FAQ, навигация..." },
    { id: "brief_purpose", label: "Цель", placeholder: "Автоматизация, поддержка..." },
  ],
};

export function BriefForm({ service, register }: BriefFormProps) {
  const questions = briefQuestions[service];
  if (!questions) return null;

  return (
    <div className="glass-panel p-5">
      <p className="mb-4 text-sm font-medium text-white-text">Дополнительные вопросы</p>
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id}>
            <label htmlFor={q.id} className="mb-1 block text-sm text-text-secondary">
              {q.label}
            </label>
            <input
              id={q.id}
              {...register(q.id as keyof LeadFormData)}
              className="glass-input w-full rounded-lg px-3 py-2 text-sm"
              placeholder={q.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
