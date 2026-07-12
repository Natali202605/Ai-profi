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
      <div className="container-site relative z-10 py-10 md:py-12 lg:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,440px)] lg:gap-x-12 xl:gap-x-16">
          <div className="flex flex-col justify-center lg:min-h-[min(720px,calc(100vh-7rem))] lg:py-2">
            <RevealAnimation>
              <div className="glass-panel-soft rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
                <p className="hero-eyebrow-accent mb-4 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {hero.eyebrow}
                </p>
                <BrushStroke className="mb-6" />
                <h1 className="heading-display mb-6 text-balance text-[40px] leading-[1.08] sm:text-[46px] md:text-[58px] lg:text-[68px] xl:text-[72px]">
                  <span className="text-white-text">{hero.titleMain} </span>
                  {hero.titleHighlight && (
                    <span className="hero-title-highlight">{hero.titleHighlight}</span>
                  )}
                  {hero.titleSuffix && (
                    <span className="text-white-text">{hero.titleSuffix}</span>
                  )}
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
                <p className="mt-6 text-sm text-gold/85">{hero.note}</p>
              </div>
            </RevealAnimation>
          </div>

          <div className="mx-auto w-full max-w-[440px] lg:mx-0 lg:justify-self-end">
            <RevealAnimation direction="left" delay={0.15}>
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border-subtle bg-graphite/20 shadow-[0_24px_64px_rgba(14,18,48,0.35)]">
                  <Image
                    src={hero.specialistPhoto}
                    alt={`${hero.specialistName} — AI-специалист и художник`}
                    fill
                    priority
                    quality={100}
                    className="object-cover object-[center_6%] contrast-[1.08] saturate-[1.06] brightness-[1.02]"
                    sizes="(max-width: 1024px) 85vw, 440px"
                  />
                </div>

                <div className="hero-side-card px-4 py-3.5 text-center lg:text-left">
                  <p className="text-[0.8125rem] leading-snug md:text-sm">
                    <span className="font-heading text-base text-white-text md:text-lg">
                      {hero.specialistName}
                    </span>
                    <span className="mx-1.5 text-text-secondary/45">·</span>
                    <span className="text-gold">{hero.specialistRoles}</span>
                  </p>
                  <p className="mt-1 text-xs text-gold/75">{hero.specialistExperience}</p>
                </div>

                <div className="hero-side-card p-4 md:p-5">
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {trustBarItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-snug text-text-secondary"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_8px_rgba(184,164,255,0.6)]"
                          aria-hidden="true"
                        />
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
      </div>
    </section>
  );
}
