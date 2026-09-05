import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Sektionskopf mit dem wiederkehrenden Strukturelement der Seite:
 * die zweisprachige Überzeile («LA CARTA · die Speisekarte») und darunter
 * der Titel mit der gepunkteten «carta»-Führungslinie – wie auf einer
 * gedruckten Speisekarte.
 */
export default function SectionHead({
  it,
  de,
  title,
  lead,
  align = "left",
  children,
}: {
  it: string;
  de?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-prose text-center" : "max-w-2xl"}>
      <p className="eyebrow">
        {it}
        {de ? (
          <>
            <span aria-hidden="true" className="text-latte-mute">
              ·
            </span>
            <span className="eyebrow-de">{de}</span>
          </>
        ) : null}
      </p>

      <div
        className={`mt-4 flex items-end gap-4 ${centered ? "justify-center" : ""}`}
      >
        <h2 className="text-step-3">{title}</h2>
        {!centered ? <span className="leader" aria-hidden="true" /> : null}
      </div>

      {lead ? (
        <p className="mt-4 text-step-1 leading-relaxed text-latte-dim">{lead}</p>
      ) : null}

      {children}
    </Reveal>
  );
}
