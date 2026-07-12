import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { listMediaLibrary } from "@/lib/media-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") || undefined;
  const media = await listMediaLibrary(folder || undefined);
  return NextResponse.json({ media });
}
