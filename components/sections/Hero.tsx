"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { BrushStroke } from "@/components/ui/BrushStroke";
import { VKButton } from "@/components/ui/VKButton";
import { DigitalBrushReveal } from "@/components/ui/DigitalBrushReveal";
import { HeroCursorCard } from "@/components/ui/HeroCursorCard";
import { trackEvent } from "@/lib/analytics";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { heroHighlightCards } from "@/data/content";

export function Hero() {
  const { hero } = useSiteContent();

  const titleLines = (() => {
    const suffix = `${hero.titleHighlight}${hero.titleSuffix ? ` ${hero.titleSuffix}` : ""}`.trim();
    const commaIndex = hero.titleMain.indexOf(",");
    if (commaIndex !== -1) {
      return [
        `${hero.titleMain.slice(0, commaIndex + 1).trim()}`,
        hero.titleMain.slice(commaIndex + 1).trim(),
        suffix,
      ].filter(Boolean);
    }
    return [hero.titleMain, suffix].filter(Boolean);
  })();

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
      <div className="container-site relative z-10 py-8 md:py-10 lg:py-12">
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(280px,0.4fr)] lg:gap-8 xl:max-w-[1400px] xl:gap-[2rem]">
          <HeroCursorCard className="group glass-panel-soft flex h-full flex-col rounded-[2rem] p-6 sm:p-8 md:p-10 lg:rounded-[2.25rem] lg:p-11 xl:p-14">
            <div>
              <p className="hero-eyebrow-accent mb-4 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {hero.eyebrow}
              </p>
              <BrushStroke className="mb-6" />
              <DigitalBrushReveal
                lines={titleLines}
                className="mb-6 text-[36px] leading-[1.08] sm:text-[42px] md:text-[52px] lg:text-[58px] xl:text-[64px]"
              />
              <p className="mb-8 max-w-xl text-[17px] leading-relaxed text-text-secondary md:text-xl">
                {hero.description}
              </p>
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
                  Смотреть портфолио
                </Link>
              </div>
              <div className="mt-4">
                <VKButton>Написать ВКонтакте</VKButton>
              </div>
              <p className="mt-6 text-sm text-gold/85">{hero.note}</p>
            </div>
          </HeroCursorCard>

          <div className="flex h-full flex-col gap-4">
            <div className="relative min-h-[300px] flex-[1.15] overflow-hidden rounded-[2rem] border border-border-subtle bg-graphite/20 shadow-[0_24px_64px_rgba(14,18,48,0.35)] lg:min-h-0">
              <Image
                src={hero.specialistPhoto}
                alt={`${hero.specialistName} — AI-специалист и художник`}
                fill
                priority
                quality={100}
                className="object-cover object-[center_6%] contrast-[1.08] saturate-[1.06] brightness-[1.02]"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>

            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {heroHighlightCards.map((card) => (
                <div
                  key={card.title}
                  className="hero-side-card flex min-h-[88px] flex-col justify-center px-4 py-4 text-center sm:min-h-[96px] lg:min-h-[88px] xl:min-h-[96px]"
                >
                  <p className="font-heading text-base leading-tight text-white-text md:text-lg">
                    {card.title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-gold/80 md:text-sm">
                    {card.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
