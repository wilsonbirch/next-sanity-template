import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;

const sizeStyles: Record<Level, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl",
  2: "text-3xl sm:text-4xl lg:text-5xl",
  3: "text-2xl sm:text-3xl",
  4: "text-xl sm:text-2xl",
};

export function Heading({
  as,
  level = 2,
  display = true,
  className,
  children,
  ...rest
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  level?: Level;
  display?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag = (as ?? `h${level}`) as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag
      {...rest}
      className={cn(
        sizeStyles[level],
        display ? "font-display font-light leading-[1.05] tracking-tight" : "font-sans font-semibold leading-tight",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-brand-soft)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
