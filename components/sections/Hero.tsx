"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { BrushStroke } from "@/components/ui/BrushStroke";
import { VKButton } from "@/components/ui/VKButton";
import { trackEvent } from "@/lib/analytics";

const trustMarkers = [
  "AI-видео, изображения, сайты и оформление ВКонтакте",
  "Более 10 лет художественного видения и практики",
  "Индивидуальные концепции вместо шаблонной генерации",
];

const aiFocusTags = ["AI-видео", "AI-изображения", "сайты", "ВКонтакте"];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-20 md:pt-24">
      <div className="container-site relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center gap-12 py-16 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 lg:max-w-2xl">
          <RevealAnimation>
            <div className="glass-panel-soft rounded-3xl p-8 md:p-10 lg:p-12">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                AI-специализация
              </p>
              <BrushStroke className="mb-6" />
              <h1 className="heading-display mb-6 text-balance text-[40px] leading-[1.05] md:text-[56px] lg:text-[64px]">
                Создаю AI-визуалы{" "}
                <span className="text-gold">профессионального уровня</span> для брендов и экспертов
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
                AI-видео, изображения, сайты и оформление ВКонтакте — с художественным чутьём,
                продуманной композицией и более чем 10-летним опытом визуального видения.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="btn-primary"
                  onClick={() => trackEvent("hero_cta_click", { source: "hero_primary" })}
                >
                  Обсудить проект
                </Link>
                <Link
                  href="/portfolio"
                  className="btn-secondary"
                  onClick={() => trackEvent("portfolio_open", { source: "hero" })}
                >
                  Посмотреть портфолио
                </Link>
              </div>
              <div className="mt-4">
                <VKButton />
              </div>
              <p className="mt-6 text-sm text-text-secondary/90">
                Стратегия, AI-инструменты и визуальная экспертиза — в одном проекте.
              </p>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <ul className="mt-8 flex flex-col gap-3 sm:gap-2">
              {trustMarkers.map((marker) => (
                <li key={marker} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {marker}
                </li>
              ))}
            </ul>
          </RevealAnimation>
        </div>

        <div className="relative mx-auto w-full max-w-md flex-1 lg:mx-0 lg:max-w-lg">
          <RevealAnimation direction="left" delay={0.15}>
            <div className="relative">
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-gold/15 blur-2xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -right-4 bottom-16 h-24 w-24 rounded-full bg-berry/20 blur-xl"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </>
              )}

              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-border-subtle shadow-[0_24px_64px_rgba(14,18,48,0.35)]">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-deep/40 via-plum/30 to-graphite/50" />

                <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border-subtle bg-white/8 backdrop-blur-sm">
                    <UserRound className="h-9 w-9 text-gold/80" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-heading text-xl text-white-text md:text-2xl">
                      [Добавить фото специалиста]
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      Портрет в профессиональном формате для главного экрана
                    </p>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite/90 via-graphite/50 to-transparent px-6 pb-6 pt-24">
                  <p className="font-heading text-2xl text-gold">10+</p>
                  <p className="text-sm text-text-secondary">лет художественного видения и опыта</p>
                </div>
              </div>

              <div className="absolute -right-3 top-8 hidden rounded-2xl border border-border-subtle bg-card-bg px-4 py-3 backdrop-blur-md sm:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                  AI-фокус
                </p>
                <p className="mt-1 text-sm text-white-text">Видео • Изображения • Сайты</p>
              </div>

              <motion.div
                className="absolute -left-4 bottom-24 w-28 overflow-hidden rounded-xl border border-border-subtle shadow-2xl"
                animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80"
                  alt="Пример AI-видео"
                  width={112}
                  height={80}
                  className="h-20 w-28 object-cover"
                />
              </motion.div>

              {!prefersReducedMotion && (
                <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 flex-wrap justify-center gap-2">
                  {aiFocusTags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="tag-glass whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.15 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
