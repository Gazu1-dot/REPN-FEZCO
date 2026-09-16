# REPN-FZCO Website – Version 20 / Desktop 3D

Separate Desktop-Fassung auf Basis des ausgelieferten Pakets Version 19. Noch nicht veröffentlicht. Kein neuer Abgleich mit dem aktuellen GitHub-Stand. Die vorhandenen technischen Produktseiten und Dokumente bleiben enthalten.

## Überarbeitung in Version 20

- Grundlegend neu aufgebautes Industriefeld auf rauem, felsigem Gelände, mit modellierten Bergrücken, befestigten Bohrplätzen und Zufahrten.
- Offene Prozessanlage statt des einfachen Gebäudes: Rohrbrücken, Druckbehälter, Stege, Geländer, Leitern, Instrumente und gerippte Schalteinrichtung. Keine behauptete reale Referenzanlage.
- Gedämpfte Gesteins-, Metall- und Sicherheitsfarben; rauere Materialien und angepasste Oberflächen-/Untertagebeleuchtung.
- Weiterer erster Kameraausschnitt, anschließend die bestehende Reise zum Wellhead, unter die Erde und in die Explosionsdarstellung.
- Leichte Zeigerparallaxe der Kamera, versetzte Anwendungskarten, getrennte Bild- und Textebenen sowie ein großer typografischer Zwischenabschnitt.
- Gemeinsamer Bewegungsschalter für Parallax, Hover-Neigung und fortlaufende 3D-Animation. Systempräferenz für reduzierte Bewegung wird berücksichtigt. Keine Manipulation des normalen Mausrad-Scrolls.
- Statische Feldgeometrie nach Material zusammengefasst. Die Szene enthält mehr geometrische Details als v19, aber weniger Mesh-Objekte; daraus wird keine gemessene Bildrate abgeleitet.

## 3D-Sequenz

1. Überblick über ein generisches Feld mit Leitungen und Wellheads.
2. Kamerafahrt zum zentralen Bohrlochkopf.
3. Abstieg in eine konzeptionelle Schnittansicht mit Formation, Verrohrung und ESP-Anlage.
4. Explosionsdarstellung: Baugruppen trennen sich, Gehäusesegmente öffnen die Sicht auf das Innere.
5. Einzelansichten für Motor, Protektor, Pumpe, Kabel und Oberflächensteuerung, jeweils mit Funktionsbeschreibung und Link zu den bestehenden Spezifikationen.

Die Sequenz wird über den normalen Dokument-Scroll gesteuert. Kapitel, Vor/Zurück-Tasten und Komponenten sind direkt anwählbar. „Skip to equipment“ überspringt die Sequenz. „Inspect in 3D“ erlaubt Drehen mit der Maus; nach Fokus auf der Szene funktionieren auch die Pfeiltasten. Das Mausrad bleibt für den Seitenscroll verfügbar. Der Pause-Schalter stoppt die fortlaufende Komponenten-/Strömungsanimation sowie die zusätzlichen Parallax- und Hover-Effekte; manuell ausgelöste Kamerabewegungen bleiben möglich. Bei reduzierter Bewegung werden statische Kapitelansichten verwendet.

Eine neue Handyversion der 3D-Sequenz wurde entsprechend der Anweisung **nicht entwickelt**. Diese Fassung ist zur Beurteilung am Desktop vorgesehen. Die vorhandenen Unterseiten behalten ihr bisheriges Layout.

## Darstellung und technische Genauigkeit

Die 3D-Szene ist schematisch, nicht maßstäblich und nicht aus Hersteller-CAD abgeleitet. Maße, Anzahl sichtbarer Stufen, Motorinnenteile und Formationsschichten sind Illustrationen. Sie dürfen nicht für Auslegung, Fertigung oder Montage verwendet werden. Das Feld ist kein dokumentierter REPN-Standort. Die produktbezogenen Angaben bleiben auf den unveränderten Spezifikationsseiten und in den Datenblättern.

## Desktop-Vorschau öffnen

**REPN-FZCO_v20_Desktop_3D_Vorschau.html** herunterladen und im Desktop-Browser öffnen. Die 3D-Ansicht benötigt WebGL 2. Die Datei enthält das Skript, die Geometrieerzeugung, Schriften, Bilder und Downloads und benötigt für die Vorschau keinen Webserver und kein CDN.

Bei nicht verfügbarem WebGL erscheint ein Ersatzbild samt Hinweis; Beschreibungskapitel und Links bleiben bedienbar. Die Vorschau sendet keine E-Mails. Der echte Versand erfordert die konfigurierte Vercel-Serverfunktion.

## Im Testprojekt einsetzen

1. ZIP entpacken und `REPN-FZCO_Website_v20` öffnen.
2. Den **Inhalt** des Ordners in das Hauptverzeichnis des Test-Repositorys `Gazu1-dot/REPN-FEZCO` hochladen und gleichnamige Dateien ersetzen. Nicht den übergeordneten Ordner hochladen.
3. Deployment des verbundenen Projekts `repn-fezco-test` abwarten bzw. dort aus `main` starten.
4. Kamerafahrt, Explosionsansicht, Inspektionsmodus, Navigation und Downloads im Desktop-Browser prüfen.

Die E-Mail-Funktion ist unverändert. Für echten Versand benötigt dieses Vercel-Projekt eigene passend gesetzte Variablen `RESEND_API_KEY` und `REPN_ENQUIRY_FROM`; Variablen eines anderen Projekts gelten hier nicht automatisch. Diese Werte wurden weder gelesen noch verändert. Es wurde keine Nachricht versendet.

## Entwicklung

- Node.js 22.x oder 24.x
- `npm ci`
- `npm run build` — statischer Next.js-Export
- `npm run dev` — lokale Next.js-Ansicht; die eigenständige Vercel-Funktion läuft hierbei nicht
- `npm run lint`

Three.js 0.186.0 ist fest in den Abhängigkeiten hinterlegt. Die Szene wird im Browser aufgebaut; keine externen 3D-Modelle oder Laufzeit-CDNs. Pixelauflösung ist begrenzt, und außerhalb des sichtbaren Bereichs bzw. bei verborgenem Browser-Tab pausiert die Render-Schleife. Ressourcen werden beim Verlassen der Seite freigegeben.

## Prüfstand

Produktions-Build, TypeScript und ESLint bestanden. Neun Kamerakapitel, Geometrie, kontinuierliche Kameraübergänge und reversible Explosionspositionen wurden geprüft. Native SVG-Projektionen dienten der visuellen Kontrolle von Bildausschnitten und Baugruppen; sie bilden WebGL-Materialien und Schatten nicht vollständig ab. DOM-Prüfungen decken die Kapitelsteuerung, den WebGL-Ersatzfall, gemeinsame Bewegungspause, Parallax-Reset, Hover-Neigung, Navigation und Downloadziele ab.

**Ein echter WebGL-Browser-/GPU-Test wurde hier nicht durchgeführt.** Die tatsächliche Beleuchtung, Materialwirkung, Bildrate, Sticky-Darstellung und Mausinteraktion müssen vor Veröffentlichung auf dem Zielgerät beurteilt werden. Keine Behauptung eines bestandenen visuellen Browsertests.

99 Quelldateien, ohne Abhängigkeiten oder Build-Ausgabe. Details stehen in `docs/PRUEFBERICHT.md` und `docs/export-checks.json`.
