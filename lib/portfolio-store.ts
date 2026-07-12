import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  portfolioProjects,
  type PortfolioProject,
  type PortfolioCategory,
} from "@/data/portfolio";
import { supabaseRest, isSupabaseReady } from "@/lib/supabase/rest";

export type AdminPortfolioProject = PortfolioProject & {
  id?: string;
  status: "draft" | "published";
  source: "static" | "admin" | "supabase";
};

const OVERRIDES_PATH = path.join(process.cwd(), "data", "portfolio-overrides.json");

type PortfolioOverrides = {
  projects: AdminPortfolioProject[];
  hiddenSlugs: string[];
};

async function readOverrides(): Promise<PortfolioOverrides> {
  try {
    const raw = await readFile(OVERRIDES_PATH, "utf8");
    return JSON.parse(raw) as PortfolioOverrides;
  } catch {
    return { projects: [], hiddenSlugs: [] };
  }
}

async function writeOverrides(data: PortfolioOverrides) {
  await mkdir(path.dirname(OVERRIDES_PATH), { recursive: true });
  await writeFile(OVERRIDES_PATH, JSON.stringify(data, null, 2), "utf8");
}

function mapSupabaseProject(row: Record<string, unknown>): AdminPortfolioProject {
  const services = Array.isArray(row.services) ? (row.services as string[]) : [];
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    category: (row.category_id as PortfolioCategory) || "video",
    categoryLabel: String(row.category_id || "Проект"),
    shortDescription: String(row.short_description || ""),
    task: String(row.task || ""),
    solution: String(row.concept || row.result || row.full_description || ""),
    services,
    cover: String(row.cover || "/images/bg-watercolor.png"),
    images: [String(row.cover || "/images/bg-watercolor.png")],
    videoUrl: row.video_url ? String(row.video_url) : undefined,
    client: row.client ? String(row.client) : undefined,
    year: row.year ? String(row.year) : undefined,
    featured: Boolean(row.is_featured),
    status: row.status === "published" ? "published" : "draft",
    source: "supabase",
  };
}

export async function getAllPortfolioProjectsForAdmin(): Promise<AdminPortfolioProject[]> {
  const overrides = await readOverrides();
  const staticItems: AdminPortfolioProject[] = portfolioProjects.map((project) => ({
    ...project,
    status: overrides.hiddenSlugs.includes(project.slug) ? "draft" : "published",
    source: "static" as const,
  }));

  if (isSupabaseReady()) {
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(
      "portfolio_projects?select=*&order=created_at.desc",
    );
    if (ok && data?.length) {
      const supabaseItems = data.map(mapSupabaseProject);
      const slugs = new Set(supabaseItems.map((item) => item.slug));
      return [...supabaseItems, ...staticItems.filter((item) => !slugs.has(item.slug)), ...overrides.projects];
    }
  }

  return [...overrides.projects, ...staticItems];
}

export async function getPublishedPortfolioProjects(): Promise<PortfolioProject[]> {
  const all = await getAllPortfolioProjectsForAdmin();
  return all.filter((project) => project.status === "published");
}

export type CreatePortfolioProjectInput = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  shortDescription: string;
  task: string;
  solution: string;
  cover: string;
  services: string[];
  featured?: boolean;
  status?: "draft" | "published";
};

export async function createPortfolioProject(input: CreatePortfolioProjectInput) {
  const now = new Date().toISOString();

  if (isSupabaseReady()) {
    const payload = {
      slug: input.slug,
      title: input.title,
      category_id: input.category,
      short_description: input.shortDescription,
      task: input.task,
      concept: input.solution,
      services: input.services,
      cover: input.cover,
      status: input.status || "draft",
      is_featured: input.featured ?? false,
      created_at: now,
      updated_at: now,
    };
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>("portfolio_projects", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    });
    if (ok && data?.[0]) return mapSupabaseProject(data[0]);
  }

  const overrides = await readOverrides();
  const project: AdminPortfolioProject = {
    id: randomUUID(),
    slug: input.slug,
    title: input.title,
    category: input.category,
    categoryLabel: input.categoryLabel,
    shortDescription: input.shortDescription,
    task: input.task,
    solution: input.solution,
    services: input.services,
    cover: input.cover,
    images: [input.cover],
    featured: input.featured ?? false,
    status: input.status || "draft",
    source: "admin",
  };
  overrides.projects.unshift(project);
  await writeOverrides(overrides);
  return project;
}

export async function updatePortfolioProject(
  identifier: { id?: string; slug?: string },
  patch: Partial<Pick<AdminPortfolioProject, "status" | "featured" | "title" | "shortDescription">>,
) {
  if (identifier.id && isSupabaseReady()) {
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(
      `portfolio_projects?id=eq.${identifier.id}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({
          status: patch.status,
          is_featured: patch.featured,
          title: patch.title,
          short_description: patch.shortDescription,
          updated_at: new Date().toISOString(),
        }),
      },
    );
    if (ok && data?.[0]) return mapSupabaseProject(data[0]);
  }

  if (identifier.slug) {
    const overrides = await readOverrides();
    const staticProject = portfolioProjects.find((item) => item.slug === identifier.slug);
    if (staticProject && patch.status === "draft") {
      if (!overrides.hiddenSlugs.includes(identifier.slug)) {
        overrides.hiddenSlugs.push(identifier.slug);
      }
      await writeOverrides(overrides);
      return { ...staticProject, status: "draft" as const, source: "static" as const };
    }
    if (staticProject && patch.status === "published") {
      overrides.hiddenSlugs = overrides.hiddenSlugs.filter((slug) => slug !== identifier.slug);
      await writeOverrides(overrides);
      return { ...staticProject, status: "published" as const, source: "static" as const };
    }

    const index = overrides.projects.findIndex(
      (item) => item.id === identifier.id || item.slug === identifier.slug,
    );
    if (index !== -1) {
      overrides.projects[index] = { ...overrides.projects[index], ...patch };
      await writeOverrides(overrides);
      return overrides.projects[index];
    }
  }

  return null;
}
