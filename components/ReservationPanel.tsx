import { site } from "@/lib/site";
import { IconArrowUpRight, IconPhone } from "./Icons";

/**
 * Reservierung. Ist im CMS eine `reservationUrl` hinterlegt (z. B. aleno,
 * Foratable, OpenTable), erscheint der Button zum Buchungssystem – sonst
 * ein Hinweis mit Telefon. Der Anruf ist immer der schnellste Weg.
 */
export default function ReservationPanel({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  const url = site.reservationUrl;

  return (
    <div className="card-forno p-6 sm:p-8">
      <h2 className="font-display text-step-2 text-latte">{heading}</h2>
      <p className="mt-3 text-step-0 leading-relaxed text-latte-dim">{body}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Zum Buchungssystem
            <IconArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-card border-2 border-dotted border-crosta px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-latte-mute">
            Online-Reservation folgt beim Aufschalten
          </span>
        )}

        <a href={`tel:${site.phoneTel}`} className="btn btn-outline">
          <IconPhone className="h-4 w-4" />
          {site.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
