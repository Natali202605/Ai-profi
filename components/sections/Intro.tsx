"use client";

import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function Intro() {
  const { intro } = useSiteContent();

  return (
    <section className="section-light py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading light title={intro.title} />
        </RevealAnimation>
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealAnimation delay={0.1} className="h-full">
            <div className="glass-panel-soft flex h-full flex-col rounded-2xl p-6 md:p-8">
              <p className="text-lg leading-relaxed text-text-secondary">{intro.paragraph1}</p>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">{intro.paragraph2}</p>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.2} className="h-full">
            <blockquote className="glass-panel relative flex h-full flex-col p-6 sm:p-8">
              <div className="absolute -left-1 top-6 h-12 w-1 rounded-full bg-gold" />
              <p className="font-heading text-2xl leading-relaxed text-white-text md:text-3xl">{intro.quote}</p>
            </blockquote>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
