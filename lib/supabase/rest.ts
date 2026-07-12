type SupabaseKey = "anon" | "service";

export function isSupabaseReady() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getKey(key: SupabaseKey) {
  return key === "service"
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.SUPABASE_ANON_KEY;
}

export function supabaseHeaders(key: SupabaseKey, extra?: HeadersInit): HeadersInit {
  const apiKey = getKey(key);
  if (!apiKey) throw new Error("Supabase key is not configured");
  return {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function supabaseRest<T>(
  path: string,
  options: RequestInit & { key?: SupabaseKey } = {},
): Promise<{ data: T | null; ok: boolean; status: number }> {
  const base = process.env.SUPABASE_URL;
  if (!base) return { data: null, ok: false, status: 0 };

  const { key = "service", ...init } = options;
  const response = await fetch(`${base}/rest/v1/${path}`, {
    ...init,
    headers: supabaseHeaders(key, init.headers),
    cache: "no-store",
  });

  if (response.status === 204) {
    return { data: null, ok: response.ok, status: response.status };
  }

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : null;
  return { data, ok: response.ok, status: response.status };
}
