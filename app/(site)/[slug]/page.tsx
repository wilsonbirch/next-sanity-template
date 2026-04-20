import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { PortableText } from "@/components/ui/PortableText";
import { Section } from "@/components/ui/Section";
import { allPageSlugsQuery, pageBySlugQuery } from "@/lib/queries";
import { sanityFetch } from "@/lib/sanity";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";

export const revalidate = 60;

type PageData = {
  title: string;
  slug: string;
  heroImage?: SanityImage | null;
  body?: unknown;
  seo?: { title?: string | null; description?: string | null } | null;
};

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<string[]>({ query: allPageSlugsQuery });
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await sanityFetch<PageData | null>({
      query: pageBySlugQuery,
      params: { slug },
      tags: [`page:${slug}`],
    });
    if (!data) return {};
    return {
      title: data.seo?.title ?? data.title,
      description: data.seo?.description ?? undefined,
    };
  } catch {
    return {};
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data: PageData | null = null;
  try {
    data = await sanityFetch<PageData | null>({
      query: pageBySlugQuery,
      params: { slug },
      tags: [`page:${slug}`],
    });
  } catch (error) {
    console.warn("[page] Failed to fetch page:", error);
  }

  if (!data) notFound();

  const heroImage = data.heroImage ? sanityImageProps(data.heroImage, { width: 1800 }) : null;

  return (
    <>
      <Section spacing="lg">
        <Container width="narrow">
          <Heading level={1}>{data.title}</Heading>
        </Container>
      </Section>
      {heroImage && (
        <Container width="wide">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      )}
      <Section spacing="md">
        <Container width="narrow">
          <PortableText value={data.body} />
        </Container>
      </Section>
    </>
  );
}
