"use client";

import Link from "next/link";
import type { SiteHeroExpertiseItem } from "@/lib/site-content-types";
import { Field, ImageField } from "@/components/admin/AdminFields";
import { useAdminContent } from "@/components/admin/useAdminContent";

function ExpertiseItemEditor({
  item,
  onChange,
}: {
  item: SiteHeroExpertiseItem;
  onChange: (item: SiteHeroExpertiseItem) => void;
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-plum/20 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-sm text-accent-secondary">{item.number}</p>
        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <input
            type="checkbox"
            checked={item.isVisible !== false}
            onChange={(e) => onChange({ ...item, isVisible: e.target.checked })}
          />
          Показывать
        </label>
      </div>
      <Field label="Заголовок пункта" value={item.title} onChange={(v) => onChange({ ...item, title: v })} />
      <Field
        label="Выделяемая фраза"
        value={item.titleAccent}
        onChange={(v) => onChange({ ...item, titleAccent: v })}
        hint="Должна точно встречаться в заголовке пункта"
      />
      <Field
        label="Описание"
        value={item.description}
        onChange={(v) => onChange({ ...item, description: v })}
        multiline
      />
    </div>
  );
}

export function HeroHomepageEditor() {
  const { content, loading, saving, message, patchContent, saveContent } = useAdminContent();

  if (loading) {
    return <div className="card-glass p-6 text-text-secondary">Загрузка редактора...</div>;
  }

  if (!content) {
    return <div className="card-glass p-6 text-text-secondary">Не удалось загрузить контент.</div>;
  }

  const { hero } = content;
  const expertiseItems = hero.expertiseItems || [];

  function updateHero(patch: Partial<typeof hero>) {
    patchContent({ hero: { ...hero, ...patch } });
  }

  function updateExpertiseItem(index: number, item: SiteHeroExpertiseItem) {
    const next = [...expertiseItems];
    next[index] = item;
    updateHero({ expertiseItems: next });
  }

  return (
    <div className="space-y-6">
      {message ? <p className="text-sm text-gold">{message}</p> : null}

      <div className="card-glass space-y-4 p-6">
        <h2 className="font-heading text-xl text-white-text">Текстовая карточка</h2>
        <Field label="Надзаголовок" value={hero.eyebrow} onChange={(v) => updateHero({ eyebrow: v })} />
        <Field label="Главный заголовок" value={hero.titleMain} onChange={(v) => updateHero({ titleMain: v })} />
        <Field
          label="Выделяемая фраза в заголовке"
          value={hero.titleHighlight}
          onChange={(v) => updateHero({ titleHighlight: v })}
          hint="Например: AI-визуалы"
        />
        <Field
          label="Подзаголовок"
          value={hero.description}
          onChange={(v) => updateHero({ description: v })}
          multiline
        />
        <Field
          label="Акцент в подзаголовке"
          value={hero.descriptionHighlight || ""}
          onChange={(v) => updateHero({ descriptionHighlight: v })}
        />
        <Field
          label="Нижняя строка"
          value={hero.note}
          onChange={(v) => updateHero({ note: v })}
          multiline
        />
        <Field
          label="Акцент в нижней строке"
          value={hero.noteHighlight || ""}
          onChange={(v) => updateHero({ noteHighlight: v })}
        />
      </div>

      <div className="card-glass space-y-4 p-6">
        <h2 className="font-heading text-xl text-white-text">Фотография</h2>
        <Field label="Имя на фото" value={hero.specialistName} onChange={(v) => updateHero({ specialistName: v })} />
        <Field
          label="Подпись на фото"
          value={hero.specialistRoles}
          onChange={(v) => updateHero({ specialistRoles: v })}
        />
        <ImageField
          label="Фото (URL или загрузка)"
          value={hero.specialistPhoto}
          onChange={(v) => updateHero({ specialistPhoto: v })}
        />
        <Field
          label="Точка фокуса по вертикали (%)"
          value={String(hero.portraitFocusY ?? 20)}
          onChange={(v) => updateHero({ portraitFocusY: Number(v) || 20 })}
          type="number"
          hint="0 — верх кадра, 100 — низ. Рекомендуется 15–25."
        />
      </div>

      <div className="card-glass space-y-4 p-6">
        <h2 className="font-heading text-xl text-white-text">Карточка под фото</h2>
        <Field
          label="Заголовок карточки"
          value={hero.expertiseCardTitle || "Профессиональный подход"}
          onChange={(v) => updateHero({ expertiseCardTitle: v })}
        />
        <Field
          label="Акцент в заголовке карточки"
          value={hero.expertiseCardTitleAccent || "Профессиональный"}
          onChange={(v) => updateHero({ expertiseCardTitleAccent: v })}
        />
        <div className="space-y-4">
          {expertiseItems.map((item, index) => (
            <ExpertiseItemEditor
              key={item.number}
              item={item}
              onChange={(next) => updateExpertiseItem(index, next)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void saveContent()}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? "Сохранение..." : "Сохранить и опубликовать"}
        </button>
        <Link href="/" target="_blank" className="btn-secondary">
          Preview на сайте
        </Link>
      </div>
    </div>
  );
}
