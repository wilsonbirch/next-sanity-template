import Link from "next/link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "link" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent)] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-soft)]",
  secondary:
    "border border-[color:var(--color-rule)] bg-transparent text-[color:var(--color-ink)] hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)]",
  inverse:
    "bg-white text-[color:var(--color-ink)] hover:bg-[color:var(--color-bg)]",
  link: "text-[color:var(--color-brand)] underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-sm rounded-full",
  lg: "h-12 px-7 text-base rounded-full",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = Common &
  Omit<React.ComponentProps<typeof Link>, "className"> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && typeof rest.href === "string") {
    const isExternal = /^https?:\/\//.test(rest.href);
    if (isExternal) {
      return (
        <a className={cls} href={rest.href} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
