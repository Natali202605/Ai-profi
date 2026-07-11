import { processSteps } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessStep } from "@/components/ui/ProcessStep";

export function Process() {
  return (
    <section className="section-light py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="От идеи до готового визуального решения"
          />
        </RevealAnimation>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <RevealAnimation key={step.step} delay={i * 0.08}>
              <ProcessStep {...step} light />
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation delay={0.5}>
          <div className="glass-panel-soft mx-auto mt-10 max-w-2xl rounded-2xl p-6 text-center">
            <p className="text-text-secondary">
              Количество этапов и состав работ зависят от выбранной услуги. Перед началом проекта
              клиент получает понятный план работы.
            </p>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
