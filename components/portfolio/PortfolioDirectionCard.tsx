"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import type { PortfolioDirection } from "@/data/portfolio";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type PortfolioDirectionCardProps = {
  direction: PortfolioDirection;
  className?: string;
};

export function PortfolioDirectionCard({ direction, className }: PortfolioDirectionCardProps) {
  const projectLabel =
    direction.projectCount === 1
      ? "1 проект"
      : direction.projectCount < 5
        ? `${direction.projectCount} проекта`
        : `${direction.projectCount} проектов`;

  return (
    <Link
      href={`/portfolio?category=${direction.id}`}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-border-subtle bg-card-bg/50",
        className,
      )}
      onClick={() =>
        trackEvent("portfolio_direction_open", {
          category: direction.id,
          source: "home_directions",
        })
      }
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          direction.layout === "wide" ? "aspect-[21/9]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={direction.cover}
          alt={direction.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="portfolio-card-overlay absolute inset-0 transition-opacity duration-500 group-hover:opacity-100" />
        {direction.videoUrl && (
          <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gold/90 text-graphite opacity-90 transition-opacity group-hover:opacity-100">
            <Play className="h-4 w-4 fill-current" />
          </span>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
        <span className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#bcdcff]">
          {direction.categoryLabel}
        </span>
        <h3 className="heading-display text-2xl font-semibold text-white transition-colors group-hover:text-gold md:text-3xl">
          {direction.title}
        </h3>
        <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/76 md:text-base">
          {direction.description}
        </p>
        <p className="mt-3 text-sm font-medium text-white/76">{projectLabel}</p>
        <span className="portfolio-card-cta">
          Посмотреть работы
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
