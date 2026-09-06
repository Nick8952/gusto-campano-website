import Link from "next/link";
import { addressLine, mapsLink, nav, site } from "@/lib/site";
import { Container } from "./ui";
import Logo from "./Logo";
import { IconInstagram, IconMail, IconPhone, IconPin } from "./Icons";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="block-deep border-t-2 border-dotted border-crosta">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="h-24 w-auto" />
            <p className="mt-5 max-w-xs text-step--1 leading-relaxed text-latte-mute">
              {site.blurb}
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-pill border border-crosta px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-latte-dim transition-colors hover:border-brace-hi/50 hover:text-brace-hi"
            >
              <IconInstagram className="h-4 w-4" />
              {site.instagramHandle}
            </a>
          </div>

          <div>
            <p className="eyebrow">
              Menu<span className="eyebrow-de">Seiten</span>
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-step--1 text-latte-dim hover:text-brace-hi"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {nav.footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-step--1 text-latte-mute hover:text-brace-hi"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">
              Contatti<span className="eyebrow-de">Kontakt</span>
            </p>
            <ul className="mt-4 space-y-3 text-step--1 text-latte-dim">
              <li className="flex items-start gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brace-hi" />
                <a href={mapsLink} target="_blank" rel="noreferrer" className="hover:text-brace-hi">
                  {addressLine}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 shrink-0 text-brace-hi" />
                <a href={`tel:${site.phoneTel}`} className="hover:text-brace-hi">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <IconMail className="h-4 w-4 shrink-0 text-brace-hi" />
                <a href={`mailto:${site.email}`} className="hover:text-brace-hi break-all">
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 space-y-1 font-mono text-[0.72rem] text-latte-mute">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span>{h.day.slice(0, 2)}</span>
                  <span className="text-right">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t-2 border-dotted border-crosta pt-6 text-step--1 text-latte-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.foundedYear}–{year} {site.legalName}
          </p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em]">
            {site.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
