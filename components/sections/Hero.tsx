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
import { getFeaturedProjects } from "@/data/portfolio";

const previewProjects = getFeaturedProjects().slice(0, 4);

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
              <AdelinHeroInvite />
            </div>
          </RevealAnimation>
        </div>

        <div className="relative mx-auto w-full max-w-sm flex-1 lg:mx-0 lg:max-w-[28rem]">
          <RevealAnimation direction="left" delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border-subtle bg-graphite/20 shadow-[0_24px_64px_rgba(14,18,48,0.35)]">
                <Image
                  src={hero.specialistPhoto}
                  alt={`${hero.specialistName} — AI-специалист и художник`}
                  fill
                  priority
                  quality={100}
                  className="object-cover object-[center_12%] contrast-[1.08] saturate-[1.06] brightness-[1.02]"
                  sizes="(max-width: 1024px) 85vw, 448px"
                />
              </div>

              <div className="glass-panel-soft mt-5 rounded-2xl px-4 py-3.5 text-center lg:text-left">
                <p className="text-[0.8125rem] leading-snug md:text-sm">
                  <span className="font-heading text-base text-white-text md:text-lg">
                    {hero.specialistName}
                  </span>
                  <span className="mx-1.5 text-text-secondary/45">·</span>
                  <span className="text-gold">{hero.specialistRoles}</span>
                </p>
                <p className="mt-1 text-xs text-text-secondary">{hero.specialistExperience}</p>
              </div>

              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                {previewProjects.map((project, i) => {
                  const positions = [
                    "right-0 -top-6 w-24",
                    "-left-8 top-1/4 w-20",
                    "right-4 bottom-16 w-28",
                    "-left-4 bottom-4 w-20",
                  ];
                  return (
                    <div
                      key={project.slug}
                      className={`absolute ${positions[i]} overflow-hidden rounded-xl border border-border-subtle shadow-lg`}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={project.cover}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
