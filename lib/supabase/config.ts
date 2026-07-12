export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabasePublicConfig() {
  return {
    configured: isSupabaseConfigured(),
    url: process.env.SUPABASE_URL ? "Подключён" : "Не задан SUPABASE_URL",
  };
}
