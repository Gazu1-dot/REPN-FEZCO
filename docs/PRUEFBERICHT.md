# Prüfbericht – Version 20 / Industrial Desktop 3D

Datum: 16.09.2026. Ausgangsstand: ausgeliefertes ZIP Version 19.

## Umsetzung

Das bisherige einfache Feld wurde durch ein prozedurales Industriegelände ersetzt: modellierte Felsrücken, befestigte Flächen und Straßen, detailliertere Bohrlochköpfe, Instrumente, Rohrbrücken, offene Prozessskids, Behälter, Wartungsstege, Geländer und Leitern. Der erste Kameraausschnitt wurde für die größere Anlage erweitert. Materialfarben und Beleuchtung sind zurückhaltender. Die 3D-Reise und die bestehenden technischen Inhalte bleiben verfügbar.

Die Homepage besitzt zusätzliche Bild-/Text-Parallax, leichte Kartenneigung, einen typografischen Zwischenabschnitt, versetzte Anwendungskarten, Abschnittslinks, Lesefortschritt und eine gemeinsame Bewegungspause. Reduzierte Bewegung wird berücksichtigt; normaler Dokument-Scroll bleibt erhalten. Keine neue Handyfassung.

## Bestanden

- Next.js-Produktions-Build und TypeScript-Prüfung; ESLint.
- Geometrie: 300 Mesh-Objekte, rechnerisch 113.702 Dreiecke einschließlich Instanzen; geprüfte Positionswerte endlich. Statische Oberflächengeometrie nach Material zusammengefasst. Kein Bildraten-Benchmark.
- Neun Kamera-/Informationskapitel; stetige Übergänge an den Kameraschlüsseln und reversible Baugruppenpositionen.
- Aktive Baugruppen liegen an den fünf Komponentenschritten im vorgesehenen Kamerabereich.
- DOM: Hauptüberschrift, WebGL-Ersatzansicht, neun Scroll-Kapitel, fünf Komponenten-Direktwahlen, Produktlinks, Vor/Zurück, Überspringen zur Anwendungsauswahl.
- Gemeinsamer Zustand der beiden Bewegungsschalter, Parallax-Veränderung und Reset, Kartenneigung und Reset, vier Abschnittslinks, Umschalten und Wiederherstellen der Systempräferenz für reduzierte Bewegung.
- Oil-&-Gas-Kabelansicht mit separatem Inhalt, vier PDF-Downloads, Anfrageformular/Word-Link und Rückweg zur Homepage.
- 376 interne Links und 65 Bildreferenzen im Export: keine fehlenden Ziele.
- 44 Dateien aus public, api, lib sowie vercel.json gegenüber Version 19 byte-identisch.
- Desktop-HTML: 33 eingebettete Dateien byte-identisch mit den Quelldateien. Vorschauhülle erzeugt den iframe ohne erfasste JavaScript-Fehler. Keine Handy-Umschaltung.

## Grenzen der Prüfung

Native SVG-Projektionen der Szenengeometrie dienten der Kontrolle von Bildausschnitt, Wellhead und Explosionsabständen. Sie zeigen weder PBR-Materialien noch GPU-Schatten. Der SVG-Renderer besitzt keinen WebGL-Tiefenpuffer; insbesondere große Bodenflächen können in diesen Kontrollbildern Vordergrundobjekte falsch überdecken. Diese Bilder sind keine Screenshots der Website und werden nicht als solche ausgeliefert.

Es fand **kein WebGL-Browser-/GPU-Test** statt. Beleuchtung, Materialwirkung, Bildrate, Sticky-Verhalten, Zeigerbedienung und endgültige Desktop-Umbrüche sind deshalb vor Veröffentlichung im Browser zu beurteilen. Im DOM-Test wurde der nicht verfügbare WebGL-Kontext gezielt simuliert, nicht der erfolgreiche GPU-Renderpfad.

Kein neuer GitHub-Abgleich, keine Veröffentlichung, kein echter E-Mail-Versand. Hersteller-CAD und maßstäbliche Anlagengeometrie liegen nicht vor. Alle zusätzlichen 3D-Details sind illustrativ; keine neuen technischen Grenzwerte oder zugesagten Lieferumfänge.
