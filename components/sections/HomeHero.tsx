import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";
import type { CtaStyle } from "@/lib/site";

type Cta =
  | { label?: string | null; href?: string | null; style?: CtaStyle | null }
  | null
  | undefined;

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
              <Button href={cta.href} variant={cta.style ?? "primary"} size="lg">
                {cta.label}
              </Button>
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
