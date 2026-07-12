import { AdminPanelLayout } from "@/components/admin/AdminPanelLayout";

export default function AdminPanelGroupLayout({ children }: { children: React.ReactNode }) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
