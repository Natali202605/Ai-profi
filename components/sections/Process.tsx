import { processSteps } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessStep } from "@/components/ui/ProcessStep";

export function Process() {
  return (
    <section id="process" className="section-light py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="Понятный путь от идеи до готового проекта"
            titleAccent="от идеи до готового проекта"
          />
        </RevealAnimation>

        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <RevealAnimation key={step.step} delay={i * 0.08} className="h-full">
              <ProcessStep {...step} light className="h-full" />
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation delay={0.5}>
          <div className="glass-panel-soft mx-auto mt-10 max-w-2xl rounded-2xl p-6 text-center">
            <p className="text-text-secondary">
              До начала работы вы будете понимать состав проекта, этапы и формат результата.
            </p>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
