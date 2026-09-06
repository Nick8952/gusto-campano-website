import Link from "next/link";
import { getPage, toHtml, type Hero } from "@/lib/content";
import { img, site } from "@/lib/site";
import { Container, Section } from "@/components/ui";
import HomeHero from "@/components/HomeHero";
import SectionHead from "@/components/SectionHead";
import CraftSteps from "@/components/CraftSteps";
import MenuTeaser from "@/components/MenuTeaser";
import GalleryWall from "@/components/GalleryWall";
import PullQuote from "@/components/PullQuote";
import Reveal from "@/components/Reveal";
import about from "@/data/about.json";
import { IconArrowRight, IconPhone } from "@/components/Icons";

export default function HomePage() {
  const page = getPage("home");
  const hero = (page.hero ?? {}) as Hero;

  return (
    <>
      <HomeHero hero={hero} />

      {/* ── Herkunft ─────────────────────────────────────────── */}
      <Section tone="pietra">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHead
                it="Chi siamo"
                de="wer wir sind"
                title={String(page.valueHeading ?? "")}
              />
              <div
                className="prose-gc mt-6"
                dangerouslySetInnerHTML={{
                  __html: toHtml(String(page.valueBody ?? "")),
                }}
              />
              <Link
                href="/ueber-uns/"
                className="mt-7 inline-flex items-center gap-2 font-mono text-step--1 uppercase tracking-[0.14em] text-brace-hi hover:text-brace"
              >
                Die ganze Geschichte
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <Reveal className="relative">
              <div className="overflow-hidden rounded-card border border-crosta">
                <img
                  src={img("impasto.jpg")}
                  alt="Hände beim Ausziehen des Teigs"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-card border border-crosta bg-carbone-deep p-4 sm:block">
                <p className="font-mono text-step-1 text-brace-hi">48 h</p>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-latte-mute">
                  Teigreifung
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Methode ──────────────────────────────────────────── */}
      <Section tone="carbone">
        <Container>
          <SectionHead
            it="Il metodo"
            de="so machen wir es"
            title={about.craftHeading}
            lead={about.craftLead}
          />
          <CraftSteps />
        </Container>
      </Section>

      {/* ── Karte (Vorschau) ─────────────────────────────────── */}
      <Section tone="pietra" id="karte">
        <Container>
          <SectionHead
            it="La carta"
            de="die Speisekarte"
            title={String(page.menuHeading ?? "")}
            lead={String(page.menuLead ?? "")}
          />
          <MenuTeaser />
        </Container>
      </Section>

      {/* ── Zitat ────────────────────────────────────────────── */}
      <Section tone="panna">
        <Container>
          <PullQuote quote={about.quote} author={about.quoteAuthor} />
        </Container>
      </Section>

      {/* ── Galerie (Vorschau) ───────────────────────────────── */}
      <Section tone="carbone">
        <Container>
          <SectionHead
            it="La sala"
            de="ein Abend bei uns"
            title={String(page.galleryHeading ?? "")}
            lead={String(page.galleryLead ?? "")}
          />
          <div className="mt-10">
            <GalleryWall limit={8} />
            <Link
              href="/galerie/"
              className="mt-6 inline-flex items-center gap-2 font-mono text-step--1 uppercase tracking-[0.14em] text-brace-hi hover:text-brace"
            >
              Zur Galerie
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Abschluss / Reservieren ──────────────────────────── */}
      <Section tone="deep">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">
                Prenota<span className="eyebrow-de">reservieren</span>
              </p>
              <h2 className="mt-4 text-step-3">
                {String(page.closingHeading ?? "")}
              </h2>
              <p className="mt-4 max-w-lg text-step-1 leading-relaxed text-latte-dim">
                {String(page.closingBody ?? "")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/reservieren/" className="btn btn-primary">
                  Tisch reservieren
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${site.phoneTel}`} className="btn btn-outline">
                  <IconPhone className="h-4 w-4" />
                  {site.phoneDisplay}
                </a>
              </div>
            </Reveal>

            <Reveal className="card-forno p-6">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-latte-mute">
                So finden Sie uns
              </p>
              <p className="mt-3 font-display text-step-1 text-latte">
                {site.address.street}
              </p>
              <p className="text-step-0 text-latte-dim">
                {site.address.zip} {site.address.city} · {site.region}
              </p>
              <div className="mt-5 space-y-1 border-t-2 border-dotted border-crosta pt-4 font-mono text-[0.78rem] text-latte-mute">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="text-right text-latte-dim">{h.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
