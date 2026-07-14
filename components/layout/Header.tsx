"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { useAdelinChat } from "@/components/chatbot/AdelinChatContext";
import { MobileMenu } from "./MobileMenu";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "Обо мне" },
  { href: "/#services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/#process", label: "Процесс" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contacts", label: "Контакты" },
];

function linkIsActive(pathname: string, href: string, hash: string) {
  if (href === "/") return pathname === "/" && !hash;
  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.slice(1);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();
  const { brand } = useSiteContent();
  const { openChat } = useAdelinChat();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onHash = () => setHash(window.location.hash);
    onHash();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "border-b border-border-subtle bg-plum/80 backdrop-blur-xl"
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

          <nav className="hidden items-center gap-3 xl:gap-4 lg:flex" aria-label="Основная навигация">
            {navLinks.map((link) => {
              const active = linkIsActive(pathname, link.href, hash);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors",
                    active ? "font-medium text-gold" : "text-text-secondary hover:text-gold",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border-subtle text-gold transition-colors hover:border-gold/40 hover:bg-gold/10"
              aria-label="Открыть чат Аделин"
              onClick={() => {
                trackEvent("adelin_open", { source: "header" });
                openChat();
              }}
            >
              <MessageCircle className="h-5 w-5" />
            </button>
            <Link
              href="/#contact"
              className="btn-primary !px-5 !py-2.5 !text-sm shadow-[0_0_24px_rgba(164,148,255,0.25)]"
              onClick={() => trackEvent("hero_cta_click", { source: "header" })}
            >
              Обсудить проект
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-gold"
              aria-label="Открыть чат Аделин"
              onClick={() => {
                trackEvent("adelin_open", { source: "header_mobile" });
                openChat();
              }}
            >
              <MessageCircle className="h-5 w-5" />
            </button>
            <button
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white-text"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </>
  );
}
