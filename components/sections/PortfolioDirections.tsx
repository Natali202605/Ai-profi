import { getPublishedPortfolioProjects } from "@/lib/portfolio-store";
import { buildPortfolioDirections, portfolioProjects } from "@/data/portfolio";
import { PortfolioDirectionCard } from "@/components/portfolio/PortfolioDirectionCard";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function PortfolioDirections() {
  let source = portfolioProjects;
  try {
    const published = await getPublishedPortfolioProjects();
    if (published.length) source = published;
  } catch {
    /* seed fallback */
  }

  const directions = buildPortfolioDirections(source).filter((d) => d.projectCount > 0);
  const [firstRow, secondRow, wideCard] = [
    directions.slice(0, 2),
    directions.slice(2, 5),
    directions[5],
  ];

  return (
    <section id="portfolio-directions" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label="Портфолио"
            title="Выберите направление и посмотрите работы"
            titleAccent="посмотрите работы"
            subtitle="В портфолио собраны AI-видео, изображения, сайты, чат-боты, оформление ВКонтакте и художественные проекты."
          />
        </RevealAnimation>

        <div className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {firstRow.map((direction, index) => (
              <RevealAnimation key={direction.id} delay={0.08 + index * 0.06}>
                <PortfolioDirectionCard
                  direction={direction}
                  className="min-h-[360px] md:min-h-[420px]"
                />
              </RevealAnimation>
            ))}
          </div>

          {secondRow.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              {secondRow.map((direction, index) => (
                <RevealAnimation key={direction.id} delay={0.18 + index * 0.05}>
                  <PortfolioDirectionCard direction={direction} className="min-h-[320px]" />
                </RevealAnimation>
              ))}
            </div>
          )}

          {wideCard && (
            <RevealAnimation delay={0.28}>
              <PortfolioDirectionCard direction={wideCard} />
            </RevealAnimation>
          )}
        </div>
      </div>
    </section>
  );
}
