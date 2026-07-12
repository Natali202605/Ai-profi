import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import { getClientById, getClientsForAdmin } from "@/lib/crm-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const detail = await getClientById(id);
    if (!detail) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(detail);
  }

  const clients = await getClientsForAdmin();
  return NextResponse.json({ clients });
}
