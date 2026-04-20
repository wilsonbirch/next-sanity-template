import { cn } from "@/lib/cn";

type Tone = "default" | "surface" | "brand" | "warm" | "ink";

const toneStyles: Record<Tone, string> = {
  default: "bg-[color:var(--color-bg)] text-[color:var(--color-ink)]",
  surface: "bg-[color:var(--color-surface)] text-[color:var(--color-ink)]",
  brand: "bg-[color:var(--color-brand)] text-white",
  warm: "bg-[color:var(--color-brand-warm)] text-[color:var(--color-ink)]",
  ink: "bg-[color:var(--color-ink)] text-white",
};

type Spacing = "none" | "sm" | "md" | "lg";

const spacingStyles: Record<Spacing, string> = {
  none: "",
  sm: "py-12 sm:py-16",
  md: "py-20 sm:py-24",
  lg: "py-24 sm:py-32",
};

export function Section({
  tone = "default",
  spacing = "md",
  className,
  children,
  id,
}: {
  tone?: Tone;
  spacing?: Spacing;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn(toneStyles[tone], spacingStyles[spacing], className)}>
      {children}
    </section>
  );
}
