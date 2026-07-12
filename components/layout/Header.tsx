"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { MobileMenu } from "./MobileMenu";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/#services", label: "Услуги" },
  { href: "/about", label: "Обо мне" },
  { href: "/#process", label: "Процесс" },
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
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between transition-all duration-500",
            scrolled ? "h-14" : "h-16 md:h-20",
          )}
        >
          <Link href="/" className="group min-w-0">
            <span className="block font-heading text-base font-semibold tracking-wide text-white-text md:text-lg">
              {brand.siteName}
            </span>
            <span className="block text-xs font-medium text-gold/90 md:text-sm">
              {brand.siteTagline}
            </span>
          </Link>

          <nav className="hidden items-center gap-4 xl:gap-5 lg:flex" aria-label="Основная навигация">
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
              href="/#contact"
              className="btn-primary !px-5 !py-2.5 !text-sm shadow-[0_0_24px_rgba(164,148,255,0.25)]"
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
