# Turning on the contact form and the newsletter

Both forms write to Supabase. Until this site has **its own** Supabase project
and the keys below are set, the forms return a 503 and tell the reader to email
`editor@selectsoft.co.za` instead. Nothing is silently lost, but a live
publication should have the form working.

> Do not point this site at the `bosberaaad` Supabase project. That is a
> different site's database. Its `software` table holds a different product set,
> and its `reviews` table holds 8 099 rows of user reviews that this publication
> does not have and must never display.

## 1. Create a project

Create a Supabase project in a region you are willing to disclose. The privacy
policy already states that information may be processed outside South Africa
under section 72 of POPIA, which covers a European or other region, but keep the
policy and reality in step.

## 2. Create the two tables

Run this once, in the SQL editor:

```sql
create table if not exists public.newsletter_subscribers (
  id           uuid primary key default gen_random_uuid(),
  email        text not null unique,
  status       text not null default 'active',
  source       text,
  consent_text text,
  consented_at timestamptz,
  created_at   timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text not null,
  topic            text not null,
  product_or_vendor text,
  message          text not null,
  consent          boolean not null default false,
  status           text not null default 'new',
  created_at       timestamptz not null default now()
);

-- Readers must never be able to read these tables. The site writes to them
-- with the service role key from the server, which bypasses RLS; leaving RLS
-- on with no public policy is what keeps them private.
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages       enable row level security;
```

## 3. Set the keys

Local development, in `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>
```

Production, as Cloudflare Worker secrets:

```bash
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
```

`SUPABASE_SERVICE_ROLE_KEY` must never appear in client code, in the repository
or in a `NEXT_PUBLIC_` variable. It is read only inside the two API routes.

## 4. Prove it works

```bash
curl -s -X POST https://<your-domain>/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"you@example.com","topic":"Editorial question",
       "message":"Checking that the contact route reaches the editorial desk.",
       "consent":"yes"}'
```

A working form returns `{"message":"Your note has reached the editorial desk."}`
with HTTP 200, and the row appears in `contact_messages`. Keep that response as
the evidence for a partner application, then delete the test row.

## 5. Retention

The privacy policy promises contact messages are deleted after 24 months. Put a
scheduled job behind that promise rather than relying on memory:

```sql
delete from public.contact_messages
where created_at < now() - interval '24 months'
  and status <> 'correction';
```

---

# Adding more third party ratings

Ratings live in `app/lib/ratings.ts`. Rules, enforced by a test:

- Read the figure off the live source page yourself. Never from a search
  snippet, and never from a page whose title does not name the product. An
  early attempt here returned a rating for "PDF Image Extractor" from a URL
  that looked like Xero's.
- Record the score, the review count and the exact source URL.
- Update `RATINGS_CHECKED_ON` when you re-check.
- Anything under `MIN_REVIEWS` (25) stays in the comment block, not on the page.
- Publish the bad ones too.

Still to gather, blocked when this was written:

| Product | Why not yet |
| --- | --- |
| Odoo, Shopify, HubSpot, Business Central, Sage HR, SYSPRO, SAP Business One | G2 rate limited the session after five lookups; retry later and slowly |
| Palladium, Omni Accounts, CaseWare, Skynamo, PaySpace | no G2 or Trustpilot profile found |
| Sage Pastel, Sage Payroll, Sage 300 People, Sage HR, Sage 200 Evolution | all share sage.com on Trustpilot, so a company score cannot be attached to one product |
| Anything on Capterra | capterra.co.za blocks automated access entirely |

G2 exposes `aggregateRating` in JSON-LD, so once a page loads:

```js
document.documentElement.innerHTML
  .match(/"aggregateRating":\{[^}]*"ratingValue":([\d.]+),"reviewCount":(\d+)/)
```

Trustpilot shows it in the page text as `Reviews 11,304 • 4.1`.

**Do not republish review text from either source.** The words belong to the
people who wrote them and to the platform, and both sets of terms forbid it.
Cite the aggregate, link out, and if you want review text on this site, collect
your own under section 2 above.
