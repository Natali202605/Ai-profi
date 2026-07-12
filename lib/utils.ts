import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BRAND_NAME_DISPLAY, BRAND_TAGLINE, PERSON_NAME } from "@/lib/brand";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const VK_PROFILE_URL = "https://vk.ru/id170079854";
export const VK_COMMUNITY_URL = "https://vk.com/natali_neero";
export const VK_REVIEWS_URL = "https://vk.com/topic-235128878_66094958";
export const SITE_NAME = BRAND_NAME_DISPLAY;
export const SITE_TAGLINE = BRAND_TAGLINE;
export const SPECIALIST_NAME = PERSON_NAME;
export const SPECIALIST_ROLES = "AI-специалист и художник";
export const SPECIALIST_PHOTO = "/images/natali-portrait.jpg";
