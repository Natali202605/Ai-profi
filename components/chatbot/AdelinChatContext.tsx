"use client";

import { createContext, useCallback, useContext, useState } from "react";

type AdelinChatContextValue = {
  open: boolean;
  openChat: () => void;
  closeChat: () => void;
  setOpen: (open: boolean) => void;
};

const AdelinChatContext = createContext<AdelinChatContextValue | null>(null);

export function AdelinChatProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openChat = useCallback(() => setOpen(true), []);
  const closeChat = useCallback(() => setOpen(false), []);

  return (
    <AdelinChatContext.Provider value={{ open, openChat, closeChat, setOpen }}>
      {children}
    </AdelinChatContext.Provider>
  );
}

export function useAdelinChat() {
  const context = useContext(AdelinChatContext);
  if (!context) {
    throw new Error("useAdelinChat must be used within AdelinChatProvider");
  }
  return context;
}
