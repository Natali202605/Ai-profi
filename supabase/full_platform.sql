-- NATALI NEERO platform schema (этап 2+)
-- Применять в Supabase SQL Editor после site_content.sql и admin_auth.sql

create extension if not exists "pgcrypto";

-- Роли и пользователи
create table if not exists roles (
  id text primary key,
  label text not null,
  permissions jsonb not null default '[]'::jsonb
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  role_id text references roles(id) default 'owner',
  is_active boolean not null default true,
  two_factor_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Страницы и секции (drag-and-drop редактор)
create table if not exists pages (
  id text primary key,
  slug text unique not null,
  title text not null,
  status text not null default 'published',
  seo jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  page_id text references pages(id) on delete cascade,
  type text not null,
  sort_order int not null default 0,
  visible boolean not null default true,
  content jsonb not null default '{}'::jsonb,
  layout_variant text,
  updated_at timestamptz not null default now()
);

-- Услуги
create table if not exists services (
  id text primary key,
  slug text unique not null,
  title text not null,
  short_description text,
  full_description text,
  image text,
  icon text,
  results jsonb default '[]'::jsonb,
  audience text,
  faq jsonb default '[]'::jsonb,
  price_note text,
  cta_label text,
  seo jsonb default '{}'::jsonb,
  status text not null default 'published',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- Портфолио
create table if not exists portfolio_categories (
  id text primary key,
  label text not null,
  description text,
  cover text,
  video_preview text,
  sort_order int not null default 0,
  visible boolean not null default true,
  seo_title text
);

create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category_id text references portfolio_categories(id),
  short_description text,
  full_description text,
  task text,
  concept text,
  process text,
  result text,
  services jsonb default '[]'::jsonb,
  client text,
  year text,
  cover text,
  video_url text,
  video_poster text,
  status text not null default 'draft',
  is_featured boolean not null default false,
  is_nda boolean not null default false,
  published_at timestamptz,
  seo jsonb default '{}'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references portfolio_projects(id) on delete cascade,
  url text not null,
  alt text,
  caption text,
  media_type text not null default 'image',
  sort_order int not null default 0
);

-- Отзывы
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  company text,
  role text,
  service text,
  rating int check (rating between 1 and 5),
  short_text text,
  full_text text not null,
  status text not null default 'pending',
  is_verified boolean not null default false,
  is_featured boolean not null default false,
  is_pinned boolean not null default false,
  admin_reply text,
  consent_publication boolean not null default false,
  consent_processing boolean not null default false,
  project_id uuid references portfolio_projects(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists testimonial_updates (
  id uuid primary key default gen_random_uuid(),
  testimonial_id uuid references testimonials(id) on delete cascade,
  token_hash text not null,
  added_text text,
  new_rating int,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists testimonial_media (
  id uuid primary key default gen_random_uuid(),
  testimonial_id uuid references testimonials(id) on delete cascade,
  url text not null,
  media_type text not null default 'image',
  alt text
);

-- Заявки
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text,
  email text,
  service text,
  description text,
  budget text,
  deadline text,
  source text,
  utm jsonb default '{}'::jsonb,
  status text not null default 'new',
  assignee uuid references users(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lead_files (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  url text not null,
  filename text,
  mime_type text,
  size_bytes int
);

-- Сертификаты, FAQ, медиатека
create table if not exists certificates (
  id text primary key,
  title text not null,
  organization text,
  year text,
  direction text,
  image text,
  visible boolean not null default true,
  sort_order int not null default 0
);

create table if not exists faq (
  id text primary key,
  question text not null,
  answer text not null,
  category text,
  service_id text references services(id),
  visible boolean not null default true,
  sort_order int not null default 0
);

create table if not exists media_library (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  filename text,
  folder text,
  tags jsonb default '[]'::jsonb,
  alt text,
  caption text,
  mime_type text,
  width int,
  height int,
  size_bytes int,
  focus_x numeric,
  focus_y numeric,
  created_at timestamptz not null default now()
);

-- Настройки, SEO, аудит, версии, бэкапы
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists seo_settings (
  page_id text primary key references pages(id) on delete cascade,
  title text,
  description text,
  canonical text,
  og_title text,
  og_description text,
  og_image text,
  indexable boolean not null default true,
  structured_data jsonb default '{}'::jsonb
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  action text not null,
  entity_type text,
  entity_id text,
  payload jsonb default '{}'::jsonb,
  ip text,
  created_at timestamptz not null default now()
);

create table if not exists revisions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id text not null,
  author_id uuid references users(id),
  snapshot jsonb not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists backups (
  id uuid primary key default gen_random_uuid(),
  backup_type text not null,
  status text not null,
  location text,
  created_at timestamptz not null default now()
);

-- Чат-бот
create table if not exists chatbot_scenarios (
  id text primary key,
  title text not null,
  payload jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists chatbot_leads (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  scenario_id text references chatbot_scenarios(id),
  transcript jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

insert into roles (id, label) values
  ('owner', 'Владелец'),
  ('editor', 'Редактор'),
  ('moderator', 'Модератор'),
  ('analyst', 'Аналитик'),
  ('tech_admin', 'Технический администратор')
on conflict (id) do nothing;
