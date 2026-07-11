import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Cases() {
  return (
    <section className="section-light py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading light title="Кейсы" subtitle="Реальные проекты с разными задачами и визуальными решениями." />
        </RevealAnimation>

        <div className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((caseItem, i) => (
            <RevealAnimation key={caseItem.id} delay={i * 0.1}>
              <article className="glass-panel group overflow-hidden transition-shadow hover:shadow-[0_8px_32px_rgba(164,148,255,0.12)]">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={caseItem.cover}
                    alt={caseItem.task}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-berry">
                    {caseItem.client}
                  </p>
                  <h3 className="heading-display mb-3 text-xl text-text-dark">{caseItem.task}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-text-dark/70">{caseItem.solution}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {caseItem.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-white/12 px-3 py-1 text-xs text-text-secondary backdrop-blur-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/portfolio/${caseItem.projectSlug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-berry"
                  >
                    Смотреть проект
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
