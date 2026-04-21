# next-sanity-template

A reusable starter for marketing sites. Next.js 16 (App Router) + Sanity 5 + Tailwind 3 + Resend.

Designed to be cloned as-is and rebranded: header, footer, navigation, hero, pages, contact form, SEO defaults, and theme are all driven by a `siteSettings` singleton in Sanity. Light/dark mode and responsive nav ship by default.

## What's in the box

- `app/(site)/` — marketing routes with a shared Header/Footer layout
- `app/(site)/page.tsx` — home route, fetches the `homePage` singleton
- `app/(site)/[slug]/page.tsx` — generic slug renderer for `page` docs
- `app/studio/` — Sanity Studio mounted at `/studio`
- `app/api/contact/route.ts` — zod-validated contact endpoint with in-memory rate limiting; sends via Resend when configured
- `app/robots.ts`, `app/sitemap.ts` — SEO basics, sitemap built from Sanity slugs
- `app/icon.svg`, `app/apple-icon.svg` — replace these two files to rebrand the favicon
- `app/global-error.tsx` — catastrophic root-layout error boundary
- `components/ui/` — Button, Container, Heading, Section, PortableText
- `components/layout/` — Header, Footer, Logo, DesktopNav, MobileNav, ThemeToggle
- `components/sections/HomeHero.tsx`, `ContactForm.tsx` — drop-in examples
- `sanity/schemas/` — `siteSettings`, `homePage`, generic `page` doc, plus `cta`/`imageWithAlt`/`seo` objects
- `scripts/seed-sanity.mjs` — seeds one of each so the Studio opens to editable content
- `Dockerfile` — production build, no platform lock-in

## Quickstart

```sh
# 1. Create a copy of this template
gh repo create my-site --template wilsonbirch/next-sanity-template
cd my-site

# 2. Install deps (Node 20.19.5+)
npm install

# 3. Create a Sanity project at https://www.sanity.io/manage
#    Copy the project ID, create an API token (Editor rights).

# 4. Configure env
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN at minimum.

# 5. Seed the dataset
npm run seed

# 6. Run
npm run dev
```

Visit:
- `http://localhost:3000/` — home
- `http://localhost:3000/about` — seeded example page
- `http://localhost:3000/studio` — Sanity Studio

## Environment variables

See `.env.example` for the full list.

| Var | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | yes | Pinned API date |
| `NEXT_PUBLIC_SITE_URL` | yes | Absolute URL base for OG / metadata / sitemap |
| `SANITY_API_WRITE_TOKEN` | for seed | Only used by `scripts/seed-sanity.mjs` |
| `SANITY_API_READ_TOKEN` | for drafts | Only needed if fetching drafts |
| `RESEND_API_KEY` | for email | Contact form falls back to console log without it |
| `CONTACT_FORM_TO_EMAIL` | for email | Destination address |

## Adding content

**A new schema**

1. Create `sanity/schemas/documents/yourThing.ts` using `defineType`.
2. Register it in `sanity/schemas/index.ts`.
3. Surface it in the Studio nav via `sanity/structure.ts`.

**A new page**

For CMS-driven content, create a `page` doc in Studio with a slug — `app/(site)/[slug]/page.tsx` renders it automatically and `app/sitemap.ts` will pick it up.

For a bespoke route (like `/pricing`), add `app/(site)/pricing/page.tsx` and fetch via `sanityFetch` from `lib/sanity.ts`.

**A new section component**

Drop a file into `components/sections/`. Server components by default. Use `@/components/ui/*` primitives for consistency.

## Theming

Colors, type, and the dark theme are defined in `app/globals.css` as CSS custom properties. To rebrand:

1. Edit the `:root` block (light theme) and `.dark` block (dark theme) in `app/globals.css`.
2. The Tailwind utilities (`bg-brand`, `text-ink`, `border-rule`, `bg-footer`, etc.) read these variables — no Tailwind config changes needed for color swaps.
3. The footer uses its own `--color-footer-bg` / `--color-footer-fg` pair so it can stay a "dark plinth" in light mode and invert cleanly in dark mode.

The header includes a `ThemeToggle` (`components/layout/ThemeToggle.tsx`) that cycles **system → light → dark**, persists to `localStorage`, and reacts to OS preference changes when set to system. A short inline script in the root layout sets `html.dark` before paint to prevent the light-flash on dark loads.

## Branding

To replace the favicon, swap the two files at `app/icon.svg` and `app/apple-icon.svg`. Next handles `<link rel="icon">` injection automatically.

To set the site-wide title/description and social-share image, fill in **Site Settings → SEO defaults** in Studio. Per-page `seo` overrides take precedence; the defaults are the fallback.

## Deploy

The `Dockerfile` produces a production image that runs anywhere.

```sh
docker build \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=xxx \
  --build-arg NEXT_PUBLIC_SANITY_DATASET=production \
  --build-arg NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01 \
  --build-arg NEXT_PUBLIC_SITE_URL=https://example.com \
  -t my-site .
```

`NEXT_PUBLIC_*` values must be baked in at build time because Next.js inlines them into the client bundle.

Runtime secrets (`RESEND_API_KEY`, `SANITY_API_READ_TOKEN`, `CONTACT_FORM_TO_EMAIL`) can be supplied by the platform at container start.

### Fly.io

A `fly.toml` and `.github/workflows/deploy.yml` are included. One-time setup:

```sh
# 1. Register the app under your Fly account (this updates fly.toml in
#    place — pick your own app name and region).
fly launch --no-deploy --copy-config

# 2. Set the NEXT_PUBLIC_* build args (either edit fly.toml directly, or
#    set them as GitHub repo variables for the workflow):
#    Settings → Secrets and variables → Actions → Variables
#      NEXT_PUBLIC_SANITY_PROJECT_ID
#      NEXT_PUBLIC_SITE_URL
#      (NEXT_PUBLIC_SANITY_DATASET / API_VERSION default sensibly)

# 3. Set runtime secrets in Fly:
fly secrets set RESEND_API_KEY=... CONTACT_FORM_TO_EMAIL=... SANITY_API_READ_TOKEN=...

# 4. Generate a deploy token and add it as a GitHub Actions secret
#    named FLY_API_TOKEN:
fly tokens create deploy -x 999999h

# 5. First deploy:
fly deploy
```

After that, every push to `main` triggers `.github/workflows/deploy.yml` which runs `fly deploy --remote-only` with the build args wired up.

### Vercel / Railway / Render

Set the same env vars in the platform dashboard. Use the Dockerfile on Railway/Render; Vercel uses its own build pipeline.

## What's deliberately not included

These are common asks that we leave out because the right choice depends on the customer:

- **Analytics** — pick one (Plausible, PostHog, GA4) and add the snippet to `app/layout.tsx`.
- **Error tracking** — Sentry/Bugsnag SDKs go in `instrumentation.ts`.
- **Sanity preview / draft mode** — wire `SANITY_API_READ_TOKEN` into a draft-mode route handler if the customer wants live preview.
- **Search** — Algolia / Typesense / Sanity's own search depending on volume.
- **RSS / Atom feed** — only meaningful if you add a blog schema.
- **Newsletter capture** — pick a provider (Mailchimp, Buttondown, ConvertKit).
- **JSON-LD structured data** — schema depends on what each page represents (Article, LocalBusiness, Product…). Add per-page in the route's `generateMetadata`.
- **Distributed rate limiting** — `lib/rate-limit.ts` is in-memory. For serverless or multi-instance deployments, replace with `@upstash/ratelimit`.

## Dependencies

- Node `>=20.19.5` is enforced via `engines` and pinned in `mise.toml` for [mise](https://mise.jdx.dev/) users. Run `mise trust && mise install` to pick it up.
- `package.json` includes an `overrides` block forcing `js-yaml@^3.14.2` deep inside `@sanity/cli → @vercel/frameworks`, patching a moderate-severity prototype-pollution advisory without downgrading Sanity. Remove the override once the upstream chain updates.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve the built app
- `npm run lint` / `npm run typecheck`
- `npm run seed` — populate Sanity with starter content
