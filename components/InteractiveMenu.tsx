"use client";

import { useMemo, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { MENU_FILTERS, menu, type Dish } from "@/lib/menu";
import DishCard from "./DishCard";

/**
 * SIGNATUR DIESER SEITE – «La carta viva».
 * Die Speisekarte als Interaktion: Filter nach Klassiker / ohne Tomate /
 * scharf / Meer / vegetarisch. Beim Umschalten sortieren sich die Gerichte
 * mit Layout-Animation neu, die Erzählzeile über dem Raster wechselt mit,
 * und leere Kategorien verschwinden. Inhalt kommt aus data/menu.json und
 * ist damit vom Betrieb im CMS pflegbar.
 */
export default function InteractiveMenu() {
  const [activeId, setActiveId] = useState("tutte");
  const reduce = useReducedMotion();

  const active = MENU_FILTERS.find((f) => f.id === activeId) ?? MENU_FILTERS[0];

  const filtered = useMemo(
    () =>
      menu.categories
        .map((c) => ({ ...c, dishes: c.dishes.filter(active.test) }))
        .filter((c) => c.dishes.length > 0),
    [active],
  );

  const total = useMemo(
    () => filtered.reduce((n, c) => n + c.dishes.length, 0),
    [filtered],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const f of MENU_FILTERS) {
      map[f.id] = menu.categories.reduce(
        (n, c) => n + c.dishes.filter(f.test).length,
        0,
      );
    }
    return map;
  }, []);

  const layoutTransition = reduce
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.2, 0.6, 0.2, 1] as const };

  return (
    <div>
      {/* Filterleiste – klebt unter der Kopfzeile */}
      <div className="sticky top-16 z-30 -mx-gutter border-y-2 border-dotted border-crosta bg-carbone/92 px-gutter py-3 backdrop-blur-md">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Karte filtern"
        >
          {MENU_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip shrink-0"
              aria-pressed={f.id === activeId}
              onClick={() => setActiveId(f.id)}
            >
              {f.labelIt}
              <span className="text-[0.7em] opacity-60">{counts[f.id]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Erzählzeile */}
      <div className="mt-6 min-h-[3.5rem] border-l-2 border-brace pl-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="text-step-0 text-latte-dim"
          >
            <span className="font-mono text-latte">{total}</span>{" "}
            {total === 1 ? "Gericht" : "Gerichte"}
            {" · "}
            <span className="font-display italic text-latte">
              {active.labelDe}
            </span>
            {" — "}
            {active.note}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Kategorien + Gerichte */}
      <LayoutGroup>
        <div className="mt-8 space-y-14">
          <AnimatePresence mode="popLayout">
            {filtered.map((cat) => (
              <motion.section
                key={cat.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={layoutTransition}
                aria-labelledby={`cat-${cat.id}`}
              >
                <div className="flex items-end gap-4">
                  <h2
                    id={`cat-${cat.id}`}
                    className="font-display text-step-2 text-latte"
                  >
                    {cat.name}
                  </h2>
                  <span className="leader" aria-hidden="true" />
                  <span className="shrink-0 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-latte-mute">
                    {cat.dishes.length}
                  </span>
                </div>
                {cat.subtitle ? (
                  <p className="mt-1.5 text-step--1 text-latte-mute">
                    {cat.subtitle}
                  </p>
                ) : null}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {cat.dishes.map((dish: Dish) => (
                      <motion.div
                        key={dish.name}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={layoutTransition}
                      >
                        <DishCard dish={dish} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      {menu.allergyNote ? (
        <p className="mt-14 border-t-2 border-dotted border-crosta pt-6 font-mono text-[0.72rem] leading-relaxed text-latte-mute">
          {menu.allergyNote}
        </p>
      ) : null}
    </div>
  );
}
