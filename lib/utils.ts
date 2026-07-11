import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const VK_PROFILE_URL = "https://vk.ru/id170079854";
export const VK_COMMUNITY_URL = "https://vk.com/natali_neero";
export const SITE_NAME = "NATALI NEERO";
export const SITE_TAGLINE = "AI-специалист • визуальные решения • 10+ лет опыта";
