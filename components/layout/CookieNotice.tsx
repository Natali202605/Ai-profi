"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 left-4 right-4 z-50 rounded-2xl border border-border-subtle bg-plum/80 p-4 backdrop-blur-xl md:bottom-4 md:left-auto md:right-4 md:max-w-md">
      <div className="flex items-start gap-3">
        <p className="flex-1 text-sm text-text-secondary">
          Сайт использует cookies для аналитики. Продолжая использование, вы соглашаетесь с{" "}
          <Link href="/privacy" className="text-link">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <button onClick={accept} className="btn-primary !px-4 !py-2 !text-xs shrink-0">
          Принять
        </button>
      </div>
    </div>
  );
}
