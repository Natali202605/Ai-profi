import { reviews } from "@/data/content";
import { faqItems } from "@/data/faq";
import { services } from "@/data/services";
import { buildDefaultLegalContent } from "@/lib/legal-page-defaults";
import type { SiteContent } from "@/lib/site-content-types";

export function buildDefaultSiteContent(): SiteContent {
  return {
    brand: {
      siteName: "NATALI NEERO",
      siteTagline: "AI-специалист и художник",
      footerDescription:
        "Изображения, видео, сайты и визуальные решения с художественным видением.",
      vkProfileUrl: "https://vk.ru/id170079854",
      vkCommunityUrl: "https://vk.com/natali_neero",
      vkReviewsUrl: "https://vk.com/topic-235128878_66094958",
    },
    hero: {
      eyebrow: "AI-СПЕЦИАЛИСТ × ХУДОЖНИК",
      titleMain:
        "Создаю AI-визуалы профессионального уровня для брендов и экспертов",
      titleHighlight: "AI-визуалы",
      titleSuffix: "",
      description:
        "AI-видео, изображения, сайты и оформление ВКонтакте — с художественным чутьём, продуманной композицией и более чем 10-летним опытом визуального видения.",
      descriptionHighlight: "более чем 10-летним опытом",
      note: "Индивидуальные решения вместо шаблонной генерации.",
      noteHighlight: "Индивидуальные решения",
      trustMarkers: [],
      specialistName: "Натали Neero",
      specialistRoles: "AI-специалист и художник",
      specialistExperience: "",
      specialistPhoto: "/images/natali-portrait.jpg",
      portraitFocusY: 20,
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
      sectionTitle: "Чем я могу помочь",
      sectionTitleHighlight: "могу помочь",
      sectionSubtitle:
        "Можно заказать отдельную услугу или собрать комплексную визуальную систему.",
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
      subtitle: "Отзывы клиентов из сообщества ВКонтакте.",
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
