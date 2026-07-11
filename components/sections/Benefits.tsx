import { benefits } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Benefits() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading title="Что получает клиент" align="center" />
        </RevealAnimation>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <RevealAnimation key={benefit.title} delay={i * 0.08}>
              <div className="card-glass h-full p-6 md:p-8">
                <div className="mb-4 h-1 w-8 rounded-full bg-gold" />
                <h3 className="heading-display mb-3 text-xl text-white-text">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{benefit.description}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
