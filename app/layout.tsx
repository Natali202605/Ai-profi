import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/layout/JsonLd";
import { ScrollTracker } from "@/components/layout/ScrollTracker";
import { YandexMetrika } from "@/components/layout/YandexMetrika";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Натали Neero — AI-видео, изображения, сайты и оформление ВКонтакте",
    template: "%s | NATALI NEERO",
  },
  description:
    "AI-специалист и художник с опытом более 10 лет. Создание AI-видео, изображений, сайтов, оформление и развитие аккаунтов и сообществ ВКонтакте.",
  keywords: [
    "AI-специалист",
    "создание AI-видео",
    "создание изображений нейросетью",
    "AI-дизайн",
    "разработка сайтов",
    "оформление ВКонтакте",
    "визуальное оформление бренда",
    "художник и AI-дизайнер",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "NATALI NEERO",
    title: "Натали Neero — AI-видео, изображения, сайты и оформление ВКонтакте",
    description:
      "AI-специалист и художник с опытом более 10 лет. Создание AI-видео, изображений, сайтов, оформление и развитие аккаунтов и сообществ ВКонтакте.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "NATALI NEERO" }],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="canvas-texture min-h-screen">
        <JsonLd />
        <ScrollTracker />
        <YandexMetrika />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
