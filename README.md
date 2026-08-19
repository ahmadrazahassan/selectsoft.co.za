# Software Select ZA

Software Select ZA is an independent editorial publication for South African businesses choosing accounting, payroll, CRM, ERP, project, commerce, marketing and customer support software.

The application includes the complete public publication, software directory, review pages, comparison builder, buying guides, author pages, trust pages, newsletter and contact flows, plus a protected editorial workspace.

## Technology

* Vinext and React Server Components
* TypeScript
* Tailwind CSS with a custom editorial stylesheet
* Supabase Postgres, Auth and Storage
* Zod validation
* Lucide functional icons
* Cloudflare Worker compatible output through Sites

## Local setup

Install dependencies and start the development server.

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

The site uses its checked local editorial fixture when Supabase values are not present. This keeps the full publication available during design, review and automated builds. Production content and form records use Supabase when it is connected.

## Environment values

Copy `.env.example` to `.env.local` and fill in the values from the Supabase project settings.

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site address |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase project address |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key used with row level security |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only key for validated contact and newsletter writes |

Never expose the service role key in a browser bundle or commit it to source control.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor or through the Supabase command line tooling.
3. Run `supabase/seed.sql` for the initial editorial records.
4. Create editorial users through Supabase Auth.
5. Add a matching row to `public.profiles` with the user identifier, full name, role and active state.
6. Disable public registration and configure the local and production callback addresses ending in `/auth/callback`.
7. Add the environment values to the local and hosted site settings.

To create the first admin profile after inviting the user, run a statement like this with the real Auth user identifier.

```sql
insert into public.profiles (id, full_name, role, is_active)
values ('AUTH USER UUID', 'Full name', 'admin', true);
```

The migration enables row level security for editorial, message, newsletter and settings data. Public readers can only select published editorial records. Uploads use the `editorial-media` storage bucket.

## Editorial workflow

Content moves through Draft, In review, Published and Archived states. Product facts and price records should keep a primary source and review date. Vendors may correct facts but cannot approve verdicts or scores.

Read:

* `docs/content-model.md`
* `docs/editorial-workflow.md`
* `docs/image-prompts.md`
* `docs/launch-checklist.md`

## Verification

```powershell
npm run lint
npm run typecheck
npm test
```

The test command creates a production build and checks the rendered homepage, a full review and a published comparison.

## Deployment

The project is prepared for OpenAI Sites and Cloudflare Worker compatible output. Supabase remains the source of truth for production editorial data, authentication and media. Add the same environment values to the hosted site before enabling public form submissions or editorial sign in.

## Content and legal review

The included product data provides a realistic working publication. Every product fact, score, price, source, author profile and editorial date must receive a final human check before a public commercial launch. Official vendor logos and screenshots require permission and recorded licence details. Privacy, consent, retention and terms require review by South African counsel.
