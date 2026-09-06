import type { Metadata, Viewport } from "next";
import {
  Fredoka,
  Hanken_Grotesk,
  Piazzolla,
  Spline_Sans_Mono,
} from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL, asset, site } from "@/lib/site";

/**
 * Schriftpaar:
 *   Piazzolla – Display. Warmes Modern-Serif mit ausdrucksstarker Kursive
 *     (für italienische Wendungen). Nur gross, mit Zurückhaltung.
 *   Hanken Grotesk – Fliesstext. Humanistische Grotesk, bleibt bei langen
 *     deutschen Komposita ruhig lesbar.
 *   Spline Sans Mono – Preise, Temperaturen, Zeiten, die zweisprachigen
 *     Überzeilen. Setzt die Karte wie eine gedruckte «carta».
 */
const display = Piazzolla({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Fredoka – ausschliesslich für die Wort-/Bildmarke «GUSTO CAMPANO».
 * Runde, kräftige geometrische Grotesk, sehr nah am gedruckten Logo des
 * Hauses. Kommt nirgends sonst im Fliesstext vor.
 */
const logo = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.legalName} – Neapolitanische Pizza in Zürich-Affoltern`,
    template: `%s · ${site.name}`,
  },
  description: site.blurb,
  robots: site.demo
    ? { index: false, follow: false }
    : { index: true, follow: true },
  icons: { icon: asset("/favicon.svg"), apple: asset("/favicon.svg") },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: site.name,
    url: SITE_URL,
    title: `${site.legalName} – ${site.tagline}`,
    description: site.blurb,
    images: [{ url: asset("/img/hero-forno.jpg"), width: 1600, height: 1067 }],
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de-CH"
      className={`${display.variable} ${body.variable} ${mono.variable} ${logo.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/* Sicherheitsnetz: ohne JavaScript bleiben die eingeblendeten
            Abschnitte (Framer Motion) sonst unsichtbar. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteHeader />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd />
      </body>
    </html>
  );
}
