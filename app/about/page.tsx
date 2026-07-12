import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "Обо мне",
  description:
    "Натали Смирнова — AI-специалист и художник с опытом более 10 лет. Создание визуальных проектов с художественным видением.",
};

export default function AboutPage() {
  return <About />;
}
