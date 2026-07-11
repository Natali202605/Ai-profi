import Image from "next/image";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const artistPoints = [
  "я вижу композицию целиком",
  "чувствую цветовые сочетания",
  "обращаю внимание на свет и детали",
  "умею сохранять характер образа",
  "отделяю эффектное от действительно выразительного",
  "создаю визуальные серии, а не случайный набор картинок",
  "думаю не только о красоте, но и о задаче проекта",
];

export function ArtApproach() {
  return (
    <section className="section-light py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            title="AI умеет создавать варианты. Художник умеет выбирать главное"
          />
        </RevealAnimation>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <RevealAnimation direction="left">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80"
                  alt="Художественный подход — живопись и мазки"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-sand/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full border-2 border-gold/30 bg-milk" />
            </div>
          </RevealAnimation>

          <RevealAnimation direction="right" delay={0.15}>
            <p className="mb-6 text-lg leading-relaxed text-text-dark/80">
              Нейросеть может предложить десятки изображений, но она не принимает за вас
              художественное решение. Важно почувствовать, какой свет подходит проекту, какая
              композиция вызывает нужную эмоцию, где необходим акцент, а где — тишина и пространство.
            </p>
            <p className="mb-4 font-medium text-text-dark">
              Более 10 лет художественной практики сформировали мой подход к работе:
            </p>
            <ul className="mb-8 space-y-2">
              {artistPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-text-dark/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-berry" />
                  {point}
                </li>
              ))}
            </ul>
          </RevealAnimation>

          <RevealAnimation direction="right" className="lg:col-start-2">
            <div className="relative mt-4 lg:mt-0">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-text-dark/10">
                <Image
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
                  alt="AI-визуал и цифровые технологии"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -left-6 top-1/2 hidden h-px w-12 bg-gradient-to-r from-gold to-transparent lg:block" />
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
