"use client";

import { audienceSegments } from "@/data/workflow";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Audience() {
  return (
    <section id="audience" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="Кому подходят мои услуги"
            titleAccent="подходят"
            subtitle="Работаю с проектами, которым важны характер образа, доверие аудитории и цельная визуальная система."
            align="center"
          />
        </RevealAnimation>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {audienceSegments.map((segment, index) => (
            <RevealAnimation key={segment.title} delay={0.05 + index * 0.05} className="h-full">
              <article className="glass-panel-soft flex h-full flex-col rounded-2xl p-5 md:p-6">
                <h3 className="mb-3 font-heading text-lg text-white-text">{segment.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{segment.text}</p>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
