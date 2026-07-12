"use client";

import Link from "next/link";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const vkElements = [
  { label: "Обложка", description: "Первое впечатление и визуальный характер сообщества" },
  { label: "Аватар", description: "Узнаваемый знак, который виден в ленте и поиске" },
  { label: "Меню", description: "Навигация к ключевым разделам и услугам" },
  { label: "Закреплённый пост", description: "Главное сообщение для новых посетителей" },
  { label: "Карточки услуг", description: "Структурированное представление ваших предложений" },
  { label: "Публикации и клипы", description: "Единый визуальный стиль для контента" },
];

export function VKSection() {
  const { brand } = useSiteContent();

  return (
    <section id="vk" className="py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="ВКонтакте как пространство вашего бренда"
            titleAccent="пространство вашего бренда"
            subtitle="Хорошо оформленное сообщество должно быстро отвечать на вопросы: кто вы, чем занимаетесь, кому помогаете и как с вами связаться."
          />
        </RevealAnimation>

        <div className="grid gap-12 lg:grid-cols-2">
          <RevealAnimation direction="left">
            <div className="rounded-2xl border border-border-subtle bg-card-bg p-6 backdrop-blur-md">
              <div className="mb-4 h-32 rounded-xl bg-gradient-to-r from-indigo-deep/80 via-plum/70 to-berry/50" />
              <div className="flex items-end gap-4">
                <div className="h-20 w-20 -mt-10 rounded-full border-4 border-plum/60 bg-sand" />
                <div>
                  <p className="font-semibold text-white-text">NATALI NEERO</p>
                  <p className="text-sm text-text-secondary">
                    AI-видео, изображения, сайты, чат-боты и оформление ВКонтакте
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Услуги", "Портфолио", "Отзывы", "Контакты"].map((tab) => (
                  <span
                    key={tab}
                    className="glass-inset rounded-lg px-3 py-1.5 text-xs text-text-secondary"
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                <div className="glass-inset rounded-xl p-4">
                  <p className="text-xs text-gold">Закреплённый пост</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Создаю визуальные проекты с художественным видением: AI-видео, изображения,
                    сайты и оформление для экспертов и брендов.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["AI-видео", "Сайты"].map((s) => (
                    <div
                      key={s}
                      className="glass-inset rounded-lg p-3 text-center text-xs text-text-secondary"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation direction="right" delay={0.15}>
            <div className="space-y-4">
              {vkElements.map((el, i) => (
                <div
                  key={el.label}
                  className="flex gap-4 rounded-xl border border-border-subtle bg-card-bg/50 p-4 transition-colors hover:border-gold/20"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-white-text">{el.label}</p>
                    <p className="text-sm text-text-secondary">{el.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={brand.vkCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Посмотреть сообщество
              </a>
              <Link href="/#contact" className="btn-primary">
                Обсудить оформление
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
