import { addressLine, mapsLink, site } from "@/lib/site";
import { IconArrowUpRight } from "./Icons";

/**
 * Anfahrtskarte als OpenStreetMap-Embed (kein Google, kein Tracking).
 * Der bbox/marker-Link steht in data/site.json und ist im CMS anpassbar.
 */
export default function MapEmbed() {
  return (
    <div className="card-forno overflow-hidden">
      <iframe
        title={`Karte – ${addressLine}`}
        src={site.mapEmbed}
        loading="lazy"
        className="h-[300px] w-full border-0 grayscale-[0.2] sm:h-[360px]"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-dotted border-crosta p-4">
        <p className="text-step--1 text-latte-dim">{addressLine}</p>
        <a
          href={mapsLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-brace-hi hover:text-brace"
        >
          Route öffnen
          <IconArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
