import type { SanityImageSource } from "@sanity/image-url";

import { urlForImage } from "@/lib/sanity";

/**
 * Shape Sanity gives us when an image field is filled in.
 * The asset is dereferenced (`asset->`) in queries with metadata for
 * blur placeholders and aspect-ratio hints.
 */
export type SanityImage = {
  alt?: string;
  asset?: {
    _id?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  };
};

export function isSanityImage(value: unknown): value is SanityImage {
  return (
    typeof value === "object" &&
    value !== null &&
    "asset" in value &&
    typeof (value as SanityImage).asset === "object" &&
    typeof (value as SanityImage).asset?._id === "string"
  );
}

/**
 * Build a Sanity CDN URL with sensible defaults for next/image.
 * Returns null if the image isn't a real Sanity asset (caller should
 * fall back to an Unsplash placeholder or skip rendering).
 */
export function sanityImageUrl(
  image: SanityImage | null | undefined,
  { width, height }: { width?: number; height?: number } = {},
): string | null {
  if (!isSanityImage(image)) return null;
  let builder = urlForImage(image as SanityImageSource).quality(85);
  if (width) builder = builder.width(width);
  if (height) builder = builder.height(height);
  return builder.url();
}

export function sanityImageProps(
  image: SanityImage | null | undefined,
  { width, height }: { width?: number; height?: number } = {},
): {
  src: string;
  alt: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
} | null {
  const src = sanityImageUrl(image, { width, height });
  if (!src) return null;
  const dims = image?.asset?.metadata?.dimensions;
  return {
    src,
    alt: image?.alt ?? "",
    blurDataURL: image?.asset?.metadata?.lqip,
    width: width ?? dims?.width,
    height: height ?? dims?.height,
  };
}
