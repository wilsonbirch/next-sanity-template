import type { Metadata } from "next";

import { HomeHero } from "@/components/sections/HomeHero";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/ui/PortableText";
import { Section } from "@/components/ui/Section";
import { homePageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageUrl, type SanityImage } from "@/lib/sanity-image";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await sanityFetch<HomePageData | null>({
      query: homePageQuery,
      tags: ["homePage"],
    });
    if (!data?.seo) return {};
    const ogImage = sanityImageUrl(data.seo.ogImage, { width: 1200, height: 630 });
    return {
      title: data.seo.title ?? undefined,
      description: data.seo.description ?? undefined,
      openGraph: {
        title: data.seo.title ?? undefined,
        description: data.seo.description ?? undefined,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      },
      twitter: {
        card: ogImage ? "summary_large_image" : "summary",
        title: data.seo.title ?? undefined,
        description: data.seo.description ?? undefined,
        images: ogImage ? [ogImage] : undefined,
      },
    };
  } catch {
    return {};
  }
}

type HomePageData = {
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImage?: Parameters<typeof HomeHero>[0]["image"];
  heroCta?: Parameters<typeof HomeHero>[0]["cta"];
  body?: unknown;
  seo?: { title?: string | null; description?: string | null; ogImage?: SanityImage | null } | null;
};

export default async function HomePage() {
  let data: HomePageData | null = null;
  try {
    data = await sanityFetch<HomePageData | null>({
      query: homePageQuery,
      tags: ["homePage"],
    });
  } catch (error) {
    console.warn("[home] Failed to fetch homePage:", error);
  }

  const title = data?.heroTitle ?? "Welcome to your new site";
  const subtitle =
    data?.heroSubtitle ??
    "This is the Next.js + Sanity template. Open /studio to start editing content.";

  return (
    <>
      <HomeHero
        eyebrow={data?.heroEyebrow ?? null}
        title={title}
        subtitle={subtitle}
        image={data?.heroImage ?? null}
        cta={data?.heroCta}
      />
      {Array.isArray(data?.body) && data.body.length > 0 && (
        <Section spacing="md">
          <Container width="narrow">
            <PortableText value={data.body} />
          </Container>
        </Section>
      )}
    </>
  );
}
