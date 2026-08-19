# Complete Claude Code Prompt — Software Select ZA

Copy everything under **START OF PROMPT** into Claude Code. The prompt is intentionally self-contained and assumes Claude can create and edit files, run commands, and test the result.

---

## START OF PROMPT

You are a principal full-stack engineer, product designer, UX writer, database architect, technical SEO specialist, and accessibility expert. Build the complete production-quality website described below. Work directly in the current repository and finish the implementation; do not merely provide a plan, wireframe, pseudo-code, or a few sample components.

If the repository is empty, initialise the application in the current directory. Do not create an unnecessary nested project directory. If code already exists, inspect it first, preserve unrelated work, and adapt the implementation cleanly.

Do not ask routine questions. Make the reasonable defaults specified in this brief. Keep all brand-level strings, URLs, contact details, social links, and feature flags in one typed configuration file so they can be changed later without searching the codebase.

## 1. Product objective

Create **Software Select ZA**, a premium independent editorial publication that helps South African businesses discover, evaluate, and compare business software.

The site covers:

- Accounting and finance software
- Payroll and HR software
- CRM and sales software
- ERP and operations software
- Project management software
- E-commerce and point-of-sale software
- Marketing and customer-support software
- Individual software reviews
- Side-by-side software comparisons
- Buying guides, explainers, and editorial articles

The audience is South African founders, finance teams, operations leaders, HR teams, sales teams, professional practices, and growing SMEs. Write for an informed business reader in clear South African English. Use South African context only where it is useful: ZAR pricing, VAT notes, local payment methods, POPIA considerations, local support hours, payroll/tax relevance, load-shedding/offline considerations where genuinely applicable, and date/time formatting appropriate to South Africa. Never force clichés, flags, safari imagery, or generic “African” visual tropes.

Use the working brand **Software Select ZA**. Put the brand in `src/config/site.ts` (or the equivalent central config) so it can be renamed easily. Suggested positioning line:

> Independent software research for South African businesses.

Suggested homepage hero:

- Eyebrow: `Independent software research for South African businesses`
- H1: `Choose business software with confidence.`
- Supporting copy: `Practical reviews, clear comparisons and locally relevant guidance for the tools that run your business.`
- Primary CTA: `Explore software`
- Secondary CTA: `Compare tools`
- Search placeholder: `Search accounting, payroll, CRM and more`

Do not invent claims such as “#1 in South Africa”, reader counts, years of experience, awards, test results, or vendor partnerships. Do not claim software was hands-on tested unless the content record explicitly says it was tested and includes evidence/method notes.

## 2. Reference-image analysis and creative direction

The four supplied images are inspiration only. Do not copy their brands, wording, exact compositions, images, page structures, or distinctive trade dress. Create an original editorial system from these reusable qualities:

1. Reference one: a narrow, highly art-directed web composition with a dramatic top panel, stacked white editorial sections, strong scale contrast, clean project cards, and occasional dark section changes.
2. Reference two: unusually generous whitespace, oversized typography, fine technical linework, architectural framing, subtle grid texture, and precise asymmetric layouts.
3. Reference three: a calm hero with a centred message, disciplined navigation, a large product-interface image, and a photographic foreground that gives the composition depth.
4. Reference four: a compact, beautifully proportioned page frame, an extremely minimal header, a focused message, warm neutral surface colour, and one exceptional organic photograph.

Synthesis for this site:

- Premium editorial publication, not a SaaS landing page.
- Light, warm-neutral overall canvas with disciplined deep-blue accents.
- Large, tightly set headings and small, highly legible UI copy.
- Generous negative space and visible grid logic.
- Mostly flat surfaces, fine dividers, and purposeful image crops.
- One strong visual idea per section; no decorative clutter.
- Product screenshots and official vendor logos should feel like editorial evidence, not advertisements.
- Alternate section density and occasional solid-colour panels to create rhythm, but keep most of the experience light.
- Use subtle technical linework or a very faint square/dot grid in at most one hero/background region. It must be CSS/SVG, low-contrast, and never noisy.

The final design must feel commissioned and art-directed. It must not look like a generic AI-generated template, a component-library demo, a crypto site, or a startup “bento-grid” landing page.

## 3. Non-negotiable visual rules

### Colour palette

Use these exact core colours:

- Global page background: `#f1f1f1`
- Charcoal: `#43464d`
- Soft periwinkle: `#bcc6ff`
- Deep blue: `#0000a0`
- Warm stone: `#e2ddd5`

You may add only functional neutrals:

- White surface: `#ffffff`
- Near-black text where extra contrast is needed: `#111216`
- Muted text derived from charcoal
- Borders derived from charcoal at low opacity
- Success, warning, and error colours only for form/status feedback, not decoration

Rules:

- No gradients anywhere: not in CSS, SVG, text, borders, overlays, images created as backgrounds, or hover states.
- Do not introduce purple/pink/teal rainbow accents.
- Use deep blue sparingly for primary actions, links, selection states, and key editorial emphasis.
- Use periwinkle as a solid highlight surface, not as a glow.
- Use warm stone for occasional section or card surfaces.
- Ensure every text/background pairing meets WCAG AA contrast. Deep blue text on periwinkle is encouraged when accessible.

Create semantic CSS custom properties such as `--background`, `--foreground`, `--surface`, `--muted`, `--primary`, `--primary-soft`, `--stone`, `--border`, and `--focus` rather than scattering hex values throughout components.

### Typography

Use only:

- **Inter Tight** for display headings, page titles, large numbers, and editorial pull quotes.
- **DM Sans** for body copy, labels, buttons, navigation, tables, forms, and metadata.

Load both through `next/font/google` (or a self-hosted equivalent if the framework requires it) so font loading is optimised and there is no layout shift.

Recommended scale:

- Hero H1: fluid `clamp(3.25rem, 7vw, 7.25rem)`, line-height about `0.92–0.98`, slightly negative tracking.
- Page H1: fluid `clamp(2.75rem, 5.5vw, 5.5rem)`.
- Section H2: fluid `clamp(2rem, 4vw, 4rem)`.
- Card H3: `1.25–1.6rem`.
- Body large: `1.125–1.25rem`, maximum line length about 62–68 characters.
- Body: `1rem`, line-height about `1.6`.
- Metadata/eyebrows: `0.75–0.875rem`, slightly increased letter spacing; avoid all-caps paragraphs.

### Icons

- Use real, recognisable line icons from one consistent open-source set such as `lucide-react` for functional UI only.
- Icons must have transparent backgrounds. Do not place icons inside coloured circles, rounded squares, blobs, or tiles.
- Never use sparkle, sparkles, magic wand, zap/lightning, rocket, starburst, brain, bot, orbit, floating cube, or other “AI template” icons.
- Do not use emoji as icons.
- Do not add an icon when a clear text label is better.
- Vendor marks must use official transparent SVG/PNG assets stored through the media system. Do not redraw, fake, or generate vendor logos. If an official asset is unavailable, render the vendor name as text instead.

### Shape, borders, and depth

- Main container: approximately `1280px`, with responsive gutters.
- Reading column: approximately `720–760px`.
- Use a 12-column desktop grid and deliberate alignments.
- Most corners should be square or use a restrained `8–14px` radius.
- Avoid excessive pills. Pills are allowed only for true tags, statuses, and compact filters.
- Use 1px borders and spacing before shadows. Shadows, if any, must be very subtle and used only to separate a floating navigation/search result or product screenshot.
- No glassmorphism, frosted panes, glowing edges, blurred blobs, neumorphism, or 3D floating cards.

### Motion

- Motion must be restrained: 150–250ms transitions for colour, opacity, underline, and small position changes.
- Optional reveal animation may use opacity plus no more than 8px translation.
- No parallax, cursor followers, marquees, autoplay carousels, infinite bouncing, or scroll-jacking.
- Fully honour `prefers-reduced-motion`.

## 4. Required technology and engineering approach

Use a modern, stable stack compatible with the repository at implementation time:

- Next.js App Router
- TypeScript with strict mode
- React Server Components by default
- Tailwind CSS for layout and tokens, backed by a small global stylesheet for variables and editorial prose
- Supabase for PostgreSQL, authentication, and image/file storage
- Official Supabase SSR helpers for cookie-based sessions
- Zod for validation
- React Hook Form only where it materially simplifies complex admin forms
- Lucide React for functional icons subject to the icon restrictions above
- Markdown stored in Supabase for long-form editorial bodies, rendered with a secure Markdown renderer and sanitisation
- `next/image` for raster images and native SVG rendering for trusted local SVG assets
- ESLint, formatting, type checking, and automated tests
- Playwright for a small but meaningful end-to-end suite

Do not install a heavyweight UI kit or copy a stock theme. Build a small custom component system. Do not use shadcn styling wholesale; if a primitive is needed, implement it so it matches this visual system.

Architecture rules:

- Server components and server-side data fetching by default.
- Client components only for the mobile menu, filters, autocomplete, comparison selector, copy/share actions, and admin editing interactions.
- Keep Supabase server and browser clients separate.
- Never expose the Supabase service-role key to the browser.
- Use route handlers or server actions for privileged writes.
- Validate every external input with Zod on the server.
- Use generated database types and typed repository/service functions.
- Keep UI components independent of raw Supabase query details.
- Add proper loading, empty, not-found, and error states.
- Do not leave TODOs, commented-out abandoned code, fake APIs, broken links, or dead controls.

If Supabase credentials are not present during development, the project must still lint, type-check, test, and build. Use a clearly isolated local fixture adapter only for explicit preview/test mode; production data access must use Supabase. Include `.env.example` with no secrets.

## 5. Information architecture and routes

Build all of the following pages and routes.

### Public routes

- `/` — editorial homepage
- `/software` — all software directory
- `/software/[categorySlug]` — category landing page
- `/reviews` — all reviews with filters and pagination
- `/reviews/[slug]` — complete review template
- `/compare` — comparison finder/builder and published comparisons
- `/compare/[slug]` — complete two-product comparison template, for example `/compare/xero-vs-quickbooks-online`
- `/guides` — buying guides and editorial article index
- `/guides/[slug]` — article template
- `/search` — full-site search results
- `/authors/[slug]` — author profile and content archive
- `/about` — publication purpose and team
- `/methodology` — how products are evaluated and scored
- `/editorial-policy` — independence, corrections, sourcing, review process
- `/affiliate-disclosure` — clear commercial disclosure
- `/contact` — accessible contact form
- `/privacy` — POPIA-aware privacy notice scaffold clearly marked for legal review
- `/terms` — terms scaffold clearly marked for legal review
- `/robots.txt`
- `/sitemap.xml`
- `/rss.xml`

### Admin routes

- `/admin/login`
- `/admin`
- `/admin/software`
- `/admin/software/new`
- `/admin/software/[id]`
- `/admin/reviews`
- `/admin/reviews/new`
- `/admin/reviews/[id]`
- `/admin/comparisons`
- `/admin/comparisons/new`
- `/admin/comparisons/[id]`
- `/admin/guides`
- `/admin/guides/new`
- `/admin/guides/[id]`
- `/admin/categories`
- `/admin/authors`
- `/admin/media`
- `/admin/newsletter`
- `/admin/messages`
- `/admin/settings`

Protect all admin routes on the server. Unauthenticated users go to `/admin/login`. Authenticated users without an allowed editorial role receive a proper 403 screen rather than seeing private content.

## 6. Site-wide header, navigation, search, and footer

### Announcement/disclosure bar

At most one compact disclosure bar may appear above the header. Use it only for a useful editorial message such as:

`Independent reviews. Some links may earn us a commission, without affecting our verdicts.`

Link `our methodology` and `affiliate disclosure`. Make it dismissible with an accessible button and remember dismissal locally. Do not create fake urgency.

### Header

Create a calm, sticky header that becomes slightly more compact after scrolling without turning into a glass effect.

Desktop structure:

- Left: text-led Software Select ZA wordmark with a simple original geometric mark; the mark may be an inline SVG made from plain rectangles/lines, not a spark or letter in a coloured icon container.
- Middle: `Software reviews`, `Comparisons`, `Categories`, `Guides`.
- `Categories` opens a keyboard-accessible mega menu with the seven main software categories and short descriptions.
- Right: search button/field and a deep-blue `Compare software` action.

Mobile structure:

- Wordmark left, search and menu controls right.
- A full-width, accessible navigation drawer; focus is trapped, Escape closes it, and the trigger reports expanded state.
- Do not hide important navigation behind ambiguous icons without accessible labels.

### Search

- Header search opens a minimal command-style search panel.
- Search software, reviews, comparisons, guides, and categories.
- Debounce input, support keyboard navigation, announce result count to screen readers, and handle zero/loading/error states.
- `/search?q=` provides a durable, shareable results page.
- Use PostgreSQL full-text search or a documented Supabase query suitable for the initial dataset. Do not require an external search service.

### Footer

Create a restrained, content-rich footer on a solid deep-blue or charcoal background; no gradients.

Include:

- Wordmark and positioning statement
- Columns for `Explore`, `Categories`, `About`, and `Legal`
- Newsletter signup
- Contact email from central config
- Small affiliate disclosure
- Copyright with dynamic year
- `Made for better software decisions in South Africa.`

Do not stuff the footer with fake social profiles. Only render social links configured with real URLs.

## 7. Homepage — exactly seven purposeful content sections

The header and footer are not counted. Build these seven sections with a clear editorial rhythm.

### Section 1 — Hero and discovery search

Use a 12-column asymmetric layout on desktop and a strong single-column layout on mobile.

Left/content area:

- Eyebrow, H1, short supporting paragraph
- Primary and secondary CTA
- Large accessible software search field
- A quiet text row linking to popular categories: `Accounting`, `Payroll`, `CRM`, `ERP`

Right/visual area:

- Use the original hero photograph described in the image prompt section below.
- Overlay only real HTML editorial UI: a small “Selection notes” card with three criteria such as `Local support`, `ZAR pricing`, and `POPIA fit`; do not bake interface text into the generated image.
- Use solid periwinkle or warm-stone shapes as flat framing blocks. No gradient or glow.

### Section 2 — Browse by category

- Intro label: `Find the right category`
- Heading: `Start with the work you need to improve.`
- Seven category rows/cards in a disciplined grid.
- Each category shows its name, a one-sentence description, number of published reviews from the database, and up to four text vendor names.
- Use a small relevant Lucide line icon beside the category title with no icon container/background.
- Include an `Explore all software` link.
- Cards should feel like an editorial index, not identical rounded feature tiles.

Initial categories and suggested descriptions:

1. Accounting & Finance — `Invoicing, bookkeeping, reporting and cash-flow tools for South African teams.`
2. Payroll & HR — `Payroll, leave, HR records and workforce tools with local requirements in view.`
3. CRM & Sales — `Manage leads, customer relationships, pipelines and sales activity.`
4. ERP & Operations — `Connect finance, inventory, procurement and operational workflows.`
5. Project Management — `Plan work, coordinate teams and keep delivery visible.`
6. E-commerce & POS — `Sell online or in person, accept payments and manage stock.`
7. Marketing & Support — `Reach customers, manage campaigns and deliver better service.`

### Section 3 — Editor’s selected reviews

- Warm-white or white surface with a thin top border.
- Header includes `Editor’s selection`, a strong heading, short explanation, and `View all reviews`.
- One large lead review and three smaller review rows/cards.
- Show official vendor logo with transparent background, product name, category, concise verdict, score out of 10 if a verified score exists, `Best for`, review date, and CTA.
- Do not use star ratings. A numeric editorial score and labelled criteria are more appropriate.
- Do not fill the section with fabricated accolades such as “most loved”.

Suggested development seed products (all editorial facts and pricing must be verified before publication):

- Sage Accounting
- Xero
- QuickBooks Online
- Zoho Books
- SimplePay
- PaySpace
- HubSpot CRM
- Zoho CRM
- Odoo
- Microsoft Dynamics 365 Business Central
- Shopify
- Yoco

### Section 4 — Comparison spotlight and builder

- Use a solid periwinkle section with deep-blue text.
- Heading: `Put two tools side by side.`
- Short copy explaining practical, like-for-like comparisons.
- Two searchable product selectors separated by the text `versus`; do not use a lightning icon.
- Button: `Build comparison`.
- Below, show three published comparison links such as `Xero vs QuickBooks Online`, `Sage Accounting vs Xero`, and `HubSpot CRM vs Zoho CRM` only as seed examples.
- The selector prevents choosing the same product twice and offers a useful validation message.
- If no editorial comparison exists, route to a dynamic summary page clearly identified as an unscored data comparison; never generate an invented editorial verdict.

### Section 5 — Built for the South African buying decision

- Asymmetric split section inspired by technical editorial diagrams, not by tourism advertising.
- Left: a low-contrast original line illustration of a contemporary South African business streetscape or workspace, created from the image prompt below.
- Right: label, heading `What changes when you buy software in South Africa?`, short intro, and four numbered criteria:
  - `01 / Pricing in rand` — billing currency, VAT clarity, exchange-rate exposure
  - `02 / Local compliance` — payroll/tax or POPIA relevance where applicable
  - `03 / Support that overlaps` — support hours, partners, onboarding, response routes
  - `04 / Payments and integrations` — South African banks, gateways, accounting and commerce stack
- Add link `Read our evaluation methodology`.
- Do not imply every product was locally tested; data should come from the database.

### Section 6 — Latest guides and analysis

- Heading: `Practical guidance, without the sales pitch.`
- One featured article with a strong original editorial image and four compact article cards/rows.
- Card metadata: topic, reading time, title, excerpt, author, published date.
- Include a clear `All guides` link.
- Seed guide titles:
  - `How to choose accounting software for a South African small business`
  - `Cloud payroll software: the questions to ask before switching`
  - `CRM pricing explained: seats, contacts, onboarding and hidden costs`
  - `ERP or accounting software? Where growing teams draw the line`
  - `A practical POPIA checklist for business software buyers`

### Section 7 — Newsletter and editorial trust

- A quiet warm-stone panel, not a loud conversion banner.
- Heading: `Make a better software decision.`
- Copy: `A concise monthly note with new reviews, comparisons and buying guidance for South African teams.`
- Email field, consent text, and `Subscribe` button.
- Beside or below it, link to methodology, editorial policy, corrections/contact, and affiliate disclosure.
- No fake subscriber counts, countdowns, or urgency.

## 8. Software directory and category pages

### `/software`

- Page title and brief explanatory intro
- Search
- Filters for category, pricing model, business size, deployment, South African support, and sort order
- Active-filter summary and clear-all action
- Server-driven, URL-synchronised filters so results are linkable and work without JavaScript
- Desktop sidebar or filter bar; accessible mobile filter sheet
- Result count with live-region updates after client-side enhancement
- Editorial software cards with logo, name, short summary, categories, deployment, starting-price display only when data is sourced/current, and links to review/compare
- Pagination; do not implement infinite scroll
- Useful zero-results state with filter reset

### `/software/[categorySlug]`

- Unique editorial introduction, not a generic template paragraph
- “How we evaluate this category” summary
- Featured/top-reviewed products based on editorial records, without claiming rankings not supported by data
- Complete filterable list
- Relevant published comparisons
- Relevant guides
- FAQ sourced from category data
- Visible “Last reviewed” or “Last updated” date
- Breadcrumbs

## 9. Review page template

The review page must be credible, scan-friendly, and rich enough for a serious editorial publication.

Required order:

1. Breadcrumbs
2. Review header:
   - Category label
   - H1 such as `Xero review: is it right for South African businesses?`
   - One-sentence deck
   - Author, editor/reviewer if present, published date, updated date, and fact-check status
   - Official product logo, never AI-generated
3. Review summary panel:
   - Overall score out of 10 only when verified
   - 40–60 word verdict
   - `Best for`
   - Primary vendor link with external-link indication
   - Pricing/source review date
   - Clear affiliate label when applicable
4. Key facts row: deployment, typical business size, free trial, mobile apps, support availability, South Africa-specific notes
5. Pros and cons in two columns; use check and minus icons with no icon backgrounds
6. Sticky in-page table of contents on desktop, collapsible accessible contents on mobile
7. Main Markdown editorial body with sections:
   - Overview
   - Who it is best for
   - Key features
   - Ease of use
   - Pricing and value
   - South African fit
   - Integrations
   - Support and onboarding
   - Security and privacy considerations
8. Score breakdown with labelled horizontal bars; use solid fills, no gradients
9. Pricing table with billing frequency, VAT/source/date caveats, and no unsourced figures
10. Product screenshots with captions and source/permission metadata
11. Alternatives: three relevant products
12. Final verdict
13. Methodology/disclosure note
14. FAQs
15. Author card
16. Related comparisons and guides

Review integrity rules:

- Never fabricate testing, interviews, prices, customer counts, local integrations, or compliance certifications.
- Price fields include currency, billing period, VAT inclusion state, source URL, and `checked_at` date.
- Show `Contact vendor` when a price cannot be verified.
- External commercial links use `rel="sponsored nofollow noopener"` when affiliate-linked; ordinary cited sources use safe external link attributes without `sponsored`.
- “Best for” is editorial guidance, not a badge with decorative iconography.
- Score breakdown dimensions can vary by category but should normally include usability, features, value, support, and South African fit.
- Render review structured data only when all required values are genuine.

## 10. Comparison builder and comparison page

### Finder/builder

- Searchable, keyboard-accessible selectors using software records
- Prevent duplicate selection
- Recently/popularly compared pairs based only on stored/published data
- URL retains selected slugs
- If a comparison is published, route to its canonical URL
- If it is not published, show a neutral attribute comparison assembled from verified product records and label it `Data comparison — no editorial verdict yet`

### Published comparison template

Required order:

1. Breadcrumbs
2. H1 and concise deck
3. Author/date/fact-check metadata
4. Product A and B identity block with official logos
5. `At a glance` editorial verdict
6. Winner-by-criterion table; allow `Tie` or `Depends` rather than forcing a winner
7. Sticky comparison table with grouped rows:
   - Ideal customer
   - Pricing model and reviewed date
   - Accounting/CRM/etc. core features appropriate to category
   - Automation
   - Reporting
   - Integrations
   - Mobile apps
   - Support
   - Security/privacy
   - South African availability and context
8. Detailed sections: ease of use, features, pricing/value, integrations, support, local fit
9. `Choose A if…` and `Choose B if…`
10. Final recommendation with nuance
11. FAQs
12. Methodology and disclosure
13. Related reviews/guides

On small screens, do not create an unreadable squeezed table. Keep the first column sticky where practical, use horizontal scrolling with visible affordance, or transform grouped rows into accessible A/B stacks while preserving table semantics where possible.

## 11. Guides, authors, static trust pages, and contact

### Guides index and article template

- Editorial index with topic filters and pagination
- Featured story plus clean list/grid, not a repetitive card wall
- Article page: breadcrumbs, label, headline, deck, byline, dates, hero image/caption, key takeaways panel, table of contents, long-form Markdown body, sources/footnotes, author bio, related content, and newsletter module
- Reading time calculated from content, not manually fabricated
- Use proper prose typography and an accessible heading hierarchy
- External facts should support citations/source links in the content model

### Author pages

- Name, transparent portrait or neutral editorial photograph, role, bio, expertise, disclosure, optional verified social/professional links, and content archive
- Never invent qualifications

### Editorial trust pages

Write substantial, plain-language initial copy for `/methodology`, `/editorial-policy`, and `/affiliate-disclosure`. Cover:

- How categories and products are selected
- Research sources
- Hands-on testing rules
- Scoring and update cadence
- Vendor fact checking without vendor approval of verdicts
- Corrections process
- Affiliate independence
- AI assistance policy: AI may assist drafting/research organisation, but factual claims and final editorial decisions require human review

Do not present legal pages as final legal advice. Add an admin-only launch checklist noting that privacy and terms text require review by South African counsel.

### Contact form

Fields: name, work email, topic, message, optional product/vendor, consent checkbox, and honeypot. Validate on client for helpfulness and always validate on server. Add rate limiting suitable for the hosting environment, generic success messaging, and no leakage of internal errors.

## 12. Content model and Supabase database

Create a full Supabase migration in `supabase/migrations/001_initial_schema.sql`, a seed file in `supabase/seed.sql`, generated TypeScript database types, and clear setup instructions. Use UUID primary keys, `created_at`, `updated_at`, useful indexes, foreign keys, check constraints, and an `updated_at` trigger.

Use enums or constrained text for roles/statuses where Supabase tooling remains ergonomic.

### Required tables

#### `profiles`

- `id` references `auth.users`
- `full_name`
- `avatar_url`
- `role`: `admin | editor | author`
- `is_active`
- timestamps

#### `authors`

- `id`, `slug`, `name`, `role_title`, `short_bio`, `long_bio`
- `avatar_url`, `expertise text[]`, `disclosure`
- `linkedin_url`, `website_url`
- `is_active`, timestamps

#### `categories`

- `id`, unique `slug`, `name`, `short_description`, `long_description`
- `icon_name` from an allow-list of approved non-decorative icons
- `evaluation_criteria jsonb`
- `faq jsonb`
- `seo_title`, `seo_description`
- `sort_order`, `is_featured`, timestamps

#### `software`

- `id`, unique `slug`, `name`, `vendor_name`
- `tagline`, `short_description`, `long_description`
- `logo_url`, `website_url`, `affiliate_url`
- `founded_year` nullable and sourced
- `headquarters` nullable and sourced
- `deployment text[]`
- `business_sizes text[]`
- `pricing_model text[]`
- `has_free_plan`, `has_free_trial`, `trial_days`
- `supports_zar`, `sa_support_level`, `sa_availability_notes`
- `popia_notes`, `security_notes`
- `mobile_platforms text[]`, `support_channels text[]`
- `key_features text[]`, `integrations text[]`
- `pricing jsonb` with plan, amount, currency, interval, VAT state, source URL, checked date
- `source_notes jsonb`
- `status`: `draft | review | published | archived`
- `published_at`, timestamps

#### `software_categories`

- `software_id`, `category_id`, `is_primary`
- composite primary key and indexes

#### `reviews`

- `id`, unique `slug`, `software_id`, `author_id`, optional `editor_id`
- `title`, `deck`, `verdict`, `best_for`
- `overall_score numeric(3,1)` constrained to 0–10 and nullable
- `score_breakdown jsonb`
- `pros text[]`, `cons text[]`, `key_facts jsonb`
- `body_markdown`
- `methodology_notes`, `testing_status`, `fact_check_status`
- `hero_image_url`, `hero_image_alt`
- `seo_title`, `seo_description`
- `status`, `published_at`, `updated_content_at`
- `pricing_checked_at`, timestamps

#### `comparisons`

- `id`, unique `slug`, `title`, `deck`
- `product_a_id`, `product_b_id` with constraint preventing equality
- `author_id`, optional `editor_id`
- `at_a_glance`, `criteria_results jsonb`, `feature_rows jsonb`
- `product_a_best_for`, `product_b_best_for`
- `body_markdown`, `final_verdict`, `faq jsonb`
- `fact_check_status`, `seo_title`, `seo_description`
- `status`, `published_at`, `updated_content_at`, timestamps
- unique unordered-product-pair logic so A-vs-B and B-vs-A cannot both be published as duplicates

#### `articles`

- `id`, unique `slug`, `author_id`, optional `editor_id`
- `article_type`: `guide | analysis | news | explainer`
- `title`, `deck`, `excerpt`, `body_markdown`
- `hero_image_url`, `hero_image_alt`, `hero_image_caption`
- `key_takeaways text[]`, `sources jsonb`
- `seo_title`, `seo_description`
- `status`, `published_at`, `updated_content_at`, timestamps

#### `tags`, `article_tags`, `review_tags`

- Normalised tag records and junction tables with appropriate composite keys

#### `media_assets`

- `id`, `storage_path`, `public_url`, `file_name`, `mime_type`, `size_bytes`
- `width`, `height`, `alt_text`, `caption`, `credit`, `source_url`, `licence`
- `uploaded_by`, timestamps

#### `newsletter_subscribers`

- `id`, normalised unique `email`, `status`, `consent_text`, `consented_at`
- `source`, `unsubscribe_token_hash`, timestamps
- Do not store a raw unsubscribe token

#### `contact_messages`

- `id`, `name`, `email`, `topic`, `product_or_vendor`, `message`
- `consent`, `status`, timestamps

#### `site_settings`

- `key` primary key, `value jsonb`, `updated_by`, timestamps
- Use for editable editorial settings, not secrets

### Database functions and security

- Add a safe updated-at trigger.
- Add a helper that determines the authenticated profile role without recursive RLS.
- Enable RLS on every non-public system table.
- Public/anonymous users may select only `published` public content.
- Editors/admins may manage editorial content according to role.
- Authors may edit only their own drafts unless elevated.
- Only admins may change user roles and sensitive settings.
- Newsletter and contact inserts must go through validated server endpoints using a server-only key or a narrowly scoped secure database function; do not allow arbitrary anonymous table reads.
- Storage: public read for intentionally published editorial images; restricted uploads/updates/deletes for authorised editors/admins.
- Add indexes for slugs, statuses, publish dates, foreign keys, common filters, and search vectors.
- Add a searchable document strategy across software, reviews, comparisons, and articles.
- Sanitize and normalise email addresses.
- Never store passwords, API secrets, or private service keys in database settings.

### Seed data

Seed:

- Seven categories
- Twelve sample software records listed earlier
- Four sample reviews
- Three sample comparisons
- Five sample guides
- Two clearly fictional editorial author profiles with non-credentialed bios, or neutral placeholders that cannot be mistaken for real people
- Homepage settings

All seeded editorial claims, prices, scores, screenshots, and dates must be marked in seed comments and admin UI as `DEMO CONTENT — VERIFY BEFORE PUBLICATION`. Do not show the warning as an ugly banner on the public design; show it in admin and document it prominently in the README. Avoid specific pricing if it has not been sourced. Use `Contact vendor` or null values.

## 13. Supabase authentication and admin CMS

Use Supabase Auth for editorial users. Support secure email magic-link login or email/password according to the easiest official Supabase flow, but do not expose public registration.

Admin requirements:

- Dashboard shows drafts awaiting review, recently updated content, stale pricing checks, newsletter count, and unread contact messages.
- CRUD interfaces for all required entities.
- Clear autosave or explicit save state; never imply a save succeeded before the server confirms it.
- Markdown editor with preview, heading/list/link/quote helpers, character count, and sanitised preview.
- Slug generation with manual override and collision validation.
- Status workflow: Draft → In review → Published → Archived.
- Preview unpublished content through a signed, expiring preview mechanism.
- Media uploader validates MIME type and size, captures alt text/credit/licence, and uploads to Supabase Storage.
- Product editor handles structured pricing, features, integrations, and South Africa-specific attributes without forcing editors to write JSON manually.
- Review editor handles pros/cons, score criteria, facts, related content, SEO, and disclosure fields.
- Comparison editor selects exactly two different products and manages criterion results.
- Show unsaved-changes warning where appropriate.
- Destructive actions require confirmation and should archive by default; hard delete is admin-only.
- Forms have labels, descriptions, inline errors, focus management, keyboard accessibility, loading states, and success/error feedback.
- Do not use decorative analytics charts if a clean number/list communicates the information better.

## 14. Media and image-generation plan

Generated images are editorial art only. They must never impersonate software screenshots, vendor logos, customer evidence, or documentary proof. Real product screenshots must come from approved vendor press assets, owned captures, or properly credited sources and be recorded in `media_assets`.

Create `docs/image-prompts.md` containing the following prompts, filenames, aspect ratios, alt-text intent, and placement notes. Add tasteful local placeholder images or neutral solid placeholders so the site still looks intentional until final images are generated. Never hotlink random third-party images.

### Global negative direction for every generated image

Append this to every prompt:

> No text, no letters, no numbers, no UI screenshot, no logo, no watermark, no gradient background, no neon glow, no glassmorphism, no 3D icon, no sparkles, no lightning bolt, no robots, no floating geometric blobs, no generic corporate handshake, no flags, no safari imagery, no Table Mountain cliché, no oversaturated colours, no stock-photo smile-to-camera pose. Premium independent editorial art direction, natural texture, believable materials, restrained composition.

### Prompt 1 — Homepage hero still life

- Filename: `hero-software-decision.webp`
- Ratio: `16:10`, generate at least 2400px wide
- Prompt:

> High-end editorial still-life photograph for an independent South African business-software review publication. A bright contemporary worktable seen from a slightly elevated oblique angle, with an open unbranded laptop showing only a soft blank neutral screen, a printed two-column comparison worksheet with illegible abstract lines, a simple calculator, a plain invoice folder, and a dark-blue pen. Carefully composed solid-colour paper accents in exact deep blue #0000a0, soft periwinkle #bcc6ff and warm stone #e2ddd5. Warm neutral studio surface close to #f1f1f1, crisp daylight, realistic paper and aluminium texture, quiet confidence, generous negative space on the left for HTML headline placement, no people.

- Alt intent: `Laptop and paper comparison notes arranged on a clean worktable.`

### Prompt 2 — Accounting and finance guide

- Filename: `guide-accounting-workflow.webp`
- Ratio: `4:3`
- Prompt:

> Art-directed editorial photograph about small-business accounting decisions. Top-down crop of organised receipts, an unbranded calculator, ledger paper with abstract non-readable marks, a plain payment card with no numbers, and a laptop corner on a warm grey desk. One strong cobalt-blue paper block and a restrained periwinkle accent, clean shadows, tactile paper, modern South African small-business context without national symbols, sophisticated financial-magazine photography.

- Alt intent: `Receipts, calculator and ledger arranged for a small-business accounting workflow.`

### Prompt 3 — Payroll and HR guide

- Filename: `guide-payroll-people.webp`
- Ratio: `4:3`
- Prompt:

> Premium editorial workplace photograph about payroll and people operations. Diverse South African colleagues collaborating naturally around a shared desk, photographed from the side with faces not posed toward camera, paper timesheets represented by abstract unreadable grids, an unbranded laptop, calm natural daylight, contemporary modest office, restrained clothing colours, warm stone and deep-blue accents, honest documentary texture, generous uncluttered framing.

- Alt intent: `Colleagues working together around payroll documents and a laptop.`

### Prompt 4 — CRM and sales guide

- Filename: `guide-crm-pipeline.webp`
- Ratio: `4:3`
- Prompt:

> Conceptual editorial photograph for a CRM buying guide. A precise sequence of translucent but non-glowing acrylic dividers and paper customer cards moving across a real desk from left to right, cards contain only abstract lines and no readable text, one unbranded phone, deep blue #0000a0 and periwinkle #bcc6ff accents, neutral #f1f1f1 background, hard directional daylight, sophisticated magazine still life, visual metaphor for a sales pipeline without icons.

- Alt intent: `Abstract customer cards arranged in stages across a desk.`

### Prompt 5 — ERP and operations guide

- Filename: `guide-erp-operations.webp`
- Ratio: `4:3`
- Prompt:

> High-end editorial photograph about connected business operations. A small group of real physical objects arranged in a disciplined system on a large worktable: plain inventory box, barcode label with no readable code, purchase-order paper with abstract lines, metal component, unbranded tablet with blank screen, and a woven sample. Fine alignment, calm industrial daylight, charcoal, warm stone, deep blue and periwinkle palette, realistic materials, South African design-magazine sensibility without stereotypes.

- Alt intent: `Inventory, purchasing and production objects arranged as one connected workflow.`

### Prompt 6 — Comparison article lead image

- Filename: `comparison-two-tools.webp`
- Ratio: `3:2`
- Prompt:

> Minimal conceptual editorial still life representing a fair software comparison. Two equally sized unbranded notebooks facing one another across a thin centre rule on a warm grey surface, one deep blue and one soft periwinkle, each paired with the same neutral pen and the same number of abstract paper tabs. Symmetrical but not sterile, crisp natural shadow, lots of breathing room, objective product-review magazine art direction.

- Alt intent: `Two equally weighted notebooks arranged for a side-by-side comparison.`

### Prompt 7 — South African buying-context line illustration

- Filename: `sa-business-context-linework.webp` or preferably a hand-authored SVG based on the generated reference
- Ratio: `4:5`
- Prompt:

> Detailed monochrome architectural line illustration of a contemporary South African mixed-use business streetscape, combining a modest office entrance, independent retail frontage, courier bicycle, solar awning and subtle workspace interior glimpses. Fine charcoal technical pen lines on solid #f1f1f1, with one restrained flat translucent-looking but solid periwinkle-blue print layer crossing a small portion of the drawing. No readable signage, no landmarks, no flags, no tourism motifs, no gradients. Sophisticated editorial diagram, abundant negative space.

- Alt intent: `Line illustration of a contemporary South African business streetscape.`

### Prompt 8 — Publication/social share master image

- Filename: `og-default.webp`
- Ratio: `1.91:1`, 1200×630
- Prompt:

> Abstract editorial still life for a South African software review publication. Precisely aligned warm-stone paper sheets, a deep-blue ruler-like bar, a periwinkle comparison card, and a charcoal pencil on a solid warm-grey surface. Strong negative space in the centre-left for HTML or later graphic typography, flat colour blocks, realistic paper texture, confident and minimal, premium business magazine art direction.

- Do not bake the site name into the generated bitmap. Add share-card typography programmatically with an OG image route.

Image implementation rules:

- Convert approved raster images to WebP/AVIF and preserve a high-resolution original outside the public bundle if needed.
- Provide explicit width/height and responsive `sizes`.
- Write meaningful alt text based on purpose, not a keyword list.
- Decorative images use empty alt text.
- Every editorial image supports caption, credit, source, and licence metadata.
- Do not use generated images as evidence in reviews.

## 15. Component system

Create reusable custom components with consistent variants. Suggested structure, adjusted to fit the repository:

```text
src/
  app/
  components/
    layout/
    navigation/
    editorial/
    software/
    comparison/
    forms/
    admin/
    ui/
  config/
  data/
  lib/
    supabase/
    repositories/
    validation/
    seo/
    markdown/
  types/
```

At minimum implement:

- `SiteHeader`, `DesktopNav`, `MobileNav`, `SearchDialog`, `SiteFooter`
- `Container`, `SectionHeader`, `Breadcrumbs`, `Button`, `TextLink`, `Tag`, `Divider`
- `CategoryIndexRow`, `SoftwareCard`, `ReviewCard`, `ArticleCard`, `ComparisonLink`
- `ProductLogo`, `EditorialScore`, `ScoreBreakdown`, `ProsCons`, `KeyFacts`
- `ProductSelector`, `ComparisonTable`, `PricingTable`
- `TableOfContents`, `AuthorByline`, `AuthorCard`, `DisclosureNote`, `SourceList`
- `NewsletterForm`, `ContactForm`, `Pagination`, `EmptyState`, `ErrorState`, `Skeleton`
- Admin shell, data table, status badge, media picker, Markdown editor, and entity forms

Avoid a single universal card component with dozens of boolean props. Use focused semantic components sharing low-level primitives.

## 16. Responsive behaviour

Test at approximately 360px, 390px, 768px, 1024px, 1280px, and 1536px.

- No horizontal page overflow.
- Hero stacks naturally and keeps the H1 legible without awkward one-word lines.
- Tap targets are at least 44×44px where appropriate.
- Header navigation becomes an accessible drawer.
- Category index becomes one column while preserving section rhythm.
- Review lead card and article feature stack cleanly.
- Filters become a labelled modal/sheet with focus management.
- Comparison tables remain usable and announce context.
- Sticky sidebars disable when they would crowd content.
- Footer columns collapse logically.
- Images never crop out their subject at common ratios; define purposeful `object-position` values.

## 17. Accessibility requirements

Target WCAG 2.2 AA.

- Semantic landmarks and correct heading order
- Visible skip link
- Keyboard-operable navigation, dialogs, filters, selectors, tables, and forms
- Strong deep-blue focus outline with sufficient offset
- Correct labels, descriptions, errors, and autocomplete attributes
- No placeholder-only labels
- Dialog focus trap and focus return
- Escape closes dismissible overlays
- `aria-live` only for useful asynchronous status updates
- Decorative SVGs hidden from assistive technology
- Useful alt text/captions for meaningful images
- Colour never acts as the only status indicator
- Reduced-motion support
- Screen-reader-friendly external link and sponsored-link context
- Accessible names for icon-only controls
- Tables use captions, header scope, and clear mobile handling
- Run automated accessibility checks and manually test keyboard flows

## 18. SEO, structured data, discovery, and sharing

- Unique title and meta description for every index/detail page
- Canonical URLs from central site config
- `lang="en-ZA"`
- Open Graph and X/Twitter metadata
- Dynamic programmatic OG images using the palette and typography; no gradients
- Breadcrumb structured data
- Organisation and WebSite/SearchAction structured data
- Article structured data for guides
- Product/Review structured data only for factual complete review records
- ItemList structured data where appropriate
- Do not emit FAQ structured data unless the visible FAQ and current search-engine guidelines support it
- Clean sitemap containing only canonical published pages
- Robots exclusions for admin, previews, drafts, and internal search-query variants
- RSS feed for published reviews, comparisons, and guides
- Correct `noindex` for preview, admin, and unscored generated comparison pages where duplication could occur
- Preserve slugs and add a redirect strategy when editors change them
- Heading, link, and image-alt copy must serve readers rather than keyword stuffing

## 19. Performance and security

Performance targets on representative public pages:

- Lighthouse performance/accessibility/best practices/SEO target 90+ where realistic
- LCP under 2.5 seconds on a reasonable mobile profile
- CLS under 0.1
- Minimal client JavaScript
- Optimised fonts/images and sensible cache/revalidation behaviour

Security requirements:

- Secure server-only environment handling
- CSP and practical security headers compatible with Supabase and required image hosts
- Validate and sanitise Markdown and all form input
- Restrict remote image domains; prefer Supabase Storage/local assets
- CSRF-safe mutation patterns using same-site cookies and framework-supported server actions/routes
- Rate-limit auth-sensitive/public write endpoints
- Honeypot for newsletter/contact spam
- Do not leak whether an email exists
- Safe external links
- No raw HTML from editorial Markdown unless strictly sanitised and explicitly required
- RLS on all sensitive tables and storage buckets
- No secrets in git, client bundles, seed files, or logs
- Avoid collecting IP addresses or unnecessary personal data; document any essential processing for POPIA review

## 20. Analytics and commercial integrity

Do not assume an analytics vendor. Create a small analytics adapter interface that is a no-op unless configured. Track only useful privacy-conscious events such as search, filter use, comparison creation, newsletter success, and outbound vendor clicks. Do not store sensitive query content or personal data.

For affiliate links:

- Store normal vendor URL and optional affiliate URL separately.
- Clearly label commercial links.
- Affiliate state must never influence scores, ordering, or verdict presentation.
- Add a central feature flag to disable all affiliate URLs and fall back to vendor URLs.

## 21. Empty, error, loading, and edge states

Implement intentional states for:

- No published content
- Unknown category/product/article
- Empty search
- No search results
- Filters producing no results
- Missing logo/image
- Missing or stale price
- No published comparison for selected products
- Supabase temporarily unavailable
- Network or form failure
- Duplicate newsletter subscription without revealing private account details
- Draft preview expired
- Author removed but old article still exists

Use clear language and recovery actions. Do not use whimsical illustrations or decorative icons in error states.

## 22. Tests and verification

Create and run:

- Unit tests for validation, score formatting, price formatting, reading time, slug handling, and comparison-pair canonicalisation
- Repository/data-layer tests using fixtures or a test Supabase setup
- Component tests for critical forms/selectors where practical
- Playwright smoke tests covering:
  1. Homepage renders and primary navigation works
  2. Search opens and returns a result
  3. Software filters update the URL
  4. A review page renders key sections
  5. Comparison selector prevents duplicate products and routes correctly
  6. Newsletter validation and success/error feedback
  7. Admin route protection
- Automated accessibility scan on homepage, review, and comparison pages
- Responsive screenshots at mobile and desktop widths for visual review

Run the package manager’s install, lint, type-check, test, and production build commands. Fix all errors and meaningful warnings. Do not declare completion with a failing build.

## 23. Required files and documentation

The completed repository must include at least:

- Full application source
- `README.md`
- `.env.example`
- `supabase/config.toml` if using local Supabase tooling
- `supabase/migrations/001_initial_schema.sql`
- `supabase/seed.sql`
- generated/checked-in database TypeScript types or a documented generation command
- `docs/content-model.md`
- `docs/editorial-workflow.md`
- `docs/image-prompts.md`
- `docs/launch-checklist.md`
- test configuration and tests
- public placeholder/brand assets

README must include:

- Product summary
- Technology choices
- Prerequisites
- Exact local setup commands
- Supabase local and hosted setup
- Environment-variable table
- Database migration/seed/type-generation commands
- Creating the first admin safely
- Running lint/type-check/tests/build
- Deployment notes
- Content publishing workflow
- Image/licensing rules
- Demo-content warning
- Legal/editorial items that require human review before launch

`.env.example` should use names such as:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_DEMO_MODE=true
```

Explain that the service-role key is server-only. Add any additional variables only when actually used.

## 24. Launch checklist

Create `docs/launch-checklist.md` with checkboxes for:

- Replace or verify all demo content
- Verify every product fact, score, price, source, and checked date
- Confirm permission/licensing for logos and screenshots
- Replace generated/placeholder editorial images and add credit/licence records
- Create real author profiles and verify credentials
- Review methodology/editorial/affiliate policies
- South African legal review of privacy, POPIA processing, terms, consent, retention, and cookies
- Configure production Supabase, RLS, storage policies, backups, and auth URLs
- Rotate and secure keys
- Set production site URL, email, and brand details
- Test forms and transactional messages
- Validate sitemap, robots, canonical URLs, structured data, RSS, and OG images
- Accessibility keyboard and screen-reader review
- Cross-browser/mobile testing
- Performance audit
- Backup and editorial recovery process
- Remove preview mode and confirm admin is not indexed

## 25. Implementation sequence

Follow this sequence internally, but continue through all phases without waiting for approval:

1. Inspect repository and existing conventions.
2. Initialise or adapt the application and dependencies.
3. Establish tokens, fonts, global layout, and component primitives.
4. Create Supabase schema, policies, storage plan, seed data, and typed clients.
5. Build public data layer and all public routes.
6. Build authentication and admin CMS.
7. Add SEO, RSS, sitemap, metadata, image handling, and structured data.
8. Add tests, fixtures, and accessibility checks.
9. Run full verification and fix issues.
10. Review the rendered homepage, review page, comparison page, directory, and admin at mobile and desktop widths; refine spacing, overflow, crop, hierarchy, and contrast.
11. Complete documentation and final audit.

## 26. Definition of done

The work is complete only when:

- The homepage contains all seven required sections and the restrained footer.
- All listed public and admin routes exist and are meaningfully implemented.
- Reviews, comparisons, guides, categories, software records, authors, media, newsletter, and contact flows use the real Supabase architecture.
- RLS and protected admin routes are present.
- The app is responsive, keyboard-accessible, and visually consistent.
- DM Sans and Inter Tight are correctly loaded and used.
- The exact palette is consistently applied with `#f1f1f1` as the global page background.
- There are no gradients.
- There are no sparkle, zap, magic, robot, or similar decorative AI icons.
- Icons have no coloured shape backgrounds.
- Product logos are official assets or text fallbacks, never generated imitations.
- No unsupported editorial claim is presented as fact.
- Empty/loading/error states are implemented.
- SEO, sharing, sitemap, robots, RSS, and structured data are implemented.
- Documentation, migrations, seed, environment example, image prompts, and launch checklist are complete.
- Lint, type-check, tests, and production build pass.
- There are no obvious placeholder Latin text blocks, dead buttons, broken routes, or console errors.

## 27. Final response format

Do the work in the repository. When finished, respond with a concise implementation report containing:

1. What was built
2. Key architecture decisions
3. Supabase setup/migration steps the owner must run
4. Verification commands and their results
5. Any genuinely external/manual launch items still required, such as credentials, licensed product assets, factual review verification, or legal review

Do not dump every source file into chat if you have filesystem access. Do not call a partial scaffold “complete”.

## END OF PROMPT
