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
        "Создаю AI-визуалы, видео и сайты, которые помогают брендам и экспертам выделяться, вызывать доверие и запоминаться",
      titleHighlight: "AI-визуалы, видео и сайты",
      titleLines: [
        "Создаю AI-визуалы, видео и сайты,",
        "которые помогают брендам и экспертам",
        "выделяться, вызывать доверие и запоминаться",
      ],
      titleSuffix: "",
      description:
        "Соединяю современные AI-инструменты, профессиональный дизайн и художественный опыт более 10 лет, чтобы создавать цельные визуальные проекты с характером.",
      descriptionHighlights: ["более 10 лет", "цельные визуальные проекты"],
      sellingLine:
        "Подходит, если вам нужен не набор случайных материалов, а единый образ проекта — от идеи до готового визуального решения.",
      sellingLineHighlights: ["единый образ проекта"],
      note: "Индивидуальная концепция вместо шаблонной генерации",
      noteHighlight: "Индивидуальная концепция",
      trustMarkers: [],
      specialistName: PERSON_NAME,
      specialistRoles: PERSON_JOB_TITLE,
      specialistCaption: "Создаю проекты с художественным видением и возможностями AI",
      specialistExperience: "",
      specialistPhoto: "/images/natali-portrait.jpg",
      portraitFocusY: 20,
      portraitFocusX: 50,
      portraitZoom: 1,
      captionPosition: "bottom-left" as const,
      expertiseCardTitle: "Профессиональный подход",
      expertiseCardTitleAccent: "Профессиональный",
      expertiseItems: heroExpertiseItems.map((item) => ({ ...item, isVisible: true })),
    },
    intro: {
      title: "Не просто создаю контент. Помогаю увидеть образ вашего проекта",
      titleHighlight: "образ вашего проекта",
      paragraph1:
        "Каждый проект начинается с понимания человека, идеи, аудитории и задачи. Художественный опыт помогает увидеть композицию, цвет, атмосферу и смысл, а AI-инструменты — воплотить эту концепцию в изображениях, видео, сайтах и цифровых продуктах.",
      paragraph2:
        "Благодаря этому изображения, видео, сайты и сообщества выглядят не как набор отдельных элементов, а как единая визуальная история.",
      quote: "",
    },
    about: {
      title: "Здравствуйте, я Натали",
      titleHighlight: "Натали",
      paragraphs: [
        "Я AI-специалист и художник с опытом более 10 лет. Создаю AI-видео, изображения, сайты, чат-ботов и визуальное оформление для экспертов, брендов и творческих проектов.",
        "Художественный опыт помогает мне видеть проект целиком: чувствовать композицию, свет, цвет, характер и настроение. AI-инструменты расширяют возможности реализации, но основой каждой работы остаются идея, вкус и внимательное отношение к задаче клиента.",
        "Я не использую один шаблон для всех. Для каждого проекта ищу собственную визуальную интонацию и решение, которое соответствует человеку, бренду и аудитории.",
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
