"use client";

import { competencyGroups } from "@/data/workflow";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Competencies() {
  return (
    <section id="competencies" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="Профессиональные компетенции"
            titleAccent="компетенции"
            subtitle="Навыки сгруппированы по ролям в проекте — от художественной базы до digital и постобработки."
            align="center"
          />
        </RevealAnimation>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {competencyGroups.map((group, index) => (
            <RevealAnimation key={group.title} delay={0.06 + index * 0.06} className="h-full">
              <article className="glass-panel h-full rounded-2xl p-6 md:p-8">
                <h3 className="heading-display mb-5 text-xl text-white-text md:text-2xl">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border-subtle bg-card-bg/50 px-3 py-1.5 text-sm text-text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
