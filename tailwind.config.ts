import type { Config } from "tailwindcss";

/**
 * Design-Tokens Gusto Campano – Richtung «Forno & Lava»
 * (neapolitanisch-rustikal & warm; Wahl aus dem Design-Interview).
 *
 * Verkohltes Ofenholz / Vesuv-Basalt als dunkler Grund. Die beiden
 * Akzente kommen direkt aus dem Logo des Hauses:
 *   brace  = das Weinrot / Burgunder von «CAMPANO» + der Peperoncino
 *   oliva  = das Salbeigrün von «GUSTO» + der Vesuv-Silhouette
 * fiamma bleibt als warmer Glut-Ton nur für den Ofen im Hero und die
 * Schärfe-Flammen. Panna (warmes Creme) für die hellen Punktierungen.
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
        carbone: "#17100E", // Standard-Hintergrund
        "carbone-deep": "#0D0807", // Hero, Fuss, tiefste Blöcke
        pietra: "#241813", // Karten, gehobene Flächen
        "pietra-hi": "#33241C", // Kartenkante, Hover
        crosta: "#4A362B", // Trennlinien, Rahmen

        // ── warm-helle Punktierung (sparsam, für Rhythmus)
        panna: "#ECDFC9", // heller Block (Zitat)
        "panna-hi": "#F6EEDD",

        // ── Marke: Weinrot/Burgunder aus dem Logo («CAMPANO» + Peperoncino)
        brace: "#7E2A3B", // Marken-/Handlungsfarbe, CTA-Flächen
        "brace-hi": "#C0716B", // aufgehellt (Backstein-Rose), Schrift/Icons auf Dunkel
        "brace-ink": "#F5E7DB", // Text auf brace-Flächen

        // ── Zweitakzent: Salbeigrün aus dem Logo («GUSTO» + Vesuv)
        oliva: "#9CA98A", // Überzeilen, «vegetariana», Status-Punkt
        "oliva-hi": "#BCC7A8", // aufgehellt für Text auf Dunkel

        // ── nur Ofen & Schärfe: warmer Glut-Ton
        fiamma: "#C2593F", // Hero-Glut, Schärfe-Flammen, Fokusring
        "fiamma-soft": "#D98A66",

        // ── «mare / pesce»-Marker – gedämpftes Petrol, kein lautes Blau
        mare: "#5F8A80",

        // ── Schrift auf dunklem Grund: Teig / Fior di Latte
        latte: "#F3E7D6",
        "latte-dim": "#CBB9A0",
        "latte-mute": "#A6927B",
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
        // Fredoka – nur für die Wortmarke «GUSTO CAMPANO».
        logo: ["var(--font-logo)", "Fredoka", "system-ui", "sans-serif"],
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
        glow: "0 0 0 1px rgba(193,106,120,0.3), 0 18px 50px -18px rgba(126,42,59,0.5)",
      },
      transitionTimingFunction: {
        forno: "cubic-bezier(0.2, 0.6, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
