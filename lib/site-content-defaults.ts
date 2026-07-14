import { heroExpertiseItems, reviews } from "@/data/content";
import { BRAND_NAME_DISPLAY, BRAND_TAGLINE, PERSON_NAME, PERSON_JOB_TITLE } from "@/lib/brand";
import { faqItems } from "@/data/faq";
import { services } from "@/data/services";
import { buildDefaultLegalContent } from "@/lib/legal-page-defaults";
import type { SiteContent } from "@/lib/site-content-types";

export function buildDefaultSiteContent(): SiteContent {
  return {
    brand: {
      siteName: BRAND_NAME_DISPLAY,
      siteTagline: BRAND_TAGLINE,
      footerDescription:
        "Изображения, видео, сайты и визуальные решения с художественным видением.",
      vkProfileUrl: "https://vk.ru/id170079854",
      vkCommunityUrl: "https://vk.com/natali_neero",
      vkReviewsUrl: "https://vk.com/topic-235128878_66094958",
    },
    hero: {
      eyebrow: "AI-СПЕЦИАЛИСТ × ХУДОЖНИК",
      titleMain:
        "Создаю AI-визуалы, видео и цифровые проекты, в которых технологии соединяются с художественным видением",
      titleHighlight: "технологии соединяются с художественным видением",
      titleLines: [
        "Создаю AI-визуалы, видео и цифровые проекты,",
        "в которых технологии соединяются",
        "с художественным видением",
      ],
      titleSuffix: "",
      description:
        "Разрабатываю не отдельные случайные изображения, а цельные визуальные решения: от идеи и художественной концепции до готовых AI-видео, изображений, сайтов, чат-ботов и оформления цифровых площадок.",
      descriptionHighlights: ["цельные визуальные решения"],
      sellingLine:
        "Для брендов, экспертов и проектов, которым важно выделяться, вызывать доверие и запоминаться.",
      sellingLineHighlights: ["выделяться, вызывать доверие и запоминаться"],
      note: "Индивидуальная концепция вместо шаблонной генерации",
      noteHighlight: "Индивидуальная концепция",
      trustMarkers: [],
      specialistName: PERSON_NAME,
      specialistRoles: PERSON_JOB_TITLE,
      specialistCaption: "AI-специалист и художник · 10+ лет опыта",
      specialistExperience: "10+",
      specialistPhoto: "/images/natali-portrait.jpg",
      portraitFocusY: 20,
      portraitFocusX: 50,
      portraitZoom: 1,
      captionPosition: "bottom-left" as const,
      expertiseCardTitle: "Что важно в работе",
      expertiseCardTitleAccent: "Важно",
      expertiseItems: heroExpertiseItems.map((item) => ({ ...item, isVisible: true })),
    },
    intro: {
      title: "Не просто AI-генерация. Художественно и стратегически продуманный визуальный проект",
      titleHighlight: "Художественно и стратегически",
      paragraph1:
        "AI ускоряет и расширяет возможности производства, но сам по себе не создаёт сильный образ. Для профессионального результата необходимы идея, композиция, цвет, свет, драматургия, понимание аудитории и тщательный отбор материалов.",
      paragraph2:
        "Я объединяю художественное видение, AI-технологии и коммерческую задачу проекта в одну систему.",
      quote:
        "Для меня важно не просто создать красивый кадр, а понять, какое впечатление он должен произвести и какую задачу решить.",
    },
    about: {
      title: "Натали Смирнова — художник, который использует AI как профессиональный инструмент",
      titleHighlight: "профессиональный инструмент",
      paragraphs: [
        "Художественный опыт более 10 лет помогает видеть композицию, свет, цвет и форму. AI-инструменты расширяют производство, но основа — идея, вкус и задача клиента.",
        "Работаю с изображениями, видео, сайтами и digital-продуктами: умею слышать клиента, выстраивать индивидуальный подход и объединять художественную и техническую части проекта.",
        "Внимательность к деталям и ответственность за итог — обязательная часть каждого сотрудничества.",
      ],
      extraParagraph: "",
      skills: [],
      photo: "/images/natali-portrait.jpg",
      badgeValue: "10+",
      badgeLabel: "лет в искусстве",
    },
    services: {
      sectionTitle: "Выберите формат решения",
      sectionTitleHighlight: "формат решения",
      sectionSubtitle:
        "Можно заказать одну услугу или собрать комплексный проект в единой стилистике.",
      items: services.map((service) => ({
        id: service.id,
        title: service.title,
        description: service.description,
        cta: service.cta,
        includes: service.includes?.slice(0, 5) || [],
      })),
    },
    reviews: {
      title: "Отзывы клиентов",
      titleHighlight: "клиентов",
      subtitle: "Отзывы клиентов после работы над проектами.",
      items: reviews.map((review) => ({ ...review })),
    },
    images: {
      backgroundPhoto: "/images/bg-watercolor.png",
    },
    faq: {
      title: "Частые вопросы",
      items: faqItems.map((item, index) => ({
        id: `faq-${index + 1}`,
        question: item.question,
        answer: item.answer,
        visible: true,
      })),
    },
    portfolio: {
      featured: {
        label: "Портфолио",
        title: "Избранные проекты",
        titleHighlight: "Избранные",
        subtitle: "Работы, в которых технологии становятся инструментом художественного замысла.",
        ctaLabel: "Смотреть все проекты",
      },
      page: {
        label: "Портфолио",
        title: "Все проекты",
        subtitle: "Каждый проект — отдельная задача, атмосфера и визуальный язык.",
      },
    },
    legal: buildDefaultLegalContent(),
  };
}
