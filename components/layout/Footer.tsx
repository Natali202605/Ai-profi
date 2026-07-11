"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const footerLinks = [
  { href: "/about", label: "Обо мне" },
  { href: "/#services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/contacts", label: "Контакты" },
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/consent", label: "Согласие на обработку данных" },
  { href: "/offer", label: "Публичная оферта" },
];

export function Footer() {
  const { brand } = useSiteContent();

  return (
    <footer className="border-t border-border-subtle bg-plum/45 py-16 backdrop-blur-md">
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-heading text-2xl font-semibold tracking-wider text-white-text">
              {brand.siteName}
            </p>
            <p className="mt-2 text-sm text-text-secondary">{brand.siteTagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              {brand.footerDescription}
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Навигация</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">ВКонтакте</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={brand.vkProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-gold"
                >
                  Личная страница
                </a>
              </li>
              <li>
                <a
                  href={brand.vkCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-gold"
                >
                  Сообщество
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 sm:flex-row">
          <p className="text-sm text-text-secondary">
            © {brand.siteName}, 2026. AI-визуалы, видео, сайты и оформление ВКонтакте.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-peach"
            aria-label="Вернуться наверх"
          >
            <ArrowUp className="h-4 w-4" />
            Наверх
          </a>
        </div>
      </div>
    </footer>
  );
}
