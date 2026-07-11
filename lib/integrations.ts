import type { LeadFormData, ChatbotLeadData } from "./validation";
import { pushLeadToMemory } from "./admin-leads";

type LeadPayload = LeadFormData | ChatbotLeadData;

export async function saveLead(data: LeadPayload) {
  pushLeadToMemory(data);

  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    try {
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          ...data,
          created_at: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Supabase save error:", error);
    }
  }

  await notifyOwner(data);
  return { success: true };
}

async function notifyOwner(data: LeadPayload) {
  const message = formatLeadMessage(data);

  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );
    } catch (error) {
      console.error("Telegram notification error:", error);
    }
  }

  if (process.env.RESEND_API_KEY && process.env.OWNER_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Заявки <onboarding@resend.dev>",
          to: process.env.OWNER_EMAIL,
          subject: "Новая заявка с сайта NATALI NEERO",
          text: message.replace(/<[^>]*>/g, ""),
        }),
      });
    } catch (error) {
      console.error("Email notification error:", error);
    }
  }
}

function formatLeadMessage(data: LeadPayload): string {
  const lines = [
    "<b>Новая заявка с сайта</b>",
    `Имя: ${data.name}`,
    `Контакт: ${data.contact}`,
    `Услуга: ${data.service}`,
  ];

  if ("description" in data) {
    lines.push(`Описание: ${data.description}`);
    if (data.deadline) lines.push(`Срок: ${data.deadline}`);
    if (data.budget) lines.push(`Бюджет: ${data.budget}`);
    if (data.projectUrl) lines.push(`Ссылка: ${data.projectUrl}`);
  }

  if ("summary" in data) {
    lines.push(`Резюме: ${data.summary}`);
  }

  if (data.source) lines.push(`Источник: ${data.source}`);
  if (data.utmSource) lines.push(`UTM source: ${data.utmSource}`);

  lines.push(`Дата: ${new Date().toLocaleString("ru-RU")}`);

  return lines.join("\n");
}

export function checkRateLimit(ip: string): boolean {
  return true;
}
