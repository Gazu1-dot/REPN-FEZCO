# Prüfbericht – Version 21 / Landschaftseinstieg und weicher Scroll-Verlauf

Datum: 16.09.2026. Ausgangsstand: ausgeliefertes ZIP Version 20.

## Änderungen

Das vorhandene Landschaftsbild bleibt bei Scrollposition null dauerhaft sichtbar, auch nach dem Laden der 3D-Szene. Erst Scrollfortschritt erzeugt einen leichten Bildzoom und eine Überblendung. Beim Zurückscrollen kehrt das Bild vollständig zurück. Die Fotoebene liegt ausdrücklich über der WebGL-Ebene; ihr Zustand hängt nicht an einem Lade-Timer.

Kamera, Kapiteltext, Fortschrittsleiste und Bildübergang teilen einen geglätteten Scrollzustand. Die separate zweite Glättung der Kamera entfällt. Formtreue kubische Interpolation ersetzt die an jedem Kamera-Schlüsselpunkt anhaltende Interpolation. Kapitelbuttons nutzen weichen nativen Browser-Scroll, bei reduzierter Bewegung direkte Anwahl. Die Geometrie bleibt unverändert.

## Bestanden

- Produktions-Build, TypeScript und ESLint.
- Neun Kapitel sowie kontinuierliche Kamerapositionen und Kamerageschwindigkeiten an den Schlüsselstellen.
- Zeitbasierte Fortschrittsglättung liefert bei 60 und 120 Schritten pro Sekunde in der numerischen Prüfung dasselbe Ergebnis. Keine Behauptung gemessener Bildraten.
- Kein Fortschritt und kein Bildwechsel ohne Scrollen; definierte Überblendung innerhalb des Einstiegsbereichs; Rückkehr zur Startposition.
- DOM: dauerhaftes Startbild, Überblendungs-/Zoomwerte erst nach Scrollen und vollständige Wiederherstellung beim Zurückscrollen.
- Bestehende Kapitelsteuerung, Komponentenlinks, gemeinsame Bewegungspause, Parallax-Reset, Kartenneigung, reduzierte Bewegung, Navigation, Kabelansicht, Downloads und Anfrageformular geprüft.
- WebGL-unavailable-Ersatzfall funktioniert; in diesem Fall bleibt das Landschaftsbild erhalten.
- 376 interne Links und 65 Bildreferenzen ohne fehlende Ziele.
- 44 Dateien aus public, api, lib und vercel.json byte-identisch gegenüber Version 20.
- 33 eingebettete Dateien der eigenständigen Desktop-Vorschau byte-identisch. Keine erfassten Laufzeitfehler der Vorschauhülle.
- 99 Dateien im Quellpaket, ohne Abhängigkeiten und Build-Ausgaben.

## Grenzen

Das Landschaftsbild wurde visuell kontrolliert. Die prozedurale Geometrie wurde nicht erneut verändert. Der aktuelle Scrollzustand wurde numerisch und im DOM geprüft. Es fand kein echter WebGL-Browser-/GPU-Test statt; tatsächliche Bildrate, optische Überblendung, Beleuchtung und native Scroll-Animation müssen auf dem Zielgerät beurteilt werden. Der DOM-Test simuliert den nicht verfügbaren GPU-Kontext.

Keine Veröffentlichung, kein GitHub-Abgleich und kein E-Mail-Versand. Keine neue Handyfassung. Die technische Darstellung bleibt illustrativ und nicht maßstäblich.
