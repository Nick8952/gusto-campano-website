/** @type {import('next').NextConfig} */

// Das Deploy-Ziel bestimmt den Basispfad (Unterordner) und die Domain:
//
//   • Vercel            → automatisch erkannt (VERCEL=1). Läuft im Wurzel-
//                         verzeichnis, also KEIN Basispfad. Domain = die
//                         Vercel-URL (bzw. SITE_ORIGIN, falls gesetzt).
//   • GitHub Pages       → Standard. Läuft unter /gusto-campano-website/.
//                         SITE_ORIGIN + BASE_PATH kommen aus
//                         .github/workflows/deploy.yml.
//   • eigene Domain      → SITE_ORIGIN=https://gusto-campano.ch, BASE_PATH=""
//                         (siehe HANDOVER.md, Abschnitt 5/6).
//
// Explizit gesetzte Umgebungsvariablen (BASE_PATH / SITE_ORIGIN) haben immer
// Vorrang.

const onVercel = Boolean(process.env.VERCEL);

const BASE_PATH =
  process.env.BASE_PATH ?? (onVercel ? "" : "/gusto-campano-website");

const SITE_ORIGIN =
  process.env.SITE_ORIGIN ??
  (onVercel && process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : onVercel && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://nick8952.github.io");

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_URL: SITE_ORIGIN + BASE_PATH,
  },
};

export default nextConfig;
