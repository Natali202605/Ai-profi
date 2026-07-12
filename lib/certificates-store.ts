import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { certificates as defaultCertificates } from "@/data/content";
import { supabaseRest, isSupabaseReady } from "@/lib/supabase/rest";

export type CertificateRecord = {
  id: string;
  title: string;
  organization: string;
  year: string;
  direction: string;
  description: string;
  image: string;
  verify_url?: string;
  visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CreateCertificateInput = {
  title: string;
  organization: string;
  year: string;
  direction: string;
  description: string;
  image: string;
  verify_url?: string;
  visible?: boolean;
  sort_order?: number;
};

const STORE_PATH = path.join(process.cwd(), "data", "certificates-store.json");

type LocalStore = { certificates: CertificateRecord[] };

function nowIso() {
  return new Date().toISOString();
}

function mapDefault(item: (typeof defaultCertificates)[0], index: number): CertificateRecord {
  return {
    id: item.id,
    title: item.title,
    organization: item.organization,
    year: item.year,
    direction: item.direction,
    description: item.description,
    image: item.image,
    visible: true,
    sort_order: index,
    created_at: nowIso(),
    updated_at: nowIso(),
  };
}

function mapRow(row: Record<string, unknown>): CertificateRecord {
  return {
    id: String(row.id),
    title: String(row.title || ""),
    organization: String(row.organization || ""),
    year: String(row.year || ""),
    direction: String(row.direction || ""),
    description: String(row.description || ""),
    image: String(row.image || ""),
    verify_url: row.verify_url ? String(row.verify_url) : undefined,
    visible: row.visible !== false,
    sort_order: Number(row.sort_order ?? 0),
    created_at: String(row.created_at || nowIso()),
    updated_at: String(row.updated_at || nowIso()),
  };
}

async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as LocalStore;
    if (parsed.certificates?.length) return parsed;
  } catch {
    // seed below
  }
  return { certificates: defaultCertificates.map(mapDefault) };
}

async function writeLocalStore(store: LocalStore) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function getCertificatesForAdmin(): Promise<CertificateRecord[]> {
  if (isSupabaseReady()) {
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(
      "certificates?select=*&order=sort_order.asc,created_at.desc&limit=100",
    );
    if (ok && data?.length) return data.map(mapRow);
  }

  const store = await readLocalStore();
  return store.certificates.sort((a, b) => a.sort_order - b.sort_order || b.created_at.localeCompare(a.created_at));
}

export async function getPublishedCertificates(): Promise<CertificateRecord[]> {
  const items = await getCertificatesForAdmin();
  return items.filter((item) => item.visible);
}

export async function createCertificate(input: CreateCertificateInput) {
  const created_at = nowIso();
  const payload = {
    title: input.title,
    organization: input.organization,
    year: input.year,
    direction: input.direction,
    description: input.description,
    image: input.image,
    verify_url: input.verify_url || null,
    visible: input.visible ?? true,
    sort_order: input.sort_order ?? 0,
    created_at,
    updated_at: created_at,
  };

  if (isSupabaseReady()) {
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>("certificates", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    });
    if (ok && data?.[0]) return mapRow(data[0]);
  }

  const store = await readLocalStore();
  const record: CertificateRecord = {
    id: randomUUID(),
    ...input,
    verify_url: input.verify_url,
    visible: input.visible ?? true,
    sort_order: input.sort_order ?? store.certificates.length,
    created_at,
    updated_at: created_at,
  };
  store.certificates.push(record);
  await writeLocalStore(store);
  return record;
}

export async function updateCertificate(
  id: string,
  patch: Partial<
    Pick<
      CertificateRecord,
      | "title"
      | "organization"
      | "year"
      | "direction"
      | "description"
      | "image"
      | "verify_url"
      | "visible"
      | "sort_order"
    >
  >,
) {
  const updated_at = nowIso();

  if (isSupabaseReady()) {
    const { data, ok } = await supabaseRest<Record<string, unknown>[]>(`certificates?id=eq.${id}`, {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ ...patch, updated_at }),
    });
    if (ok && data?.[0]) return mapRow(data[0]);
  }

  const store = await readLocalStore();
  const index = store.certificates.findIndex((item) => item.id === id);
  if (index === -1) return null;
  store.certificates[index] = { ...store.certificates[index], ...patch, updated_at };
  await writeLocalStore(store);
  return store.certificates[index];
}

export async function deleteCertificate(id: string) {
  if (isSupabaseReady()) {
    const { ok } = await supabaseRest(`certificates?id=eq.${id}`, { method: "DELETE" });
    if (ok) return true;
  }

  const store = await readLocalStore();
  const before = store.certificates.length;
  store.certificates = store.certificates.filter((item) => item.id !== id);
  if (store.certificates.length === before) return false;
  await writeLocalStore(store);
  return true;
}
