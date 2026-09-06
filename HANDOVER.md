# Übergabe – Website Gusto Campano

Dieses Dokument beschreibt alles, was nach der Übergabe noch zu tun ist und wie
die Seite langfristig gepflegt wird – auch von jemandem, der sie nicht gebaut hat.

**Inhalt**

1. [CMS-Login einrichten](#1-cms-login-einrichten-einmalig)
2. [Inhalte bearbeiten – Anleitung für den Betrieb](#2-inhalte-bearbeiten)
3. [Anfrageformular scharf schalten](#3-anfrageformular-scharf-schalten)
4. [Online-Reservierung anbinden](#4-online-reservierung-anbinden)
5. [Vor dem Go-Live](#5-vor-dem-go-live)
6. [Eigene Domain aufschalten](#6-eigene-domain-aufschalten)
7. [Wenn etwas nicht funktioniert](#7-wenn-etwas-nicht-funktioniert)
8. [Was in der Demo noch geprüft / ersetzt werden muss](#8-was-in-der-demo-noch-geprueft--ersetzt-werden-muss)
9. [Wer was besitzt](#9-wer-was-besitzt)

---

## 1. CMS-Login einrichten (einmalig)

Das CMS liegt unter `…/admin/`. Es speichert direkt ins GitHub-Repository, hat
also keine eigene Datenbank und kein eigenes Passwort – man meldet sich mit dem
GitHub-Konto an. Damit das im Browser funktioniert, braucht es einmalig zwei
Dinge: eine OAuth-App bei GitHub und einen kleinen Vermittler (Cloudflare Worker).
Beides ist gratis und danach nie wieder anzufassen.

### 1a. GitHub-OAuth-App anlegen

1. <https://github.com/settings/developers> → **OAuth Apps** → **New OAuth App**
2. Ausfüllen:
   - **Application name:** `Gusto Campano CMS`
   - **Homepage URL:** `https://nick8952.github.io/gusto-campano-website/`
   - **Authorization callback URL:** die Worker-URL aus Schritt 1b plus `/callback`
     (z. B. `https://gusto-campano-cms-auth.<name>.workers.dev/callback`) – erst
     nach 1b eintragbar, die App lässt sich nachträglich bearbeiten.
3. **Client ID** notieren, **Generate a new client secret** → **Client Secret**
   notieren. Das Secret wird nur einmal angezeigt.

### 1b. Cloudflare Worker deployen

Der Worker ist fertig, es muss nichts programmiert werden.

1. Konto auf <https://dash.cloudflare.com> (gratis).
2. Repository <https://github.com/sveltia/sveltia-cms-auth> öffnen und der
   dortigen Anleitung folgen (**Deploy to Cloudflare Workers**).
3. Im Worker unter **Settings → Variables** drei Werte setzen:
   - `GITHUB_CLIENT_ID` – aus 1a
   - `GITHUB_CLIENT_SECRET` – aus 1a
   - `ALLOWED_DOMAINS` – `nick8952.github.io` (später zusätzlich `gusto-campano.ch`)
4. Die Worker-URL kopieren und in 1a als **Authorization callback URL** + `/callback`
   eintragen.

### 1c. Worker-URL in die Website eintragen

In [`public/admin/config.yml`](public/admin/config.yml), Zeile `base_url`:

```yaml
backend:
  name: github
  repo: Nick8952/gusto-campano-website
  branch: main
  base_url: https://REPLACE-WITH-SVELTIA-AUTH-WORKER-URL   # ← hier die Worker-URL
```

Ändern, committen, pushen. Nach dem Deploy funktioniert der Login unter `/admin/`.

### 1d. Betrieb freischalten

Der Betrieb braucht ein GitHub-Konto und **Schreibrechte** auf das Repository:
Repo → **Settings → Collaborators → Add people** → Rolle `Write`.

---

## 2. Inhalte bearbeiten

*Diesen Abschnitt kann man dem Betrieb so weitergeben.*

### Anmelden

1. `https://nick8952.github.io/gusto-campano-website/admin/` öffnen
2. **Login with GitHub** – GitHub-Konto verwenden
3. Links in der Spalte den Bereich wählen, ändern, oben rechts **Publish**

Nach dem Speichern dauert es **rund eine Minute**, bis die Änderung auf der
Website sichtbar ist. Danach im Browser einmal neu laden (Strg+F5 / Cmd+Shift+R).

### Welcher Bereich enthält was

| Bereich im CMS | Was man dort ändert |
|---|---|
| **Firmendaten & Einstellungen** | Adresse, Telefon, E-Mail, Öffnungszeiten, Demo-Schalter, Formular-Schlüssel, Reservierungs-Link, Fakten im Hero |
| **Speisekarte** | Alle Kategorien und Gerichte: Name, Zutaten, Beschreibung, Preis, Merkmale (Klassiker / ohne Tomate / vegetarisch / Meer), Schärfe, Bild, «Empfehlung des Hauses» |
| **Galerie** | Die Bilder der Bilderwand, ihre Beschreibung und Grösse im Raster |
| **Über uns (Bausteine)** | Die vier Methode-Schritte, die Zutaten-Herkunft, das Zitat |
| **Menü & Fusszeile** | Beschriftungen und Reihenfolge im Menü |
| **Seiten-Texte** | Überschriften, Einleitungen und der Fliesstext von «Über uns» |
| **Impressum & Datenschutz** | Die beiden Rechtstexte |

### Häufige Aufgaben

**Ein Gericht ändern oder streichen:** Speisekarte → Kategorie öffnen → Gericht
anklicken. Zum Löschen das Papierkorb-Symbol beim Gericht. Neues Gericht:
**Add Gericht**.

**Preis ändern:** nur die Zahl eintragen, ohne «CHF» und ohne «.–» – also
`18.50`, nicht `CHF 18.50`.

**Neue Kategorie:** Speisekarte → **Add Kategorie**. Die «Kennung» muss
kleingeschrieben und ohne Leerzeichen sein (z. B. `pizze-speciali`) und darf
nachträglich nicht mehr geändert werden.

**Schärfe:** 0 = nicht scharf, 1–3 = eine bis drei Flammen. Ab 1 taucht das
Gericht im Filter «Piccanti» auf.

**Öffnungszeiten ändern:** Firmendaten → Öffnungszeiten. Schreibweise genau
beibehalten: `11:30 – 14:00 · 17:30 – 23:00` (Bindestrich zwischen den Zeiten,
Mittelpunkt · zwischen Mittag und Abend) oder das Wort `geschlossen`. Daraus
berechnet die Seite automatisch den «Heute geöffnet bis …»-Hinweis.

**Telefonnummer ändern:** Firmendaten → **beide** Felder anpassen – „Telefon
(Anzeige)" ist das, was man liest, „Telefon (zum Anwählen)" ist die Nummer, die
beim Antippen gewählt wird (Format `+41443715525`, ohne Leerzeichen).

**Foto tauschen:** Beim jeweiligen Bild-Feld auf das Bild klicken → **Upload** →
neues Foto wählen. Es landet automatisch in `public/img`. Am besten quer,
mindestens 1600 px breit, als JPG.

**Etwas kaputt gemacht?** Jede Änderung ist als Version gespeichert. Im Repo
unter **Commits** die letzte gute Version suchen und zurücksetzen lassen –
nichts geht verloren.

---

## 3. Anfrageformular scharf schalten

Solange kein Schlüssel hinterlegt ist, zeigt die Reservierungsseite das Formular
mit einem Demo-Hinweis, der Absende-Knopf ist inaktiv. Zum Aktivieren:

1. <https://web3forms.com> → **Create Access Key** mit `info@gusto-campano.ch`
2. Der Schlüssel kommt per Mail an diese Adresse.
3. CMS → **Firmendaten & Einstellungen** → „Schlüssel fürs Anfrageformular" →
   einsetzen → Publish.

Web3Forms ist im Gratis-Tarif auf 250 Nachrichten pro Monat begrenzt.

**Testen:** Formular ausfüllen, absenden, Weiterleitung auf `/danke/` prüfen, und
im Postfach nachsehen (auch im Spam-Ordner).

---

## 4. Online-Reservierung anbinden

Auf der Seite «Reservieren» steht im Block *Online reservieren* zurzeit ein
Platzhalter. Sobald der Betrieb ein Reservierungs-Tool nutzt
(z. B. **aleno**, **Foratable**, **OpenTable**, **quandoo**):

1. Beim Tool den Buchungs-Link bzw. die Widget-URL holen.
2. CMS → **Firmendaten & Einstellungen** → „Link zum Buchungssystem" → eintragen
   → Publish.

Dann erscheint auf «Reservieren» automatisch ein Knopf **Zum Buchungssystem**.
Wer eine echte eingebettete Buchungsmaske (statt eines Links auf eine fremde
Seite) möchte, meldet sich – das ist eine kleine Erweiterung im Code.

---

## 5. Vor dem Go-Live

- [ ] **Demo-Modus ausschalten:** CMS → Firmendaten → „Demo-Modus" auf AUS.
      Solange er an ist, steht auf jeder Seite `noindex` und `robots.txt` sperrt
      alles – die Seite taucht bei Google nicht auf. Das ist für eine Demo gewollt.
- [ ] **Alle Angaben vom Betrieb prüfen** – besonders die Punkte in Abschnitt 8.
- [ ] **Eigene Fotos** statt der Beispielbilder (Abschnitt 8).
- [ ] **Speisekarte** vom Betrieb Zeile für Zeile freigeben lassen – Namen,
      Zutaten, Preise (die aktuelle Karte ist ein plausibler Platzhalter).
- [ ] **Anfrageformular** scharf (Abschnitt 3).
- [ ] **Reservierungs-Tool** angebunden oder bewusst weggelassen (Abschnitt 4).
- [ ] **UID/MWST-Nummer** im Impressum eintragen.
- [ ] **Texte freigeben lassen**, besonders die neu geschriebenen (Story,
      Methode, Zutaten-Beschreibungen).

---

## 6. Eigene Domain aufschalten

Die Seite läuft heute unter `nick8952.github.io/gusto-campano-website/`.
Auf `gusto-campano.ch` (oder eine andere Domain) umzuziehen geht so:

1. **DNS beim Domain-Anbieter des Betriebs** setzen:
   - Apex `gusto-campano.ch` → vier **A**-Records:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` → **CNAME** auf `nick8952.github.io`
2. Datei `public/CNAME` anlegen mit genau einer Zeile: `gusto-campano.ch`
3. In [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
   ```yaml
   SITE_ORIGIN: https://gusto-campano.ch
   BASE_PATH: ""
   ```
4. In [`public/admin/config.yml`](public/admin/config.yml) `site_url`,
   `display_url` und `logo_url` auf die neue Domain ändern.
5. Beim Cloudflare Worker `ALLOWED_DOMAINS` um `gusto-campano.ch` ergänzen,
   und in der GitHub-OAuth-App die Homepage-URL nachziehen.
6. Repo → **Settings → Pages → Custom domain** eintragen, DNS-Prüfung abwarten,
   dann **Enforce HTTPS** anhaken.
7. Demo-Modus aus (Abschnitt 5).

> Ohne Zugriff auf die DNS-Einstellungen der Domain bleibt die Seite unter der
> GitHub-Pages-URL – das funktioniert vollständig, sieht in der Adresszeile nur
> weniger schön aus.

---

## 7. Wenn etwas nicht funktioniert

**Änderung im CMS ist nach ein paar Minuten nicht sichtbar**
Repo → Reiter **Actions**. Läuft der oberste Eintrag noch (gelber Punkt), einfach
warten. Ist er rot, den Eintrag öffnen – die Fehlermeldung steht im Schritt
`npm run build`. Meist ist ein Pflichtfeld leer geblieben. Im CMS ausfüllen und
neu speichern.

**Login unter /admin/ schlägt fehl**
Fast immer stimmt eine der drei URLs nicht überein: `base_url` in `config.yml`,
die **Authorization callback URL** in der GitHub-OAuth-App, oder `ALLOWED_DOMAINS`
im Worker. Alle drei müssen zusammenpassen (Abschnitt 1).

**Seite nach Umzug auf eigene Domain ohne Bilder/Stile**
`BASE_PATH` in `deploy.yml` passt nicht zur URL. Bei eigener Domain muss er leer
sein (`""`), bei GitHub Pages `/gusto-campano-website`.

**Formular verschickt nichts**
Schlüssel in den Firmendaten prüfen. Wenn er stimmt: bei Web3Forms einloggen und
schauen, ob das Monatskontingent aufgebraucht ist.

**Die Karte (Anfahrt) ist leer**
Der Ausschnitt in `data/site.json` → „Karten-Einbettung" passt nicht. Auf
<https://www.openstreetmap.org> die Adresse suchen, **Teilen → HTML einbetten**,
die `src`-URL kopieren und einsetzen.

**Die ganze Seite ist weg**
Der Quellcode liegt vollständig im Repository. `npm install && npm run build`
erzeugt sie neu; jeder Webhoster kann den Inhalt von `out/` ausliefern. Es gibt
keine Datenbank, die verloren gehen könnte.

---

## 8. Was in der Demo noch geprüft / ersetzt werden muss

**Bilder** – Alle Fotos sind frei lizenzierte Beispielbilder (Unsplash) und
zeigen *nicht* das echte Lokal. Vor dem Go-Live durch eigene Aufnahmen ersetzen
(CMS → Galerie und die Bild-Felder bei den Gerichten). Bis dahin steht auf der
Galerie-Seite ein entsprechender Hinweis.

**Logo** – Das Logo (Vesuv-Silhouette, «GUSTO» grün / «CAMPANO» weinrot,
Peperoncino) ist als **SVG nachgebaut** (`components/Logo.tsx`, Schrift Fredoka)
und passt sich hell/dunkel an. Es ist sehr nah am Original, aber kein exakter
Nachdruck der Vorlage. Wenn der Betrieb die Logo-Datei liefert
(am besten SVG oder PNG mit transparentem Hintergrund), legt man sie unter
`public/img/logo-original.svg` ab und ersetzt in `components/Logo.tsx` den
SVG-Inhalt durch `<img src={img("logo-original.svg")} alt="Gusto Campano" />`
(auf dunklem Grund braucht es dann eine helle Variante des Logos).

**Telefonnummer** – Eingetragen ist `044 371 55 25`, die Nummer der Adresse
Schauenbergstrasse 8 aus dem öffentlichen Verzeichnis (früher „Da Enzo").
**Vom Betrieb bestätigen lassen**, ob das noch stimmt.

**E-Mail** – `info@gusto-campano.ch` ist angenommen. Falls es diese Adresse (noch)
nicht gibt, in den Firmendaten anpassen.

**Speisekarte** – Kategorien, Gerichte und Preise sind ein realistischer, aber
frei erfundener Platzhalter (typische kampanische Karte, Zürcher Preisniveau).
Komplett durch die echte Karte des Betriebs ersetzen.

**Öffnungszeiten** – Plausibel angenommen (Mo geschlossen, Di–So Mittag/Abend).
Durch die echten Zeiten ersetzen.

**Wirtsfamilie / Story** – „Familie Visone", „Provinz Caserta", Eröffnung 2023:
teils aus dem Verzeichnis-Eintrag „Gusto Campano Visone" abgeleitet, teils
angenommen. Vom Betrieb gegenlesen lassen.

**Instagram** – `@gustocampanozurich` ist verlinkt (Profil existiert). Die Fotos
von dort dürfen mit Erlaubnis des Betriebs übernommen werden.

**Impressum / Datenschutz** – Standardtexte für eine Schweizer Gastro-Website;
UID/MWST-Nummer fehlt noch.

---

## 9. Wer was besitzt

| | |
|---|---|
| Repository | `github.com/Nick8952/gusto-campano-website` (öffentlich – GitHub Pages verlangt das bei Gratis-Konten) |
| Hosting | GitHub Pages, gratis, keine Laufzeit |
| Domain | `gusto-campano.ch` – Registrar prüfen (falls vorhanden) |
| Schriften | Piazzolla, Hanken Grotesk, Spline Sans Mono – SIL Open Font License, frei nutzbar |
| Cloudflare Worker | nur für den CMS-Login, gratis |
| Web3Forms | Gratis-Tarif, 250 Nachrichten pro Monat |
| Beispielbilder | Unsplash-Lizenz (frei, auch kommerziell) – werden ersetzt |

**Laufende Kosten: keine, ausser der Domain.**

Damit der Betrieb die Seite unabhängig weiterbetreiben kann, sollte das
Repository irgendwann auf ein eigenes GitHub-Konto übertragen werden
(Repo → **Settings → Transfer ownership**). Danach in `config.yml`, `deploy.yml`
und in der OAuth-App den Kontonamen nachziehen.
