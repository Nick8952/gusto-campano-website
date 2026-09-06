import { img } from "@/lib/site";
import type { Dish } from "@/lib/menu";
import HeatMeter from "./HeatMeter";
import { IconFish, IconLeaf, IconSpark } from "./Icons";

/**
 * Ein Gericht auf der Karte. Aufbau wie eine gedruckte «carta»:
 * Name – gepunktete Führungslinie – Preis. Darunter die italienische
 * Zeile, die Beschreibung und die Marker (vegetarisch / Meer / Schärfe).
 * Das Bild sitzt fest an der Karte und zoomt beim Hover leicht an.
 */
export default function DishCard({ dish }: { dish: Dish }) {
  const veg = dish.tags.includes("vegetariana");
  const mare = dish.tags.includes("mare");

  return (
    <article className="card-forno card-forno-hover group flex gap-4 overflow-hidden p-4 sm:p-5">
      {dish.image ? (
        <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden rounded-card sm:block">
          <img
            src={img(dish.image)}
            alt={dish.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-forno group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbone-deep/45 to-transparent" />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-3">
          <h3 className="font-display text-step-1 font-semibold leading-tight text-latte">
            {dish.name}
          </h3>
          <span className="leader" aria-hidden="true" />
          <span className="shrink-0 font-mono text-step-0 text-latte">
            {dish.price}
          </span>
        </div>

        {dish.sub ? (
          <p className="mt-1 font-mono text-[0.76rem] lowercase tracking-tight text-latte-mute">
            {dish.sub}
          </p>
        ) : null}

        {dish.desc ? (
          <p className="mt-2 text-step--1 leading-relaxed text-latte-dim">
            {dish.desc}
          </p>
        ) : null}

        {(veg || mare || dish.heat > 0 || dish.signature) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
            {dish.signature ? (
              <span className="inline-flex items-center gap-1 text-brace-hi">
                <IconSpark className="h-3.5 w-3.5" />
                Empfehlung
              </span>
            ) : null}
            {veg ? (
              <span className="inline-flex items-center gap-1 text-oliva">
                <IconLeaf className="h-3.5 w-3.5" />
                vegetarisch
              </span>
            ) : null}
            {mare ? (
              <span className="inline-flex items-center gap-1 text-mare">
                <IconFish className="h-3.5 w-3.5" />
                Meer
              </span>
            ) : null}
            <HeatMeter level={dish.heat} />
          </div>
        )}
      </div>
    </article>
  );
}
