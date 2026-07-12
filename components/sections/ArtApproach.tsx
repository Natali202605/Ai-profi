import Image from "next/image";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

const comparisonComments = [
  "изменена композиция",
  "усилен главный акцент",
  "скорректирован свет",
  "выстроена цветовая гармония",
  "убраны лишние детали",
  "создана единая атмосфера",
];

export function ArtApproach() {
  return (
    <section className="section-light py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading light title="AI создаёт варианты. Художник выбирает главное" />
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-text-secondary">
            Нейросеть может создать множество изображений, но она не определяет, какой образ точно
            передаст характер бренда. Для этого необходимы художественное видение, насмотренность,
            чувство композиции и понимание задачи.
          </p>
        </RevealAnimation>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <RevealAnimation delay={0.15}>
            <div className="glass-panel overflow-hidden rounded-2xl">
              <p className="border-b border-border-subtle px-4 py-3 text-sm font-medium text-text-secondary">
                Исходная генерация
              </p>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/portfolio/creator.jpg"
                  alt="Исходная AI-генерация"
                  fill
                  className="object-cover opacity-80 saturate-75"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <div className="glass-panel overflow-hidden rounded-2xl ring-1 ring-gold/30">
              <p className="border-b border-border-subtle px-4 py-3 text-sm font-medium text-gold">
                Итоговый доработанный визуал
              </p>
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/specialist-creator.jpg"
                  alt="Доработанный визуал с художественным подходом"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.25}>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {comparisonComments.map((comment) => (
              <li
                key={comment}
                className="rounded-full border border-border-subtle bg-card-bg/50 px-4 py-2 text-sm text-text-secondary"
              >
                {comment}
              </li>
            ))}
          </ul>
        </RevealAnimation>
      </div>
    </section>
  );
}
