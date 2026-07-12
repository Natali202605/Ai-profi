import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/layout/JsonLd";
import { ScrollTracker } from "@/components/layout/ScrollTracker";
import { YandexMetrika } from "@/components/layout/YandexMetrika";
import { SiteContentProvider } from "@/components/providers/SiteContentProvider";
import { getSiteContent } from "@/lib/site-content-store";
import { BRAND_NAME_DISPLAY, PERSON_NAME } from "@/lib/brand";

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
    default: `${PERSON_NAME} — AI-видео, изображения, сайты и чат-боты`,
    template: `%s | ${BRAND_NAME_DISPLAY}`,
  },
  description:
    `${PERSON_NAME} — AI-специалист и художник с опытом более 10 лет. Создание AI-видео, изображений, сайтов, чат-ботов и визуального оформления для экспертов и брендов.`,
  keywords: [
    "AI-специалист",
    "Натали Смирнова",
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
    siteName: BRAND_NAME_DISPLAY,
    title: `${PERSON_NAME} — AI-видео, изображения, сайты и чат-боты`,
    description:
      `${PERSON_NAME} — AI-специалист и художник с опытом более 10 лет. Создание AI-видео, изображений, сайтов, чат-ботов и визуального оформления для экспертов и брендов.`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: BRAND_NAME_DISPLAY }],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteContent = await getSiteContent();

  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="canvas-texture min-h-screen">
        <JsonLd />
        <ScrollTracker />
        <YandexMetrika />
        <SiteContentProvider content={siteContent}>
          <SiteChrome>{children}</SiteChrome>
        </SiteContentProvider>
      </body>
    </html>
  );
}
