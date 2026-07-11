# NATALI NEERO — Персональный сайт AI-специалиста и художника

Современный адаптивный сайт на Next.js 15, TypeScript и Tailwind CSS.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Настройка

Скопируйте `.env.example` в `.env.local` и заполните переменные:

- `NEXT_PUBLIC_YANDEX_METRIKA_ID` — ID Яндекс.Метрики
- `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` — уведомления о заявках
- `RESEND_API_KEY` и `OWNER_EMAIL` — email-уведомления
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` — сохранение заявок в БД

## Структура

- `app/` — страницы и API-маршруты
- `components/` — UI-компоненты, секции, формы, чат-бот
- `data/` — контент (портфолио, услуги, FAQ)
- `lib/` — утилиты, валидация, интеграции

## Перед публикацией

1. Замените placeholder-изображения на реальные работы
2. Добавьте портрет специалиста
3. Заполните кейсы и отзывы (`data/portfolio.ts`, `data/content.ts`)
4. Добавьте email и реквизиты
5. Создайте OG-изображение (`public/og-image.jpg`)
6. Настройте переменные окружения

## Деплой

### GitHub Pages (HTML-версия)

Статическая версия из папки `HTML` публикуется автоматически при каждом push в `main`.

Сайт: **https://natali202605.github.io/Ai-profi/**

### Vercel (полный Next.js-сайт)

1. Перейдите на [vercel.com/new](https://vercel.com/new)
2. Импортируйте репозиторий `Natali202605/Ai-profi`
3. Нажмите **Deploy** — настройки подхватятся из `vercel.json`
4. Добавьте переменные окружения из `.env.example` в Settings → Environment Variables

Или локально:

```bash
npm run build
```
