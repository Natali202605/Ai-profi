"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { FloatingContactBar } from "@/components/layout/FloatingContactBar";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="pb-24 safe-bottom md:pb-0">{children}</main>
      <Footer />
      <ChatWidget />
      <FloatingContactBar />
      <CookieNotice />
    </>
  );
}

export function AdminAuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1e2860]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a1848]/40 via-transparent to-[#0f1a40]/50" />
      <div className="container-site relative z-10 flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <Link href="/" className="font-heading text-2xl tracking-wider text-white-text">
              NATALI NEERO
            </Link>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold">Admin</p>
          </div>
          <div className="glass-panel p-6 md:p-8">
            <h1 className="heading-display mb-2 text-3xl text-white-text">{title}</h1>
            {subtitle ? <p className="mb-6 text-sm text-text-secondary">{subtitle}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
