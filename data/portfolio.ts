export type PortfolioCategory =
  | "video"
  | "images"
  | "websites"
  | "vk"
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

export const portfolioCategories = [
  { id: "all", label: "Все работы" },
  { id: "video", label: "Видео" },
  { id: "images", label: "Изображения" },
  { id: "websites", label: "Сайты" },
  { id: "vk", label: "ВКонтакте" },
  { id: "art", label: "Художественные работы" },
  { id: "complex", label: "Комплексные проекты" },
] as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "premium-beauty-series",
    title: "Серия рекламных изображений для beauty-проекта",
    category: "images",
    categoryLabel: "Изображения",
    shortDescription: "Визуальная серия с мягким золотистым светом и премиальной атмосферой",
    task: "Создать выразительную серию изображений для продвижения услуги, сохранить ощущение премиальности и подчеркнуть внимание к деталям.",
    solution:
      "Разработана единая визуальная концепция с мягким золотистым светом, спокойной цветовой палитрой и акцентом на фактуры. Все изображения объединены одинаковым настроением.",
    artDirection: "Тёплый свет, деликатные текстуры, спокойная премиальная палитра",
    services: ["AI-изображения", "Художественная концепция"],
    cover: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80",
    ],
    client: "[Добавить название проекта]",
    year: "2025",
    featured: true,
    layout: "large",
  },
  {
    slug: "expert-ai-video",
    title: "AI-видеоролик для эксперта",
    category: "video",
    categoryLabel: "Видео",
    shortDescription: "Атмосферный имиджевый ролик с художественной режиссурой",
    task: "Создать короткий видеоролик, который передаёт характер эксперта и его подход к работе.",
    solution:
      "Разработана сценарная концепция, визуальная стилистика и монтажная структура. Видео сочетает AI-генерацию с художественной постобработкой.",
    services: ["AI-видео", "Сценарная концепция", "Монтаж"],
    cover: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    client: "[Добавить название проекта]",
    year: "2025",
    featured: true,
    layout: "wide",
  },
  {
    slug: "personal-expert-site",
    title: "Персональный сайт эксперта",
    category: "websites",
    categoryLabel: "Сайты",
    shortDescription: "Сайт с индивидуальной визуальной концепцией и тёплой подачей",
    task: "Создать персональный сайт, который отражает характер специалиста и помогает сформировать доверие.",
    solution:
      "Разработаны структура, дизайн, тексты и AI-визуалы. Сайт адаптирован под мобильные устройства и включает форму заявки.",
    services: ["Разработка сайта", "Дизайн", "AI-визуалы"],
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    ],
    client: "[Добавить название проекта]",
    year: "2025",
    featured: true,
    layout: "medium",
  },
  {
    slug: "vk-community-design",
    title: "Оформление сообщества ВКонтакте",
    category: "vk",
    categoryLabel: "ВКонтакте",
    shortDescription: "Цельный визуальный образ сообщества с продуманной навигацией",
    task: "Создать узнаваемое оформление сообщества, которое помогает быстро понять суть проекта.",
    solution:
      "Разработаны обложка, аватар, меню, шаблоны публикаций и визуальная система для единообразного контента.",
    services: ["Оформление ВКонтакте", "Визуальная система"],
    cover: "https://images.unsplash.com/photo-1611162617474-5b21e939e986?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e939e986?w=1200&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=1200&q=80",
    ],
    client: "[Добавить название проекта]",
    year: "2025",
    featured: true,
    layout: "tall",
  },
  {
    slug: "brand-visual-package",
    title: "Комплексная визуальная упаковка бренда",
    category: "complex",
    categoryLabel: "Комплексный проект",
    shortDescription: "Единый визуальный образ: изображения, сайт и ВКонтакте",
    task: "Собрать цельный визуальный образ бренда с нуля для нескольких площадок.",
    solution:
      "Разработана единая концепция, применённая к изображениям, сайту и оформлению сообщества ВКонтакте.",
    services: ["Комплексная упаковка", "AI-изображения", "Сайт", "ВКонтакте"],
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    ],
    client: "[Добавить название проекта]",
    year: "2025",
    featured: true,
    layout: "medium",
  },
  {
    slug: "artistic-project",
    title: "Художественный визуальный проект",
    category: "art",
    categoryLabel: "Художественные работы",
    shortDescription: "Авторская серия с акцентом на свет, композицию и настроение",
    task: "Создать художественную серию, где AI-инструменты служат продолжением авторского видения.",
    solution:
      "Серия построена на принципах живописной композиции с использованием AI как инструмента реализации замысла.",
    artDirection: "Живописный свет, мягкие переходы, эмоциональная глубина",
    services: ["Художественная концепция", "AI-изображения"],
    cover: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80",
    ],
    client: "[Добавить название проекта]",
    year: "2025",
    featured: false,
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
