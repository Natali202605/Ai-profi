import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import {
  hashPassword,
  verifyAdminPassword,
} from "@/lib/admin-auth";import { getAdminSession } from "@/lib/admin-session";
import { getStoredAdminEmail, saveStoredAdminEmail } from "@/lib/admin-account-store";

export const runtime = "nodejs";

async function persistPasswordHash(hash: string, email: string) {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const headers = {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=minimal",
    };

    const patch = await fetch(`${process.env.SUPABASE_URL}/rest/v1/admin_auth?id=eq.1`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ password_hash: hash, email, updated_at: new Date().toISOString() }),
    });
    if (patch.ok) return;

    await fetch(`${process.env.SUPABASE_URL}/rest/v1/admin_auth`, {
      method: "POST",
      headers,
      body: JSON.stringify({ id: 1, email, password_hash: hash, updated_at: new Date().toISOString() }),
    });
    return;
  }

  const targetPath = path.join(process.cwd(), "data", ".admin-password-hash");
  await writeFile(targetPath, hash, "utf8");
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      currentPassword?: string;
      newEmail?: string;
      newPassword?: string;
    };

    if (!body.currentPassword) {
      return NextResponse.json({ error: "Введите текущий пароль" }, { status: 400 });
    }

    const valid = await verifyAdminPassword(body.currentPassword);
    if (!valid) {
      return NextResponse.json({ error: "Неверный текущий пароль" }, { status: 401 });
    }

    if (body.newEmail) {
      await saveStoredAdminEmail(body.newEmail);
    }

    const nextEmail = body.newEmail?.trim().toLowerCase() || (await getStoredAdminEmail()) || session.email;

    if (body.newPassword) {
      if (body.newPassword.length < 8) {
        return NextResponse.json({ error: "Новый пароль не менее 8 символов" }, { status: 400 });
      }
      const hash = await hashPassword(body.newPassword);
      await persistPasswordHash(hash, nextEmail);
    }

    return NextResponse.json({
      success: true,
      message: "Настройки аккаунта обновлены.",
      email: nextEmail,
    });
  } catch {
    return NextResponse.json({ error: "Не удалось обновить аккаунт" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const storedEmail = await getStoredAdminEmail();
  const { getAdminEmail } = await import("@/lib/admin-auth");

  return NextResponse.json({ email: storedEmail || getAdminEmail() || session.email });
}
