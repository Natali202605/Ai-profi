"use client";

import { solutionSteps } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ValueSolution() {
  return (
    <section id="solution" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="Собираю проект в единую визуальную систему"
            titleAccent="единую визуальную систему"
            subtitle="Я изучаю задачу, аудиторию и характер проекта, разрабатываю визуальную концепцию и воплощаю её в нужных форматах: изображениях, видео, сайте, чат-боте и оформлении ВКонтакте."
            align="center"
          />
        </RevealAnimation>

        <div className="grid gap-6 md:grid-cols-3">
          {solutionSteps.map((step, index) => (
            <RevealAnimation key={step.title} delay={0.08 + index * 0.08} className="h-full">
              <article className="card-glass h-full p-6 md:p-8">
                <p className="mb-3 font-mono text-xs tracking-wider text-accent-secondary">
                  0{index + 1}
                </p>
                <h3 className="mb-3 font-heading text-xl text-white-text">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary md:text-[15px]">
                  {step.description}
                </p>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
