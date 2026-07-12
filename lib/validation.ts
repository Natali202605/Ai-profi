import { z } from "zod";

export const serviceOptions = [
  "AI-видео",
  "AI-изображения",
  "Сайт",
  "Чат-бот",
  "Оформление ВКонтакте",
  "Развитие сообщества",
  "Комплексная упаковка",
  "Консультация",
  "Другое",
] as const;

export const referralOptions = [
  "ВКонтакте",
  "Поисковая система",
  "Рекомендация",
  "Социальные сети",
  "Другое",
] as const;

export const leadFormSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  contact: z.string().min(5, "Укажите телефон или мессенджер"),
  projectUrl: z.string().url("Укажите корректную ссылку").optional().or(z.literal("")),
  service: z.enum(serviceOptions, { required_error: "Выберите услугу" }),
  description: z.string().min(10, "Опишите задачу подробнее"),
  deadline: z.string().optional(),
  budget: z.string().optional(),
  referralSource: z.enum(referralOptions).optional().or(z.literal("")),
  attachmentName: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку данных" }),
  }),
  honeypot: z.string().max(0).optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  source: z.string().optional(),
  brief_goal: z.string().optional(),
  brief_duration: z.string().optional(),
  brief_platform: z.string().optional(),
  brief_count: z.string().optional(),
  brief_format: z.string().optional(),
  brief_purpose: z.string().optional(),
  brief_type: z.string().optional(),
  brief_pages: z.string().optional(),
  brief_functions: z.string().optional(),
  brief_vk_link: z.string().optional(),
  brief_vk_theme: z.string().optional(),
  brief_vk_goal: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const chatbotLeadSchema = z.object({
  name: z.string().min(2),
  contact: z.string().min(5),
  service: z.string(),
  summary: z.string(),
  consent: z.literal(true),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  source: z.literal("chatbot"),
});

export type ChatbotLeadData = z.infer<typeof chatbotLeadSchema>;

export const reviewFormSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  email: z.string().email("Укажите корректный email").optional().or(z.literal("")),
  company: z.string().optional(),
  role: z.string().optional(),
  service: z.enum(serviceOptions, { required_error: "Выберите услугу" }),
  rating: z.coerce.number().int().min(1, "Минимум 1").max(5, "Максимум 5"),
  full_text: z.string().min(20, "Напишите отзыв подробнее"),
  consent_publication: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на публикацию" }),
  }),
  consent_processing: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку данных" }),
  }),
  honeypot: z.string().max(0).optional(),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;
