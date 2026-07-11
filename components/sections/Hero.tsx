"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { BrushStroke } from "@/components/ui/BrushStroke";
import { VKButton } from "@/components/ui/VKButton";
import { trackEvent } from "@/lib/analytics";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function Hero() {
  const { hero } = useSiteContent();

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-20 md:pt-24">
      <div className="container-site relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center gap-12 py-16 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex-1 lg:max-w-2xl">
          <RevealAnimation>
            <div className="glass-panel-soft rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {hero.eyebrow}
              </p>
              <BrushStroke className="mb-6" />
              <h1 className="heading-display mb-6 text-balance text-[32px] leading-[1.08] sm:text-[40px] md:text-[56px] lg:text-[64px]">
                {hero.titleMain}{" "}
                <span className="text-gold">{hero.titleHighlight}</span>
                {hero.titleSuffix}
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
                {hero.description}
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
              <p className="mt-6 text-sm text-text-secondary/90">{hero.note}</p>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <ul className="mt-8 flex flex-col gap-3 sm:gap-2">
              {hero.trustMarkers.map((marker) => (
                <li key={marker} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {marker}
                </li>
              ))}
            </ul>
          </RevealAnimation>
        </div>

        <div className="relative mx-auto w-full max-w-sm flex-1 lg:mx-0 lg:max-w-[28rem] lg:-translate-y-6">
          <RevealAnimation direction="left" delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border-subtle bg-graphite/20 shadow-[0_24px_64px_rgba(14,18,48,0.35)]">
                <Image
                  src={hero.specialistPhoto}
                  alt={hero.specialistName}
                  fill
                  priority
                  quality={100}
                  className="object-cover object-[center_12%] contrast-[1.08] saturate-[1.06] brightness-[1.02]"
                  sizes="(max-width: 1024px) 85vw, 448px"
                />
              </div>

              <div className="glass-panel-soft mt-5 rounded-2xl px-5 py-5 text-center md:px-6 md:py-6 lg:text-left">
                <p className="font-heading text-[1.75rem] leading-tight text-white-text md:text-3xl">
                  {hero.specialistName}
                </p>
                <p className="mt-2 break-words-safe text-sm leading-relaxed text-gold md:text-base">{hero.specialistRoles}</p>
                <div className="gold-line mx-auto my-4 lg:mx-0" />
                <p className="text-sm text-text-secondary">{hero.specialistExperience}</p>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
