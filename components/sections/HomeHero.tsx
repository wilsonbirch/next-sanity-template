import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";

type Cta = { label?: string | null; href?: string | null } | null | undefined;

export function HomeHero({
  eyebrow,
  title,
  subtitle,
  image,
  cta,
}: {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  image?: SanityImage | null;
  cta?: Cta;
}) {
  const imageProps = image ? sanityImageProps(image, { width: 1800 }) : null;

  return (
    <Section spacing="lg">
      <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading level={1} className="mt-4">
            {title}
          </Heading>
          {subtitle && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
              {subtitle}
            </p>
          )}
          {cta?.href && cta?.label && (
            <div className="mt-8">
              <Link
                href={cta.href}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--color-brand)] px-7 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-soft)]"
              >
                {cta.label}
              </Link>
            </div>
          )}
        </div>
        {imageProps && (
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={imageProps.src}
                alt={imageProps.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
