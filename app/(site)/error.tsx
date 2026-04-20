"use client";

import { useEffect } from "react";

import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[site/error]", error);
  }, [error]);

  return (
    <Container as="div" width="narrow" className="flex flex-1 flex-col justify-center gap-6 py-32 text-center">
      <Eyebrow className="mx-auto">Something went wrong</Eyebrow>
      <Heading level={1}>We hit a snag loading this page.</Heading>
      <p className="text-lg text-[color:var(--color-ink-muted)]">Please try again.</p>
      <div className="flex justify-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
