"use client";

import { portfolioDirections } from "@/data/portfolio";
import { PortfolioDirectionCard } from "@/components/portfolio/PortfolioDirectionCard";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function PortfolioDirections() {
  const { portfolio } = useSiteContent();
  const [firstRow, secondRow, wideCard] = [
    portfolioDirections.slice(0, 2),
    portfolioDirections.slice(2, 5),
    portfolioDirections[5],
  ];

  return (
    <section id="portfolio-directions" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label={portfolio.featured.label}
            title="Выберите направление и посмотрите работы"
            titleAccent="посмотрите работы"
            subtitle="В портфолио собраны AI-видео, изображения, сайты, чат-боты, оформление ВКонтакте и художественные проекты."
          />
        </RevealAnimation>

        <div className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {firstRow.map((direction, index) => (
              <RevealAnimation key={direction.id} delay={0.08 + index * 0.06}>
                <PortfolioDirectionCard direction={direction} className="min-h-[360px] md:min-h-[420px]" />
              </RevealAnimation>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {secondRow.map((direction, index) => (
              <RevealAnimation key={direction.id} delay={0.18 + index * 0.05}>
                <PortfolioDirectionCard direction={direction} className="min-h-[320px]" />
              </RevealAnimation>
            ))}
          </div>

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
