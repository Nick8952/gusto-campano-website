import Link from "next/link";
import { img } from "@/lib/site";
import { signatureDishes } from "@/lib/menu";
import HeatMeter from "./HeatMeter";
import Reveal from "./Reveal";
import { IconArrowRight, IconFish, IconLeaf } from "./Icons";

/**
 * Startseiten-Vorschau: eine liegende Reihe der Empfehlungen mit Bild.
 * Die volle Interaktion (Filter, Erzählzeile) steht auf der Speisekarte –
 * die Signatur bleibt an einem Ort.
 */
export default function MenuTeaser() {
  const dishes = signatureDishes();

  return (
    <div className="mt-10">
      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        role="list"
      >
        {dishes.map((dish, i) => (
          <Reveal
            key={dish.name}
            as="article"
            delay={i * 0.05}
            className="w-[76vw] shrink-0 snap-start sm:w-[20rem]"
          >
            <div className="card-forno card-forno-hover group h-full overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={img(dish.image ?? "pizza-margherita.jpg")}
                  alt={dish.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-forno group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbone-deep/70 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-end gap-3">
                  <h3 className="font-display text-step-1 leading-tight text-latte">
                    {dish.name}
                  </h3>
                  <span className="leader" aria-hidden="true" />
                  <span className="shrink-0 font-mono text-step-0 text-latte">
                    {dish.price}
                  </span>
                </div>
                {dish.sub ? (
                  <p className="mt-1 font-mono text-[0.72rem] lowercase text-latte-mute">
                    {dish.sub}
                  </p>
                ) : null}
                <div className="mt-3 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-latte-mute">
                  {dish.tags.includes("vegetariana") ? (
                    <IconLeaf className="h-3.5 w-3.5 text-oliva" />
                  ) : null}
                  {dish.tags.includes("mare") ? (
                    <IconFish className="h-3.5 w-3.5 text-mare" />
                  ) : null}
                  <HeatMeter level={dish.heat} />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Link
        href="/speisekarte/"
        className="mt-6 inline-flex items-center gap-2 font-mono text-step--1 uppercase tracking-[0.14em] text-brace-hi hover:text-brace"
      >
        Ganze Karte mit Filter
        <IconArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
