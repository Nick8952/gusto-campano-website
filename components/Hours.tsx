"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { openStateFor } from "./openState";

/**
 * Öffnungszeiten-Tabelle. Der laufende Tag wird nach dem Mounten markiert
 * (nicht zur Buildzeit, sonst friert die Markierung im Static Export ein).
 */
export default function Hours() {
  const [todayIdx, setTodayIdx] = useState<number | null>(null);
  const [status, setStatus] = useState<{ label: string; open: boolean } | null>(
    null,
  );

  useEffect(() => {
    const now = new Date();
    setTodayIdx((now.getDay() + 6) % 7);
    setStatus(openStateFor(now, site.hours));
  }, []);

  return (
    <div className="card-forno p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-step-1 text-latte">Öffnungszeiten</h3>
        {status ? (
          <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-latte-dim">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status.open ? "bg-oliva" : "bg-brace"
              }`}
              aria-hidden="true"
            />
            {status.label}
          </span>
        ) : null}
      </div>

      <dl className="mt-4 divide-y-2 divide-dotted divide-crosta">
        {site.hours.map((h, i) => (
          <div
            key={h.day}
            className={`flex justify-between gap-4 py-2.5 text-step--1 ${
              i === todayIdx ? "text-fiamma" : "text-latte-dim"
            }`}
          >
            <dt className={i === todayIdx ? "font-semibold" : ""}>{h.day}</dt>
            <dd className="text-right font-mono">{h.value}</dd>
          </div>
        ))}
      </dl>

      {site.kitchenNote ? (
        <p className="mt-4 text-[0.8rem] leading-relaxed text-latte-mute">
          {site.kitchenNote}
        </p>
      ) : null}
    </div>
  );
}
