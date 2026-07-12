import type { Metadata } from "next";
import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Настройки — Админ-панель",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return <AdminSettingsForm supabaseConfigured={isSupabaseConfigured()} />;
}
