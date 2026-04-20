import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed text-[color:var(--color-ink-muted)]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-3xl text-[color:var(--color-ink)]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl text-[color:var(--color-ink)]">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[color:var(--color-brand)] pl-6 text-xl italic text-[color:var(--color-ink)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-lg text-[color:var(--color-ink-muted)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-lg text-[color:var(--color-ink-muted)]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[color:var(--color-ink)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[color:var(--color-brand)] underline-offset-4 hover:underline"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-[color:var(--color-brand)] underline-offset-4 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    imageWithAlt: ({ value }) => {
      const props = sanityImageProps(value as SanityImage, { width: 1600 });
      if (!props) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
            <Image
              src={props.src}
              alt={props.alt}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      );
    },
  },
};

export function PortableText({ value }: { value: unknown }) {
  if (!value) return null;
  // The base library is happy with arrays of blocks; cast through unknown
  // for the (rare) wrong shape coming back from a misconfigured query.
  return (
    <div className="space-y-5">
      <BasePortableText
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value={value as any}
        components={components}
      />
    </div>
  );
}
