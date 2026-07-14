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
            title="Знакомо, когда идея есть, но визуал не передаёт её ценность?"
            titleAccent="не передаёт её ценность"
            subtitle="Каждая типичная ситуация — с понятной причиной и профессиональным решением."
            align="center"
          />
        </RevealAnimation>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientPainItems.map((item, index) => (
            <RevealAnimation key={item.title} delay={0.06 + index * 0.05} className="h-full">
              <article className="glass-panel-soft flex h-full flex-col rounded-2xl p-5 md:p-6">
                <h3 className="mb-4 font-heading text-lg text-white-text">{item.title}</h3>
                <div className="space-y-3 text-sm leading-relaxed md:text-[15px]">
                  <p>
                    <span className="font-medium text-gold">Проблема: </span>
                    <span className="text-text-secondary">{item.problem}</span>
                  </p>
                  <p>
                    <span className="font-medium text-accent-lilac">Последствие: </span>
                    <span className="text-text-secondary">{item.consequence}</span>
                  </p>
                  <p className="rounded-xl border border-gold/20 bg-gold/10 px-3 py-2.5">
                    <span className="font-medium text-white-text">Решение: </span>
                    <span className="text-text-secondary">{item.solution}</span>
                  </p>
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
