create table if not exists site_content (
  id int primary key,
  content jsonb not null,
  updated_at timestamptz default now()
);
