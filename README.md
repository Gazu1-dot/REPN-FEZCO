# REPN-FZCO Website – Version 18

Neue Scroll-Startseite auf Basis des ausgelieferten Pakets **17.8**. Die vorhandenen Produktseiten, technischen Daten, Bilder, PDF-Downloads, Word-Vorlage und E-Mail-Funktion wurden übernommen. Für diese Gestaltung erfolgte kein neuer Abgleich mit GitHub `main`.

## Neue Startseite

- Großflächiger Einstieg mit dem überarbeiteten Geothermal-Motiv, ruhiger Bildbewegung und Pause-Schalter.
- Zwei klar getrennte Einstiege für Geothermal und Oil & Gas.
- ESP-Erklärung über fünf Scroll-Schritte: Surface control, Power cable, ESP pump, Protector, Motor. Die Zeichnung bleibt auf geeigneten Bildschirmgrößen stehen; die besprochene Komponente wird hervorgehoben. Alle Schritte lassen sich direkt anwählen.
- Kompakte Darstellung auf dem Handy; bei niedrigen Displays bleibt die Grafik im normalen Seitenfluss.
- Abschnitte für Projektunterstützung, technische Downloads und Anfrage.
- Native Scroll-Bedienung ohne Scroll-Sperre oder erzwungenes Einrasten. Berücksichtigung der Systemeinstellung für reduzierte Bewegung, sichtbare Tastaturfokusse und pausierbare Animationen.

Das Feldmotiv ist eine KI-generierte Illustration, keine Aufnahme einer realen REPN-Anlage. Die ESP-Grafik ist ein konzeptioneller, nicht maßstäblicher Schnitt. Herkunft und technische Abgrenzungen stehen weiterhin in `asset-sources.json` und `docs/QUELLEN.md`.

## Vorschau

Die separat gelieferte Datei **REPN-FZCO_v18_Interaktive_Vorschau.html** herunterladen und in einem aktuellen Browser öffnen. Oben lassen sich Desktop- und Handyansicht auswählen. Bilder, Schriften und Downloads sind eingebettet; für die Darstellung wird kein Server benötigt. Interne Navigation, Anwendungsauswahl und die Scroll-Interaktion funktionieren in der Vorschau.

Die lokale Vorschau sendet keine E-Mails. Der tatsächliche Versand erfolgt nur über die konfigurierte Vercel-Funktion der veröffentlichten Website.

## In GitHub einspielen

1. ZIP entpacken und den Ordner `REPN-FZCO_Website_v18` öffnen.
2. Den gesamten Inhalt in das Hauptverzeichnis von `Gazu1-dot/REPN-FEZCO_1` hochladen und gleichnamige Dateien ersetzen. Nicht die ZIP oder den übergeordneten Ordner hochladen.
3. Commit durchführen und das neue Vercel-Deployment mit Status **Ready** abwarten.
4. Startseite auf Desktop und Handy durchgehen. Beide Anwendungen, Produktlinks und Downloads öffnen.
5. Wenn der E-Mail-Versand geprüft werden soll: eine Testanfrage ausfüllen, **Send enquiry** betätigen und Eingang sowie Word-Anhang bei `office@repnfzco.com` kontrollieren.

Die vorhandenen Production-Variablen werden weiterverwendet:

| Key | Value |
| --- | --- |
| `RESEND_API_KEY` | Der geheime Versand-API-Schlüssel aus Resend |
| `REPN_ENQUIRY_FROM` | `REPN-FZCO <office@repnfzco.com>` |

Die Serverfunktion, Vercel-Konfiguration und Word-Erstellung sind gegenüber Version 17.8 byte-identisch. Es wurde kein echter E-Mail-Versand ausgelöst und kein Deployment gestartet.

## Anfrage und technische Daten

- Die getrennten Kabeldaten für Geothermal und Oil & Gas aus Version 17.7/17.8 sind erhalten. Unterschiedliche Referenzkonstruktionen werden nicht vermischt.
- **Download enquiry** erzeugt eine ausgefüllte Word-Datei aus derselben Vorlage wie **Download questionnaire**.
- **Print questionnaire** erzeugt die Druckansicht aus derselben ausgefüllten DOCX mit den eingebetteten Zeichnungen. Auch eine leere Vorlage kann gedruckt werden.
- **Send enquiry** erstellt die DOCX auf dem Server und sendet sie an `office@repnfzco.com`. Die Kundenadresse wird als Antwortadresse verwendet.
- **Open email app** lädt die DOCX herunter und öffnet einen Entwurf. Bei dieser Alternative muss die Datei selbst angehängt werden.

## Entwicklung und Prüfung

- Node.js 22.x oder 24.x
- Abhängigkeiten: `npm ci`
- Produktions-Export: `npm run build`
- Lokal: `npm run dev`
- ESLint: `npm run lint`

Vercel nutzt das Framework-Preset Other, den statischen Next-Export und die eigenständige Funktion `api/enquiry.ts`. `npm run dev` startet nur Next.js, nicht diese Vercel-Funktion.

Build, TypeScript und ESLint bestanden. Gezielte DOM-Prüfungen kontrollieren die Scroll-Auswahl, Direktanwahl, Pause-Schalter und Navigation. Alle internen Links und Bilder im Export wurden auf vorhandene Ziele geprüft. Eine visuelle Browserprüfung wurde in dieser Sitzung nicht durchgeführt; Darstellungsdetails sollten in der HTML-Vorschau auf den gewünschten Geräten geprüft werden.

Das ZIP enthält **99 Quelldateien**, ohne Build-Ausgabe oder Abhängigkeiten. Prüfdetails: `docs/PRUEFBERICHT.md` und `docs/export-checks.json`.
