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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-plum/85 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-1 text-2xl font-heading text-white-text transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </motion.div>
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
