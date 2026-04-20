import { HomeHero } from "@/components/sections/HomeHero";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/ui/PortableText";
import { Section } from "@/components/ui/Section";
import { homePageQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";

export const revalidate = 60;

type HomePageData = {
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImage?: Parameters<typeof HomeHero>[0]["image"];
  heroCta?: { label?: string | null; href?: string | null } | null;
  body?: unknown;
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
