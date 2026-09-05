import { IconFlame } from "./Icons";

/** Schärfegrad 1–3 als gefüllte/leere Flammen. 0 = nichts. */
export default function HeatMeter({ level }: { level: number }) {
  if (!level || level < 1) return null;
  const n = Math.min(3, Math.round(level));

  return (
    <span
      className="inline-flex items-center gap-0.5 text-brace-hi"
      title={`Schärfe ${n} von 3`}
      aria-label={`Schärfe ${n} von 3`}
    >
      {[1, 2, 3].map((i) => (
        <IconFlame
          key={i}
          className={`h-3.5 w-3.5 ${i <= n ? "" : "opacity-25"}`}
        />
      ))}
    </span>
  );
}
