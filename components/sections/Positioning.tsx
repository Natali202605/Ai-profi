"use client";

import { positioningPillars } from "@/data/workflow";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Positioning() {
  return (
    <section id="positioning" className="section-light py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="Не просто AI-генерация. Художественно и стратегически продуманный визуальный проект"
            titleAccent="Художественно и стратегически"
            subtitle="AI ускоряет и расширяет возможности производства, но сам по себе не создаёт сильный образ. Для профессионального результата необходимы идея, композиция, цвет, свет, драматургия, понимание аудитории и тщательный отбор материалов."
            align="center"
          />
        </RevealAnimation>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[70%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent lg:block"
            aria-hidden
          />
          <div className="grid gap-6 md:grid-cols-3">
            {positioningPillars.map((pillar, i) => (
              <RevealAnimation key={pillar.title} delay={0.1 + i * 0.08} className="h-full">
                <article className="glass-panel relative flex h-full flex-col rounded-2xl p-6 md:p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-mono text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="heading-display mb-4 text-xl text-white-text md:text-2xl">
                    {pillar.title}
                  </h3>
                  <ul className="mt-auto space-y-2">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-text-secondary md:text-[15px]"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/80" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
