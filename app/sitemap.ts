import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";
import { services } from "@/data/services";
import { getPublishedPortfolioProjects } from "@/lib/portfolio-store";
import { getPortfolioCategoriesMeta } from "@/lib/portfolio-categories-store";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://natali-neero.ru";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects = portfolioProjects;
  try {
    const published = await getPublishedPortfolioProjects();
    if (published.length) projects = published;
  } catch {
    /* seed */
  }

  const categories = await getPortfolioCategoriesMeta();

  const staticPages = [
    "",
    "/about",
    "/portfolio",
    "/services",
    "/contacts",
    "/reviews/new",
    "/privacy",
    "/consent",
    "/offer",
  ];

  const portfolioPages = projects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${baseUrl}/portfolio/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...portfolioPages,
    ...categoryPages,
    ...servicePages,
  ];
}
