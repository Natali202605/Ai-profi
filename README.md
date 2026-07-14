# NATALI NEERO — Персональный сайт AI-специалиста и художника

Современный адаптивный сайт на Next.js 15, TypeScript и Tailwind CSS.

**Production:** Next.js на Vercel — [natali-neero.ru](https://natali-neero.ru).  
Папка `HTML/` и GitHub Pages — устаревшее зеркало; автодеплой Pages отключён.

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
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — заявки, портфолио и контент в БД
- `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` / `ADMIN_PASSWORD_HASH` — вход в админку

## Структура

- `app/` — страницы и API-маршруты
- `components/` — UI-компоненты, секции, формы, чат-бот
- `data/` — seed-контент (портфолио, услуги, FAQ)
- `lib/` — утилиты, store’ы, валидация, интеграции

## Перед публикацией

1. Заполните портфолио и отзывы через админку (`/admin`) или seed в `data/`
2. Добавьте портрет специалиста
3. Добавьте email и реквизиты в настройках
4. Создайте OG-изображение (`public/og-image.jpg`)
5. Настройте переменные окружения на Vercel

## Деплой (Vercel)

1. Перейдите на [vercel.com/new](https://vercel.com/new)
2. Импортируйте репозиторий `Natali202605/Ai-profi`
3. Нажмите **Deploy** — настройки подхватятся из `vercel.json`
4. Добавьте переменные окружения из `.env.example` в Settings → Environment Variables

Или локально:

```bash
npm run build
```

Админка: `/admin` на том же домене. Управление портфолио, заявками, отзывами и контентом доступно только в этой версии сайта.
