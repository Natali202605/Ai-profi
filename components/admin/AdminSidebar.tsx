"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  FileText,
  Inbox,
  ImageIcon,
  Star,
  Briefcase,
  Settings,
  Award,
  Users,
  Tags,
} from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/AdminShell";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/homepage", label: "Первый экран", icon: Home },
  { href: "/admin/content", label: "Контент сайта", icon: FileText },
  { href: "/admin/leads", label: "Заявки", icon: Inbox },
  { href: "/admin/clients", label: "Клиенты", icon: Users },
  { href: "/admin/portfolio", label: "Портфолио", icon: Briefcase },
  { href: "/admin/categories", label: "Категории", icon: Tags },
  { href: "/admin/reviews", label: "Отзывы", icon: Star },
  { href: "/admin/certificates", label: "Сертификаты", icon: Award },
  { href: "/admin/media", label: "Медиатека", icon: ImageIcon },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-60">
      <div className="card-glass sticky top-24 p-4">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">НАТАЛИ СМИРНОВА</p>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-gold/15 text-white-text"
                    : "text-text-secondary hover:bg-plum/40 hover:text-white-text"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 space-y-2 border-t border-border-subtle pt-4">
          <Link href="/" className="btn-secondary block w-full text-center !py-2 !text-xs">
            На сайт
          </Link>
          <AdminLogoutButton />
        </div>
      </div>
    </aside>
  );
}
