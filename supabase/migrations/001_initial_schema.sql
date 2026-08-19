create extension if not exists pgcrypto;

create type public.editor_role as enum ('admin', 'editor', 'author');
create type public.content_status as enum ('draft', 'review', 'published', 'archived');
create type public.subscription_status as enum ('active', 'unsubscribed', 'suppressed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  role public.editor_role not null default 'author',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.authors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role_title text not null,
  short_bio text not null,
  long_bio text,
  avatar_url text,
  expertise text[] not null default '{}',
  disclosure text,
  linkedin_url text,
  website_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  short_description text not null,
  long_description text not null,
  icon_name text not null check (icon_name in ('calculator', 'users', 'contact', 'boxes', 'clipboard', 'store', 'messages')),
  evaluation_criteria jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.software (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  vendor_name text not null,
  tagline text,
  short_description text not null,
  long_description text,
  logo_url text,
  website_url text not null,
  affiliate_url text,
  founded_year integer check (founded_year is null or founded_year between 1900 and 2100),
  headquarters text,
  deployment text[] not null default '{}',
  business_sizes text[] not null default '{}',
  pricing_model text[] not null default '{}',
  has_free_plan boolean,
  has_free_trial boolean,
  trial_days integer check (trial_days is null or trial_days >= 0),
  supports_zar boolean,
  sa_support_level text,
  sa_availability_notes text,
  popia_notes text,
  security_notes text,
  mobile_platforms text[] not null default '{}',
  support_channels text[] not null default '{}',
  key_features text[] not null default '{}',
  integrations text[] not null default '{}',
  pricing jsonb not null default '[]'::jsonb,
  source_notes jsonb not null default '[]'::jsonb,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.software_categories (
  software_id uuid not null references public.software(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  is_primary boolean not null default false,
  primary key (software_id, category_id)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  software_id uuid not null references public.software(id) on delete cascade,
  author_id uuid not null references public.authors(id),
  editor_id uuid references public.authors(id),
  title text not null,
  deck text not null,
  verdict text not null,
  best_for text not null,
  overall_score numeric(3,1) check (overall_score is null or overall_score between 0 and 10),
  score_breakdown jsonb not null default '{}'::jsonb,
  pros text[] not null default '{}',
  cons text[] not null default '{}',
  key_facts jsonb not null default '[]'::jsonb,
  body_markdown text not null default '',
  methodology_notes text,
  testing_status text not null default 'public research',
  fact_check_status text not null default 'pending',
  hero_image_url text,
  hero_image_alt text,
  seo_title text,
  seo_description text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  updated_content_at timestamptz,
  pricing_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.comparisons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  deck text not null,
  product_a_id uuid not null references public.software(id),
  product_b_id uuid not null references public.software(id),
  author_id uuid not null references public.authors(id),
  editor_id uuid references public.authors(id),
  at_a_glance text not null,
  criteria_results jsonb not null default '[]'::jsonb,
  feature_rows jsonb not null default '[]'::jsonb,
  product_a_best_for text,
  product_b_best_for text,
  body_markdown text not null default '',
  final_verdict text not null,
  faq jsonb not null default '[]'::jsonb,
  fact_check_status text not null default 'pending',
  seo_title text,
  seo_description text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  updated_content_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint comparisons_distinct_products check (product_a_id <> product_b_id)
);

create unique index comparisons_unique_pair on public.comparisons (
  least(product_a_id, product_b_id),
  greatest(product_a_id, product_b_id)
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  author_id uuid not null references public.authors(id),
  editor_id uuid references public.authors(id),
  article_type text not null check (article_type in ('guide', 'analysis', 'news', 'explainer')),
  title text not null,
  deck text not null,
  excerpt text not null,
  body_markdown text not null default '',
  hero_image_url text,
  hero_image_alt text,
  hero_image_caption text,
  key_takeaways text[] not null default '{}',
  sources jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  updated_content_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique
);

create table public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

create table public.review_tags (
  review_id uuid not null references public.reviews(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (review_id, tag_id)
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  width integer,
  height integer,
  alt_text text not null,
  caption text,
  credit text,
  source_url text,
  licence text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email)),
  status public.subscription_status not null default 'active',
  consent_text text not null,
  consented_at timestamptz not null,
  source text not null default 'website',
  unsubscribe_token_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null,
  product_or_vendor text,
  message text not null,
  consent boolean not null,
  status text not null default 'new' check (status in ('new', 'open', 'resolved', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare table_name text;
begin
  foreach table_name in array array['profiles','authors','categories','software','reviews','comparisons','articles','media_assets','newsletter_subscribers','contact_messages','site_settings']
  loop
    execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end;
$$;

create or replace function public.current_editor_role()
returns public.editor_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = auth.uid() and is_active = true;
$$;

revoke all on function public.current_editor_role() from public;
grant execute on function public.current_editor_role() to authenticated;

create index software_status_published_idx on public.software(status, published_at desc);
create index reviews_status_published_idx on public.reviews(status, published_at desc);
create index reviews_software_idx on public.reviews(software_id);
create index comparisons_status_published_idx on public.comparisons(status, published_at desc);
create index articles_status_published_idx on public.articles(status, published_at desc);
create index software_categories_category_idx on public.software_categories(category_id);
create index contact_messages_status_idx on public.contact_messages(status, created_at desc);
create index software_search_idx on public.software using gin (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(vendor_name,'') || ' ' || coalesce(short_description,'')));
create index reviews_search_idx on public.reviews using gin (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(deck,'') || ' ' || coalesce(verdict,'')));
create index articles_search_idx on public.articles using gin (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(deck,'') || ' ' || coalesce(excerpt,'')));

alter table public.profiles enable row level security;
alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.software enable row level security;
alter table public.software_categories enable row level security;
alter table public.reviews enable row level security;
alter table public.comparisons enable row level security;
alter table public.articles enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;
alter table public.review_tags enable row level security;
alter table public.media_assets enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;

create policy profiles_read_own on public.profiles for select to authenticated using (id = auth.uid() or public.current_editor_role() = 'admin');
create policy profiles_admin_manage on public.profiles for all to authenticated using (public.current_editor_role() = 'admin') with check (public.current_editor_role() = 'admin');

create policy authors_public_read on public.authors for select using (is_active = true);
create policy authors_editor_manage on public.authors for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy categories_public_read on public.categories for select using (true);
create policy categories_editor_manage on public.categories for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy software_public_read on public.software for select using (status = 'published');
create policy software_editor_read on public.software for select to authenticated using (public.current_editor_role() in ('admin','editor','author'));
create policy software_editor_manage on public.software for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy software_categories_public_read on public.software_categories for select using (true);
create policy software_categories_editor_manage on public.software_categories for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy reviews_public_read on public.reviews for select using (status = 'published');
create policy reviews_editor_read on public.reviews for select to authenticated using (public.current_editor_role() in ('admin','editor','author'));
create policy reviews_editor_manage on public.reviews for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy comparisons_public_read on public.comparisons for select using (status = 'published');
create policy comparisons_editor_read on public.comparisons for select to authenticated using (public.current_editor_role() in ('admin','editor','author'));
create policy comparisons_editor_manage on public.comparisons for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy articles_public_read on public.articles for select using (status = 'published');
create policy articles_editor_read on public.articles for select to authenticated using (public.current_editor_role() in ('admin','editor','author'));
create policy articles_editor_manage on public.articles for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy tags_public_read on public.tags for select using (true);
create policy tags_editor_manage on public.tags for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));
create policy article_tags_public_read on public.article_tags for select using (true);
create policy article_tags_editor_manage on public.article_tags for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));
create policy review_tags_public_read on public.review_tags for select using (true);
create policy review_tags_editor_manage on public.review_tags for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy media_public_read on public.media_assets for select using (true);
create policy media_editor_manage on public.media_assets for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));

create policy newsletter_editor_read on public.newsletter_subscribers for select to authenticated using (public.current_editor_role() in ('admin','editor'));
create policy newsletter_editor_manage on public.newsletter_subscribers for update to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));
create policy messages_editor_manage on public.contact_messages for all to authenticated using (public.current_editor_role() in ('admin','editor')) with check (public.current_editor_role() in ('admin','editor'));
create policy settings_editor_read on public.site_settings for select to authenticated using (public.current_editor_role() in ('admin','editor','author'));
create policy settings_admin_manage on public.site_settings for all to authenticated using (public.current_editor_role() = 'admin') with check (public.current_editor_role() = 'admin');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('editorial-media', 'editorial-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do nothing;

create policy editorial_media_public_read on storage.objects for select using (bucket_id = 'editorial-media');
create policy editorial_media_editor_insert on storage.objects for insert to authenticated with check (bucket_id = 'editorial-media' and public.current_editor_role() in ('admin','editor'));
create policy editorial_media_editor_update on storage.objects for update to authenticated using (bucket_id = 'editorial-media' and public.current_editor_role() in ('admin','editor')) with check (bucket_id = 'editorial-media' and public.current_editor_role() in ('admin','editor'));
create policy editorial_media_editor_delete on storage.objects for delete to authenticated using (bucket_id = 'editorial-media' and public.current_editor_role() = 'admin');
