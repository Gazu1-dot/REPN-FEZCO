# REPN-FZCO Website – Version 21 / Desktop 3D

Separate Desktop-Fassung auf Basis des ausgelieferten Pakets Version 20. Noch nicht veröffentlicht. Kein neuer Abgleich mit dem aktuellen GitHub-Stand. Die vorhandenen technischen Produktseiten und Dokumente bleiben enthalten.

## Überarbeitung in Version 21

- Das vorhandene Landschaftsbild mit See, Bergen und Rohrleitungen bleibt bei Scrollposition null dauerhaft sichtbar. Es gibt keinen zeitgesteuerten Wechsel beim Laden der 3D-Szene.
- Erst der Seitenscroll vergrößert das Motiv leicht und blendet es über den Beginn der Reise in die 3D-Szene über. Beim Zurückscrollen erscheint es wieder vollständig.
- Bei fehlendem WebGL bleibt das Landschaftsbild als Ersatz erhalten; die Kapitelinformationen und Produktlinks bleiben erreichbar.
- Kamera, Kapiteltexte, Fortschrittsanzeige und Bildüberblendung verwenden einen gemeinsamen, zeitbasiert geglätteten Fortschritt. Keine doppelte Kameraverzögerung.
- Formtreue kubische Kamerawege ersetzen die bisherige Stop-and-go-Interpolation an jedem Schlüsselpunkt. Position und Geschwindigkeit sind an den Übergängen stetig; die Achsen überschwingen nicht über ihre jeweiligen Schlüsselwerte.
- Kapitelbuttons lösen normalen weichen Browser-Scroll aus; bei reduzierter Bewegung erfolgt die Anwahl direkt. Mausrad und Scrollbalken werden nicht abgefangen.
- Während das Landschaftsbild an der Startposition steht, wird die verdeckte 3D-Szene nach dem ersten Bild nicht laufend neu gezeichnet. Das ist eine Codeoptimierung, kein gemessener Bildratengewinn.

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

**REPN-FZCO_v21_Desktop_3D_Vorschau.html** herunterladen und im Desktop-Browser öffnen. Die 3D-Ansicht benötigt WebGL 2. Die Datei enthält das Skript, die Geometrieerzeugung, Schriften, Bilder und Downloads und benötigt für die Vorschau keinen Webserver und kein CDN.

Bei nicht verfügbarem WebGL erscheint ein Ersatzbild samt Hinweis; Beschreibungskapitel und Links bleiben bedienbar. Die Vorschau sendet keine E-Mails. Der echte Versand erfordert die konfigurierte Vercel-Serverfunktion.

## Im Testprojekt einsetzen

1. ZIP entpacken und `REPN-FZCO_Website_v21` öffnen.
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

Produktions-Build, TypeScript und ESLint bestanden. Neun Kamerakapitel, Geometrie, kontinuierliche Kameraübergänge und reversible Explosionspositionen wurden geprüft. Die Geometrie stammt unverändert aus Version 20. Der vorhandene Landschaftshintergrund wurde kontrolliert; neue Prüfungen betreffen Scrollzustand, Überblendung und Kamerastetigkeit. DOM-Prüfungen decken die Kapitelsteuerung, den WebGL-Ersatzfall, gemeinsame Bewegungspause, Parallax-Reset, Hover-Neigung, Navigation und Downloadziele ab.

**Ein echter WebGL-Browser-/GPU-Test wurde hier nicht durchgeführt.** Die tatsächliche Beleuchtung, Materialwirkung, Bildrate, Sticky-Darstellung und Mausinteraktion müssen vor Veröffentlichung auf dem Zielgerät beurteilt werden. Keine Behauptung eines bestandenen visuellen Browsertests.

99 Quelldateien, ohne Abhängigkeiten oder Build-Ausgabe. Details stehen in `docs/PRUEFBERICHT.md` und `docs/export-checks.json`.
