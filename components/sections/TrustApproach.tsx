"use client";

import { trustApproachItems } from "@/data/workflow";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TrustApproach() {
  return (
    <section id="trust-approach" className="section-light py-16 md:py-24">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="Почему клиенты выбирают профессиональный подход"
            titleAccent="профессиональный подход"
            align="center"
          />
        </RevealAnimation>

        <div className="grid gap-4 sm:grid-cols-2">
          {trustApproachItems.map((item, index) => (
            <RevealAnimation key={item.title} delay={0.06 + index * 0.05} className="h-full">
              <article className="glass-panel-soft h-full rounded-2xl p-5 md:p-6">
                <h3 className="mb-2 font-heading text-lg text-white-text">{item.title}</h3>
                <p className="text-sm leading-relaxed text-body-secondary md:text-[15px]">{item.text}</p>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
