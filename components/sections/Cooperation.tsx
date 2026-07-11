import Link from "next/link";
import { cooperationFormats } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Cooperation() {
  return (
    <section className="section-light py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="Можно начать с одной задачи или собрать проект целиком"
            align="center"
          />
        </RevealAnimation>

        <div className="grid gap-6 md:grid-cols-3">
          {cooperationFormats.map((format, i) => (
            <RevealAnimation key={format.title} delay={i * 0.1}>
              <div className="glass-panel h-full p-6 md:p-8">
                <h3 className="heading-display mb-3 text-xl text-white-text">{format.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{format.description}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation className="mt-10 text-center">
          <Link href="/#contact" className="btn-primary">
            Подобрать формат
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
}
