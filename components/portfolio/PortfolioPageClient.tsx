"use client";

import { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import {
  portfolioCategories,
  filterPortfolioProjects,
  type PortfolioProject,
  type PortfolioSort,
} from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { trackEvent } from "@/lib/analytics";

const sortOptions: { id: PortfolioSort; label: string }[] = [
  { id: "newest", label: "Сначала новые" },
  { id: "featured", label: "Сначала избранные" },
  { id: "category", label: "По категории" },
];

type PortfolioPageClientProps = {
  initialProjects: PortfolioProject[];
  loadError?: string | null;
};

function PortfolioPageContent({ initialProjects, loadError }: PortfolioPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<PortfolioSort>("newest");
  const [usedFallback, setUsedFallback] = useState(false);
  const { portfolio } = useSiteContent();

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  const handleCategoryChange = useCallback(
    (id: string) => {
      setActiveCategory(id);
      trackEvent("portfolio_filter", { category: id });
      const params = new URLSearchParams(searchParams.toString());
      if (id === "all") {
        params.delete("category");
      } else {
        params.set("category", id);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const { projects, fellBack } = useMemo(() => {
    const filtered = filterPortfolioProjects(
      { categoryId: activeCategory, query, sort, fallbackToAll: false },
      initialProjects,
    );
    if (
      filtered.length === 0 &&
      activeCategory !== "all" &&
      !query.trim() &&
      initialProjects.length > 0
    ) {
      return {
        projects: filterPortfolioProjects(
          { categoryId: "all", query: "", sort, fallbackToAll: false },
          initialProjects,
        ),
        fellBack: true,
      };
    }
    return { projects: filtered, fellBack: false };
  }, [activeCategory, query, sort, initialProjects]);

  useEffect(() => {
    setUsedFallback(fellBack);
  }, [fellBack]);

  const visibleCategories = useMemo(() => {
    const withWorks = new Set(initialProjects.map((p) => p.category));
    return portfolioCategories.filter(
      (cat) => cat.id === "all" || withWorks.has(cat.id as PortfolioProject["category"]),
    );
  }, [initialProjects]);

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

        {loadError && (
          <p className="mt-6 rounded-2xl border border-accent-lilac/30 bg-card-bg px-5 py-4 text-sm text-text-secondary">
            Не удалось обновить данные портфолио. Показаны сохранённые проекты. {loadError}
          </p>
        )}

        <RevealAnimation delay={0.08}>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <PortfolioFilter
              categories={visibleCategories}
              active={activeCategory}
              onChange={handleCategoryChange}
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

        {usedFallback && (
          <p className="mt-6 text-sm text-gold/90">
            В выбранной категории пока нет опубликованных проектов — показаны все работы.
          </p>
        )}

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

export function PortfolioPageClient(props: PortfolioPageClientProps) {
  return (
    <Suspense
      fallback={
        <div className="container-site flex min-h-[50vh] items-center justify-center pt-32">
          <div className="w-full max-w-4xl space-y-6" aria-busy="true" aria-label="Загрузка портфолио">
            <div className="h-10 w-2/3 animate-pulse rounded-xl bg-white/10" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <PortfolioPageContent {...props} />
    </Suspense>
  );
}
