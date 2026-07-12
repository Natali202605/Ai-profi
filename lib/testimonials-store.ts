import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { supabaseRest, isSupabaseReady } from "@/lib/supabase/rest";
import type { Review } from "@/data/content";

export type TestimonialRecord = {
  id: string;
  name: string;
  email?: string;
  company?: string;
  role?: string;
  service: string;
  rating: number;
  full_text: string;
  status: "pending" | "published" | "rejected";
  is_featured: boolean;
  is_verified: boolean;
  consent_publication: boolean;
  consent_processing: boolean;
  admin_reply?: string;
  created_at: string;
  updated_at: string;
};

export type CreateTestimonialInput = {
  name: string;
  email?: string;
  company?: string;
  role?: string;
  service: string;
  rating: number;
  full_text: string;
  consent_publication: boolean;
  consent_processing: boolean;
};

const STORE_PATH = path.join(process.cwd(), "data", "testimonials-store.json");

type LocalStore = { testimonials: TestimonialRecord[] };

async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as LocalStore;
  } catch {
    return { testimonials: [] };
  }
}

async function writeLocalStore(store: LocalStore) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

function mapRow(row: Record<string, unknown>): TestimonialRecord {
  return {
    id: String(row.id),
    name: String(row.name || ""),
    email: row.email ? String(row.email) : undefined,
    company: row.company ? String(row.company) : undefined,
    role: row.role ? String(row.role) : undefined,
    service: String(row.service || ""),
    rating: Number(row.rating || 5),
    full_text: String(row.full_text || ""),
    status: (row.status as TestimonialRecord["status"]) || "pending",
    is_featured: Boolean(row.is_featured),
    is_verified: Boolean(row.is_verified),
    consent_publication: Boolean(row.consent_publication),
    consent_processing: Boolean(row.consent_processing),
    admin_reply: row.admin_reply ? String(row.admin_reply) : undefined,
    created_at: String(row.created_at || new Date().toISOString()),
    updated_at: String(row.updated_at || new Date().toISOString()),
  };
}

export function testimonialToReview(record: TestimonialRecord): Review {
  return {
    id: record.id,
    name: record.name,
    role: record.role || record.company || "Клиент",
    text: record.full_text,
    service: record.service,
    visible: record.status === "published",
  };
}

export async function createTestimonial(input: CreateTestimonialInput) {
  const now = new Date().toISOString();
  const payload = {
    name: input.name,
    email: input.email || null,
    company: input.company || null,
    role: input.role || null,
    service: input.service,
    rating: input.rating,
    full_text: input.full_text,
    status: "pending",
    is_featured: false,
    is_verified: false,
    consent_publication: input.consent_publication,
    consent_processing: input.consent_processing,
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseReady()) {
    const { data, ok } = await supabaseRest<TestimonialRecord[]>("testimonials", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    });
    if (ok && data?.[0]) return mapRow(data[0] as unknown as Record<string, unknown>);
  }

  const store = await readLocalStore();
  const record: TestimonialRecord = {
    id: randomUUID(),
    ...input,
    status: "pending",
    is_featured: false,
    is_verified: false,
    created_at: now,
    updated_at: now,
  };
  store.testimonials.unshift(record);
  await writeLocalStore(store);
  return record;
}

export async function getTestimonialsForAdmin(status?: string) {
  if (isSupabaseReady()) {
    const filter = status && status !== "all" ? `&status=eq.${status}` : "";
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(
      `testimonials?select=*&order=created_at.desc&limit=100${filter}`,
    );
    if (ok && data) return data.map(mapRow);
  }

  const store = await readLocalStore();
  let items = store.testimonials;
  if (status && status !== "all") {
    items = items.filter((item) => item.status === status);
  }
  return items.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getPublishedTestimonials() {
  if (isSupabaseReady()) {
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(
      "testimonials?select=*&status=eq.published&order=is_featured.desc,created_at.desc&limit=20",
    );
    if (ok && data) return data.map(mapRow);
  }

  const store = await readLocalStore();
  return store.testimonials
    .filter((item) => item.status === "published")
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || b.created_at.localeCompare(a.created_at));
}

export async function updateTestimonial(
  id: string,
  patch: Partial<
    Pick<TestimonialRecord, "status" | "is_featured" | "is_verified" | "admin_reply">
  >,
) {
  const updated_at = new Date().toISOString();

  if (isSupabaseReady()) {
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(
      `testimonials?id=eq.${id}`,
      {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ ...patch, updated_at }),
      },
    );
    if (ok && data?.[0]) return mapRow(data[0]);
  }

  const store = await readLocalStore();
  const index = store.testimonials.findIndex((item) => item.id === id);
  if (index === -1) return null;
  store.testimonials[index] = {
    ...store.testimonials[index],
    ...patch,
    updated_at,
  };
  await writeLocalStore(store);
  return store.testimonials[index];
}

export async function countPendingTestimonials() {
  const items = await getTestimonialsForAdmin("pending");
  return items.length;
}
