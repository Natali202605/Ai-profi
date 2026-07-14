import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { portfolioCategories } from "@/data/portfolio";

export type PortfolioCategoryMeta = {
  id: string;
  label: string;
  slug: string;
  description: string;
  cover?: string;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
};

const CATEGORIES_PATH = path.join(process.cwd(), "data", "portfolio-categories.json");

function defaultCategories(): PortfolioCategoryMeta[] {
  return portfolioCategories
    .filter((c) => c.id !== "all")
    .map((c, index) => ({
      id: c.id,
      label: c.label,
      slug: c.id,
      description: "",
      order: index,
      seoTitle: `${c.label} — портфолио Натали Смирновой`,
      seoDescription: `Проекты в категории «${c.label}»: AI-визуалы и digital-решения.`,
    }));
}

async function readCategoriesFile(): Promise<PortfolioCategoryMeta[] | null> {
  try {
    const raw = await readFile(CATEGORIES_PATH, "utf8");
    const data = JSON.parse(raw) as PortfolioCategoryMeta[];
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export async function getPortfolioCategoriesMeta(): Promise<PortfolioCategoryMeta[]> {
  const stored = await readCategoriesFile();
  if (stored?.length) {
    return [...stored].sort((a, b) => a.order - b.order);
  }
  return defaultCategories();
}

export async function savePortfolioCategoriesMeta(items: PortfolioCategoryMeta[]) {
  await mkdir(path.dirname(CATEGORIES_PATH), { recursive: true });
  const normalized = items.map((item, index) => ({
    ...item,
    order: typeof item.order === "number" ? item.order : index,
  }));
  await writeFile(CATEGORIES_PATH, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}
