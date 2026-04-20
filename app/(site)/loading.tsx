import { Container } from "@/components/ui/Container";

/**
 * Skeleton shown while a route segment is fetching. Kept intentionally
 * subtle — the brand should feel calm, not jittery.
 */
export default function Loading() {
  return (
    <Container as="div" width="wide" className="py-24">
      <div className="space-y-6">
        <div className="h-3 w-24 animate-pulse rounded bg-[color:var(--color-rule)]" />
        <div className="h-12 w-2/3 animate-pulse rounded bg-[color:var(--color-rule)]" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-[color:var(--color-rule)]" />
      </div>
    </Container>
  );
}
