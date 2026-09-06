import type { Metadata } from "next";
import { getPage, type Hero } from "@/lib/content";
import { Container, Section } from "@/components/ui";
import PageHero from "@/components/PageHero";
import ReservationPanel from "@/components/ReservationPanel";
import ContactForm from "@/components/ContactForm";
import Hours from "@/components/Hours";
import MapEmbed from "@/components/MapEmbed";
import { addressLine, mapsLink, site } from "@/lib/site";
import { IconArrowUpRight, IconInstagram, IconMail, IconPhone } from "@/components/Icons";

const page = getPage("reservieren");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
};

export default function ReservierenPage() {
  const hero = (page.hero ?? {}) as Hero;

  return (
    <>
      <PageHero hero={hero} />

      <Section tone="carbone">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <ReservationPanel
                heading={String(page.reservationHeading ?? "Online reservieren")}
                body={String(page.reservationBody ?? "")}
              />
              <Hours />
            </div>

            <div className="space-y-8">
              <div className="card-forno p-6 sm:p-8">
                <h2 className="font-display text-step-2 text-latte">
                  {String(page.formHeading ?? "Anfrage senden")}
                </h2>
                <p className="mt-3 text-step-0 leading-relaxed text-latte-dim">
                  {String(page.formLead ?? "")}
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <MapEmbed />
            <div className="card-forno p-6 sm:p-8">
              <p className="eyebrow">
                Contatti<span className="eyebrow-de">direkt</span>
              </p>
              <ul className="mt-5 space-y-4 text-step-0">
                <li className="flex items-start gap-3">
                  <IconPhone className="mt-1 h-5 w-5 shrink-0 text-brace-hi" />
                  <span>
                    <a href={`tel:${site.phoneTel}`} className="link">
                      {site.phoneDisplay}
                    </a>
                    <br />
                    <span className="text-step--1 text-latte-mute">
                      am schnellsten – wir gehen während der Öffnungszeiten ran
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <IconMail className="mt-1 h-5 w-5 shrink-0 text-brace-hi" />
                  <a href={`mailto:${site.email}`} className="link break-all">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <IconInstagram className="mt-1 h-5 w-5 shrink-0 text-brace-hi" />
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    {site.instagramHandle}
                  </a>
                </li>
              </ul>
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-brace-hi hover:text-brace"
              >
                {addressLine} · Route
                <IconArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
