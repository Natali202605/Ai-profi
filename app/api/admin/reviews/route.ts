import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-session";
import {
  getTestimonialsForAdmin,
  updateTestimonial,
  countPendingTestimonials,
} from "@/lib/testimonials-store";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = request.nextUrl.searchParams.get("status") || "all";
  const testimonials = await getTestimonialsForAdmin(status);
  const pendingCount = await countPendingTestimonials();

  return NextResponse.json({ testimonials, pendingCount });
}

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      status?: "pending" | "published" | "rejected";
      is_featured?: boolean;
      is_verified?: boolean;
      admin_reply?: string;
    };

    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updated = await updateTestimonial(body.id, {
      status: body.status,
      is_featured: body.is_featured,
      is_verified: body.is_verified,
      admin_reply: body.admin_reply,
    });

    if (!updated) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    revalidatePublicSite(["/"]);

    return NextResponse.json({ success: true, testimonial: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}
