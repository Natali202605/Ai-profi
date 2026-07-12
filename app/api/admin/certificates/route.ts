import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import {
  createCertificate,
  deleteCertificate,
  getCertificatesForAdmin,
  updateCertificate,
} from "@/lib/certificates-store";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const certificates = await getCertificatesForAdmin();
  return NextResponse.json({ certificates });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const certificate = await createCertificate({
      title: String(body.title || ""),
      organization: String(body.organization || ""),
      year: String(body.year || new Date().getFullYear()),
      direction: String(body.direction || ""),
      description: String(body.description || ""),
      image: String(body.image || "/images/bg-watercolor.png"),
      verify_url: body.verify_url ? String(body.verify_url) : undefined,
      visible: body.visible !== false,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    });
    revalidatePublicSite();
    return NextResponse.json({ certificate });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const certificate = await updateCertificate(id, {
      title: body.title !== undefined ? String(body.title) : undefined,
      organization: body.organization !== undefined ? String(body.organization) : undefined,
      year: body.year !== undefined ? String(body.year) : undefined,
      direction: body.direction !== undefined ? String(body.direction) : undefined,
      description: body.description !== undefined ? String(body.description) : undefined,
      image: body.image !== undefined ? String(body.image) : undefined,
      verify_url: body.verify_url !== undefined ? String(body.verify_url) : undefined,
      visible: body.visible !== undefined ? Boolean(body.visible) : undefined,
      sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
    });

    if (!certificate) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePublicSite();
    return NextResponse.json({ certificate });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const ok = await deleteCertificate(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePublicSite();
  return NextResponse.json({ success: true });
}
