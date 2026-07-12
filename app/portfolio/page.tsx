"use client";

import { useState } from "react";
import { portfolioCategories, getPortfolioCategoryGroups } from "@/data/portfolio";
import { PortfolioCategoryCard } from "@/components/portfolio/PortfolioCategoryCard";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { portfolio } = useSiteContent();
  const groups = getPortfolioCategoryGroups({ categoryId: activeCategory });

  return (
    <div className="pt-24 pb-24 md:pb-20 md:pt-32">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label={portfolio.page.label}
            title={portfolio.page.title}
            subtitle={portfolio.page.subtitle}
          />
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <PortfolioFilter
            categories={portfolioCategories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </RevealAnimation>

        <div className="mt-10 space-y-8">
          {groups.map((group, i) => (
            <RevealAnimation key={group.id} delay={0.12 + i * 0.06}>
              <PortfolioCategoryCard group={group} />
            </RevealAnimation>
          ))}
        </div>

        {groups.length === 0 && (
          <p className="mt-10 text-center text-text-secondary">
            В этой категории пока нет проектов.
          </p>
        )}
      </div>
    </div>
  );
}
