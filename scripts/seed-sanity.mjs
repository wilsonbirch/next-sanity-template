#!/usr/bin/env node
/**
 * Seed the Sanity dataset with one Site Settings doc, one Home Page
 * singleton, and an example Page. Idempotent — uses createOrReplace,
 * so re-running is safe.
 *
 * Requires a write-scoped Sanity token:
 *   https://www.sanity.io/manage → your project → API → Tokens
 *   Add API token with Editor permissions.
 *
 * Then either export it inline or add to .env.local:
 *   SANITY_API_WRITE_TOKEN=sk_xxx npm run seed
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Minimal .env.local loader (no dotenv dep).
for (const file of [".env.local", ".env"]) {
  try {
    const raw = readFileSync(resolve(process.cwd(), file), "utf8");
    for (const line of raw.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^"(.*)"$/, "$1");
      }
    }
  } catch {
    // file not present — ignore.
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("x  NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Check .env.local.");
  process.exit(1);
}
if (!token) {
  console.error(
    "x  SANITY_API_WRITE_TOKEN is not set.\n\n" +
      "   Get a write token at https://www.sanity.io/manage\n" +
      "   -> your project -> API -> Tokens -> Add API token\n" +
      "   Permissions: Editor\n\n" +
      "   Then run again:\n" +
      "     SANITY_API_WRITE_TOKEN=sk_xxx npm run seed",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01",
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  businessName: "Your Business",
  tagline: "A short, memorable tagline.",
  navLinks: [
    { _key: "home", label: "Home", href: "/" },
    { _key: "about", label: "About", href: "/about" },
    { _key: "contact", label: "Contact", href: "/contact" },
  ],
  headerCta: { label: "Contact", href: "#contact" },
  email: "hello@example.com",
  footerText: "A short description of your business or project.",
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroEyebrow: "Welcome",
  heroTitle: "Your headline goes here.",
  heroSubtitle:
    "This placeholder is editable from /studio. Replace it with copy that tells visitors what you do.",
  heroCta: { label: "Get in touch", href: "#contact" },
  body: [
    {
      _type: "block",
      _key: "intro",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "intro-text",
          text: "Edit this content in Sanity Studio -- it syncs to the page on save.",
        },
      ],
    },
  ],
};

const aboutPage = {
  _id: "page.about",
  _type: "page",
  title: "About",
  slug: { _type: "slug", current: "about" },
  body: [
    {
      _type: "block",
      _key: "about-intro",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "about-text",
          text: "Replace this with your story. Pages are managed from /studio -> Pages.",
        },
      ],
    },
  ],
};

async function run() {
  console.log(`->  Seeding ${projectId}/${dataset}`);

  for (const doc of [siteSettings, homePage, aboutPage]) {
    await client.createOrReplace(doc);
    console.log(`   ok ${doc._type} (${doc._id})`);
  }

  console.log("ok  Done. Visit /studio to edit.");
}

run().catch((err) => {
  console.error("x  Seed failed:", err.message ?? err);
  process.exit(1);
});
