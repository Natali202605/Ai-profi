# Статическая HTML-версия (архив)

Папка `HTML/` — устаревшее зеркало для GitHub Pages.

**Автодеплой Pages отключён.** Production-сайт — Next.js на Vercel: [natali-neero.ru](https://natali-neero.ru).

Не развивайте эту папку параллельно с Next.js: в HTML нет API заявок, динамического портфолио и полноценной админки (`admin/login.html` только редиректит на Next).

## Полная версия (Next.js)

```bash
npm install
npm run dev
```

Деплой: Vercel + переменные из `.env.example`.
