import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  filterPortfolioProjects,
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
} from "@/data/portfolio";
import { getPublishedPortfolioProjects } from "@/lib/portfolio-store";
import { getPortfolioCategoriesMeta } from "@/lib/portfolio-categories-store";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealAnimation } from "@/components/ui/RevealAnimation";

type Props = { params: Promise<{ category: string }> };

const staticIds = portfolioCategories.filter((c) => c.id !== "all").map((c) => c.id);

export async function generateStaticParams() {
  const meta = await getPortfolioCategoriesMeta();
  const ids = new Set([...staticIds, ...meta.map((c) => c.slug)]);
  return [...ids].map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = await getPortfolioCategoriesMeta();
  const match = meta.find((c) => c.slug === category || c.id === category);
  const label =
    match?.label || portfolioCategories.find((c) => c.id === category)?.label || category;

  return {
    title: match?.seoTitle || `${label} — портфолио`,
    description:
      match?.seoDescription ||
      `Работы Натали Смирновой в категории «${label}»: AI-визуалы, видео и digital-проекты.`,
    openGraph: {
      title: match?.seoTitle || `${label} — портфолио`,
      description: match?.seoDescription || `Кейсы в категории «${label}».`,
    },
  };
}

export default async function PortfolioCategoryPage({ params }: Props) {
  const { category } = await params;
  const metaList = await getPortfolioCategoriesMeta();
  const match = metaList.find((c) => c.slug === category || c.id === category);
  const categoryId = (match?.id || category) as PortfolioCategory | string;

  if (
    categoryId !== "all" &&
    !staticIds.includes(categoryId as (typeof staticIds)[number]) &&
    !match
  ) {
    notFound();
  }

  let source = portfolioProjects;
  try {
    const published = await getPublishedPortfolioProjects();
    if (published.length) source = published;
  } catch {
    /* seed */
  }

  const projects = filterPortfolioProjects(
    { categoryId: String(categoryId), fallbackToAll: false },
    source,
  );

  const label =
    match?.label ||
    portfolioCategories.find((c) => c.id === categoryId)?.label ||
    category;

  return (
    <div className="pt-24 pb-24 md:pb-20 md:pt-32">
      <div className="container-site">
        <nav className="mb-6 text-sm text-text-secondary">
          <Link href="/" className="hover:text-gold">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href="/portfolio" className="hover:text-gold">
            Портфолио
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">{label}</span>
        </nav>

        <RevealAnimation>
          <SectionHeading
            label="Портфолио"
            title={label}
            subtitle={
              match?.description ||
              `Проекты в категории «${label}». Каждый кейс раскрывает задачу, концепцию и результат.`
            }
          />
        </RevealAnimation>

        {projects.length === 0 ? (
          <p className="mt-10 text-center text-text-secondary">
            В этой категории пока нет опубликованных проектов.{" "}
            <Link href="/portfolio" className="text-gold hover:underline">
              Смотреть все работы
            </Link>
          </p>
        ) : (
          <div className="mt-10 grid auto-rows-auto gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-12">
            {projects.map((project, index) => (
              <RevealAnimation key={project.slug} delay={0.08 + index * 0.04} className="h-full">
                <PortfolioCard project={project} index={index} />
              </RevealAnimation>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
