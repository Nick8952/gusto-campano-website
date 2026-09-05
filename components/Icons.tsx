import type { SVGProps } from "react";

/**
 * Strichzeichnungen, 1.6 px, runde Enden – nie Emoji.
 * Einheitlich currentColor, damit sie sich der Textfarbe anpassen.
 */
function base(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 3.5 4 6c-.7.7-.9 1.7-.5 2.6a19 19 0 0 0 9.9 9.9c.9.4 1.9.2 2.6-.5l2.5-2.5-3.7-2.5-2 1.4a13 13 0 0 1-4.7-4.7l1.4-2z" />
    </svg>
  );
}

export function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 21c4-4 7-7.4 7-11a7 7 0 1 0-14 0c0 3.6 3 7 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.4" cy="7.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Flamme – Schärfegrad in der Karte. */
export function IconFlame(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 3c.3 2.6-1.4 3.8-2.7 5.2A6.5 6.5 0 0 0 7.5 13a4.5 4.5 0 0 0 9 .3c0-2-1-3.4-1.8-4.4-.3 1-1 1.6-1.8 1.9.6-1.9.4-5-1.1-7.8Z" />
    </svg>
  );
}

/** Olivenzweig – «vegetariana». */
export function IconLeaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M11 20c-3-6-1-12 8-16 1 9-2 14-8 16Z" />
      <path d="M11 20c.5-4 2-6.5 5-9" />
    </svg>
  );
}

/** Fisch – «mare / pesce». */
export function IconFish(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M3 12c3-4.5 7-6 11-6 3 0 5 1.5 7 3.5-2 2-4 3.5-7 3.5-4 0-8-1.5-11-5Z" />
      <path d="M3 12c3 3.5 7 5 11 5" />
      <circle cx="16.5" cy="10.5" r=".7" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Kleiner Funke – Auszeichnung «Empfehlung des Hauses». */
export function IconSpark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}
