import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";
import { services } from "@/data/services";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://natali-neero.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/portfolio",
    "/services",
    "/contacts",
    "/privacy",
    "/consent",
    "/offer",
  ];

  const portfolioPages = portfolioProjects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
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
    ...servicePages,
  ];
}
