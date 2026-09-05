import { SITE_URL, site } from "@/lib/site";

const field =
  "w-full rounded-card border border-crosta bg-carbone px-4 py-3 text-step-0 " +
  "text-latte transition-colors duration-150 placeholder:text-latte-mute/50 " +
  "hover:border-fiamma/40 focus:border-fiamma";

const label = "block text-step--1 font-semibold text-latte";

const ANLIEGEN = [
  "Reservation",
  "Reservation für eine Gruppe (ab 8 Personen)",
  "Firmen- oder Vereinsessen",
  "Frage zur Karte",
  "Etwas anderes",
];

/**
 * Anfrageformular über Web3Forms – reines HTML-POST, damit es auch im
 * statischen Export ohne Server funktioniert. Nach dem Absenden leitet
 * Web3Forms auf /danke/ weiter. Ohne Schlüssel bleibt der Knopf inaktiv
 * und es erscheint ein Demo-Hinweis.
 */
export default function ContactForm() {
  const key = site.web3formsKey;
  const live = Boolean(key);

  return (
    <form
      action={live ? "https://api.web3forms.com/submit" : undefined}
      method={live ? "POST" : undefined}
      className="space-y-5"
    >
      {!live && (
        <div className="rounded-card border-2 border-dotted border-brace/50 bg-pietra px-5 py-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brace-hi">
            Demo
          </p>
          <p className="mt-1.5 text-step--1 leading-relaxed text-latte-dim">
            Der Versand wird beim Aufschalten aktiviert. Bis dahin bitte
            telefonisch reservieren oder an{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>{" "}
            schreiben.
          </p>
        </div>
      )}

      {live && (
        <>
          <input type="hidden" name="access_key" value={key} />
          <input
            type="hidden"
            name="subject"
            value="Neue Anfrage über gusto-campano.ch"
          />
          <input type="hidden" name="from_name" value={site.legalName} />
          <input type="hidden" name="redirect" value={`${SITE_URL}/danke/`} />
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
        </>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Telefon
          </label>
          <input
            id="phone"
            name="telefon"
            type="tel"
            autoComplete="tel"
            className={`${field} mt-2`}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={label}>
            E-Mail <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${field} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="datum" className={label}>
            Wunschdatum / Personen
          </label>
          <input
            id="datum"
            name="datum_personen"
            type="text"
            placeholder="z. B. Sa 14.9., 19:30, 4 Personen"
            className={`${field} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="anliegen" className={label}>
          Anliegen
        </label>
        <select id="anliegen" name="anliegen" className={`${field} mt-2`}>
          {ANLIEGEN.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Ihre Nachricht <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="nachricht"
          rows={5}
          required
          className={`${field} mt-2 resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={!live}
          className="btn btn-fiamma disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
        >
          Anfrage senden
        </button>
        <p className="text-step--1 text-latte-mute">
          <span aria-hidden="true">*</span> Pflichtfeld
        </p>
      </div>
    </form>
  );
}
