import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { LeadFormData, ChatbotLeadData } from "@/lib/validation";
import { supabaseRest, isSupabaseReady } from "@/lib/supabase/rest";

export const PROJECT_STATUSES = [
  "new",
  "discussion",
  "tz_prep",
  "contract",
  "payment",
  "in_progress",
  "review",
  "completed",
  "testimonial",
] as const;

export type ProjectWorkflowStatus = (typeof PROJECT_STATUSES)[number];

export const PROJECT_STATUS_LABELS: Record<ProjectWorkflowStatus, string> = {
  new: "Новая заявка",
  discussion: "Обсуждение",
  tz_prep: "Подготовка ТЗ",
  contract: "Договор",
  payment: "Оплата",
  in_progress: "В работе",
  review: "Согласование",
  completed: "Завершён",
  testimonial: "Получен отзыв",
};

export type HistoryEntry = {
  id: string;
  at: string;
  action: string;
  detail?: string;
};

export type LeadRecord = {
  id: string;
  name: string;
  contact: string;
  email?: string;
  telegram?: string;
  vk?: string;
  projectUrl?: string;
  socialUrl?: string;
  service: string;
  description?: string;
  summary?: string;
  deadline?: string;
  budget?: string;
  referralSource?: string;
  attachmentName?: string;
  attachmentUrl?: string;
  status: ProjectWorkflowStatus;
  notes?: string;
  clientId?: string;
  source?: string;
  utmSource?: string;
  created_at: string;
  updated_at: string;
  history: HistoryEntry[];
};

export type ClientRecord = {
  id: string;
  name: string;
  contact: string;
  email?: string;
  telegram?: string;
  vk?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type ClientProjectRecord = {
  id: string;
  clientId: string;
  leadId?: string;
  title: string;
  service: string;
  status: ProjectWorkflowStatus;
  description?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  history: HistoryEntry[];
};

export type ProjectDocumentType =
  | "contract"
  | "technical_spec"
  | "invoice"
  | "payment_confirm"
  | "addendum"
  | "deliverable"
  | "other";

export const DOCUMENT_TYPE_LABELS: Record<ProjectDocumentType, string> = {
  contract: "Договор",
  technical_spec: "Техническое задание",
  invoice: "Счёт",
  payment_confirm: "Подтверждение оплаты",
  addendum: "Доп. соглашение",
  deliverable: "Итоговые материалы",
  other: "Другое",
};

export type ProjectDocumentRecord = {
  id: string;
  projectId: string;
  clientId: string;
  type: ProjectDocumentType;
  title: string;
  url: string;
  filename: string;
  created_at: string;
};

type CrmStore = {
  leads: LeadRecord[];
  clients: ClientRecord[];
  projects: ClientProjectRecord[];
  documents: ProjectDocumentRecord[];
};

const STORE_PATH = path.join(process.cwd(), "data", "crm-store.json");

function nowIso() {
  return new Date().toISOString();
}

function history(action: string, detail?: string): HistoryEntry {
  return { id: randomUUID(), at: nowIso(), action, detail };
}

async function readStore(): Promise<CrmStore> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as CrmStore;
  } catch {
    return { leads: [], clients: [], projects: [], documents: [] };
  }
}

async function writeStore(store: CrmStore) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

function clientKey(data: { contact: string; email?: string; name: string }) {
  const email = data.email?.trim().toLowerCase();
  const phone = data.contact.replace(/\D/g, "");
  return email || phone || data.name.trim().toLowerCase();
}

function upsertClient(store: CrmStore, data: LeadFormData | ChatbotLeadData): ClientRecord {
  const key = clientKey({
    name: data.name,
    contact: data.contact,
    email: "email" in data ? data.email : undefined,
  });
  const existing = store.clients.find(
    (client) =>
      clientKey({
        name: client.name,
        contact: client.contact,
        email: client.email,
      }) === key,
  );
  if (existing) {
    existing.name = data.name;
    existing.contact = data.contact;
    if ("email" in data && data.email) existing.email = data.email;
    if ("telegram" in data && data.telegram) existing.telegram = data.telegram;
    if ("vk" in data && data.vk) existing.vk = data.vk;
    existing.updated_at = nowIso();
    return existing;
  }

  const client: ClientRecord = {
    id: randomUUID(),
    name: data.name,
    contact: data.contact,
    email: "email" in data ? data.email || undefined : undefined,
    telegram: "telegram" in data ? data.telegram || undefined : undefined,
    vk: "vk" in data ? data.vk || undefined : undefined,
    created_at: nowIso(),
    updated_at: nowIso(),
  };
  store.clients.unshift(client);
  return client;
}

export async function createLeadFromForm(data: LeadFormData | ChatbotLeadData) {
  const store = await readStore();
  const client = upsertClient(store, data);
  const created_at = nowIso();
  const title =
    "description" in data && data.description
      ? data.description.slice(0, 80)
      : "summary" in data
        ? data.summary.slice(0, 80)
        : data.service;

  const lead: LeadRecord = {
    id: randomUUID(),
    name: data.name,
    contact: data.contact,
    email: "email" in data ? data.email || undefined : undefined,
    telegram: "telegram" in data ? data.telegram || undefined : undefined,
    vk: "vk" in data ? data.vk || undefined : undefined,
    projectUrl: "projectUrl" in data ? data.projectUrl || undefined : undefined,
    socialUrl: "socialUrl" in data ? data.socialUrl || undefined : undefined,
    service: data.service,
    description: "description" in data ? data.description : undefined,
    summary: "summary" in data ? data.summary : undefined,
    deadline: "deadline" in data ? data.deadline || undefined : undefined,
    budget: "budget" in data ? data.budget || undefined : undefined,
    referralSource: "referralSource" in data ? data.referralSource || undefined : undefined,
    attachmentName: "attachmentName" in data ? data.attachmentName || undefined : undefined,
    source: data.source,
    utmSource: data.utmSource,
    status: "new",
    clientId: client.id,
    created_at,
    updated_at: created_at,
    history: [history("Заявка создана", data.service)],
  };

  const project: ClientProjectRecord = {
    id: randomUUID(),
    clientId: client.id,
    leadId: lead.id,
    title,
    service: data.service,
    status: "new",
    description: lead.description || lead.summary,
    created_at,
    updated_at: created_at,
    history: [history("Проект создан из заявки")],
  };

  store.leads.unshift(lead);
  store.projects.unshift(project);
  await writeStore(store);

  if (isSupabaseReady()) {
    try {
      await supabaseRest("leads", {
        method: "POST",
        body: JSON.stringify({ ...lead, history: JSON.stringify(lead.history) }),
      });
    } catch {
      // local store is source of truth in dev
    }
  }

  return { lead, client, project };
}

export async function getLeadsForAdmin(status?: ProjectWorkflowStatus | "all") {
  const store = await readStore();
  let items = store.leads;
  if (status && status !== "all") {
    items = items.filter((item) => item.status === status);
  }
  return items.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getClientsForAdmin() {
  const store = await readStore();
  return store.clients.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export async function getClientById(clientId: string) {
  const store = await readStore();
  const client = store.clients.find((item) => item.id === clientId);
  if (!client) return null;

  return {
    client,
    leads: store.leads.filter((item) => item.clientId === clientId),
    projects: store.projects.filter((item) => item.clientId === clientId),
    documents: store.documents.filter((item) => item.clientId === clientId),
  };
}

export async function updateLead(
  id: string,
  patch: Partial<Pick<LeadRecord, "status" | "notes">>,
) {
  const store = await readStore();
  const index = store.leads.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const lead = store.leads[index];
  const entries = [...lead.history];
  if (patch.status && patch.status !== lead.status) {
    entries.unshift(
      history(
        "Статус изменён",
        `${PROJECT_STATUS_LABELS[lead.status]} → ${PROJECT_STATUS_LABELS[patch.status]}`,
      ),
    );
  }
  if (patch.notes !== undefined && patch.notes !== lead.notes) {
    entries.unshift(history("Обновлены заметки"));
  }

  store.leads[index] = {
    ...lead,
    ...patch,
    updated_at: nowIso(),
    history: entries,
  };

  const project = store.projects.find((item) => item.leadId === id);
  if (project && patch.status) {
    project.status = patch.status;
    project.updated_at = nowIso();
    project.history.unshift(history("Статус синхронизирован с заявкой", PROJECT_STATUS_LABELS[patch.status]));
  }

  await writeStore(store);
  return store.leads[index];
}

export async function updateClientProject(
  id: string,
  patch: Partial<Pick<ClientProjectRecord, "status" | "notes" | "title">>,
) {
  const store = await readStore();
  const index = store.projects.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const project = store.projects[index];
  const entries = [...project.history];
  if (patch.status && patch.status !== project.status) {
    entries.unshift(
      history(
        "Статус проекта",
        `${PROJECT_STATUS_LABELS[project.status]} → ${PROJECT_STATUS_LABELS[patch.status]}`,
      ),
    );
  }

  store.projects[index] = {
    ...project,
    ...patch,
    updated_at: nowIso(),
    history: entries,
  };

  if (patch.status && project.leadId) {
    const leadIndex = store.leads.findIndex((item) => item.id === project.leadId);
    if (leadIndex !== -1) {
      store.leads[leadIndex].status = patch.status;
      store.leads[leadIndex].updated_at = nowIso();
    }
  }

  await writeStore(store);
  return store.projects[index];
}

export async function addProjectDocument(input: {
  projectId: string;
  clientId: string;
  type: ProjectDocumentType;
  title: string;
  url: string;
  filename: string;
}) {
  const store = await readStore();
  const record: ProjectDocumentRecord = {
    id: randomUUID(),
    ...input,
    created_at: nowIso(),
  };
  store.documents.unshift(record);

  const project = store.projects.find((item) => item.id === input.projectId);
  if (project) {
    project.history.unshift(history("Добавлен документ", DOCUMENT_TYPE_LABELS[input.type]));
    project.updated_at = nowIso();
  }

  await writeStore(store);
  return record;
}

export async function deleteProjectDocument(id: string) {
  const store = await readStore();
  const before = store.documents.length;
  store.documents = store.documents.filter((item) => item.id !== id);
  if (store.documents.length === before) return false;
  await writeStore(store);
  return true;
}

export async function getProjectsForAdmin(status?: ProjectWorkflowStatus | "all") {
  const store = await readStore();
  let items = store.projects;
  if (status && status !== "all") {
    items = items.filter((item) => item.status === status);
  }
  return items.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export async function countNewLeads() {
  const leads = await getLeadsForAdmin("new");
  return leads.length;
}

/** Backward-compatible shape for dashboard */
export async function getLeadsLegacy() {
  const leads = await getLeadsForAdmin();
  return leads.map((lead) => ({
    name: lead.name,
    contact: lead.contact,
    email: lead.email,
    service: lead.service,
    description: lead.description,
    summary: lead.summary,
    createdAt: new Date(lead.created_at).toLocaleString("ru-RU"),
  }));
}
