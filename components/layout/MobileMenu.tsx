"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-plum/90 backdrop-blur-md lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container-site flex h-16 items-center justify-end">
            <button
              onClick={onClose}
              className="flex min-h-11 min-w-11 items-center justify-center"
              aria-label="Закрыть меню"
            >
              <X className="h-6 w-6 text-white-text" />
            </button>
          </div>
          <nav
            className="container-site flex max-h-[calc(100dvh-4rem)] flex-col gap-6 overflow-y-auto pb-8 pt-4"
            aria-label="Мобильная навигация"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block py-1 text-2xl font-heading text-white-text transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={onClose} className="btn-primary mt-4 w-full text-center">
              Обсудить проект
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
