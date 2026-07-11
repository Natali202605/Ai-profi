import { VK_COMMUNITY_URL, VK_PROFILE_URL } from "@/lib/utils";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Natali Neero",
    jobTitle: "AI-специалист и художник",
    description:
      "Создание AI-видео, изображений, сайтов и визуального оформления для экспертов, брендов и сообществ ВКонтакте.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://natali-neero.ru",
    sameAs: [VK_PROFILE_URL, VK_COMMUNITY_URL],
    knowsAbout: [
      "AI-видео",
      "AI-изображения",
      "веб-дизайн",
      "оформление ВКонтакте",
      "визуальный дизайн",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NATALI NEERO",
    description:
      "AI-специалист и художник. Создание AI-видео, изображений, сайтов, оформление и развитие аккаунтов и сообществ ВКонтакте.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://natali-neero.ru",
    provider: { "@type": "Person", name: "Natali Neero" },
    areaServed: "RU",
    serviceType: [
      "AI-видео",
      "AI-изображения",
      "разработка сайтов",
      "оформление ВКонтакте",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
