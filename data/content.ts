import type { PortfolioProject } from "./portfolio";

export type CaseStudy = {
  id: string;
  projectSlug: string;
  client: string;
  task: string;
  solution: string;
  services: string[];
  cover: string;
  layout?: "text-left" | "text-right" | "full-width";
};

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    projectSlug: "expert-emotional-video",
    client: "Заказчик видеоролика",
    task: "Создать имиджевый видеоролик, который передаёт характер эксперта и помогает донести личную историю",
    solution:
      "Разработана сценарная концепция с кинематографической подачей, AI-генерация сцен и художественный монтаж с акцентом на эмоцию",
    services: ["AI-видео", "Сценарная концепция", "Монтаж"],
    cover: "/images/specialist-creator.jpg",
    layout: "text-left",
  },
  {
    id: "case-2",
    projectSlug: "custom-artworks",
    client: "Заказчик художественных работ",
    task: "Создать серию индивидуальных художественных работ по сложным авторским задумкам",
    solution:
      "Каждая работа разрабатывалась с учётом пожеланий: композиция, свет, цвет и детали подбирались для передачи задуманного настроения",
    services: ["Художественная концепция", "Живопись", "AI-визуал"],
    cover: "/images/portfolio/lilies.jpg",
    layout: "text-right",
  },
  {
    id: "case-3",
    projectSlug: "natali-neero-site",
    client: "NATALI NEERO",
    task: "Разработать премиальный сайт AI-специалиста с портфолио, формой заявки и виртуальным ассистентом",
    solution:
      "Индивидуальный дизайн, тексты, AI-визуалы, адаптивная версия, чат-бот и SEO-оптимизация в единой стилистике",
    services: ["Разработка сайта", "Дизайн", "Чат-бот"],
    cover: "/images/portfolio/site-preview.png",
    layout: "full-width",
  },
];

export type Review = {
  id: string;
  name: string;
  role: string;
  text: string;
  service: string;
  avatar?: string;
  visible: boolean;
};

export const reviews: Review[] = [
  {
    id: "review-katerina-belova",
    name: "Катерина Белова",
    role: "Заказчик видеоролика",
    text: "Спасибо за видео, которое вы создали для меня — оно волшебно. Вы учли все пожелания и точно уловили мысль, которую я хотела донести. А самое главное — быстро, точно, красиво. Смотрела как кинофильм.",
    service: "AI-видео",
    visible: true,
  },
  {
    id: "review-olesya-kochneva",
    name: "Олеся Кочнева",
    role: "Заказчик видеоролика",
    text: "Наташенька, ты супер! Видео класс с мамой — я проревелась. Спасибо большое за эмоции.",
    service: "AI-видео",
    visible: true,
  },
  {
    id: "review-vladimir-sopov",
    name: "Владимир Сопов",
    role: "Заказчик художественных работ",
    text: "Спасибо огромное за все картины, за терпение с непростыми задумками и идеями, за вашу работу. Все получились великолепными, волшебными и замечательными — прямо то, что нужно и что задумывалось.",
    service: "Художественные работы и AI-визуал",
    visible: true,
  },
];

export const processSteps = [
  {
    step: 1,
    title: "Знакомство",
    description: "Обсуждаем задачу, формат, аудиторию и пожелания.",
  },
  {
    step: 2,
    title: "Анализ задачи",
    description: "Изучаю проект, материалы, аудиторию и визуальные ориентиры.",
  },
  {
    step: 3,
    title: "Концепция",
    description: "Определяю стилистику, композицию, настроение и основные решения.",
  },
  {
    step: 4,
    title: "Создание",
    description: "Разрабатываю изображения, видео, сайт, чат-бот или оформление.",
  },
  {
    step: 5,
    title: "Согласование",
    description: "Показываю результат и вношу согласованные корректировки.",
  },
  {
    step: 6,
    title: "Передача",
    description: "Подготавливаю готовые материалы и объясняю дальнейшее использование.",
  },
];

export const positioningCards = [
  {
    title: "Вижу",
    description: "Анализирую идею, характер проекта и визуальную задачу.",
  },
  {
    title: "Продумываю",
    description: "Создаю композицию, стилистику, цвет и единую концепцию.",
  },
  {
    title: "Реализую",
    description: "Превращаю идею в готовый цифровой продукт.",
  },
];

export const heroExpertiseItems = [
  {
    number: "01",
    title: "Художественный опыт",
    titleAccent: "Художественный",
    description: "Более 10 лет работы с композицией, цветом, светом и визуальным ритмом.",
  },
  {
    number: "02",
    title: "Современные AI-инструменты",
    titleAccent: "AI",
    description: "Изображения, видео, сайты и цифровые решения в одной системе.",
  },
  {
    number: "03",
    title: "Индивидуальная концепция",
    titleAccent: "Индивидуальная",
    description: "Стиль создаётся под задачу, аудиторию и характер проекта.",
  },
  {
    number: "04",
    title: "Внимание к деталям",
    titleAccent: "деталям",
    description: "Каждый элемент поддерживает общее впечатление и профессиональный образ.",
  },
];

export const clientPainItems = [
  {
    title: "Всё выглядит разрозненно",
    description: "Сайт, изображения и социальные сети выполнены в разных стилях.",
  },
  {
    title: "AI-контент кажется шаблонным",
    description: "Визуал красивый, но не передаёт характер проекта.",
  },
  {
    title: "Неясно, что показать клиенту",
    description: "Нет понятной структуры, портфолио и сильного первого впечатления.",
  },
  {
    title: "Сложно собрать команду",
    description: "Для одной задачи приходится искать нескольких специалистов.",
  },
  {
    title: "Есть идея, но нет технического задания",
    description: "Непонятно, с чего начать и какой формат выбрать.",
  },
  {
    title: "Материалы не вызывают доверия",
    description: "Посетитель не понимает ценность и не доходит до заявки.",
  },
];

export const solutionSteps = [
  {
    title: "Смысл",
    description: "Определяем, что необходимо показать и какое впечатление должен получить клиент.",
  },
  {
    title: "Образ",
    description: "Создаём стилистику, композицию, цвет и визуальный характер.",
  },
  {
    title: "Реализация",
    description: "Разрабатываем готовые материалы и объединяем их в цельный проект.",
  },
];

export const trustBarItems = [
  "10+ лет художественного опыта",
  "Индивидуальные визуальные концепции",
  "AI, дизайн и разработка",
  "Работа онлайн",
  "Проекты для экспертов и бизнеса",
];

export const aboutFacts = [
  { label: "более 10 лет художественной практики" },
  { label: "работа с AI-видео" },
  { label: "создание сайтов" },
  { label: "разработка визуальных систем" },
  { label: "оформление ВКонтакте" },
  { label: "работа онлайн" },
];

export const certificates = [
  {
    id: "cert-ai",
    title: "AI-инструменты для визуального контента",
    organization: "Профессиональное обучение",
    year: "2025",
    image: "/images/portfolio/creator.jpg",
  },
  {
    id: "cert-video",
    title: "Создание AI-видео",
    organization: "Профессиональное обучение",
    year: "2025",
    image: "/images/specialist-creator.jpg",
  },
  {
    id: "cert-web",
    title: "Разработка сайтов и vibe-coding",
    organization: "Профессиональное обучение",
    year: "2025",
    image: "/images/portfolio/site-preview.png",
  },
  {
    id: "cert-smm",
    title: "SMM и оформление ВКонтакте",
    organization: "Профессиональное обучение",
    year: "2024",
    image: "/images/portfolio/lilies.jpg",
  },
];
