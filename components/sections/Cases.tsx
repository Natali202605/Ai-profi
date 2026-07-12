import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Cases() {
  return (
    <section id="cases" className="section-light py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="Как идея превращается в результат"
            subtitle="Подробные кейсы с задачей, решением и результатом."
          />
        </RevealAnimation>

        <div className="space-y-16">
          {caseStudies.map((caseItem, i) => {
            const isFullWidth = caseItem.layout === "full-width";
            const isTextRight = caseItem.layout === "text-right";

            if (isFullWidth) {
              return (
                <RevealAnimation key={caseItem.id}>
                  <article className="glass-panel overflow-hidden">
                    <div className="relative aspect-[21/9] overflow-hidden">
                      <Image
                        src={caseItem.cover}
                        alt={caseItem.task}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-berry">
                        {caseItem.client}
                      </p>
                      <h3 className="heading-display mb-3 text-2xl text-white-text">{caseItem.task}</h3>
                      <p className="mb-4 text-text-secondary">{caseItem.solution}</p>
                      <CaseLink slug={caseItem.projectSlug} />
                    </div>
                  </article>
                </RevealAnimation>
              );
            }

            return (
              <RevealAnimation key={caseItem.id}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                    isTextRight ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={caseItem.cover}
                      alt={caseItem.task}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="glass-panel-soft rounded-2xl p-6 md:p-8">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-berry">
                      {caseItem.client}
                    </p>
                    <h3 className="heading-display mb-3 text-2xl text-white-text">{caseItem.task}</h3>
                    <p className="mb-4 leading-relaxed text-text-secondary">{caseItem.solution}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {caseItem.services.map((s) => (
                        <span key={s} className="tag-glass">
                          {s}
                        </span>
                      ))}
                    </div>
                    <CaseLink slug={caseItem.projectSlug} />
                  </div>
                </article>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-berry"
    >
      Смотреть полный кейс
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
