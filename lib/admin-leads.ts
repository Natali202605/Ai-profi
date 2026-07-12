import type { LeadFormData, ChatbotLeadData } from "./validation";
import { createLeadFromForm } from "./crm-store";

export type StoredLead = (LeadFormData | ChatbotLeadData) & {
  createdAt?: string;
};

/** @deprecated use crm-store */
export function pushLeadToMemory(data: LeadFormData | ChatbotLeadData) {
  void createLeadFromForm(data);
}

export { getLeadsLegacy as getLeadsForAdmin } from "./crm-store";
