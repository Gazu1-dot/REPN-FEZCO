# Prüfbericht – Version 18

Datum: 16.09.2026. Basis: ausgeliefertes ZIP Version 17.8. Schwerpunkt: neue Scroll-Startseite.

## Durchgeführt

- `npm ci`, Produktions-Build und statischer Export mit Next.js 16.2.6: erfolgreich.
- TypeScript-Prüfung im Produktions-Build und `npm run lint`: erfolgreich.
- DOM-Prüfung der aus denselben React-Komponenten gebauten Vorschau: eine Hauptüberschrift, zwei Anwendungseinstiege, fünf Scroll-Schritte, Komponentenwechsel für alle fünf Positionen, direkte Anwahl samt Fokus, Pause/Fortsetzen der ESP- und Hintergrundanimation, Beibehaltung des Pausenzustands beim Komponentenwechsel und Scroll-Fortschritt.
- Navigation von der neuen Oil-&-Gas-Karte zur passenden Equipment-Auswahl und Kabelseite; korrekter Titel „Power transmission“, eigene EPR-Kabeldaten und 230-°C-Angabe.
- Vier PDF-Downloads vorhanden; Anfrageformular, Word-Link und Rückweg zur Startseite geprüft.
- 382 interne Links und 65 Bildreferenzen im statischen Export geprüft: keine fehlenden Ziele.
- 44 geschützte Quelldateien aus `public`, `api`, `lib` sowie `vercel.json` mit Version 17.8 verglichen: byte-identisch. Dazu gehören alle technischen Daten, Fotos, PDFs, die Word-Vorlage und die Versandimplementierung.
- HTML-Vorschau: 33 eingebettete Dateien byte-identisch mit den Quelldateien, iframe-Inhalt erzeugt, Desktop-/Handy-Umschaltung geprüft, keine erfassten JavaScript-Laufzeitfehler.
- CSS enthält angepasste Desktop-, Tablet-, Handy- und geringe Bildschirmhöhen-Darstellungen sowie `prefers-reduced-motion`. Inhalte bleiben auch ohne Einblendanimation sichtbar.

## Grenzen der Prüfung

Die Scroll-Positionswechsel wurden mit simulierten Elementpositionen im DOM geprüft. Dies ersetzt keine echte Layout- oder Browserprüfung. Es wurde in dieser Sitzung kein visueller Browsertest durchgeführt. Bildzuschnitt, Sticky-Verhalten, Umbrüche und Druckdarstellung sollten deshalb vor Veröffentlichung in der Vorschau bzw. auf den Zielgeräten kontrolliert werden.

Kein neuer GitHub-Abgleich, keine Veröffentlichung und kein echter E-Mail-Versand. Die bereits gelieferte Versandfunktion wurde unverändert übernommen; ihre Live-Konfiguration und Zustellung wurden hier nicht erneut getestet.

## Paket

99 Quelldateien. Änderungen: neue Startseitenstruktur, Hero- und Scroll-Komponenten, Startseiten-CSS, Versionsangaben und Dokumentation. Keine neuen Herstellerangaben, technischen Grenzwerte oder Datenblattänderungen.
