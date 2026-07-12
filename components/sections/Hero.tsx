"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { BrushStroke } from "@/components/ui/BrushStroke";
import { VKButton } from "@/components/ui/VKButton";
import { HeroAnimatedTitle } from "@/components/ui/HeroAnimatedTitle";
import { HeroCursorCard } from "@/components/ui/HeroCursorCard";
import { AccentText } from "@/components/ui/AccentText";
import { HeroExpertiseCard } from "@/components/sections/HeroExpertiseCard";
import { trackEvent } from "@/lib/analytics";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";

function HeroEyebrow({ text }: { text: string }) {
  const parts = text.split("×").map((part) => part.trim());
  if (parts.length !== 2) {
    return <span>{text}</span>;
  }

  return (
    <>
      <span className="text-accent-sky">{parts[0]}</span>
      <span className="mx-1.5 text-text-secondary/55">×</span>
      <span className="text-accent-lilac">{parts[1]}</span>
    </>
  );
}

export function Hero() {
  const { hero } = useSiteContent();
  const { openChat } = useAdelinChat();
  const portraitFocus = hero.portraitFocusY ?? 20;

  const descriptionHighlights =
    hero.descriptionHighlights ||
    (hero.descriptionHighlight ? [hero.descriptionHighlight] : undefined);

  const sellingHighlights = hero.sellingLineHighlights || [];

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
      <div className="hero-container relative z-10 py-8 md:py-10 lg:py-12">
        <div className="hero-layout">
          <HeroCursorCard className="group glass-panel-soft hero-content-card flex h-full min-h-0 flex-col rounded-[2rem] lg:min-h-[680px] lg:rounded-[2rem] lg:p-[52px] xl:p-16">
            <div>
              <p className="hero-eyebrow-accent mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]">
                <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                <HeroEyebrow text={hero.eyebrow} />
              </p>
              <BrushStroke className="mb-6" />
              <HeroAnimatedTitle
                text={hero.titleMain}
                accent={hero.titleHighlight}
                className="mb-7 text-[34px] leading-[1.08] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px]"
              />
              <p className="mb-4 max-w-xl text-[17px] leading-relaxed text-text-secondary md:text-lg">
                <AccentText
                  text={hero.description}
                  accents={descriptionHighlights}
                  accentClassName="font-semibold text-accent-lilac"
                />
              </p>
              {hero.sellingLine ? (
                <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-text-secondary/90 md:text-base lg:mb-12">
                  <AccentText
                    text={hero.sellingLine}
                    accents={sellingHighlights}
                    accentClassName="font-medium text-accent-lilac"
                  />
                </p>
              ) : null}
            </div>

            <div className="mt-auto">
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
                  Посмотреть работы
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
              <p className="mt-8 flex items-start gap-2 text-sm text-text-secondary/90">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/80 shadow-[0_0_8px_rgba(212,184,140,0.6)]" aria-hidden="true" />
                <AccentText
                  text={hero.note}
                  accent={hero.noteHighlight}
                  accentClassName="font-medium text-accent-lilac"
                />
              </p>
            </div>
          </HeroCursorCard>

          <div className="hero-right-column">
            <div className="hero-portrait relative min-h-0 overflow-hidden rounded-[2rem] border border-border-subtle bg-graphite/20 shadow-[0_24px_64px_rgba(14,18,48,0.35)] lg:rounded-[2rem]">
              <Image
                src={hero.specialistPhoto}
                alt={`${hero.specialistName} — AI-специалист и художник`}
                fill
                priority
                quality={85}
                className="object-cover contrast-[1.08] saturate-[1.06] brightness-[1.02]"
                style={{ objectPosition: `center ${portraitFocus}%` }}
                sizes="(max-width: 1024px) 90vw, 38vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/35 to-transparent px-4 py-4 md:px-5 md:py-5">
                <p className="font-heading text-base text-white-text md:text-lg">{hero.specialistName}</p>
                <p className="text-sm text-gold/90">{hero.specialistRoles}</p>
              </div>
            </div>

            <HeroExpertiseCard />
          </div>
        </div>
      </div>
    </section>
  );
}
