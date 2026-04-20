import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container width="narrow" className="space-y-10">
        <div>
          <Heading level={1}>Get in touch</Heading>
          <p className="mt-4 text-lg text-[color:var(--color-ink-muted)]">
            Send a message and we&apos;ll get back to you soon.
          </p>
        </div>
        <ContactForm />
      </Container>
    </Section>
  );
}
