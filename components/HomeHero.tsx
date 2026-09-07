import Link from "next/link";
import { img, site } from "@/lib/site";
import type { Hero } from "@/lib/content";
import { IconArrowRight, IconPhone } from "./Icons";

/**
 * Hero als These: das Charakteristischste einer neapolitanischen Pizzeria –
 * das Feuer im Holzofen und der leopardgefleckte Rand nach 70 Sekunden.
 * Bild + Ofenglut-Verlauf, der sehr langsam atmet (CSS, hält bei
 * prefers-reduced-motion still). Darunter der Fakten-Streifen in Mono.
 */
export default function HomeHero({ hero }: { hero: Hero }) {
  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-carbone-deep">
      <img
        src={img("hero-forno.jpg")}
        alt="Feuer im gemauerten Holzofen"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* Ofenglut – tiefes Weinrot mit warmem Kern, an die Logo-Farbe angelehnt */}
      <div
        aria-hidden="true"
        className="ember-breathe absolute -z-10 h-[80vmin] w-[80vmin] rounded-full blur-3xl"
        style={{
          right: "-10vmin",
          bottom: "-6vmin",
          background:
            "radial-gradient(circle, rgba(200,96,116,0.42), rgba(138,42,62,0.34) 44%, transparent 70%)",
        }}
      />
      {/* Lesbarkeit */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-carbone-deep via-carbone-deep/72 to-carbone-deep/30"
      />

      <div className="mx-auto w-full max-w-shell px-gutter pb-16 pt-36 sm:pb-20">
        <p className="eyebrow">
          {hero.eyebrowIt}
          <span aria-hidden="true" className="text-latte-mute">
            ·
          </span>
          <span className="eyebrow-de">{hero.eyebrowDe}</span>
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-step-5 font-semibold leading-[0.95] text-latte">
          {hero.titleLine1}{" "}
          <span className="italic text-oliva-hi">{hero.titleAccent}</span>
        </h1>

        <p className="mt-6 max-w-xl text-step-1 leading-relaxed text-latte-dim">
          {hero.lead}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/reservieren/" className="btn btn-primary">
            Tisch reservieren
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/speisekarte/" className="btn btn-outline">
            Zur Speisekarte
          </Link>
          <a
            href={`tel:${site.phoneTel}`}
            className="btn btn-ghost"
          >
            <IconPhone className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t-2 border-dotted border-crosta pt-6">
          {site.facts.map((f) => (
            <div key={f.label} className="flex items-baseline gap-2.5">
              <dt className="font-mono text-step-1 text-brace-hi">{f.value}</dt>
              <dd className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-latte-mute">
                {f.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
