import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const ACCOUNT_PATH = path.join(process.cwd(), "data", "admin-account.json");

type AdminAccount = {
  email?: string;
};

export async function getStoredAdminEmail(): Promise<string | null> {
  try {
    const raw = await readFile(ACCOUNT_PATH, "utf8");
    const data = JSON.parse(raw) as AdminAccount;
    return data.email?.trim().toLowerCase() || null;
  } catch {
    return null;
  }
}

export async function saveStoredAdminEmail(email: string) {
  await mkdir(path.dirname(ACCOUNT_PATH), { recursive: true });
  await writeFile(ACCOUNT_PATH, JSON.stringify({ email: email.trim().toLowerCase() }, null, 2), "utf8");
}
