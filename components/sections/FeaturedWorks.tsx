"use client";

import Link from "next/link";
import { getFeaturedProjects } from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function FeaturedWorks() {
  const { portfolio } = useSiteContent();
  const projects = getFeaturedProjects().slice(0, 4);

  return (
    <section id="portfolio" className="section-light py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            label="Избранное"
            title={portfolio.featured.title}
            subtitle={portfolio.featured.subtitle}
          />
        </RevealAnimation>

        <div className="grid auto-rows-auto gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-12">
          {projects.map((project, index) => (
            <RevealAnimation key={project.slug} delay={0.08 + index * 0.05} className="h-full">
              <PortfolioCard project={project} index={index} />
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation className="mt-12 text-center" delay={0.2}>
          <Link href="/portfolio" className="btn-secondary">
            {portfolio.featured.ctaLabel}
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
}
