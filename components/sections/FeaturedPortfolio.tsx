"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioCategories, getPortfolioCategoryGroups } from "@/data/portfolio";
import { PortfolioCategoryCard } from "@/components/portfolio/PortfolioCategoryCard";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function FeaturedPortfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { portfolio } = useSiteContent();
  const groups = getPortfolioCategoryGroups({
    featuredOnly: true,
    categoryId: activeCategory,
  });

  return (
    <section id="portfolio" className="py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label={portfolio.featured.label}
            title={portfolio.featured.title}
            subtitle={portfolio.featured.subtitle}
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

        <RevealAnimation className="mt-12 text-center">
          <Link href="/portfolio" className="btn-secondary">
            {portfolio.featured.ctaLabel}
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
}
