import type { LeadFormData, ChatbotLeadData } from "./validation";

export type StoredLead = (LeadFormData | ChatbotLeadData) & {
  createdAt?: string;
};

const leadsStore: StoredLead[] = [];

export function pushLeadToMemory(data: LeadFormData | ChatbotLeadData) {
  leadsStore.unshift({
    ...data,
    createdAt: new Date().toLocaleString("ru-RU"),
  });
}

export async function getLeadsForAdmin(): Promise<StoredLead[]> {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const response = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc&limit=50`,
        {
          headers: {
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
          cache: "no-store",
        },
      );

      if (response.ok) {
        const rows = (await response.json()) as Array<Record<string, unknown>>;
        return rows.map((row) => ({
          name: String(row.name || ""),
          contact: String(row.contact || ""),
          service: String(row.service || ""),
          description: typeof row.description === "string" ? row.description : undefined,
          summary: typeof row.summary === "string" ? row.summary : undefined,
          createdAt:
            typeof row.created_at === "string"
              ? new Date(row.created_at).toLocaleString("ru-RU")
              : undefined,
        }));
      }
    } catch {
      // fallback to memory
    }
  }

  return leadsStore;
}
