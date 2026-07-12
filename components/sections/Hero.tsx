"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { BrushStroke } from "@/components/ui/BrushStroke";
import { VKButton } from "@/components/ui/VKButton";
import { trackEvent } from "@/lib/analytics";
import { AdelinHeroInvite } from "@/components/chatbot/AdelinHeroInvite";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { trustBarItems } from "@/data/content";

export function Hero() {
  const { hero } = useSiteContent();

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
      <div className="container-site relative z-10 flex min-h-[calc(100vh-4rem)] flex-col justify-center gap-10 py-10 lg:flex-row lg:items-start lg:gap-14 lg:pt-12">
        <div className="flex-1 lg:max-w-2xl lg:pt-4">
          <RevealAnimation>
            <div className="glass-panel-soft rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {hero.eyebrow}
              </p>
              <BrushStroke className="mb-6" />
              <h1 className="heading-display mb-6 text-balance text-[42px] leading-[1.08] sm:text-[48px] md:text-[64px] lg:text-[72px]">
                {hero.titleMain}{" "}
                {hero.titleHighlight && (
                  <span className="text-gold">{hero.titleHighlight}</span>
                )}
                {hero.titleSuffix}
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
                {hero.description}
              </p>

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
              <p className="mt-6 text-sm text-text-secondary/90">{hero.note}</p>
            </div>
          </RevealAnimation>
        </div>

        <div className="relative mx-auto w-full max-w-sm flex-1 lg:mx-0 lg:max-w-[28rem] lg:-mt-6 xl:-mt-10">
          <RevealAnimation direction="left" delay={0.15}>
            <div className="relative space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border-subtle bg-graphite/20 shadow-[0_24px_64px_rgba(14,18,48,0.35)]">
                <Image
                  src={hero.specialistPhoto}
                  alt={`${hero.specialistName} — AI-специалист и художник`}
                  fill
                  priority
                  quality={100}
                  className="object-cover object-[center_8%] contrast-[1.08] saturate-[1.06] brightness-[1.02]"
                  sizes="(max-width: 1024px) 85vw, 448px"
                />
              </div>

              <div className="glass-panel-soft rounded-2xl px-4 py-3.5 text-center lg:text-left">
                <p className="text-[0.8125rem] leading-snug md:text-sm">
                  <span className="font-heading text-base text-white-text md:text-lg">
                    {hero.specialistName}
                  </span>
                  <span className="mx-1.5 text-text-secondary/45">·</span>
                  <span className="text-gold">{hero.specialistRoles}</span>
                </p>
                <p className="mt-1 text-xs text-text-secondary">{hero.specialistExperience}</p>
              </div>

              <div className="glass-panel-soft rounded-2xl p-4 md:p-5">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {trustBarItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-snug text-text-secondary"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <AdelinHeroInvite />
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
