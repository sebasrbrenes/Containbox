-- Micro SaaS starter schema for Supabase/PostgreSQL
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null default 'onvo',
  provider_customer_id text,
  provider_subscription_id text unique,
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.events enable row level security;

create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can read own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can read own events" on public.events for select using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- ContaInbox product schema
create type public.request_status as enum ('draft', 'open', 'completed', 'archived');
create type public.item_status as enum ('pending', 'received', 'reviewed');

create table if not exists public.accounting_clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  contact_name text,
  email text,
  phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.document_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  client_id uuid not null references public.accounting_clients(id) on delete cascade,
  title text not null,
  period text not null,
  due_date date,
  status public.request_status not null default 'open',
  public_token text not null unique default encode(gen_random_bytes(24), 'hex'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.document_request_items (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.document_requests(id) on delete cascade,
  label text not null,
  description text,
  status public.item_status not null default 'pending',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.uploaded_documents (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.document_requests(id) on delete cascade,
  item_id uuid references public.document_request_items(id) on delete set null,
  storage_path text not null,
  original_name text not null,
  mime_type text,
  size_bytes bigint,
  uploader_name text,
  uploader_email text,
  created_at timestamptz not null default now()
);

alter table public.accounting_clients enable row level security;
alter table public.document_requests enable row level security;
alter table public.document_request_items enable row level security;
alter table public.uploaded_documents enable row level security;

create policy "Users manage own accounting clients" on public.accounting_clients
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own document requests" on public.document_requests
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users read own request items" on public.document_request_items for select using (
  exists (select 1 from public.document_requests r where r.id = document_request_items.request_id and r.user_id = auth.uid())
);
create policy "Users insert own request items" on public.document_request_items for insert with check (
  exists (select 1 from public.document_requests r where r.id = document_request_items.request_id and r.user_id = auth.uid())
);
create policy "Users update own request items" on public.document_request_items for update using (
  exists (select 1 from public.document_requests r where r.id = document_request_items.request_id and r.user_id = auth.uid())
) with check (
  exists (select 1 from public.document_requests r where r.id = document_request_items.request_id and r.user_id = auth.uid())
);
create policy "Users delete own request items" on public.document_request_items for delete using (
  exists (select 1 from public.document_requests r where r.id = document_request_items.request_id and r.user_id = auth.uid())
);

create policy "Users read own uploaded documents" on public.uploaded_documents for select using (
  exists (select 1 from public.document_requests r where r.id = uploaded_documents.request_id and r.user_id = auth.uid())
);

insert into storage.buckets (id, name, public)
values ('client-documents', 'client-documents', false)
on conflict (id) do nothing;
