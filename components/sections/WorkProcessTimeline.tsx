"use client";

import Link from "next/link";
import { processFooterNote, workProcessSteps } from "@/data/workflow";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WorkProcessTimeline() {
  return (
    <section id="process" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="Как проходит работа над проектом"
            titleAccent="работа над проектом"
            subtitle="Понятный сценарий от заявки до передачи файлов и поддержки — с фиксацией ТЗ, договора и этапов согласования."
            align="center"
          />
        </RevealAnimation>

        <div className="workflow-timeline mx-auto mt-10 max-w-3xl">
          {workProcessSteps.map((step, index) => (
            <RevealAnimation key={step.number} delay={0.04 + index * 0.04}>
              <article className="workflow-step card-glass mb-5 p-5 md:p-6">
                <div className="workflow-step-dot" aria-hidden="true" />
                <p className="mb-2 font-mono text-xs tracking-wider text-accent-secondary">
                  {step.number}
                </p>
                <h3 className="mb-3 font-heading text-xl text-white-text md:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-body-secondary md:text-[15px]">
                  {step.text}
                </p>

                {step.bullets?.length ? (
                  <ul className="mt-3 space-y-1.5 text-sm text-body-secondary">
                    {step.bullets.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/80"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {step.highlight ? (
                  <p className="mt-4 rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-medium text-white-text">
                    {step.highlight}
                  </p>
                ) : null}

                {step.cta ? (
                  <Link href={step.cta.href} className="btn-secondary mt-4 inline-flex text-sm">
                    {step.cta.label}
                  </Link>
                ) : null}
              </article>
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation delay={0.15}>
          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border-subtle bg-card-bg/40 px-5 py-4 text-center text-sm leading-relaxed text-text-secondary md:text-[15px]">
            {processFooterNote}
          </p>
        </RevealAnimation>
      </div>
    </section>
  );
}
