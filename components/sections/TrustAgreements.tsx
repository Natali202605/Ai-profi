"use client";

import { trustAgreementItems } from "@/data/workflow";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TrustAgreements() {
  return (
    <section id="trust" className="section-light py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="Проект строится на понятных договорённостях"
            titleAccent="понятных договорённостях"
            subtitle="Работа продолжается до выполнения согласованного результата в рамках утверждённого ТЗ и условий договора."
            align="center"
          />
        </RevealAnimation>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {trustAgreementItems.map((item, index) => (
            <RevealAnimation key={item.title} delay={0.04 + index * 0.04} className="h-full">
              <article className="glass-panel-soft h-full rounded-2xl p-4 md:p-5">
                <h3 className="mb-2 font-heading text-base text-white-text">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.text}</p>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
