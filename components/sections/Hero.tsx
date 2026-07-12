"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BrushStroke } from "@/components/ui/BrushStroke";
import { VKButton } from "@/components/ui/VKButton";
import { HeroAnimatedTitle } from "@/components/ui/HeroAnimatedTitle";
import { HeroCursorCard } from "@/components/ui/HeroCursorCard";
import { AccentText } from "@/components/ui/AccentText";
import { HeroExpertiseCard } from "@/components/sections/HeroExpertiseCard";
import { trackEvent } from "@/lib/analytics";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";
import { useReducedEffects } from "@/lib/useReducedEffects";

function HeroEyebrow({ text }: { text: string }) {
  const parts = text.split("×").map((part) => part.trim());
  if (parts.length !== 2) {
    return <span>{text}</span>;
  }

  return (
    <>
      <span className="text-accent-sky">{parts[0]}</span>
      <span className="mx-1.5 text-white/70">×</span>
      <span className="text-accent-lilac">{parts[1]}</span>
    </>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const { hero } = useSiteContent();
  const { openChat } = useAdelinChat();
  const reducedMotion = useReducedMotion();
  const reducedEffects = useReducedEffects();

  const portraitFocusY = hero.portraitFocusY ?? 20;
  const portraitFocusX = hero.portraitFocusX ?? 50;
  const portraitZoom = hero.portraitZoom ?? 1;

  const descriptionHighlights =
    hero.descriptionHighlights ||
    (hero.descriptionHighlight ? [hero.descriptionHighlight] : undefined);

  const sellingHighlights = hero.sellingLineHighlights || [];
  const contentDelay = reducedMotion ? 0 : reducedEffects ? 0.55 : 0.95;

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
      <div className="hero-container relative z-10 py-8 md:py-10 lg:py-12">
        <div className="hero-layout">
          <HeroCursorCard className="group hero-content-card hero-card-dense flex h-full min-h-0 flex-col rounded-[2rem] lg:min-h-[680px] lg:rounded-[2rem] lg:p-[52px] xl:p-16">
            <div>
              <motion.p
                className="hero-eyebrow-accent mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-caption-strong"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                <HeroEyebrow text={hero.eyebrow} />
              </motion.p>
              <BrushStroke className="mb-6" />
              <HeroAnimatedTitle
                text={hero.titleMain}
                accent={hero.titleHighlight}
                titleLines={hero.titleLines}
                className="mb-7"
              />
              <motion.p
                className="hero-subtitle mb-4 max-w-[720px] text-body-primary"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={contentDelay}
              >
                <AccentText
                  text={hero.description}
                  accents={descriptionHighlights}
                  accentClassName="font-semibold text-accent-lilac"
                />
              </motion.p>
              {hero.sellingLine ? (
                <motion.p
                  className="hero-selling mb-10 max-w-[720px] text-body-secondary lg:mb-12"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={contentDelay + 0.08}
                >
                  <AccentText
                    text={hero.sellingLine}
                    accents={sellingHighlights}
                    accentClassName="font-medium text-accent-lilac"
                  />
                </motion.p>
              ) : null}
            </div>

            <motion.div
              className="mt-auto"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={contentDelay + 0.16}
            >
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="btn-primary shadow-[0_0_32px_rgba(164,148,255,0.3)]"
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
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <button
                  type="button"
                  className="text-sm font-medium text-gold transition-opacity hover:opacity-80"
                  onClick={() => {
                    trackEvent("adelin_open", { source: "hero" });
                    openChat();
                  }}
                >
                  Подобрать услугу с Аделин →
                </button>
                <VKButton className="!text-sm">Написать ВКонтакте</VKButton>
              </div>
              <p className="mt-8 flex items-start gap-2 text-sm text-caption-strong">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80 shadow-[0_0_8px_rgba(212,184,140,0.6)]"
                  aria-hidden="true"
                />
                <AccentText
                  text={hero.note}
                  accent={hero.noteHighlight}
                  accentClassName="font-medium text-accent-lilac"
                />
              </p>
            </motion.div>
          </HeroCursorCard>

          <div className="hero-right-column">
            <div className="hero-portrait relative min-h-0 overflow-hidden rounded-[2rem] border border-white/15 bg-graphite/20 shadow-[0_24px_64px_rgba(14,18,48,0.35)] lg:rounded-[2rem]">
              <Image
                src={hero.specialistPhoto}
                alt={`${hero.specialistName} — AI-специалист и художник`}
                fill
                priority
                quality={85}
                className="object-cover contrast-[1.06] saturate-[1.04] brightness-[1.02]"
                style={{
                  objectPosition: `${portraitFocusX}% ${portraitFocusY}%`,
                  transform: portraitZoom !== 1 ? `scale(${portraitZoom})` : undefined,
                }}
                sizes="(max-width: 1024px) 90vw, 38vw"
              />
              <div
                className={`photo-caption ${hero.captionPosition === "bottom-center" ? "photo-caption-center" : ""}`}
              >
                <p className="photo-caption-name">{hero.specialistName}</p>
                <p className="photo-caption-role">{hero.specialistRoles}</p>
                {hero.specialistCaption ? (
                  <p className="photo-caption-tagline hidden sm:block">{hero.specialistCaption}</p>
                ) : null}
              </div>
            </div>

            <HeroExpertiseCard />
          </div>
        </div>
      </div>
    </section>
  );
}
