import bcrypt from "bcryptjs";
import { readFile } from "fs/promises";
import path from "path";
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";
const RESET_PURPOSE = "admin_password_reset";

export type AdminSession = {
  email: string;
  role: "admin";
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";
}

async function readStoredPasswordHash() {
  try {
    const filePath = path.join(process.cwd(), "data", ".admin-password-hash");
    return (await readFile(filePath, "utf8")).trim();
  } catch {
    return null;
  }
}

async function readSupabasePasswordHash() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/admin_auth?id=eq.1&select=password_hash`, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    const rows = (await response.json()) as Array<{ password_hash?: string }>;
    return rows[0]?.password_hash || null;
  } catch {
    return null;
  }
}

export async function getAdminPasswordHash(): Promise<string | null> {
  const stored = await readStoredPasswordHash();
  if (stored) return stored;

  const supabaseHash = await readSupabasePasswordHash();
  if (supabaseHash) return supabaseHash;

  if (process.env.ADMIN_PASSWORD_HASH) {
    return process.env.ADMIN_PASSWORD_HASH;
  }

  return null;
}

export async function verifyAdminPassword(password: string) {
  const hash = await getAdminPasswordHash();
  if (hash) {
    return bcrypt.compare(password, hash);
  }

  if (process.env.ADMIN_PASSWORD) {
    return password === process.env.ADMIN_PASSWORD;
  }

  return false;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function createSessionToken(email: string, remember: boolean) {
  const expiresIn = remember ? "30d" : "12h";
  return new SignJWT({ email, role: "admin" satisfies AdminSession["role"] })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getAuthSecret());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    if (payload.role !== "admin" || typeof payload.email !== "string") {
      return null;
    }
    return { email: payload.email, role: "admin" as const };
  } catch {
    return null;
  }
}

export async function createResetToken(email: string) {
  return new SignJWT({ email, purpose: RESET_PURPOSE })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(getAuthSecret());
}

export async function verifyResetToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    if (payload.purpose !== RESET_PURPOSE || typeof payload.email !== "string") {
      return null;
    }
    return payload.email.toLowerCase();
  } catch {
    return null;
  }
}

export { SESSION_COOKIE };

export function isAdminAuthConfigured() {
  return Boolean(
    process.env.AUTH_SECRET &&
      getAdminEmail() &&
      (process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH),
  );
}
