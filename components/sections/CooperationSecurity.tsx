"use client";

import Link from "next/link";
import { cooperationSecurityItems } from "@/data/workflow";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CooperationSecurity() {
  return (
    <section id="cooperation-security" className="py-16 md:py-24">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            title="Ваш проект в надёжных руках"
            titleAccent="надёжных руках"
            subtitle="Перед началом работы мы обсуждаем задачу, фиксируем условия сотрудничества и создаём понятный план реализации проекта."
            align="center"
          />
        </RevealAnimation>

        <div className="grid gap-4 md:grid-cols-3">
          {cooperationSecurityItems.map((item, index) => (
            <RevealAnimation key={item.title} delay={0.06 + index * 0.06} className="h-full">
              <article className="card-glass h-full p-5 md:p-6">
                <h3 className="mb-2 font-heading text-lg text-white-text">{item.title}</h3>
                <p className="text-sm leading-relaxed text-body-secondary">{item.text}</p>
              </article>
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation delay={0.2}>
          <div className="mt-8 text-center">
            <Link href="/#contact" className="btn-primary">
              Обсудить проект
            </Link>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
