create table if not exists admin_auth (
  id int primary key,
  email text not null unique,
  password_hash text not null,
  updated_at timestamptz default now()
);
