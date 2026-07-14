import Link from "next/link";
import { getPublishedPortfolioProjects } from "@/lib/portfolio-store";
import { getFeaturedProjects, portfolioProjects } from "@/data/portfolio";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { RevealAnimation } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function FeaturedWorks() {
  let source = portfolioProjects;
  try {
    const published = await getPublishedPortfolioProjects();
    if (published.length) source = published;
  } catch {
    /* seed fallback */
  }

  const projects = getFeaturedProjects(source).slice(0, 4);

  return (
    <section id="portfolio" className="section-light py-16 md:py-28">
      <div className="container-site">
        <RevealAnimation>
          <SectionHeading
            light
            label="Избранное"
            title="Избранные проекты"
            titleAccent="проекты"
            subtitle="Ключевые работы с художественной концепцией и коммерческой задачей."
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
            Смотреть всё портфолио
          </Link>
        </RevealAnimation>
      </div>
    </section>
  );
}
