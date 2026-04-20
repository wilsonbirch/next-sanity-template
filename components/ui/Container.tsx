import { cn } from "@/lib/cn";

type Width = "default" | "narrow" | "wide" | "full";

const widths: Record<Width, string> = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export function Container({
  as: Component = "div",
  width = "default",
  className,
  children,
}: {
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  width?: Width;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Component className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", widths[width], className)}>
      {children}
    </Component>
  );
}
