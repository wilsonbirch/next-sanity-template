import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/layout/SocialIcons";
import { getSiteSettings } from "@/lib/site";

const SOCIAL_LINKS = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "twitter", label: "X / Twitter", Icon: TwitterIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
] as const;

export async function Footer() {
  const settings = await getSiteSettings();
  const visibleLinks = settings.navLinks.filter((l) => l.href !== "/");

  const socials = SOCIAL_LINKS.flatMap(({ key, label, Icon }) => {
    const href = settings.social[key];
    return href ? [{ key, label, href, Icon }] : [];
  });

  return (
    <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-footer-bg)] text-[color:var(--color-footer-fg)]">
      <Container width="wide" as="div" className="flex flex-col gap-12 py-16 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="lg:max-w-md">
          <div className="[&_a]:!text-[color:var(--color-footer-fg)] [&_a_span:first-child]:!text-[color:var(--color-footer-fg)] [&_a_span:last-child]:!text-[color:var(--color-footer-fg-muted)]">
            <Logo businessName={settings.businessName} logo={settings.logo} />
          </div>
          {settings.tagline && (
            <p className="mt-4 font-display text-lg leading-snug text-[color:var(--color-footer-fg)]">
              {settings.tagline}
            </p>
          )}
          {settings.footerText && (
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-footer-fg-muted)]">
              {settings.footerText}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-footer-fg-muted)]">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[color:var(--color-footer-fg)] opacity-80 transition hover:opacity-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-footer-fg-muted)]">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {settings.email && (
              <li className="flex items-center gap-3">
                <Mail aria-hidden className="h-4 w-4 text-[color:var(--color-footer-fg-muted)]" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-[color:var(--color-footer-fg)] opacity-80 transition hover:opacity-100"
                >
                  {settings.email}
                </a>
              </li>
            )}
            {settings.phone && (
              <li className="flex items-center gap-3">
                <Phone aria-hidden className="h-4 w-4 text-[color:var(--color-footer-fg-muted)]" />
                <a
                  href={`tel:${settings.phone}`}
                  className="text-[color:var(--color-footer-fg)] opacity-80 transition hover:opacity-100"
                >
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.address && (
              <li className="flex items-center gap-3 text-[color:var(--color-footer-fg)] opacity-80">
                <MapPin aria-hidden className="h-4 w-4 text-[color:var(--color-footer-fg-muted)]" />
                <span>{settings.address}</span>
              </li>
            )}
          </ul>

          {socials.length > 0 && (
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ key, label, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-footer-fg-muted)]/40 text-[color:var(--color-footer-fg)] opacity-80 transition hover:opacity-100 hover:border-[color:var(--color-footer-fg)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-[color:var(--color-footer-fg-muted)]/20">
        <Container
          width="wide"
          as="div"
          className="flex flex-col gap-2 py-6 text-xs text-[color:var(--color-footer-fg-muted)] sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <p>Built with Next.js + Sanity.</p>
        </Container>
      </div>
    </footer>
  );
}
