"use client";

import { clientPainItems } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ClientPains() {
  return (
    <section id="pains" className="section-light py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="Знакомо, когда визуал есть, а цельного впечатления нет?"
            titleAccent="цельного впечатления нет"
            subtitle="Часто проблема не в отсутствии изображений или сайта, а в том, что отдельные элементы не работают как единая система."
            align="center"
          />
        </RevealAnimation>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientPainItems.map((item, index) => (
            <RevealAnimation key={item.title} delay={0.06 + index * 0.05} className="h-full">
              <article className="glass-panel-soft h-full rounded-2xl p-5 md:p-6">
                <h3 className="mb-2 font-heading text-lg text-white-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-[15px]">
                  {item.description}
                </p>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
