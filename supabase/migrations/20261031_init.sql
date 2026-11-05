-- =============================================================================
-- XC Global Platform Initial Database Schema & RLS Policies
-- PostgreSQL / Supabase
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS TABLE
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null check (role in ('business', 'talent', 'admin')),
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_role on public.users(role);
create index if not exists idx_users_email on public.users(email);

-- 2. BUSINESS PROFILES
create table if not exists public.business_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  company_name text not null,
  website text,
  industry text,
  company_size text,
  location text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_business_profiles_user_id on public.business_profiles(user_id);

-- 3. TALENT PROFILES
create table if not exists public.talent_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  headline text,
  location text,
  years_of_experience integer,
  skills text[] default '{}',
  preferred_roles text[] default '{}',
  availability text,
  bio text,
  linkedin_url text,
  portfolio_url text,
  cv_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_talent_profiles_user_id on public.talent_profiles(user_id);

-- 4. ONBOARDING APPLICATIONS
create table if not exists public.onboarding_applications (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  website text,
  industry text,
  company_size text,
  location text,
  contact_name text not null,
  contact_title text,
  contact_email text not null,
  contact_phone text,
  services_interested text[] default '{}',
  challenge_description text,
  how_heard text,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_onboarding_status on public.onboarding_applications(status);
create index if not exists idx_onboarding_created_at on public.onboarding_applications(created_at desc);
create index if not exists idx_onboarding_contact_email on public.onboarding_applications(contact_email);

-- 5. BLOG POSTS
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  cover_image text,
  author_id uuid references public.users(id) on delete set null,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_blog_posts_slug on public.blog_posts(slug);
create index if not exists idx_blog_posts_published on public.blog_posts(published);
create index if not exists idx_blog_posts_published_at on public.blog_posts(published_at desc);

-- 6. OPPORTUNITIES
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company_name text not null,
  location text,
  role_type text,
  description text,
  budget text,
  skills_required text[] default '{}',
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now()
);

-- =============================================================================
-- AUTOMATIC TIMESTAMP UPDATES
-- =============================================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_users_updated_at before update on public.users
  for each row execute function public.handle_updated_at();

create trigger trigger_business_profiles_updated_at before update on public.business_profiles
  for each row execute function public.handle_updated_at();

create trigger trigger_talent_profiles_updated_at before update on public.talent_profiles
  for each row execute function public.handle_updated_at();

create trigger trigger_onboarding_applications_updated_at before update on public.onboarding_applications
  for each row execute function public.handle_updated_at();

create trigger trigger_blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.handle_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

alter table public.users enable row level security;
alter table public.business_profiles enable row level security;
alter table public.talent_profiles enable row level security;
alter table public.onboarding_applications enable row level security;
alter table public.blog_posts enable row level security;
alter table public.opportunities enable row level security;

-- Helper to check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- USERS POLICIES
create policy "Users can read own record or admin"
  on public.users for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update own record or admin"
  on public.users for update
  using (auth.uid() = id or public.is_admin());

create policy "Admins can delete users"
  on public.users for delete
  using (public.is_admin());

-- BUSINESS PROFILES POLICIES
create policy "Business profiles read by owner or admin"
  on public.business_profiles for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Business profiles create by owner"
  on public.business_profiles for insert
  with check (auth.uid() = user_id);

create policy "Business profiles update by owner or admin"
  on public.business_profiles for update
  using (auth.uid() = user_id or public.is_admin());

create policy "Business profiles delete by admin"
  on public.business_profiles for delete
  using (public.is_admin());

-- TALENT PROFILES POLICIES
create policy "Talent profiles read by owner or admin"
  on public.talent_profiles for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Talent profiles create by owner"
  on public.talent_profiles for insert
  with check (auth.uid() = user_id);

create policy "Talent profiles update by owner or admin"
  on public.talent_profiles for update
  using (auth.uid() = user_id or public.is_admin());

create policy "Talent profiles delete by admin"
  on public.talent_profiles for delete
  using (public.is_admin());

-- ONBOARDING APPLICATIONS POLICIES
create policy "Public can submit onboarding application"
  on public.onboarding_applications for insert
  with check (true);

create policy "Admins can read onboarding applications"
  on public.onboarding_applications for select
  using (public.is_admin());

create policy "Admins can update onboarding applications"
  on public.onboarding_applications for update
  using (public.is_admin());

create policy "Admins can delete onboarding applications"
  on public.onboarding_applications for delete
  using (public.is_admin());

-- BLOG POSTS POLICIES
create policy "Anyone can read published blog posts"
  on public.blog_posts for select
  using (published = true or public.is_admin());

create policy "Admins can manage blog posts"
  on public.blog_posts for all
  using (public.is_admin());

-- OPPORTUNITIES POLICIES
create policy "Talents and admins can read opportunities"
  on public.opportunities for select
  using (auth.role() = 'authenticated' or public.is_admin());

create policy "Admins can manage opportunities"
  on public.opportunities for all
  using (public.is_admin());

-- =============================================================================
-- STORAGE BUCKET FOR RESUMES / CVS
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

create policy "Talents can upload their own resume"
  on storage.objects for insert
  with check (
    bucket_id = 'resumes' and
    auth.role() = 'authenticated' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Talents and Admins can read resumes"
  on storage.objects for select
  using (
    bucket_id = 'resumes' and (
      (storage.foldername(name))[1] = auth.uid()::text or
      public.is_admin()
    )
  );

-- =============================================================================
-- SAMPLE SEED DATA
-- =============================================================================
insert into public.blog_posts (title, slug, excerpt, content, published, published_at)
values
(
  'The Death of Blended CAC: Why Precision Growth Engineering Wins',
  'the-death-of-blended-cac',
  'In the era of privacy changes and high interest rates, relying on blended customer acquisition costs hides unsustainable unit economics.',
  '## The Post-ZIRP Growth Reality

For nearly a decade, venture-backed startups relied on blended Customer Acquisition Cost (CAC) to obscure inefficient paid media acquisition. When capital was virtually free, scale took precedence over payback periods. Today, that playbook is broken.

### Why Blended CAC Fails Tech Scale-Ups

1. **Attribution Blindness**: Organic brand tailwinds mask decaying paid performance.
2. **Channel Cannibalization**: Brand search campaigns claim credit for organic discovery.
3. **Delayed Churn Visibility**: Top-line acquisition disguises month-2 cohort deterioration.

### The Precision Growth Framework

Modern tech ventures require high-velocity acquisition architecture, algorithmic attribution, and structured growth engineering tied directly to enterprise valuation. XC Global bridges marketing leaders and specialized execution talent directly into your commercial squad to ensure every marketing dollar drives verifiable net revenue.',
  true,
  now()
)
on conflict (slug) do nothing;

insert into public.opportunities (title, company_name, location, role_type, budget, skills_required, description, status)
values
(
  'Senior Performance Marketing Lead',
  'ApexPay (Fintech Series A)',
  'Remote (West Africa / Europe)',
  'Full-time / Embedded',
  '$6,000 - $8,500 / mo',
  array['Meta Ads', 'Google Ads', 'Attribution', 'Fintech', 'Mixpanel'],
  'Lead customer acquisition across Nigerian and Ghanaian corridors for a tier-one remittance and business banking platform.',
  'open'
),
(
  'Shopify CRO & Retention Specialist',
  'OmniCart (E-Commerce Scale-up)',
  'Remote (Global)',
  'Fractional / Sprint-based',
  '$4,500 - $6,000 / mo',
  array['Shopify Plus', 'Klaviyo', 'CRO', 'A/B Testing', 'Liquid'],
  'Optimize post-click conversion rates and retention loops for a high-growth multi-brand consumer goods venture.',
  'open'
),
(
  'Product-Led Growth (PLG) Strategist',
  'CortexAI (B2B SaaS)',
  'Remote (US / UK / Africa)',
  'Contract / 6 Months',
  '$7,000 - $9,000 / mo',
  array['PLG', 'HubSpot', 'Stripe Billing', 'Onboarding Funnels', 'Product Analytics'],
  'Design and execute automated self-serve trial-to-paid conversion funnels for an enterprise developer tool.',
  'open'
);

