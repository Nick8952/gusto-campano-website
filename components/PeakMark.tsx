/**
 * Bildmarke – die zwei Bergsilhouetten (Vesuv / Monte Somma) aus dem Logo
 * des Hauses, plus die geschwungene Peperoncino-Linie darunter. In
 * `currentColor` für die Berge; die Chili trägt ihre eigene Weinrot-Farbe,
 * lässt sich per `chili={false}` abschalten (kleine Grössen).
 */
export default function PeakMark({
  className = "",
  chili = true,
  title = "Gusto Campano",
}: {
  className?: string;
  chili?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
    >
      {/* Monte Somma – der kleinere Grat links, teils verdeckt */}
      <path
        d="M6 63 L27 33 q3 -4 6.5 0.5 L45 49"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vesuv – der grössere Kegel mit gekerbtem Krater */}
      <path
        d="M25 63 L52 24 q4 -6 8 0.5 l4 6 q3 -4 6 0.5 L86 63"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Grundlinie */}
      <path
        d="M6 63 H94"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {chili ? (
        <path
          d="M11 82 q4 -3 10 -2 q22 4 44 1 q12 -1.5 20 -8 q-3 12 -19 15 q-24 4.5 -46 -0.5 q-7 -1.5 -9 -5.5 Z"
          fill="#7E2A3B"
        />
      ) : null}
    </svg>
  );
}
