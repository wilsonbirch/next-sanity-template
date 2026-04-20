import { Container } from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/site";

import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const settings = await getSiteSettings();

  const visibleLinks = settings.navLinks.filter((l) => l.href !== "/");
  if (!visibleLinks.some((l) => l.href === "/contact")) {
    visibleLinks.push({ label: "Contact", href: "/contact" });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-rule)] bg-[color:var(--color-bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg)]/70">
      <Container width="wide" as="div" className="flex h-16 items-center gap-6 lg:h-20">
        <Logo businessName={settings.businessName} />

        <div className="ml-auto flex items-center gap-6">
          <DesktopNav links={visibleLinks} />

          {settings.headerCta && (
            <a
              href={settings.headerCta.href}
              className="hidden h-10 items-center justify-center rounded-full bg-[color:var(--color-brand)] px-5 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-soft)] lg:inline-flex"
            >
              {settings.headerCta.label}
            </a>
          )}
          <MobileNav links={visibleLinks} cta={settings.headerCta} />
        </div>
      </Container>
    </header>
  );
}
