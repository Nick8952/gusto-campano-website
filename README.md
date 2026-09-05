# Ristorante Pizzeria Gusto Campano – Website

Demo-Website für **Gusto Campano**, Schauenbergstrasse 8, 8046 Zürich-Affoltern.
Neapolitanische Pizzeria & Ristorante, familiär geführt.

**Live (Demo):** <https://nick8952.github.io/gusto-campano-website/>

> Solange der **Demo-Modus** an ist (`data/site.json` → `demo: true`), wird die
> Seite von Suchmaschinen ausgeschlossen (`noindex` + `robots.txt`).

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), statischer Export (`output: export`) |
| Sprache | TypeScript |
| Styling | Tailwind CSS 3 – Design-Tokens in `tailwind.config.ts` |
| Animation | Framer Motion (dezent, respektiert `prefers-reduced-motion`) |
| Schriften | Piazzolla · Hanken Grotesk · Spline Sans Mono (self-hosted via `next/font`) |
| Inhaltsverwaltung | Sveltia CMS unter `/admin/` – speichert direkt ins Git-Repo |
| Formular | Web3Forms (reines HTML-POST, kein Server) |
| Karte | OpenStreetMap-Embed |
| Hosting | GitHub Pages über GitHub Actions |

Keine Datenbank, kein Backend. Alle Inhalte liegen als `data/*.json` und
`content/**/*.md` im Repository.

## Lokal starten

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # statischer Export nach out/
```

## Design – Richtung «Forno & Lava»

Aus dem Design-Interview: *neapolitanisch-rustikal & warm*.

- **Farben** aus der Bildwelt Kampaniens: verkohltes Ofenholz / Vesuv-Basalt als
  Grund (`carbone`), «rosso pompeiano» als Marken-Rot (`brace`), Ofenglut als
  Handlungsfarbe (`fiamma`), staubiges Oliv (`oliva`) und Vietri-Keramikblau
  (`mare`) nur für die Menü-Marker. Bewusst **nicht** der übliche cremefarbene
  Restaurant-Look.
- **Struktur-Element:** die zweisprachige Mono-Überzeile («LA CARTA · die
  Speisekarte») und die gepunktete «carta»-Führungslinie – wie auf einer
  gedruckten Speisekarte – ziehen sich durch jede Sektion.
- **Kopfzeile:** liegt über dem Hero durchsichtig, wird beim Scrollen zu
  Vulkanstein, zeigt einen tagesaktuellen Öffnungs-Status.
- **Signatur:** die **interaktive Speisekarte** (`components/InteractiveMenu.tsx`)
  – Filter nach Klassiker / ohne Tomate / scharf / Meer / vegetarisch, mit
  Layout-Animation, Erzählzeile und Schärfe-Flammen. Inhalt vollständig aus
  `data/menu.json`, also im CMS pflegbar.

## Seiten

| Pfad | Datei | Inhalt |
|---|---|---|
| `/` | `app/page.tsx` | Hero, Herkunft, Methode, Karten-Vorschau, Zitat, Galerie-Vorschau, Reservieren |
| `/speisekarte/` | `app/speisekarte/page.tsx` | vollständige interaktive Karte |
| `/ueber-uns/` | `app/ueber-uns/page.tsx` | Geschichte, Methode, Zutaten-Herkunft |
| `/galerie/` | `app/galerie/page.tsx` | Bilderwand |
| `/reservieren/` | `app/reservieren/page.tsx` | Reservierung, Formular, Öffnungszeiten, Karte |
| `/impressum/`, `/datenschutz/` | | Rechtstexte |
| `/danke/` | | Bestätigung nach Formularversand |

## Inhalte bearbeiten

Alles Weitere – CMS-Login einrichten, Formular scharf schalten, eigene Domain,
Go-Live – steht in **[HANDOVER.md](HANDOVER.md)**.

Was der Betrieb wo ändert:

| Datei | Inhalt | CMS-Bereich |
|---|---|---|
| `data/site.json` | Adresse, Telefon, Öffnungszeiten, Schalter | Firmendaten & Einstellungen |
| `data/menu.json` | Kategorien & Gerichte | Speisekarte |
| `data/gallery.json` | Bilderwand | Galerie |
| `data/about.json` | Methode, Zutaten, Zitat | Über uns (Bausteine) |
| `data/nav.json` | Menü, Fusszeile | Menü & Fusszeile |
| `content/pages/*.md` | Überschriften & Texte je Seite | Seiten-Texte |
| `content/legal/*.md` | Impressum, Datenschutz | Impressum & Datenschutz |
| `public/img/` | Bilder | (Upload über die Bild-Felder) |

## Deploy

Jeder Push auf `main` (auch aus dem CMS) löst
`.github/workflows/deploy.yml` aus: `npm ci && npm run build`, dann Upload nach
GitHub Pages. ~1 Minute bis live.
