"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { MobileMenu } from "./MobileMenu";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { href: "/about", label: "Обо мне" },
  { href: "/#services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/#vk", label: "ВКонтакте" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { brand } = useSiteContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "border-b border-border-subtle bg-plum/55 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="group min-w-0 max-w-[52vw] sm:max-w-none">
            <span className="block truncate font-heading text-sm font-semibold tracking-wide text-white-text sm:text-base md:text-lg">
              {brand.siteName}
              <span className="font-body font-normal text-text-secondary">
                {" · "}
                <span className="text-[0.625rem] font-medium uppercase tracking-[0.1em] sm:text-[0.6875rem]">
                  {brand.siteTagline}
                </span>
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="btn-secondary whitespace-nowrap !px-4 !py-2 !text-xs xl:!px-5 xl:!py-2.5 xl:!text-sm"
            >
              <span className="xl:hidden">Сотрудникам</span>
              <span className="hidden xl:inline">Вход для сотрудников</span>
            </Link>
            <Link
              href="/#contact"
              className="btn-primary !px-5 !py-2.5 !text-sm"
              onClick={() => trackEvent("hero_cta_click", { source: "header" })}
            >
              Обсудить проект
            </Link>
          </nav>

          <button
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white-text lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </>
  );
}
