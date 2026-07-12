# Статическая HTML-версия (GitHub Pages)

Автономная версия для публикации на **GitHub Pages** без Node.js.

## Страницы

| Файл | Описание |
|------|----------|
| `index.html` | Главная |
| `portfolio.html` | Портфолио с фильтрами и поиском |
| `privacy.html`, `consent.html`, `offer.html` | Юридические документы |
| `admin/login.html` | Переход в админ-панель полной версии |

## GitHub Pages

При push в `main` автоматически публикуется папка `HTML/`:

**https://natali202605.github.io/Ai-profi/**

## Полная версия (Next.js)

Для форм с API, детальных страниц проектов, CMS и админ-панели используйте Next.js в корне репозитория.

### Локально

```bash
npm install
npm run dev
```

### Vercel (рекомендуется для production)

1. Зайдите на [vercel.com](https://vercel.com) → **Add New Project**
2. Импортируйте репозиторий `Natali202605/Ai-profi`
3. Framework: **Next.js** (определится автоматически)
4. Добавьте переменные из `.env.example` (Supabase, Resend и т.д.)
5. Deploy

После деплоя укажите URL в `js/site-config.js` → `adminLoginUrl`, чтобы ссылка «Администрирование сайта» вела на живую админку.

Можно подключить свой домен (например `natali-neero.ru`) в настройках Vercel.
