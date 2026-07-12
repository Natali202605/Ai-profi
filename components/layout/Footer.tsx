"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { PERSON_NAME } from "@/lib/brand";

const footerNavLinks = [
  { href: "/portfolio", label: "Портфолио" },
  { href: "/#services", label: "Услуги" },
  { href: "/about", label: "Обо мне" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

const legalLinks = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/consent", label: "Согласие на обработку персональных данных" },
  { href: "/offer", label: "Публичная оферта" },
];

export function Footer() {
  const { brand } = useSiteContent();

  return (
    <footer className="border-t border-border-subtle bg-plum/45 py-16 backdrop-blur-md">
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-heading text-2xl font-semibold tracking-wider text-white-text">
              {brand.siteName}
            </p>
            <p className="mt-1 text-sm text-gold">{brand.siteTagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              {brand.footerDescription}
            </p>
          </div>

          <div>
            <p className="footer-heading-accent mb-4">Навигация</p>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
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
            <p className="footer-heading-accent mb-4 mt-6">Контакты</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={brand.vkProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-gold"
                >
                  Личная страница ВКонтакте
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
          <div>
            <p className="text-sm text-body-secondary">
              © {PERSON_NAME}, 2026. AI-визуалы, видео, сайты и оформление ВКонтакте.
            </p>
            <Link
              href="/admin/login"
              className="mt-1 inline-block text-xs text-white/55 transition-colors hover:text-white/80"
            >
              Администрирование сайта
            </Link>
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-peach"
            aria-label="Вернуться наверх"
          >
            <ArrowUp className="h-4 w-4" />
            Наверх
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border-subtle/60 pt-6">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-text-secondary/70 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
