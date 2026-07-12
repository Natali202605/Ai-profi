import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { listMediaLibrary } from "@/lib/media-store";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const media = await listMediaLibrary();
  return NextResponse.json({ media });
}
