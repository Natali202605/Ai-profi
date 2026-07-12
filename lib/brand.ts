/** Единый источник брендовых имён на сайте */
export const BRAND_NAME_DISPLAY = "НАТАЛИ СМИРНОВА";
export const PERSON_NAME = "Натали Смирнова";
export const PERSON_NAME_EN = "Natalia Smirnova";
export const BRAND_TAGLINE = "AI-специалист и художник";
export const PERSON_JOB_TITLE = "AI-специалист и художник";

export const LEGACY_NAMES = [
  "НАТАЛИ СМИРНОВА",
  "Натали Смирнова",
  "НАТАЛИ СМИРНОВА",
  "НАТАЛИ СМИРНОВА",
] as const;

export function replaceLegacyName(value: string): string {
  return value
    .replace(/НАТАЛИ СМИРНОВА/g, BRAND_NAME_DISPLAY)
    .replace(/Натали Смирнова/g, PERSON_NAME)
    .replace(/НАТАЛИ СМИРНОВА/g, PERSON_NAME_EN);
}
