"use client";

import { positioningCards } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function Positioning() {
  const { intro } = useSiteContent();

  return (
    <section id="positioning" className="section-light py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading light title={intro.title} />
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
            <p className="text-lg leading-relaxed text-text-secondary">{intro.paragraph1}</p>
            <p className="text-lg leading-relaxed text-text-secondary">{intro.paragraph2}</p>
          </div>
        </RevealAnimation>

        <div className="grid gap-6 md:grid-cols-3">
          {positioningCards.map((card, i) => (
            <RevealAnimation key={card.title} delay={0.15 + i * 0.08} className="h-full">
              <div className="glass-panel flex h-full flex-col rounded-2xl p-6 md:p-8">
                <div className="mb-4 h-1 w-10 rounded-full bg-gold" />
                <h3 className="heading-display mb-3 text-2xl text-white-text md:text-3xl">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-text-secondary">{card.description}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
