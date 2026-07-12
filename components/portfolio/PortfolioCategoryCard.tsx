"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, ArrowUpRight } from "lucide-react";
import type { PortfolioCategoryGroup } from "@/data/portfolio";
import { trackEvent } from "@/lib/analytics";

type PortfolioCategoryCardProps = {
  group: PortfolioCategoryGroup;
};

export function PortfolioCategoryCard({ group }: PortfolioCategoryCardProps) {
  return (
    <article className="card-glass overflow-hidden">
      <div className="border-b border-border-subtle px-5 py-4 md:px-6">
        <h3 className="heading-display text-2xl text-white-text md:text-3xl">{group.label}</h3>
        <p className="mt-1 text-sm text-text-secondary">
          {group.works.length}{" "}
          {group.works.length === 1 ? "работа" : group.works.length < 5 ? "работы" : "работ"}
        </p>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 md:p-5 lg:grid-cols-3">
        {group.works.map((work) => (
          <Link
            key={work.slug}
            href={`/portfolio/${work.slug}`}
            className="group relative overflow-hidden rounded-xl border border-border-subtle bg-card-bg/40 transition-all hover:border-gold/35 hover:shadow-[0_8px_32px_rgba(164,148,255,0.12)]"
            onClick={() => trackEvent("project_open", { project: work.slug, category: group.id })}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={work.cover}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/75 via-transparent to-transparent" />
              {work.videoUrl && (
                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold/90 text-graphite">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-sm font-medium text-white-text group-hover:text-gold">
                {work.title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-text-secondary">{work.shortDescription}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
                Смотреть проект
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
