-- ============================================================
-- Admin Dashboard Schema
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- Companies table
create table public.companies (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  slug        text not null unique,
  logo_url    text,
  is_active   boolean default true not null,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- Profiles table (one per auth.users row)
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  full_name   text,
  role        text not null default 'client' check (role in ('super_admin', 'admin', 'client')),
  company_id  uuid references public.companies(id) on delete set null,
  avatar_url  text,
  created_at  timestamptz default now() not null,
  updated_at  timestamptz default now() not null
);

-- Metrics table
create table public.metrics (
  id            uuid default gen_random_uuid() primary key,
  company_id    uuid references public.companies(id) on delete cascade not null,
  metric_name   text not null,
  metric_value  numeric not null,
  metric_label  text,
  category      text,
  recorded_at   timestamptz default now() not null
);

-- ============================================================
-- Indexes
-- ============================================================
create index metrics_company_id_idx on public.metrics(company_id);
create index metrics_recorded_at_idx on public.metrics(recorded_at desc);
create index profiles_company_id_idx on public.profiles(company_id);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.companies enable row level security;
alter table public.profiles  enable row level security;
alter table public.metrics   enable row level security;

-- ---- Companies ----
create policy "Super admins manage companies"
  on public.companies for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'super_admin'
    )
  );

create policy "Members view their own company"
  on public.companies for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.company_id = companies.id
    )
  );

-- ---- Profiles ----
create policy "Super admins manage all profiles"
  on public.profiles for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'super_admin'
    )
  );

create policy "Admins manage profiles in their company"
  on public.profiles for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role = 'admin'
        and p.company_id = profiles.company_id
    )
  );

create policy "Users view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ---- Metrics ----
create policy "Super admins manage all metrics"
  on public.metrics for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'super_admin'
    )
  );

create policy "Admins manage their company metrics"
  on public.metrics for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'admin'
        and profiles.company_id = metrics.company_id
    )
  );

create policy "Members view their company metrics"
  on public.metrics for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.company_id = metrics.company_id
    )
  );

-- ============================================================
-- Trigger: auto-create profile on new user signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- Trigger: keep updated_at current
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_companies_updated_at
  before update on public.companies
  for each row execute procedure public.set_updated_at();

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
