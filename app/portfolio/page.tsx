"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  portfolioCategories,
  filterPortfolioProjects,
  type PortfolioSort,
} from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const sortOptions: { id: PortfolioSort; label: string }[] = [
  { id: "newest", label: "Сначала новые" },
  { id: "featured", label: "Сначала избранные" },
  { id: "category", label: "По категории" },
];

function PortfolioPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<PortfolioSort>("newest");
  const { portfolio } = useSiteContent();

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  const projects = useMemo(
    () => filterPortfolioProjects({ categoryId: activeCategory, query, sort }),
    [activeCategory, query, sort],
  );

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

        <RevealAnimation delay={0.08}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <PortfolioFilter
              categories={portfolioCategories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative block min-w-[240px] flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Поиск по названию, услуге, теме..."
                  className="glass-input w-full pl-11"
                />
              </label>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as PortfolioSort)}
                className="glass-input min-h-11"
                aria-label="Сортировка проектов"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </RevealAnimation>

        <div className="mt-10 grid auto-rows-auto gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-12">
          {projects.map((project, index) => (
            <RevealAnimation key={project.slug} delay={0.1 + index * 0.04} className="h-full">
              <PortfolioCard project={project} index={index} />
            </RevealAnimation>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="mt-10 text-center text-text-secondary">
            По вашему запросу проекты не найдены. Попробуйте изменить фильтр или поиск.
          </p>
        )}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="container-site flex min-h-[50vh] items-center justify-center pt-32 text-text-secondary">
          Загрузка портфолио...
        </div>
      }
    >
      <PortfolioPageContent />
    </Suspense>
  );
}
