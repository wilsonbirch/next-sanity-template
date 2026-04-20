import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container as="div" width="narrow" className="flex flex-1 flex-col justify-center gap-6 py-32 text-center">
      <Eyebrow className="mx-auto">404</Eyebrow>
      <Heading level={1}>This page doesn&apos;t exist.</Heading>
      <p className="text-lg text-[color:var(--color-ink-muted)]">
        The link may be old or the page may have moved. Try the navigation,
        or head back to the homepage.
      </p>
      <div className="flex justify-center">
        <Button href="/">Back to home</Button>
      </div>
    </Container>
  );
}
