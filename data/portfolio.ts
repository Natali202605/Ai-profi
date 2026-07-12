export type PortfolioCategory =
  | "video"
  | "images"
  | "websites"
  | "vk"
  | "chatbots"
  | "art"
  | "complex";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  shortDescription: string;
  task: string;
  solution: string;
  artDirection?: string;
  services: string[];
  cover: string;
  images: string[];
  videoUrl?: string;
  client?: string;
  year?: string;
  testimonial?: {
    name: string;
    role?: string;
    text: string;
  };
  featured: boolean;
  layout?: "large" | "medium" | "wide" | "tall";
};

export type PortfolioDirection = {
  id: Exclude<PortfolioCategory, "complex">;
  title: string;
  categoryLabel: string;
  description: string;
  cover: string;
  videoUrl?: string;
  layout: "large" | "medium" | "wide";
  projectCount: number;
};

export const portfolioDirections: PortfolioDirection[] = [
  {
    id: "video",
    title: "AI-видео",
    categoryLabel: "AI-видео",
    description:
      "Кинематографические, рекламные и художественные ролики с продуманной концепцией.",
    cover: "/images/portfolio/creator.jpg",
    layout: "large",
    projectCount: 0,
  },
  {
    id: "images",
    title: "AI-изображения",
    categoryLabel: "Изображения",
    description: "Рекламные визуалы, серии в едином стиле и художественные образы.",
    cover: "/images/specialist-creator.jpg",
    layout: "large",
    projectCount: 0,
  },
  {
    id: "websites",
    title: "Сайты",
    categoryLabel: "Сайты",
    description: "Современные сайты с индивидуальной визуальной концепцией и структурой.",
    cover: "/images/portfolio/site-preview.png",
    layout: "medium",
    projectCount: 0,
  },
  {
    id: "chatbots",
    title: "Чат-боты",
    categoryLabel: "Чат-боты",
    description: "Умные ассистенты для сайта: выбор услуги, бриф и сбор заявок.",
    cover: "/images/bg-watercolor.png",
    layout: "medium",
    projectCount: 0,
  },
  {
    id: "vk",
    title: "Оформление ВКонтакте",
    categoryLabel: "ВКонтакте",
    description: "Цельный визуальный образ сообщества с продуманной навигацией.",
    cover: "/images/portfolio/creator.jpg",
    layout: "medium",
    projectCount: 0,
  },
  {
    id: "art",
    title: "Художественные проекты",
    categoryLabel: "Художественные работы",
    description: "Авторские серии, картины и визуальные работы с характером и атмосферой.",
    cover: "/images/portfolio/lilies.jpg",
    layout: "wide",
    projectCount: 0,
  },
];

export type PortfolioSort = "newest" | "featured" | "category";

export function getProjectCountByCategory(category: PortfolioCategory) {
  return portfolioProjects.filter((project) => project.category === category).length;
}

portfolioDirections.forEach((direction) => {
  direction.projectCount = getProjectCountByCategory(direction.id);
});

export function filterPortfolioProjects(options: {
  categoryId?: string;
  query?: string;
  sort?: PortfolioSort;
}) {
  const { categoryId, query = "", sort = "newest" } = options;
  let results = [...portfolioProjects];

  if (categoryId && categoryId !== "all") {
    results = results.filter((project) => project.category === categoryId);
  }

  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery) {
    results = results.filter((project) => {
      const haystack = [
        project.title,
        project.shortDescription,
        project.categoryLabel,
        project.task,
        ...project.services,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }

  switch (sort) {
    case "featured":
      return results.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || Number(b.year) - Number(a.year),
      );
    case "category":
      return results.sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel, "ru"));
    case "newest":
    default:
      return results.sort((a, b) => Number(b.year) - Number(a.year));
  }
}

export const portfolioCategories = [
  { id: "all", label: "Все" },
  { id: "video", label: "AI-видео" },
  { id: "images", label: "Изображения" },
  { id: "websites", label: "Сайты" },
  { id: "vk", label: "ВКонтакте" },
  { id: "chatbots", label: "Чат-боты" },
  { id: "art", label: "Художественные проекты" },
] as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "ris-path-to-perfection",
    title: "РИС. Путь совершенства",
    category: "video",
    categoryLabel: "AI-видео",
    shortDescription: "Кинематографическая визуальная история для презентации бренда",
    task: "Создать кинематографическую визуальную историю для презентации бренда с цельной атмосферой и художественной режиссурой.",
    solution:
      "Разработана сценарная концепция, визуальная стилистика и монтажная структура. Видео сочетает AI-генерацию сцен с художественной постобработкой и продуманной композицией кадра.",
    artDirection: "Кинематографический свет, плавные переходы, акцент на эмоциональном повествовании",
    services: ["концепция", "сценарные сцены", "AI-визуалы", "генерация видео", "монтаж"],
    cover: "/images/portfolio/creator.jpg",
    images: ["/images/portfolio/creator.jpg"],
    client: "Имиджевый проект",
    year: "2025",
    featured: true,
    layout: "large",
  },
  {
    slug: "expert-emotional-video",
    title: "AI-видеоролик для эксперта",
    category: "video",
    categoryLabel: "AI-видео",
    shortDescription: "Атмосферный имиджевый ролик с художественной режиссурой",
    task: "Создать короткий видеоролик, который передаёт характер эксперта и помогает донести личную историю до аудитории.",
    solution:
      "Разработана сценарная концепция, визуальная стилистика и монтажная структура. Ролик построен как цельная визуальная история с акцентом на эмоцию и атмосферу.",
    services: ["AI-видео", "Сценарная концепция", "Монтаж"],
    cover: "/images/specialist-creator.jpg",
    images: ["/images/specialist-creator.jpg", "/images/portfolio/creator.jpg"],
    client: "Заказчик видеоролика",
    year: "2025",
    testimonial: {
      name: "Катерина Белова",
      role: "Заказчик видеоролика",
      text: "Спасибо за видео, которое вы создали для меня — оно волшебно. Вы учли все пожелания и точно уловили мысль, которую я хотела донести.",
    },
    featured: true,
    layout: "wide",
  },
  {
    slug: "family-story-video",
    title: "Семейная визуальная история",
    category: "video",
    categoryLabel: "AI-видео",
    shortDescription: "Трогательный ролик с кинематографической подачей",
    task: "Создать эмоциональный видеоролик, который передаёт личную историю и вызывает сильный отклик у зрителя.",
    solution:
      "Подобрана визуальная концепция с мягким светом и продуманной драматургией. Монтаж выстроен так, чтобы каждый кадр усиливал общее настроение истории.",
    services: ["AI-видео", "Художественная концепция", "Монтаж"],
    cover: "/images/portfolio/lilies.jpg",
    images: ["/images/portfolio/lilies.jpg"],
    client: "Заказчик видеоролика",
    year: "2025",
    testimonial: {
      name: "Олеся Кочнева",
      role: "Заказчик видеоролика",
      text: "Наташенька, ты супер! Видео класс с мамой — я проревелась. Спасибо большое за эмоции.",
    },
    featured: true,
    layout: "medium",
  },
  {
    slug: "lilies-art-series",
    title: "Художественная серия «Лилии»",
    category: "art",
    categoryLabel: "Художественные проекты",
    shortDescription: "Авторская серия с акцентом на свет, композицию и настроение",
    task: "Создать художественную серию, где AI-инструменты служат продолжением авторского видения и живописного замысла.",
    solution:
      "Серия построена на принципах живописной композиции: мягкий свет, продуманная цветовая гармония и эмоциональная глубина каждого кадра.",
    artDirection: "Живописный свет, мягкие переходы, спокойная премиальная палитра",
    services: ["Художественная концепция", "AI-изображения", "Цветокоррекция"],
    cover: "/images/portfolio/lilies.jpg",
    images: ["/images/portfolio/lilies.jpg"],
    client: "Авторский проект",
    year: "2025",
    featured: true,
    layout: "tall",
  },
  {
    slug: "custom-artworks",
    title: "Художественные работы на заказ",
    category: "art",
    categoryLabel: "Художественные проекты",
    shortDescription: "Индивидуальные картины и визуальные работы с характером",
    task: "Создать серию художественных работ по индивидуальным задумкам заказчика, сохранив характер и эмоциональную глубину каждого образа.",
    solution:
      "Каждая работа разрабатывалась с учётом пожеланий заказчика: композиция, свет, цвет и детали подбирались для передачи задуманного настроения.",
    services: ["Художественная концепция", "Живопись", "AI-визуал"],
    cover: "/images/portfolio/lilies.jpg",
    images: ["/images/portfolio/lilies.jpg", "/images/portfolio/creator.jpg"],
    client: "Заказчик художественных работ",
    year: "2025",
    testimonial: {
      name: "Владимир Сопов",
      role: "Заказчик художественных работ",
      text: "Спасибо огромное за все картины, за терпение с непростыми задумками и идеями. Все получились великолепными, волшебными и замечательными.",
    },
    featured: true,
    layout: "medium",
  },
  {
    slug: "ai-creator-visuals",
    title: "AI-визуалы для креатора",
    category: "images",
    categoryLabel: "Изображения",
    shortDescription: "Серия изображений с продуманной композицией и единым стилем",
    task: "Создать выразительную серию изображений для личного бренда с акцентом на характер, атмосферу и визуальную узнаваемость.",
    solution:
      "Разработана единая визуальная концепция с мягким светом, спокойной палитрой и акцентом на детали. Все изображения объединены одинаковым настроением.",
    artDirection: "Мягкий свет, сиренево-голубая палитра, премиальная атмосфера",
    services: ["AI-изображения", "Художественная концепция", "Цветокоррекция"],
    cover: "/images/portfolio/creator.jpg",
    images: ["/images/portfolio/creator.jpg", "/images/specialist-creator.jpg"],
    client: "Личный бренд",
    year: "2025",
    featured: true,
    layout: "medium",
  },
  {
    slug: "natali-neero-site",
    title: "Сайт Натали Смирновой",
    category: "websites",
    categoryLabel: "Сайты",
    shortDescription: "Премиальный сайт AI-специалиста с индивидуальной визуальной концепцией",
    task: "Создать сайт, который отражает характер специалиста, демонстрирует работы и помогает клиентам быстро понять услуги и оставить заявку.",
    solution:
      "Разработаны структура, дизайн, тексты и AI-визуалы. Сайт адаптирован под мобильные устройства, включает форму заявки, портфолио и виртуального ассистента.",
    services: ["Разработка сайта", "Дизайн", "AI-визуалы", "Чат-бот", "SEO"],
    cover: "/images/portfolio/site-preview.png",
    images: ["/images/portfolio/site-preview.png", "/images/bg-watercolor.png"],
    client: "Натали Смирнова",
    year: "2026",
    featured: true,
    layout: "wide",
  },
  {
    slug: "expert-landing",
    title: "Персональный сайт эксперта",
    category: "websites",
    categoryLabel: "Сайты",
    shortDescription: "Сайт с индивидуальной визуальной концепцией и тёплой подачей",
    task: "Создать персональный сайт, который отражает характер специалиста и помогает сформировать доверие у потенциальных клиентов.",
    solution:
      "Разработаны структура, дизайн, тексты и AI-визуалы. Сайт адаптирован под мобильные устройства и включает форму заявки.",
    services: ["Разработка сайта", "Дизайн", "AI-визуалы"],
    cover: "/images/portfolio/site-preview.png",
    images: ["/images/portfolio/site-preview.png"],
    client: "Экспертный проект",
    year: "2025",
    featured: false,
    layout: "medium",
  },
  {
    slug: "vk-community-natali",
    title: "Оформление сообщества ВКонтакте",
    category: "vk",
    categoryLabel: "ВКонтакте",
    shortDescription: "Цельный визуальный образ сообщества с продуманной навигацией",
    task: "Создать узнаваемое оформление сообщества, которое помогает быстро понять суть проекта и услуги.",
    solution:
      "Разработаны обложка, аватар, меню, шаблоны публикаций и визуальная система для единообразного контента.",
    services: ["Оформление ВКонтакте", "Визуальная система", "Контент-план"],
    cover: "/images/portfolio/creator.jpg",
    images: ["/images/portfolio/creator.jpg", "/images/specialist-creator.jpg"],
    client: "Натали Смирнова",
    year: "2025",
    featured: true,
    layout: "tall",
  },
  {
    slug: "adelin-chatbot",
    title: "Виртуальный ассистент Аделин",
    category: "chatbots",
    categoryLabel: "Чат-боты",
    shortDescription: "Умный чат-бот для сайта: выбор услуги, бриф и сбор заявок",
    task: "Создать виртуального ассистента, который помогает посетителю выбрать услугу, ответить на вопросы и оставить заявку.",
    solution:
      "Разработан сценарий с быстрыми ответами, мини-брифом по услугам, сбором контактов и передачей заявки. Бот интегрирован с формой и аналитикой сайта.",
    services: ["Чат-бот", "Сценарий", "Интеграция с сайтом"],
    cover: "/images/bg-watercolor.png",
    images: ["/images/bg-watercolor.png"],
    client: "Натали Смирнова",
    year: "2026",
    featured: true,
    layout: "medium",
  },
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return portfolioProjects.filter((p) => p.featured);
}

export function getAdjacentProjects(slug: string) {
  const index = portfolioProjects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? portfolioProjects[index - 1] : null,
    next: index < portfolioProjects.length - 1 ? portfolioProjects[index + 1] : null,
  };
}

export type PortfolioCategoryGroup = {
  id: string;
  label: string;
  works: PortfolioProject[];
};

export function getPortfolioCategoryGroups(options?: {
  featuredOnly?: boolean;
  categoryId?: string;
}): PortfolioCategoryGroup[] {
  const { featuredOnly = false, categoryId } = options || {};
  let projects = featuredOnly
    ? portfolioProjects.filter((p) => p.featured)
    : portfolioProjects;

  const categories = portfolioCategories.filter((c) => c.id !== "all");
  const filteredCategories = categoryId && categoryId !== "all"
    ? categories.filter((c) => c.id === categoryId)
    : categories;

  return filteredCategories
    .map((cat) => ({
      id: cat.id,
      label: cat.label,
      works: projects.filter((p) => p.category === cat.id),
    }))
    .filter((group) => group.works.length > 0);
}

