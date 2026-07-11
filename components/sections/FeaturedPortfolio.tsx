"use client";

import { useState } from "react";
import Link from "next/link";
import { getFeaturedProjects, portfolioCategories } from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function FeaturedPortfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { portfolio } = useSiteContent();
  const projects = getFeaturedProjects();
  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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

        <div className="mt-10 grid auto-rows-auto gap-5 md:grid-cols-2 lg:grid-cols-12">
          {filtered.map((project, i) => (
            <PortfolioCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <RevealAnimation className="mt-12 text-center">
          <Link href="/portfolio" className="btn-secondary">
            {portfolio.featured.ctaLabel}
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
}
