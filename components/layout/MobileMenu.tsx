"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-graphite/95 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="container-site flex h-16 items-center justify-end">
            <button onClick={onClose} className="p-2" aria-label="Закрыть меню">
              <X className="h-6 w-6 text-white-text" />
            </button>
          </div>
          <nav className="container-site flex flex-col gap-6 pt-8" aria-label="Мобильная навигация">
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
                  className="text-2xl font-heading text-white-text transition-colors hover:text-gold"
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
