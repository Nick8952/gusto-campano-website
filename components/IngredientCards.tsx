import about from "@/data/about.json";
import Reveal from "./Reveal";

/** Herkunft der wichtigsten Zutaten – DOP-Angaben als Mono-Zeile. */
export default function IngredientCards() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {about.ingredients.map((ing, i) => (
        <Reveal
          key={ing.name}
          as="article"
          delay={i * 0.05}
          className="card-forno p-6"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-step-1 text-latte">{ing.name}</h3>
          </div>
          <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-brace-hi">
            {ing.origin}
          </p>
          <p className="mt-3 text-step--1 leading-relaxed text-latte-dim">
            {ing.note}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
