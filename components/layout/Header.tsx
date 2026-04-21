import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/site";

import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const settings = await getSiteSettings();

  // Drop the home link from the nav (the logo handles it) and any link
  // that duplicates the header CTA's destination — the CTA button is
  // the more prominent affordance for the same page.
  const ctaHref = settings.headerCta?.href;
  const visibleLinks = settings.navLinks
    .filter((l) => l.href !== "/")
    .filter((l) => !ctaHref || l.href !== ctaHref);

  // Always surface a way to reach Contact — either as a nav link or
  // via the CTA. Auto-add only if neither already covers it.
  const hasContact =
    visibleLinks.some((l) => l.href === "/contact") || ctaHref === "/contact";
  if (!hasContact) {
    visibleLinks.push({ label: "Contact", href: "/contact" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-rule)] bg-[color:var(--color-bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg)]/70">
      <Container width="wide" as="div" className="flex h-16 items-center gap-6 lg:h-20">
        <Logo businessName={settings.businessName} logo={settings.logo} />

        <div className="ml-auto flex items-center gap-2 lg:gap-4">
          <DesktopNav links={visibleLinks} />

          {settings.headerCta && (
            <Button
              href={settings.headerCta.href}
              variant={settings.headerCta.style ?? "primary"}
              size="sm"
              className="hidden lg:inline-flex"
            >
              {settings.headerCta.label}
            </Button>
          )}
          <ThemeToggle className="hidden lg:inline-flex" />
          <MobileNav links={visibleLinks} cta={settings.headerCta} />
        </div>
      </Container>
    </header>
  );
}
