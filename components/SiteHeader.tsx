"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import PeakMark from "./PeakMark";
import Wordmark from "./Wordmark";
import { IconArrowUpRight, IconClose, IconMenu } from "./Icons";
import { openStateFor } from "./openState";

/**
 * Kopfzeilen-Konzept dieser Seite: eine Leiste, die über dem Hero
 * durchsichtig liegt und beim Scrollen zu Vulkanstein wird – mit einer
 * gepunkteten «carta»-Kante unten (dem Strukturelement der Seite) und
 * einem tagesaktuellen Öffnungs-Status, der echte Information trägt statt
 * Dekoration.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState<{ label: string; open: boolean } | null>(
    null,
  );

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Öffnungs-Status erst nach dem Mounten – im Static Export darf der
  // Wochentag nicht zur Buildzeit eingefroren werden.
  useEffect(() => {
    setStatus(openStateFor(new Date(), site.hours));
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname === `${href}/`;

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-brace focus:px-5 focus:py-3 focus:font-semibold focus:text-brace-ink"
      >
        Zum Inhalt springen
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-forno ${
          scrolled || open
            ? "border-b-2 border-dotted border-crosta bg-carbone-deep/95 backdrop-blur-md"
            : "border-b-2 border-dotted border-transparent bg-gradient-to-b from-carbone-deep/70 to-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-shell items-center justify-between gap-4 px-gutter py-3">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${site.name} – zur Startseite`}
          >
            <Wordmark />
          </Link>

          <nav aria-label="Hauptmenü" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`inline-flex min-h-[42px] items-center rounded-pill px-4 text-step--1 font-medium transition-colors duration-150 hover:text-brace-hi ${
                      isActive(item.href) ? "text-brace-hi" : "text-latte-dim"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {status ? (
              <span className="hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-latte-mute md:inline-flex">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status.open ? "bg-oliva" : "bg-brace-hi"
                  }`}
                  aria-hidden="true"
                />
                {status.label}
              </span>
            ) : null}

            <Link
              href={nav.ctaHref}
              className="hidden items-center gap-1.5 rounded-pill bg-brace px-4 py-2.5 text-step--1 font-semibold text-brace-ink transition-all duration-200 ease-forno hover:-translate-y-0.5 hover:bg-[#93374b] sm:inline-flex"
            >
              {nav.ctaLabel}
              <IconArrowUpRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menü schliessen" : "Menü öffnen"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-latte transition-colors hover:text-brace-hi lg:hidden"
            >
              {open ? (
                <IconClose className="h-6 w-6" />
              ) : (
                <IconMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-carbone-deep pt-24 lg:hidden"
        >
          <PeakMark
            className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 text-latte opacity-[0.05]"
            chili={false}
            title=""
          />
          <nav aria-label="Mobiles Hauptmenü" className="relative px-gutter">
            <ul className="divide-y-2 divide-dotted divide-crosta">
              {nav.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-5 font-display text-step-3 text-latte hover:text-brace-hi"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={nav.ctaHref}
              className="btn btn-primary mt-8 w-full"
            >
              {nav.ctaLabel}
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
            {status ? (
              <p className="mt-6 font-mono text-step--1 uppercase tracking-[0.12em] text-latte-mute">
                {status.label}
              </p>
            ) : null}
          </nav>
        </div>
      ) : null}
    </>
  );
}
