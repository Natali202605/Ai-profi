"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VKButton } from "@/components/ui/VKButton";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { aboutFacts } from "@/data/content";

export function About() {
  const { about } = useSiteContent();

  return (
    <section id="about" className="section-light py-16 md:py-28">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <RevealAnimation direction="left">
            <div className="relative mx-auto max-w-md">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={about.photo}
                  alt="Натали Смирнова — AI-специалист и художник"
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="absolute -bottom-4 right-0 glass-panel p-4 sm:-right-4">
                <p className="font-heading text-3xl text-gold">{about.badgeValue}</p>
                <p className="text-xs text-text-secondary">{about.badgeLabel}</p>
              </div>
            </div>
          </RevealAnimation>

          <div className="glass-panel-soft rounded-2xl p-6 md:p-8">
            <RevealAnimation>
              <SectionHeading light title={about.title} titleAccent={about.titleHighlight} />
            </RevealAnimation>
            <RevealAnimation delay={0.1}>
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="mb-4 text-lg leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </RevealAnimation>

            <RevealAnimation delay={0.15}>
              <blockquote className="mb-8 border-l-2 border-gold/60 pl-5">
                <p className="font-heading text-lg leading-relaxed text-white-text md:text-xl">
                  «Для меня важно не просто создать красивый кадр, а понять, какое впечатление он
                  должен произвести и какую задачу решить».
                </p>
              </blockquote>
            </RevealAnimation>

            <RevealAnimation delay={0.2}>
              <div className="mb-8 grid grid-cols-2 gap-3">
                {aboutFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-border-subtle bg-card-bg/40 px-3 py-2.5 text-sm text-text-secondary"
                  >
                    {fact.label}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/portfolio" className="btn-secondary-light">
                  Посмотреть работы
                </Link>
                <VKButton className="btn-secondary-light !border-0 !bg-transparent !p-0" />
                <Link href="/#contact" className="btn-primary">
                  Обсудить проект
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
