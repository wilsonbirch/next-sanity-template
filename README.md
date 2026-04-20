# next-sanity-template

A reusable starter for marketing sites. Next.js 16 (App Router) + Sanity 5 + Tailwind 3 + Resend.

## What's in the box

- `app/(site)/` — marketing routes with a shared Header/Footer layout
- `app/(site)/page.tsx` — home route, fetches the `homePage` singleton
- `app/(site)/[slug]/page.tsx` — generic slug renderer for `page` docs
- `app/studio/` — Sanity Studio mounted at `/studio`
- `app/api/contact/route.ts` — zod-validated contact endpoint, sends via Resend when configured
- `components/ui/` — Button, Container, Heading, Section, PortableText
- `components/layout/` — Header, Footer, Logo, DesktopNav, MobileNav
- `components/sections/HomeHero.tsx`, `ContactForm.tsx` — drop-in examples
- `sanity/schemas/` — `siteSettings`, `homePage`, generic `page` doc, plus `cta`/`imageWithAlt`/`seo` objects
- `scripts/seed-sanity.mjs` — seeds one of each so the Studio opens to editable content
- `Dockerfile` — production build, no platform lock-in

## Quickstart

```sh
# 1. Create a copy of this template
gh repo create my-site --template wilsonbirch/next-sanity-template
cd my-site

# 2. Install deps
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
| `NEXT_PUBLIC_SITE_URL` | yes | Absolute URL base for OG / metadata |
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

For CMS-driven content, create a `page` doc in Studio with a slug — `app/(site)/[slug]/page.tsx` renders it automatically.

For a bespoke route (like `/pricing`), add `app/(site)/pricing/page.tsx` and fetch via `sanityFetch` from `lib/sanity.ts`.

**A new section component**

Drop a file into `components/sections/`. Server components by default. Use `@/components/ui/*` primitives for consistency.

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

```sh
fly launch --no-deploy
# edit fly.toml — add [build.args] with the NEXT_PUBLIC_* values
fly secrets set RESEND_API_KEY=... CONTACT_FORM_TO_EMAIL=...
fly deploy
```

### Vercel / Railway / Render

Set the same env vars in the platform dashboard. Use the Dockerfile on Railway/Render; Vercel uses its own build pipeline.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve the built app
- `npm run lint` / `npm run typecheck`
- `npm run seed` — populate Sanity with starter content
