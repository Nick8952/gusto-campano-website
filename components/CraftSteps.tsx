import about from "@/data/about.json";
import Reveal from "./Reveal";

/**
 * «Dal grano al forno» – vier Schritte vom Mehl zum Teller. Hier ist die
 * Nummerierung ehrlich: es ist eine echte Reihenfolge, jeder Schritt baut
 * auf dem vorigen auf. Die Zeitangaben (48 h, 485°, 70 Sek.) sind der rote
 * Faden der Marke.
 */
export default function CraftSteps() {
  return (
    <ol className="mt-10 grid gap-px overflow-hidden rounded-card border border-crosta bg-crosta sm:grid-cols-2 lg:grid-cols-4">
      {about.craftSteps.map((step, i) => (
        <Reveal
          as="li"
          key={step.title}
          delay={i * 0.06}
          className="relative flex flex-col overflow-hidden bg-pietra p-6"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-4 font-display text-[5.5rem] font-bold leading-none text-brace/15"
          >
            {i + 1}
          </span>
          <span className="relative font-mono text-[0.72rem] uppercase tracking-[0.16em] text-brace-hi">
            Schritt {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="relative mt-3 font-display text-step-1 text-latte">
            {step.title}
          </h3>
          <p className="relative mt-2 text-step--1 leading-relaxed text-latte-dim">
            {step.detail}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
