"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { BrushStroke } from "@/components/ui/BrushStroke";
import { VKButton } from "@/components/ui/VKButton";
import { trackEvent } from "@/lib/analytics";

const trustMarkers = [
  "Более 10 лет в искусстве",
  "Индивидуальные визуальные концепции",
  "AI, дизайн и продвижение в одном проекте",
];

const floatingTags = ["видео", "изображения", "сайты", "ВКонтакте"];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-20 md:pt-24">
      <div className="container-site relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center py-16 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1">
          <RevealAnimation>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              AI-специалист × художник
            </p>
            <BrushStroke className="mb-6" />
            <h1 className="heading-display mb-6 text-balance text-[42px] leading-[1.05] md:text-6xl lg:text-[72px]">
              Создаю визуальные проекты, в которых{" "}
              <span className="text-gold">технологии обретают характер</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
              AI-видео, изображения, сайты и оформление ВКонтакте для экспертов, брендов и
              творческих проектов. Более 10 лет художественного опыта помогают мне создавать
              визуал с композицией, настроением и смыслом.
            </p>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
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
            <p className="mt-6 text-sm italic text-text-secondary/80">
              Не шаблонная генерация, а индивидуальная визуальная концепция.
            </p>
          </RevealAnimation>

          <RevealAnimation delay={0.3}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {trustMarkers.map((marker) => (
                <li key={marker} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {marker}
                </li>
              ))}
            </ul>
          </RevealAnimation>
        </div>

        <div className="relative mt-12 flex-1 lg:mt-0">
          <div className="relative mx-auto aspect-square max-w-lg">
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute -left-8 top-8 h-32 w-32 rounded-2xl bg-gold/10 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -right-4 bottom-12 h-24 w-24 rounded-full bg-berry/20 blur-xl"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </>
            )}

            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border-subtle">
              <Image
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80"
                alt="[Добавить художественный портрет специалиста]"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent" />
            </div>

            <motion.div
              className="absolute -right-6 top-1/4 w-28 overflow-hidden rounded-xl border border-border-subtle shadow-2xl"
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Image
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80"
                alt="AI-видео превью"
                width={112}
                height={80}
                className="h-20 w-28 object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute -left-4 bottom-1/4 w-24 overflow-hidden rounded-xl border border-border-subtle shadow-2xl"
              animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80"
                alt="Сайт превью"
                width={96}
                height={72}
                className="h-18 w-24 object-cover"
              />
            </motion.div>

            {!prefersReducedMotion && (
              <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
                {floatingTags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="rounded-full border border-border-subtle bg-card-bg px-3 py-1 text-xs text-text-secondary backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
