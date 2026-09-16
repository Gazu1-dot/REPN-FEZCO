# Prüfbericht – Version 19 / Desktop 3D

Datum: 16.09.2026. Ausgangsstand: ausgeliefertes ZIP Version 18.

## Bestanden

- Next.js-Produktions-Build und TypeScript-Prüfung.
- ESLint.
- Geometrie: 400 Mesh-Objekte, rechnerisch 70.770 Dreiecke einschließlich Instanzen; alle geprüften Positionswerte endlich. Dies ist keine Bildratenmessung.
- Neun Kamera-/Informationskapitel, stetige Übergänge an den Kameraschlüsseln, reversible Baugruppenpositionen beim Vorwärts-/Rückwärtsscrollen.
- Aktive Baugruppen liegen an den fünf Komponentenschritten im vorgesehenen sichtbaren Bereich der Kamera.
- DOM: dauerhafte Hauptüberschrift, WebGL-unavailable-Ersatzansicht, neun Scroll-Kapitel, fünf Direktanwahlen, Produktlinks, Pause-/Fortsetzen-Schalter, Vor-/Zurück-Steuerung, Überspringen zur Anwendungsauswahl, Oil-&-Gas-Kabelansicht, vier PDF-Downloads, Anfrageformular/Word-Link und Rückweg zur Startseite.
- 375 interne Links und 65 Bildreferenzen im Export: keine fehlenden Ziele.
- 44 Dateien aus `public`, `api`, `lib` sowie `vercel.json` gegenüber Version 18 byte-identisch.
- Desktop-HTML: 33 eingebettete Dateien byte-identisch mit den Quelldateien; Vorschauhülle erzeugt den iframe ohne erfasste JavaScript-Fehler. Keine Handy-Umschaltung.

## Visuelle und funktionale Grenzen

Native SVG-Projektionen der Three.js-Geometrie wurden zur Kontrolle von Kameraausschnitten, Wellhead, Formation, Explosionsabständen und Innenbaugruppen erzeugt und geprüft. Auf dieser Basis wurden Tubing-Restteile beseitigt sowie der Übergang der Formation und die Position des Schaltschranks angepasst. Solche Projektionen ersetzen keine WebGL-Darstellung und zeigen Materialien, Schatten und Tiefensortierung anders als der GPU-Renderer.

Es fand **kein WebGL-Browser-/GPU-Test** statt. Beleuchtung, Materialwirkung, Bildrate, Sticky-Verhalten, Zeigerbedienung und endgültige Desktop-Umbrüche sind deshalb vor Veröffentlichung im Browser zu prüfen. Im DOM-Test wurde der nicht verfügbare WebGL-Kontext gezielt simuliert, nicht der erfolgreiche GPU-Renderpfad. Eine Handyversion war ausdrücklich nicht Teil der Aufgabe.

Kein neuer GitHub-Abgleich, keine Veröffentlichung, kein echter E-Mail-Versand. Hersteller-CAD, maßstäbliche Anlagengeometrie und Installationsfreigabe liegen nicht vor; sämtliche 3D-Details sind illustrativ.
