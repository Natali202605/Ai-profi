"use client";

import { useState } from "react";
import { portfolioProjects, portfolioCategories } from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealAnimation } from "@/components/ui/RevealAnimation";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label="Портфолио"
            title="Все проекты"
            subtitle="Каждый проект — отдельная задача, атмосфера и визуальный язык."
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

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-text-secondary">
            В этой категории пока нет проектов.
          </p>
        )}
      </div>
    </div>
  );
}
