"use client";

import { useEffect, useState } from "react";
import type { SiteContent, SiteFaqItem, SiteReview, SiteService, LegalBlock, LegalPageContent } from "@/lib/site-content-types";

type Tab =
  | "brand"
  | "hero"
  | "intro"
  | "about"
  | "services"
  | "reviews"
  | "faq"
  | "portfolio"
  | "legal"
  | "images"
  | "account";

const tabs: { id: Tab; label: string }[] = [
  { id: "brand", label: "Бренд" },
  { id: "hero", label: "Главный экран" },
  { id: "intro", label: "Вступление" },
  { id: "about", label: "Обо мне" },
  { id: "services", label: "Услуги" },
  { id: "reviews", label: "Отзывы" },
  { id: "faq", label: "FAQ" },
  { id: "portfolio", label: "Портфолио" },
  { id: "legal", label: "Юр. страницы" },
  { id: "images", label: "Фото" },
  { id: "account", label: "Логин и пароль" },
];

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "mt-1 w-full rounded-xl border border-border-subtle bg-plum/30 px-4 py-2.5 text-sm text-white-text outline-none focus:border-gold/50";
  return (
    <label className="block text-sm">
      <span className="text-text-secondary">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch {
      alert("Не удалось загрузить изображение");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Field label={label} value={value} onChange={onChange} />
      <div className="flex flex-wrap items-center gap-3">
        <label className="btn-secondary cursor-pointer !py-2 !text-xs">
          {uploading ? "Загрузка..." : "Загрузить файл"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
            }}
          />
        </label>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover" />
        ) : null}
      </div>
    </div>
  );
}

function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-text-secondary">{label}</p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[index] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded-xl border border-border-subtle bg-plum/30 px-3 py-2 text-sm text-white-text outline-none focus:border-gold/50"
            />
            <button
              type="button"
              className="btn-secondary !px-3 !py-2 !text-xs"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn-secondary !py-2 !text-xs"
          onClick={() => onChange([...items, ""])}
        >
          + Добавить строку
        </button>
      </div>
    </div>
  );
}

export function AdminContentEditor() {
  const [tab, setTab] = useState<Tab>("brand");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [contentRes, accountRes] = await Promise.all([
          fetch("/api/admin/content"),
          fetch("/api/admin/account"),
        ]);
        if (contentRes.ok) {
          const data = (await contentRes.json()) as { content: SiteContent };
          setContent(data.content);
        }
        if (accountRes.ok) {
          const data = (await accountRes.json()) as { email: string };
          setAccountEmail(data.email);
          setNewEmail(data.email);
        }
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  function patchContent(patch: Partial<SiteContent>) {
    setContent((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  async function handleSaveContent() {
    if (!content) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error);
      setMessage("Контент сохранён. Обновите главную страницу сайта.");
    } catch {
      setMessage("Не удалось сохранить контент.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveAccount() {
    setSaving(true);
    setMessage("");
    if (newPassword && newPassword !== confirmPassword) {
      setMessage("Новые пароли не совпадают.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newEmail: newEmail !== accountEmail ? newEmail : undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string; email?: string; message?: string };
      if (!res.ok) throw new Error(data.error);
      setAccountEmail(data.email || newEmail);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage(data.message || "Настройки аккаунта обновлены.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Не удалось обновить аккаунт.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="card-glass p-6 text-text-secondary">Загрузка редактора...</div>;
  }

  if (!content) {
    return <div className="card-glass p-6 text-text-secondary">Не удалось загрузить контент.</div>;
  }

  return (
    <section className="mt-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="heading-display text-2xl text-white-text">Редактор сайта</h2>
        {tab !== "account" ? (
          <button type="button" onClick={() => void handleSaveContent()} disabled={saving} className="btn-primary">
            {saving ? "Сохранение..." : "Сохранить контент"}
          </button>
        ) : (
          <button type="button" onClick={() => void handleSaveAccount()} disabled={saving} className="btn-primary">
            {saving ? "Сохранение..." : "Сохранить аккаунт"}
          </button>
        )}
      </div>

      {message ? <p className="mb-4 text-sm text-gold">{message}</p> : null}

      <div className="mb-6 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`min-h-11 shrink-0 rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
              tab === item.id ? "bg-gold text-plum" : "bg-plum/40 text-text-secondary hover:text-white-text"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="card-glass space-y-4 p-6">
        {tab === "brand" && (
          <>
            <Field label="Название сайта" value={content.brand.siteName} onChange={(v) => patchContent({ brand: { ...content.brand, siteName: v } })} />
            <Field label="Подзаголовок" value={content.brand.siteTagline} onChange={(v) => patchContent({ brand: { ...content.brand, siteTagline: v } })} />
            <Field label="Описание в подвале" value={content.brand.footerDescription} onChange={(v) => patchContent({ brand: { ...content.brand, footerDescription: v } })} multiline />
            <Field label="Ссылка VK — профиль" value={content.brand.vkProfileUrl} onChange={(v) => patchContent({ brand: { ...content.brand, vkProfileUrl: v } })} />
            <Field label="Ссылка VK — сообщество" value={content.brand.vkCommunityUrl} onChange={(v) => patchContent({ brand: { ...content.brand, vkCommunityUrl: v } })} />
            <Field label="Ссылка VK — отзывы" value={content.brand.vkReviewsUrl} onChange={(v) => patchContent({ brand: { ...content.brand, vkReviewsUrl: v } })} />
          </>
        )}

        {tab === "hero" && (
          <>
            <Field label="Метка" value={content.hero.eyebrow} onChange={(v) => patchContent({ hero: { ...content.hero, eyebrow: v } })} />
            <Field label="Заголовок — начало" value={content.hero.titleMain} onChange={(v) => patchContent({ hero: { ...content.hero, titleMain: v } })} />
            <Field label="Заголовок — выделение" value={content.hero.titleHighlight} onChange={(v) => patchContent({ hero: { ...content.hero, titleHighlight: v } })} />
            <Field label="Заголовок — окончание" value={content.hero.titleSuffix} onChange={(v) => patchContent({ hero: { ...content.hero, titleSuffix: v } })} />
            <Field label="Описание" value={content.hero.description} onChange={(v) => patchContent({ hero: { ...content.hero, description: v } })} multiline />
            <Field label="Примечание под кнопками" value={content.hero.note} onChange={(v) => patchContent({ hero: { ...content.hero, note: v } })} multiline />
            <StringListEditor label="Маркеры доверия" items={content.hero.trustMarkers} onChange={(items) => patchContent({ hero: { ...content.hero, trustMarkers: items } })} />
            <Field label="Имя специалиста" value={content.hero.specialistName} onChange={(v) => patchContent({ hero: { ...content.hero, specialistName: v } })} />
            <Field label="Роли специалиста" value={content.hero.specialistRoles} onChange={(v) => patchContent({ hero: { ...content.hero, specialistRoles: v } })} />
            <Field label="Опыт специалиста" value={content.hero.specialistExperience} onChange={(v) => patchContent({ hero: { ...content.hero, specialistExperience: v } })} />
            <ImageField label="Фото специалиста (URL или загрузка)" value={content.hero.specialistPhoto} onChange={(v) => patchContent({ hero: { ...content.hero, specialistPhoto: v } })} />
          </>
        )}

        {tab === "intro" && (
          <>
            <Field label="Заголовок" value={content.intro.title} onChange={(v) => patchContent({ intro: { ...content.intro, title: v } })} />
            <Field label="Абзац 1" value={content.intro.paragraph1} onChange={(v) => patchContent({ intro: { ...content.intro, paragraph1: v } })} multiline />
            <Field label="Абзац 2" value={content.intro.paragraph2} onChange={(v) => patchContent({ intro: { ...content.intro, paragraph2: v } })} multiline />
            <Field label="Цитата" value={content.intro.quote} onChange={(v) => patchContent({ intro: { ...content.intro, quote: v } })} multiline />
          </>
        )}

        {tab === "about" && (
          <>
            <Field label="Заголовок" value={content.about.title} onChange={(v) => patchContent({ about: { ...content.about, title: v } })} />
            <StringListEditor label="Абзацы" items={content.about.paragraphs} onChange={(items) => patchContent({ about: { ...content.about, paragraphs: items } })} />
            <Field label="Дополнительный абзац (VK и digital)" value={content.about.extraParagraph} onChange={(v) => patchContent({ about: { ...content.about, extraParagraph: v } })} multiline />
            <StringListEditor label="Навыки" items={content.about.skills} onChange={(items) => patchContent({ about: { ...content.about, skills: items } })} />
            <ImageField label="Фото в блоке «Обо мне»" value={content.about.photo} onChange={(v) => patchContent({ about: { ...content.about, photo: v } })} />
            <Field label="Бейдж — значение" value={content.about.badgeValue} onChange={(v) => patchContent({ about: { ...content.about, badgeValue: v } })} />
            <Field label="Бейдж — подпись" value={content.about.badgeLabel} onChange={(v) => patchContent({ about: { ...content.about, badgeLabel: v } })} />
          </>
        )}

        {tab === "services" && (
          <>
            <Field label="Заголовок секции" value={content.services.sectionTitle} onChange={(v) => patchContent({ services: { ...content.services, sectionTitle: v } })} />
            <Field label="Подзаголовок секции" value={content.services.sectionSubtitle} onChange={(v) => patchContent({ services: { ...content.services, sectionSubtitle: v } })} multiline />
            <div className="space-y-6 pt-4">
              {content.services.items.map((service, index) => (
                <ServiceEditor
                  key={service.id}
                  service={service}
                  onChange={(updated) => {
                    const items = [...content.services.items];
                    items[index] = updated;
                    patchContent({ services: { ...content.services, items } });
                  }}
                />
              ))}
            </div>
          </>
        )}

        {tab === "reviews" && (
          <>
            <Field label="Заголовок" value={content.reviews.title} onChange={(v) => patchContent({ reviews: { ...content.reviews, title: v } })} />
            <Field label="Подзаголовок" value={content.reviews.subtitle} onChange={(v) => patchContent({ reviews: { ...content.reviews, subtitle: v } })} multiline />
            <div className="space-y-6 pt-4">
              {content.reviews.items.map((review, index) => (
                <ReviewEditor
                  key={review.id}
                  review={review}
                  onChange={(updated) => {
                    const items = [...content.reviews.items];
                    items[index] = updated;
                    patchContent({ reviews: { ...content.reviews, items } });
                  }}
                  onDelete={() => {
                    patchContent({
                      reviews: {
                        ...content.reviews,
                        items: content.reviews.items.filter((_, i) => i !== index),
                      },
                    });
                  }}
                />
              ))}
              <button
                type="button"
                className="btn-secondary !text-xs"
                onClick={() =>
                  patchContent({
                    reviews: {
                      ...content.reviews,
                      items: [
                        ...content.reviews.items,
                        {
                          id: `review-${Date.now()}`,
                          name: "Имя клиента",
                          role: "Роль / проект",
                          text: "Текст отзыва",
                          service: "Услуга",
                          visible: true,
                        },
                      ],
                    },
                  })
                }
              >
                + Добавить отзыв
              </button>
            </div>
          </>
        )}

        {tab === "images" && (
          <ImageField
            label="Фоновое изображение (если используется)"
            value={content.images.backgroundPhoto}
            onChange={(v) => patchContent({ images: { backgroundPhoto: v } })}
          />
        )}

        {tab === "faq" && (
          <>
            <Field label="Заголовок секции" value={content.faq.title} onChange={(v) => patchContent({ faq: { ...content.faq, title: v } })} />
            <div className="space-y-6 pt-4">
              {content.faq.items.map((item, index) => (
                <FaqEditor
                  key={item.id}
                  item={item}
                  onChange={(updated) => {
                    const items = [...content.faq.items];
                    items[index] = updated;
                    patchContent({ faq: { ...content.faq, items } });
                  }}
                  onDelete={() =>
                    patchContent({
                      faq: { ...content.faq, items: content.faq.items.filter((_, i) => i !== index) },
                    })
                  }
                />
              ))}
              <button
                type="button"
                className="btn-secondary !text-xs"
                onClick={() =>
                  patchContent({
                    faq: {
                      ...content.faq,
                      items: [
                        ...content.faq.items,
                        {
                          id: `faq-${Date.now()}`,
                          question: "Новый вопрос",
                          answer: "Ответ",
                          visible: true,
                        },
                      ],
                    },
                  })
                }
              >
                + Добавить вопрос
              </button>
            </div>
          </>
        )}

        {tab === "portfolio" && (
          <>
            <p className="text-sm text-gold">Секция на главной</p>
            <Field label="Метка" value={content.portfolio.featured.label} onChange={(v) => patchContent({ portfolio: { ...content.portfolio, featured: { ...content.portfolio.featured, label: v } } })} />
            <Field label="Заголовок" value={content.portfolio.featured.title} onChange={(v) => patchContent({ portfolio: { ...content.portfolio, featured: { ...content.portfolio.featured, title: v } } })} />
            <Field label="Подзаголовок" value={content.portfolio.featured.subtitle} onChange={(v) => patchContent({ portfolio: { ...content.portfolio, featured: { ...content.portfolio.featured, subtitle: v } } })} multiline />
            <Field label="Текст кнопки" value={content.portfolio.featured.ctaLabel} onChange={(v) => patchContent({ portfolio: { ...content.portfolio, featured: { ...content.portfolio.featured, ctaLabel: v } } })} />
            <p className="pt-4 text-sm text-gold">Страница /portfolio</p>
            <Field label="Метка" value={content.portfolio.page.label} onChange={(v) => patchContent({ portfolio: { ...content.portfolio, page: { ...content.portfolio.page, label: v } } })} />
            <Field label="Заголовок" value={content.portfolio.page.title} onChange={(v) => patchContent({ portfolio: { ...content.portfolio, page: { ...content.portfolio.page, title: v } } })} />
            <Field label="Подзаголовок" value={content.portfolio.page.subtitle} onChange={(v) => patchContent({ portfolio: { ...content.portfolio, page: { ...content.portfolio.page, subtitle: v } } })} multiline />
          </>
        )}

        {tab === "legal" && (
          <>
            <p className="text-sm text-gold">Оператор</p>
            <Field label="Бренд" value={content.legal.operator.brand} onChange={(v) => patchContent({ legal: { ...content.legal, operator: { ...content.legal.operator, brand: v } } })} />
            <Field label="ФИО" value={content.legal.operator.fullName} onChange={(v) => patchContent({ legal: { ...content.legal, operator: { ...content.legal.operator, fullName: v } } })} />
            <Field label="Статус" value={content.legal.operator.status} onChange={(v) => patchContent({ legal: { ...content.legal, operator: { ...content.legal.operator, status: v } } })} multiline />
            <Field label="URL сайта" value={content.legal.operator.siteUrl} onChange={(v) => patchContent({ legal: { ...content.legal, operator: { ...content.legal.operator, siteUrl: v } } })} />
            <Field label="VK профиль" value={content.legal.operator.vkProfile} onChange={(v) => patchContent({ legal: { ...content.legal, operator: { ...content.legal.operator, vkProfile: v } } })} />
            <Field label="VK сообщество" value={content.legal.operator.vkCommunity} onChange={(v) => patchContent({ legal: { ...content.legal, operator: { ...content.legal.operator, vkCommunity: v } } })} />
            <Field label="Дата оферты" value={content.legal.offer.publishedAt} onChange={(v) => patchContent({ legal: { ...content.legal, offer: { ...content.legal.offer, publishedAt: v } } })} />
            <LegalPageEditor
              label="Политика конфиденциальности"
              page={content.legal.privacy}
              onChange={(privacy) => patchContent({ legal: { ...content.legal, privacy } })}
            />
            <LegalPageEditor
              label="Согласие на обработку данных"
              page={content.legal.consent}
              onChange={(consent) => patchContent({ legal: { ...content.legal, consent } })}
            />
            <LegalPageEditor
              label="Публичная оферта"
              page={content.legal.offer}
              onChange={(offer) => patchContent({ legal: { ...content.legal, offer: { ...content.legal.offer, ...offer } } })}
            />
          </>
        )}

        {tab === "account" && (
          <>
            <p className="text-sm text-text-secondary">
              Текущий email: <span className="text-white-text">{accountEmail}</span>
            </p>
            <Field label="Текущий пароль (обязательно)" value={currentPassword} onChange={setCurrentPassword} />
            <Field label="Новый email" value={newEmail} onChange={setNewEmail} />
            <Field label="Новый пароль" value={newPassword} onChange={setNewPassword} />
            <Field label="Подтверждение нового пароля" value={confirmPassword} onChange={setConfirmPassword} />
            <p className="text-xs text-text-secondary/80">
              После смены email или пароля используйте новые данные при следующем входе.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function ServiceEditor({
  service,
  onChange,
}: {
  service: SiteService;
  onChange: (service: SiteService) => void;
}) {
  return (
    <div className="rounded-2xl border border-border-subtle/60 p-4">
      <p className="mb-3 text-xs uppercase tracking-wider text-gold">{service.id}</p>
      <div className="space-y-3">
        <Field label="Название" value={service.title} onChange={(v) => onChange({ ...service, title: v })} />
        <Field label="Описание" value={service.description} onChange={(v) => onChange({ ...service, description: v })} multiline />
        <Field label="Текст ссылки" value={service.cta} onChange={(v) => onChange({ ...service, cta: v })} />
        <StringListEditor label="Что входит" items={service.includes} onChange={(includes) => onChange({ ...service, includes })} />
      </div>
    </div>
  );
}

function FaqEditor({
  item,
  onChange,
  onDelete,
}: {
  item: SiteFaqItem;
  onChange: (item: SiteFaqItem) => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border-subtle/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wider text-gold">{item.id}</p>
        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <input
            type="checkbox"
            checked={item.visible}
            onChange={(e) => onChange({ ...item, visible: e.target.checked })}
          />
          Показывать
        </label>
        <button type="button" className="btn-secondary !px-3 !py-1 !text-xs" onClick={onDelete}>
          Удалить
        </button>
      </div>
      <div className="space-y-3">
        <Field label="Вопрос" value={item.question} onChange={(v) => onChange({ ...item, question: v })} />
        <Field label="Ответ" value={item.answer} onChange={(v) => onChange({ ...item, answer: v })} multiline />
      </div>
    </div>
  );
}

function LegalPageEditor({
  label,
  page,
  onChange,
}: {
  label: string;
  page: LegalPageContent;
  onChange: (page: LegalPageContent) => void;
}) {
  function updateBlock(index: number, block: LegalBlock) {
    const blocks = [...page.blocks];
    blocks[index] = block;
    onChange({ ...page, blocks });
  }

  return (
    <div className="space-y-4 border-t border-border-subtle/60 pt-6">
      <p className="text-sm font-medium text-white-text">{label}</p>
      <Field label="Заголовок страницы" value={page.title} onChange={(v) => onChange({ ...page, title: v })} />
      <div className="space-y-4">
        {page.blocks.map((block, index) => (
          <div key={`${block.type}-${index}`} className="rounded-xl border border-border-subtle/40 p-3">
            <p className="mb-2 text-xs uppercase tracking-wider text-text-secondary">{block.type}</p>
            {block.type === "p" && (
              <Field label="Текст" value={block.text} onChange={(v) => updateBlock(index, { ...block, text: v })} multiline />
            )}
            {block.type === "h2" && (
              <Field label="Заголовок" value={block.text} onChange={(v) => updateBlock(index, { ...block, text: v })} />
            )}
            {block.type === "ul" && (
              <StringListEditor label="Пункты списка" items={block.items} onChange={(items) => updateBlock(index, { ...block, items })} />
            )}
            {block.type === "p_vk" && (
              <>
                <Field label="Текст до ссылки" value={block.before} onChange={(v) => updateBlock(index, { ...block, before: v })} multiline />
                <Field label="Текст ссылки" value={block.linkLabel} onChange={(v) => updateBlock(index, { ...block, linkLabel: v })} />
                <Field label="Текст после ссылки" value={block.after || ""} onChange={(v) => updateBlock(index, { ...block, after: v })} />
              </>
            )}
            {(block.type === "related" || block.type === "contact") && (
              <p className="text-xs text-text-secondary/70">
                Блок со ссылками или контактами — редактируйте через оператора и соседние текстовые блоки.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewEditor({
  review,
  onChange,
  onDelete,
}: {
  review: SiteReview;
  onChange: (review: SiteReview) => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border-subtle/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wider text-gold">{review.id}</p>
        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <input
            type="checkbox"
            checked={review.visible}
            onChange={(e) => onChange({ ...review, visible: e.target.checked })}
          />
          Показывать на сайте
        </label>
        <button type="button" className="btn-secondary !px-3 !py-1 !text-xs" onClick={onDelete}>
          Удалить
        </button>
      </div>
      <div className="space-y-3">
        <Field label="Имя" value={review.name} onChange={(v) => onChange({ ...review, name: v })} />
        <Field label="Роль / проект" value={review.role} onChange={(v) => onChange({ ...review, role: v })} />
        <Field label="Услуга" value={review.service} onChange={(v) => onChange({ ...review, service: v })} />
        <Field label="Текст отзыва" value={review.text} onChange={(v) => onChange({ ...review, text: v })} multiline />
      </div>
    </div>
  );
}
