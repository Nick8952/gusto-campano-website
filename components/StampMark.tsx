/**
 * Marken-Siegel («bollo») – eine runde Prägemarke, wie sie das Haus auch auf
 * Speisekarte und Schachteln verwendet. Ersetzt das Logo, bis der Betrieb ein
 * eigenes liefert; Kopfzeile, Fuss und Favicon nutzen dasselbe Bauteil.
 *
 * Aussenring in «rosso pompeiano», in der Mitte eine Flamme in Ofenglut –
 * der Kern der Richtung «Forno & Lava».
 */
export default function StampMark({
  className = "",
  title = "Gusto Campano",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <path
          id="stamp-circle"
          d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
          fill="none"
        />
      </defs>

      <circle cx="50" cy="50" r="47" fill="none" stroke="#B23A2E" strokeWidth="2" />
      <circle cx="50" cy="50" r="41.5" fill="none" stroke="#B23A2E" strokeWidth="0.9" />

      <text
        fill="#B23A2E"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "8.4px",
          letterSpacing: "2.1px",
          textTransform: "uppercase",
        }}
      >
        <textPath href="#stamp-circle" startOffset="1%">
          Ristorante · Pizzeria · Gusto Campano · Napoli ·
        </textPath>
      </text>

      {/* Flamme in Ofenglut */}
      <g transform="translate(50 54)">
        <path
          d="M0-19c2 6-3 8-5 12a11 11 0 0 0-2 6.5 9 9 0 0 0 18 .6c0-3.6-1.6-6-3-7.6-.4 1.8-1.6 2.9-3 3.4C4-6 3.5-13 0-19Z"
          fill="#E07A2C"
        />
        <path
          d="M0-6c1 3-1.4 4.2-2.4 6.2A5.4 5.4 0 0 0-5 4a4.4 4.4 0 0 0 8.8.3c0-2-1-3-1.8-3.9-.5 1.3-1.4 1.8-2.3 2C-1.4-1 .9-3.6 0-6Z"
          fill="#F0A860"
        />
      </g>
    </svg>
  );
}
