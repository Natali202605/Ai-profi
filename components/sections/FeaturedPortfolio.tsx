"use client";

import { useState } from "react";
import Link from "next/link";
import { getFeaturedProjects, portfolioCategories } from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedPortfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const projects = getFeaturedProjects();
  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            label="Портфолио"
            title="Избранные проекты"
            subtitle="В каждом проекте — своя задача, атмосфера и визуальный язык."
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
            Смотреть все проекты
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
}
