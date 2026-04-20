import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { FacebookIcon, InstagramIcon } from "@/components/layout/SocialIcons";
import { getSiteSettings } from "@/lib/site";

export async function Footer() {
  const settings = await getSiteSettings();
  const visibleLinks = settings.navLinks.filter((l) => l.href !== "/");

  return (
    <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-ink)] text-white">
      <Container width="wide" as="div" className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="[&_a]:!text-white [&_a_span:first-child]:!text-white [&_a_span:last-child]:!text-white/70">
            <Logo businessName={settings.businessName} />
          </div>
          {settings.footerText && (
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              {settings.footerText}
            </p>
          )}
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/80 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            {settings.email && (
              <li className="flex items-center gap-3">
                <Mail aria-hidden className="h-4 w-4 text-white/50" />
                <a href={`mailto:${settings.email}`} className="transition hover:text-white">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.phone && (
              <li className="flex items-center gap-3">
                <Phone aria-hidden className="h-4 w-4 text-white/50" />
                <a href={`tel:${settings.phone}`} className="transition hover:text-white">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.address && (
              <li className="flex items-center gap-3">
                <MapPin aria-hidden className="h-4 w-4 text-white/50" />
                <span>{settings.address}</span>
              </li>
            )}
          </ul>

          {(settings.social.facebook || settings.social.instagram) && (
            <div className="mt-6 flex items-center gap-3">
              {settings.social.facebook && (
                <a
                  href={settings.social.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
              {settings.social.instagram && (
                <a
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container
          width="wide"
          as="div"
          className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</p>
          <p>Built with Next.js + Sanity.</p>
        </Container>
      </div>
    </footer>
  );
}
