import { AdminPageChrome } from "@/components/admin/AdminPageChrome";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminPageChrome>{children}</AdminPageChrome>;
}
