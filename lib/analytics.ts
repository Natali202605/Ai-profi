export type AnalyticsEvent =
  | "hero_cta_click"
  | "portfolio_open"
  | "service_select"
  | "lead_form_start"
  | "lead_form_submit"
  | "chatbot_open"
  | "vk_profile_click"
  | "vk_community_click"
  | "video_play"
  | "scroll_depth";

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;

  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (ymId && typeof window.ym === "function") {
    window.ym(Number(ymId), "reachGoal", event, params);
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event, params);
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  const mapping: Record<string, string> = {
    utm_source: "utmSource",
    utm_medium: "utmMedium",
    utm_campaign: "utmCampaign",
    utm_content: "utmContent",
    utm_term: "utmTerm",
  };
  Object.entries(mapping).forEach(([param, key]) => {
    const value = params.get(param);
    if (value) utm[key] = value;
  });
  return utm;
}

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}
