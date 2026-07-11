import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { buildDefaultSiteContent } from "@/lib/site-content-defaults";
import type { SiteContent } from "@/lib/site-content-types";

const OVERRIDES_PATH = path.join(process.cwd(), "data", "site-overrides.json");

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeContent(base: SiteContent, patch: Partial<SiteContent>): SiteContent {
  const result = structuredClone(base);

  for (const key of Object.keys(patch) as (keyof SiteContent)[]) {
    const patchValue = patch[key];
    if (patchValue === undefined) continue;

    const baseValue = result[key];
    if (Array.isArray(patchValue)) {
      result[key] = patchValue as SiteContent[typeof key];
      continue;
    }

    if (isObject(patchValue) && isObject(baseValue)) {
      result[key] = { ...baseValue, ...patchValue } as SiteContent[typeof key];
      continue;
    }

    result[key] = patchValue as SiteContent[typeof key];
  }

  return result;
}

async function readOverridesFile(): Promise<Partial<SiteContent> | null> {
  try {
    const raw = await readFile(OVERRIDES_PATH, "utf8");
    return JSON.parse(raw) as Partial<SiteContent>;
  } catch {
    return null;
  }
}

async function readSupabaseOverrides(): Promise<Partial<SiteContent> | null> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/site_content?id=eq.1&select=content`, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    const rows = (await response.json()) as Array<{ content?: Partial<SiteContent> }>;
    return rows[0]?.content || null;
  } catch {
    return null;
  }
}

async function writeSupabaseOverrides(content: SiteContent) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return false;
  }

  const headers = {
    "Content-Type": "application/json",
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    Prefer: "return=minimal",
  };

  const patchResponse = await fetch(`${process.env.SUPABASE_URL}/rest/v1/site_content?id=eq.1`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      content,
      updated_at: new Date().toISOString(),
    }),
  });

  if (patchResponse.ok) return true;

  const insertResponse = await fetch(`${process.env.SUPABASE_URL}/rest/v1/site_content`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id: 1,
      content,
      updated_at: new Date().toISOString(),
    }),
  });

  return insertResponse.ok;
}

export async function getSiteContent(): Promise<SiteContent> {
  const defaults = buildDefaultSiteContent();
  const supabaseOverrides = await readSupabaseOverrides();
  const fileOverrides = await readOverridesFile();
  const overrides = supabaseOverrides || fileOverrides;

  if (!overrides) return defaults;
  return mergeContent(defaults, overrides);
}

export async function saveSiteContent(content: SiteContent) {
  await mkdir(path.dirname(OVERRIDES_PATH), { recursive: true });
  await writeFile(OVERRIDES_PATH, JSON.stringify(content, null, 2), "utf8");

  const savedToSupabase = await writeSupabaseOverrides(content);
  return { savedToSupabase };
}
