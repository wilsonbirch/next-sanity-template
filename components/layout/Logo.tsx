import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { sanityImageProps, type SanityImage } from "@/lib/sanity-image";

export function Logo({
  businessName,
  logo,
  className,
}: {
  businessName: string;
  logo?: SanityImage | null;
  className?: string;
}) {
  const imageProps = logo ? sanityImageProps(logo, { height: 64 }) : null;

  return (
    <Link
      href="/"
      aria-label={`${businessName} — home`}
      className={cn("group inline-flex items-center transition", className)}
    >
      {imageProps ? (
        <Image
          src={imageProps.src}
          alt={imageProps.alt || businessName}
          width={imageProps.width ?? 160}
          height={imageProps.height ?? 32}
          className="h-8 w-auto sm:h-9"
          priority
        />
      ) : (
        <Wordmark businessName={businessName} />
      )}
    </Link>
  );
}

function Wordmark({ businessName }: { businessName: string }) {
  const [first, ...rest] = businessName.split(" ");
  const tail = rest.join(" ");

  return (
    <span className="inline-flex flex-col leading-none tracking-tight">
      <span className="font-display text-xl text-[color:var(--color-ink)] sm:text-2xl">
        {first}
      </span>
      {tail && (
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[color:var(--color-brand-soft)] sm:text-[11px]">
          {tail}
        </span>
      )}
    </span>
  );
}
