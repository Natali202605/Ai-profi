"use client";

import Link from "next/link";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { trackEvent } from "@/lib/analytics";

const elements = [
  { label: "Стиль", angle: -90 },
  { label: "Изображения", angle: -30 },
  { label: "Видео", angle: 30 },
  { label: "Сайт", angle: 90 },
  { label: "Чат-бот", angle: 150 },
  { label: "ВКонтакте", angle: 210 },
];

export function ComplexSolution() {
  return (
    <section id="complex" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-deep/40 via-plum/50 to-berry/20" />
      <div className="container-site relative z-10">
        <RevealAnimation>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-display section-title-accent mb-4 text-3xl sm:text-4xl md:text-5xl">
              Один специалист — единый визуальный образ проекта
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-text-secondary">
              Вместо того чтобы отдельно искать дизайнера, видеографа, разработчика и специалиста
              по ВКонтакте, можно собрать изображения, видео, сайт и оформление в единой
              стилистике.
            </p>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={0.15}>
          <div className="relative mx-auto mb-12 flex h-64 w-full max-w-lg items-center justify-center md:h-80">
            <div className="absolute inset-0 rounded-full border border-gold/20" />
            <div className="absolute inset-8 rounded-full border border-gold/10" />
            <div className="glass-panel z-10 rounded-2xl px-6 py-4 text-center">
              <p className="font-heading text-xl text-gold md:text-2xl">Ваша идея</p>
            </div>
            {elements.map((el) => {
              const radius = 130;
              const rad = (el.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                <div
                  key={el.label}
                  className="absolute z-10"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <span className="glass-panel-soft whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-white-text md:px-4 md:py-2 md:text-sm">
                    {el.label}
                  </span>
                </div>
              );
            })}
          </div>
        </RevealAnimation>

        <RevealAnimation delay={0.25} className="text-center">
          <Link
            href="/#contact"
            className="btn-primary"
            onClick={() => trackEvent("hero_cta_click", { source: "complex_solution" })}
          >
            Обсудить комплексный проект
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
}
