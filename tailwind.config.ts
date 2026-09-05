import type { Config } from "tailwindcss";

/**
 * Design-Tokens Gusto Campano – Richtung «Forno & Lava»
 * (neapolitanisch-rustikal & warm; Wahl aus dem Design-Interview).
 *
 * Die Palette kommt aus der Bildwelt Kampaniens, nicht aus dem
 * Restaurant-Baukasten: verkohltes Ofenholz und Vesuv-Basalt als Grund,
 * «rosso pompeiano» aus den Fresken von Pompeji als Marken-Rot, die
 * Ofenglut als Handlungsfarbe, ein staubiges Kampanien-Oliv und ein
 * Keramik-Blau von der Amalfiküste (Vietri) nur für die Menü-Marker.
 * Bewusst NICHT: creme­farbener Grund + Terrakotta + Signalgrün.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.md",
  ],
  // Farbblock-Klassen werden als `block-${tone}` zusammengesetzt – der
  // Tailwind-Scanner sieht sie nicht als ganze Zeichenkette.
  safelist: ["block-carbone", "block-deep", "block-pietra", "block-panna"],
  theme: {
    extend: {
      colors: {
        // ── Grundflächen: verkohltes Holz / Vulkanstein
        carbone: "#17100C", // Standard-Hintergrund
        "carbone-deep": "#0D0806", // Hero, Fuss, tiefste Blöcke
        pietra: "#241811", // Karten, gehobene Flächen
        "pietra-hi": "#33241A", // Kartenkante, Hover
        crosta: "#4A3527", // Trennlinien, Rahmen

        // ── warm-helle Punktierung (sparsam, für Rhythmus)
        panna: "#ECDFC9", // heller Block (Reservierungs-Streifen, Zitat)
        "panna-hi": "#F6EEDD",

        // ── Marke & Handlung
        brace: "#B23A2E", // rosso pompeiano – Marken-/Strukturakzent
        "brace-hi": "#CB4A3B", // Rot, aufgehellt für Kanten auf Dunkel
        fiamma: "#E07A2C", // Ofenglut – primäre Handlungsfarbe
        "fiamma-soft": "#F0A860", // Glut-Verläufe, Glanz
        "fiamma-ink": "#14100D", // Text auf fiamma-Flächen

        // ── Menü-Marker (nur dort)
        oliva: "#9CAA6A", // «vegetariana»
        mare: "#5FA0B0", // «mare / pesce» + seltener kühler Akzent

        // ── Schrift auf dunklem Grund: Teig / Fior di Latte
        latte: "#F2E6D2",
        "latte-dim": "#C9B69C",
        "latte-mute": "#A38F77",
      },
      fontFamily: {
        // Piazzolla – warmes, eigenwilliges Modern-Serif mit ausdrucksstarker
        //   Kursive (für italienische Wendungen). Nur gross, mit Zurückhaltung.
        display: ["var(--font-display)", "Piazzolla", "Georgia", "serif"],
        // Hanken Grotesk – humanistische Grotesk, bleibt bei langen deutschen
        //   Komposita ruhig lesbar.
        sans: ["var(--font-body)", "Hanken Grotesk", "system-ui", "sans-serif"],
        // Spline Sans Mono – Preise, Temperaturen, Zeiten, die zweisprachigen
        //   Überzeilen. Setzt die Karte wie eine gedruckte «carta».
        mono: ["var(--font-mono)", "Spline Sans Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "step--1": ["clamp(0.82rem, 0.79rem + 0.15vw, 0.9rem)", { lineHeight: "1.5" }],
        "step-0": ["clamp(1rem, 0.96rem + 0.2vw, 1.11rem)", { lineHeight: "1.68" }],
        "step-1": ["clamp(1.2rem, 1.12rem + 0.4vw, 1.5rem)", { lineHeight: "1.45" }],
        "step-2": ["clamp(1.5rem, 1.35rem + 0.75vw, 2.1rem)", { lineHeight: "1.22" }],
        "step-3": ["clamp(1.9rem, 1.55rem + 1.6vw, 3.1rem)", { lineHeight: "1.1" }],
        "step-4": ["clamp(2.4rem, 1.75rem + 3vw, 4.6rem)", { lineHeight: "1.0" }],
        "step-5": ["clamp(2.9rem, 1.5rem + 6.2vw, 7rem)", { lineHeight: "0.95" }],
      },
      spacing: {
        section: "clamp(3.5rem, 2.6rem + 4vw, 6rem)",
        gutter: "clamp(1.25rem, 0.6rem + 3vw, 3rem)",
      },
      maxWidth: {
        shell: "80rem",
        prose: "40rem",
      },
      borderRadius: {
        card: "4px", // scharf-handwerklich, kein weiches SaaS-Radius
        pill: "999px",
      },
      boxShadow: {
        forno: "0 2px 6px rgba(0,0,0,0.5), 0 30px 60px -28px rgba(0,0,0,0.85)",
        lift: "0 4px 10px rgba(0,0,0,0.55), 0 40px 80px -30px rgba(0,0,0,0.9)",
        glow: "0 0 0 1px rgba(224,122,44,0.25), 0 18px 50px -18px rgba(224,122,44,0.45)",
      },
      transitionTimingFunction: {
        forno: "cubic-bezier(0.2, 0.6, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
