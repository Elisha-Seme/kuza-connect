-- KuzaConnect Supabase Schema
-- Run this in your Supabase SQL editor

-- ─────────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────────

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  organisation text,
  subject text,
  message text,
  status text default 'new' check (status in ('new', 'reviewed', 'contacted'))
);

create table if not exists impact_matcher_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  country text,
  org_type text,
  challenge text,
  scale text,
  primary_service text,
  full_result jsonb
);

create table if not exists capacity_assessments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  org_name text,
  org_type text,
  country text,
  answers jsonb,
  overall_score int,
  overall_level text,
  full_result jsonb
);

-- ─────────────────────────────────────────────
-- ENABLE RLS ON ALL TABLES
-- ─────────────────────────────────────────────

alter table leads enable row level security;
alter table impact_matcher_results enable row level security;
alter table capacity_assessments enable row level security;

-- ─────────────────────────────────────────────
-- PUBLIC INSERT POLICIES
-- Anyone (anonymous) can submit the forms/tools
-- ─────────────────────────────────────────────

create policy "Public can insert leads"
  on leads for insert
  to anon
  with check (true);

create policy "Public can insert impact_matcher_results"
  on impact_matcher_results for insert
  to anon
  with check (true);

create policy "Public can insert capacity_assessments"
  on capacity_assessments for insert
  to anon
  with check (true);

-- ─────────────────────────────────────────────
-- ADMIN READ POLICIES
-- Only authenticated users (your team) can read data
-- ─────────────────────────────────────────────

create policy "Authenticated users can read leads"
  on leads for select
  to authenticated
  using (true);

create policy "Authenticated users can read impact_matcher_results"
  on impact_matcher_results for select
  to authenticated
  using (true);

create policy "Authenticated users can read capacity_assessments"
  on capacity_assessments for select
  to authenticated
  using (true);

-- ─────────────────────────────────────────────
-- ADMIN UPDATE POLICY
-- Only authenticated users can update lead status
-- ─────────────────────────────────────────────

create policy "Authenticated users can update leads"
  on leads for update
  to authenticated
  using (true)
  with check (true);

-- ─────────────────────────────────────────────
-- NO DELETE POLICIES
-- Deletion requires the Supabase dashboard or service role key only
-- ─────────────────────────────────────────────
