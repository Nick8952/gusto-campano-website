/**
 * Wort-/Bildmarke «GUSTO CAMPANO» – Nachbau des gedruckten Logos des Hauses:
 * die zwei Bergsilhouetten (Vesuv / Monte Somma), «GUSTO» im Salbeigrün,
 * «CAMPANO» im Weinrot, darunter der Peperoncino. Schrift: Fredoka.
 *
 * Wird das echte Logo als Datei geliefert (public/img/logo-original.*),
 * kann diese Komponente 1:1 durch ein <img> ersetzt werden.
 */
export default function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const green = variant === "dark" ? "#BCC7A8" : "#6E7C58";
  const wine = variant === "dark" ? "#C0716B" : "#7E2A3B";

  return (
    <svg
      viewBox="0 0 300 250"
      className={className}
      role="img"
      aria-label="Gusto Campano"
      fill="none"
    >
      {/* Berge */}
      <g
        stroke={green}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 96 L92 32 q7 -9 14 1 L136 66" />
        <path d="M96 96 L162 26 q9 -13 17 1 l9 13 q6 -8 12 1 L250 96" />
        <path d="M34 96 H266" />
      </g>

      {/* GUSTO */}
      <text
        x="150"
        y="162"
        textAnchor="middle"
        fill={green}
        style={{
          fontFamily: "var(--font-logo), Fredoka, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "64px",
          letterSpacing: "6px",
        }}
      >
        GUSTO
      </text>

      {/* CAMPANO */}
      <text
        x="150"
        y="222"
        textAnchor="middle"
        fill={wine}
        style={{
          fontFamily: "var(--font-logo), Fredoka, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "62px",
          letterSpacing: "0.5px",
        }}
      >
        CAMPANO
      </text>

      {/* Peperoncino */}
      <path
        d="M44 240 q10 -6 24 -4 q56 9 112 2 q26 -3 44 -17 q-6 25 -42 32 q-58 10 -116 -1 q-16 -3 -22 -12 Z"
        fill={wine}
      />
    </svg>
  );
}
