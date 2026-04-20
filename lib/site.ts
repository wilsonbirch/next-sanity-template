import { siteSettingsQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";

export const SITE_DEFAULTS = {
  businessName: "Your Business",
  tagline: "",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  headerCta: null as { label: string; href: string } | null,
  phone: "",
  email: "",
  address: "",
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  },
  footerText: "",
} as const;

export type SiteSettings = {
  businessName?: string | null;
  tagline?: string | null;
  logo?: { asset?: unknown; alt?: string } | null;
  navLinks?: Array<{ label?: string; href?: string }> | null;
  headerCta?: { label?: string; href?: string } | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  social?: {
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
  } | null;
  footerText?: string | null;
};

function withDefaults(settings: SiteSettings | null | undefined) {
  const validLinks =
    settings?.navLinks?.filter(
      (l): l is { label: string; href: string } =>
        typeof l?.label === "string" && typeof l?.href === "string",
    ) ?? [];

  return {
    businessName: settings?.businessName || SITE_DEFAULTS.businessName,
    tagline: settings?.tagline || SITE_DEFAULTS.tagline,
    logo: settings?.logo ?? null,
    navLinks: (validLinks.length
      ? validLinks
      : [...SITE_DEFAULTS.navLinks]) as Array<{ label: string; href: string }>,
    headerCta:
      settings?.headerCta?.label && settings?.headerCta?.href
        ? { label: settings.headerCta.label, href: settings.headerCta.href }
        : SITE_DEFAULTS.headerCta,
    phone: settings?.phone || SITE_DEFAULTS.phone,
    email: settings?.email || SITE_DEFAULTS.email,
    address: settings?.address || SITE_DEFAULTS.address,
    social: {
      facebook: settings?.social?.facebook || SITE_DEFAULTS.social.facebook,
      instagram: settings?.social?.instagram || SITE_DEFAULTS.social.instagram,
      twitter: settings?.social?.twitter || SITE_DEFAULTS.social.twitter,
      linkedin: settings?.social?.linkedin || SITE_DEFAULTS.social.linkedin,
    },
    footerText: settings?.footerText || SITE_DEFAULTS.footerText,
  };
}

export type ResolvedSiteSettings = ReturnType<typeof withDefaults>;

/**
 * Fetch the singleton Site Settings doc, layering defaults so consumers
 * always see a complete object. Falls back silently on a Sanity outage
 * so the shell still renders.
 */
export async function getSiteSettings(): Promise<ResolvedSiteSettings> {
  try {
    const data = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
    return withDefaults(data);
  } catch (error) {
    console.warn("[site] Failed to fetch siteSettings, using defaults:", error);
    return withDefaults(null);
  }
}
