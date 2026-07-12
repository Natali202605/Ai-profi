"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolio";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type PortfolioCardProps = {
  project: PortfolioProject;
  index?: number;
};

const layoutClasses: Record<string, string> = {
  large: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  wide: "md:col-span-2 lg:col-span-12",
  tall: "lg:col-span-5 lg:row-span-2",
  medium: "lg:col-span-5",
};

export function PortfolioCard({ project, index = 0 }: PortfolioCardProps) {
  const layout = project.layout || (index % 3 === 0 ? "large" : "medium");
  const isLarge = layout === "large" || layout === "tall" || layout === "wide";

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "portfolio-card-touch group relative overflow-hidden rounded-2xl border border-border-subtle bg-card-bg",
        layoutClasses[layout] || "lg:col-span-5"
      )}
      onClick={() => trackEvent("project_open", { project: project.slug })}
    >
      <div className={cn("relative w-full", isLarge ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 via-indigo-deep/20 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <span className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">
          {project.categoryLabel}
        </span>
        <h3
          className={cn(
            "heading-display text-white-text transition-colors group-hover:text-gold",
            isLarge ? "text-2xl md:text-3xl" : "text-xl"
          )}
        >
          {project.title}
        </h3>
        <p className="portfolio-card-desc mt-2 line-clamp-2 text-sm text-text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.shortDescription}
        </p>
        <div className="portfolio-card-cta mt-3 flex items-center gap-2 text-sm text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
          Смотреть проект
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[inset_0_0_60px_rgba(164,148,255,0.15)] transition-opacity group-hover:opacity-100" />
    </Link>
  );
}
