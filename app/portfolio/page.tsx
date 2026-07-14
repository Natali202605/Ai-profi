import { getPublishedPortfolioProjects } from "@/lib/portfolio-store";
import { portfolioProjects } from "@/data/portfolio";
import { PortfolioPageClient } from "@/components/portfolio/PortfolioPageClient";

export default async function PortfolioPage() {
  let projects = portfolioProjects;
  let loadError: string | null = null;

  try {
    projects = await getPublishedPortfolioProjects();
    if (!projects.length) {
      projects = portfolioProjects;
    }
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Ошибка загрузки";
    projects = portfolioProjects;
  }

  return <PortfolioPageClient initialProjects={projects} loadError={loadError} />;
}
