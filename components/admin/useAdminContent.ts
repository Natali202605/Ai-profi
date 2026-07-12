"use client";

import { useCallback, useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content-types";

export function useAdminContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/content");
        if (res.ok) {
          const data = (await res.json()) as { content: SiteContent };
          setContent(data.content);
        }
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const patchContent = useCallback((patch: Partial<SiteContent>) => {
    setContent((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const saveContent = useCallback(async () => {
    if (!content) return false;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error);
      setMessage("Изменения сохранены.");
      return true;
    } catch {
      setMessage("Не удалось сохранить изменения.");
      return false;
    } finally {
      setSaving(false);
    }
  }, [content]);

  return {
    content,
    setContent,
    loading,
    saving,
    message,
    setMessage,
    patchContent,
    saveContent,
  };
}
