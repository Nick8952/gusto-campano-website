"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Zählt eine Zahl beim Erscheinen von 0 auf ihren Wert hoch
 * («48 h» → 0 h … 48 h). Nur die Ziffern werden animiert, die Einheit
 * bleibt stehen. Läuft einmalig, sobald das Element ins Bild kommt.
 * Bei prefers-reduced-motion erscheint sofort der Endwert.
 */
export default function CountUp({
  value,
  duration = 1.4,
  delay = 0,
}: {
  value: string;
  duration?: number;
  delay?: number;
}) {
  const match = value.match(/^(-?\d+(?:[.,]\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1].replace(",", ".")) : null;
  const suffix = match ? match[2] : "";
  const reduce = useReducedMotion();

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [display, setDisplay] = useState(
    target === null || reduce ? value : `0${suffix}`,
  );

  useEffect(() => {
    if (target === null || reduce || !inView) return;
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // dreht hoch und pendelt sich sanft ein
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, target, reduce, duration, delay, suffix]);

  // Kein Zahlenmuster erkannt (sollte nicht vorkommen) -> Wert unverändert zeigen.
  if (target === null) return <>{value}</>;

  return <span ref={ref}>{display}</span>;
}
