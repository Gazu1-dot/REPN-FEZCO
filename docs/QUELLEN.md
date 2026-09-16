# Ergänzung Version 17.5 – gemeinsame Word-Ausgabe und direkter Versand

Auf Stefans Wunsch verwenden Anfrage-Download, Druck und E-Mail-Anhang das Format des herunterladbaren Word-Fragebogens. Grundlage bleibt die von ihm gelieferte Equipment Selection Questionnaire-Vorlage und die in Version 17.2 bereinigte Fassung. Die beiden vorhandenen Seiten bleiben im Aufbau erhalten; eine dritte Seite ergänzt Projekt/Kontakt und die vorhandenen optionalen Angaben mit der in Version 17.4 bereinigten Skizze. Keine neuen technischen Werte. Requested timing bleibt entfernt; pH bleibt dimensionslos.

Die öffentliche leere DOCX enthält 30 unsichtbar markierte Eingabefelder. Derselbe Generator füllt diese für Browser-Download, Druck und serverseitigen E-Mail-Anhang. Beide Zeichnungen sind eingebettet. Längere Texte werden auf Fortsetzungsseiten ausgegeben.

Technische Primärquellen: [docx-preview](https://github.com/VolodymyrBaydalka/docxjs), [JSZip](https://stuk.github.io/jszip/documentation/api_jszip/load_async.html), [Vercel Node.js Functions](https://vercel.com/docs/functions/runtimes/node-js), [Vercel Funktionskonfiguration](https://vercel.com/docs/project-configuration/vercel-json#functions), [Resend-Anhänge](https://resend.com/docs/dashboard/emails/attachments), [Resend-Absenderdomain](https://resend.com/docs/dashboard/domains/introduction).

Der Versand ist für Resend vorbereitet, aber nicht eingerichtet oder live getestet. Festes Ziel ist office@repnfzco.com. Zugangsdaten werden ausschließlich serverseitig in Vercel gesetzt. Für diese Bearbeitung wurden keine echten Nachrichten versendet. Die folgenden Abschnitte sind historische Dokumentation und werden durch diese Ergänzung hinsichtlich Fragebogenformat und Kontaktfunktionen aktualisiert.

---

# Ergänzung Version 17.4 – Requested timing entfernt

Auf Stefans ausdrücklichen Wunsch entfällt Requested timing einschließlich Kalender und Nummer 15 aus Zusatzformular, Skizze und Druck-/Anfrageausgabe. Die optionale Nummerierung umfasst jetzt 8–14. Die folgenden historischen Beschreibungen dokumentieren den damaligen Stand.

---

# Ergänzung Version 17.3 – optionale Betriebsangaben

Stefan hat eine Zeichnung innerhalb des aufklappbaren Bereichs „Additional operating information“ beauftragt. Grundlage sind die acht bereits in Version 17.2 vorhandenen optionalen Eingabefelder und die vereinfachte Bohrungsdarstellung aus dem gelieferten Fragebogen. Die neue SVG ist eine manuell erstellte schematische Zuordnung; keine modellspezifische Installationszeichnung und keine Quelle für technische Kennwerte.

Nummern: 8 Required head; 9 Pump installation depth; 10 Casing inside diameter; 11 Fluid density; 12 Free gas at pump intake; 13 Suspended solids; 14 Existing power supply / VSD; 15 Requested timing. Alle Einheiten und Eingabegrenzen bleiben erhalten.

Der Kunde soll den verwendeten Tiefenbezugspunkt in seinen Notizen nennen. Die Zeichnung legt damit keinen unveröffentlichten verbindlichen Einbaudatum-Standard fest. Förderhöhe wird als Pumpenanforderung bezeichnet und nicht als geometrische Einbautiefe bemaßt. Casing-ID bezeichnet den freien Rohrinnendurchmesser und wird nicht mit dem gesamten Bohrungsdurchmesser gleichgesetzt.

Ergänzende fachliche Prüfung: KSB beschreibt Förderhöhe als Energiegröße, ausgedrückt in Metern: https://www.ksb.com/en-global/centrifugal-pump-lexicon/article/total-head-1118376 . Daraus folgt für diese Erklärung, dass Förderhöhe nicht schlicht mit Einbautiefe gleichgesetzt werden darf. Es wurden keine Herstellerkennwerte übernommen.

Zu Stefans Frage nach internationalen pH-Werten: Keine länderabhängige Umrechnung im Formular. NIST beschreibt international vereinbarte Messkonventionen und Vergleichsmessungen zur internationalen Gleichwertigkeit: https://www.nist.gov/programs-projects/ph-metrology . pH bleibt dimensionslos und optional. Die tatsächliche pH-Zahl ist der vorhandenen Wasseranalyse zu entnehmen, nicht aus dem Land abzuleiten.

Die neue Skizze wird bei geöffnetem Zusatzbereich oder eingetragenen Zusatzdaten in die Website-Druckansicht aufgenommen. Der bestehende Word-Fragebogen und Produkt-PDFs sind nicht geändert.

---

# Ergänzung Version 17.2 – Kabelnamen, Kundenfragebogen und Homepage

Die Kabelnamen werden auf ausdrücklichen Wunsch öffentlich als REPN-FX (zuvor QYYFFX) und REPN-QX (zuvor QYYEQX) ausgegeben. Vollständige Cable designation: REPN-FX-5KV und REPN-QX-5KV. Die zugrunde liegenden technischen Spezifikationen bleiben unverändert. Beide betroffenen PDF-Dateien wurden entsprechend aktualisiert; die generische Kabelbeschreibung in der Downloadliste enthält weiterhin keinen Typennamen.

Grundlage des Kundenfragebogens ist die in dieser Anfrage bereitgestellte Datei `Equipment Selection Questionnaire_Template_(1).docx`. Maßgeblich für technische Pflichtfelder ist nach Stefans Klarstellung die obere Tabelle mit sieben Bohrungsparametern. Wasserchemie wird nur erfragt, falls verfügbar. Die alten zusätzlichen Betriebsfelder bleiben optional erhalten; insbesondere Fluid density, Free gas at pump intake und Requested timing sind keine Pflichtfelder.

Die Zeichnung wurde als präzise SVG anhand der Vorlage neu gesetzt und mit den passenden Zahlen 1–7 versehen. Die gemeinsame Zuordnung steht in `lib/well-parameters.json`. Der zusätzliche, in der Mindesttabelle nicht erläuterte Tiefenbuchstabe Hн wurde nicht als Pflichtparameter eingeführt. Pump installation depth bleibt ein separates optionales Feld und wird nicht mit Well depth gleichgesetzt. Borehole diameter und Casing inside diameter sind ebenfalls getrennt.

Die Einheit mol/l hinter pH in der Vorlage ist fachlich falsch; pH wird dimensionslos angegeben. Dies wurde Stefan vor der Ausgabe mitgeteilt. Die ursprünglichen, mehrfach überlagerten Word-Tabellen sind durch eine sauber gesetzte Mindesttabelle ersetzt. Optionaler Chemieteil und die REPN-Auswahltabelle bleiben im Word-Dokument auf Seite 2 erhalten.

Das neue Homepage-Motiv ist eine mit Imagegen erzeugte allgemeine Geothermie-Feldszene. Es ersetzt in Version 17.2 das bisherige CNC-Foto unter dem bestehenden technischen Dateipfad `manufacturing-hero.webp`. Es ist keine neue Originalaufnahme und keine Behauptung über ein REPN-FZCO-eigenes Feld oder eine konkrete Referenzanlage. Historische Aussagen zu diesem Dateipfad beziehen sich auf ältere Versionen.

Die folgenden Abschnitte dokumentieren die frühere Herkunft und Entscheidungen. Öffentliche Originalkataloge oder vertrauliche Bestell-/Kundendokumente wurden nicht ergänzt.

---

# Ergänzung Version 17.1 – Motorfoto und Quellenbeschriftungen

Auf Stefans ausdrücklichen Wunsch wurde die sichtbare kyrillische Markenbeschriftung auf den Metallbändern im Motorfoto entfernt. Bearbeitung mit dem eingebauten Imagegen-Werkzeug auf Grundlage von `motor.webp`. Das Ergebnis ist eine retuschierte Bildfassung; es wird nicht als pixelgleiches Original bezeichnet. Motiv und Bildaufbau bleiben erkennbar erhalten. Die Webfassung hat weiterhin 774 × 696 Pixel.

Die Datei `public/assets/motor.webp` wird gemeinsam von Equipment-Auswahl, Motorseite und dem System-Explorer verwendet. Die Bildunterschrift auf der Motorseite lautet deshalb jetzt nur „Motor assemblies“. Zusätzlich wurden auf ausdrücklichen Wunsch die Katalog- und Seitenverweise aus den öffentlichen Bild- und Tabellenbeschriftungen entfernt. Inhaltliche Beschreibungen, Einheiten und technische Einschränkungen bleiben erhalten. Die technischen Zahlen, anderen Websitebilder und PDF-Dateien bleiben unverändert. Die Quellenherkunft bleibt in dieser internen Dokumentation nachvollziehbar. Frühere Aussagen zur Bytegleichheit der Motoraufnahme beschreiben den damaligen Versionsstand.

---

# Ergänzung Version 17 – Gestaltung der Unterseiten

Grundlage ist die gelieferte Version 16. Überarbeitet wurden die Einstiege und Gliederung von Services und Company, die Produktköpfe sowie die Darstellung von Anwendungsauswahl, Tabellen, Downloads und Kontaktformular. Equipment erhält kleine Anpassungen an Abständen und Kartenrändern.

Services verwendet das vorhandene Original `manufacturing-detail.webp`, Company `component-machining.jpg`. Jedes Motiv steht einmal im jeweiligen Seiteneinstieg. Die Bildunterschriften bleiben neutral. Fotos werden nur per CSS eingerahmt; es entstehen weder neue Aufnahmen noch Behauptungen über eigene Produktionsstätten.

Produktköpfe verwenden einen einheitlichen 2:1-Rahmen: Fotografien mit Bildausschnitt, Illustrationen vollständig eingepasst. Die vergrößerte Ansicht zeigt die unveränderten Originale. Der Kabelkopf behält seine bestehenden Spannungs- und Querschnittsangaben im gleichen Format.

Technische Produktinhalte, Tabellenzellen, Kurven, Kennwerte und PDF-Dateien bleiben unverändert. Der Leistungsumfang auf Services bleibt ausdrücklich projektbezogen zu vereinbaren. Die Gründung im August 2024 und die bestehenden Unternehmensangaben wurden übernommen. Vorhandene technische Quellenfragen werden durch diesen Gestaltungsschritt nicht neu bewertet.

---

# Ergänzung Version 16 – Interaktive Homepage-Vorschau

Grundlage ist die gelieferte Version 15. Der bewegte Einstieg verwendet ausschließlich das bereits vorhandene Originalfoto `manufacturing-hero.webp`. Die Bewegung entsteht per CSS; es liegt kein neues Produktionsvideo vor.

Die neue SVG ist eine vereinfachte Funktionsdarstellung. Sie ordnet Oberflächensteuerung und Leistungskabel sowie Pumpe, Schutzsektion und Motor innerhalb einer schematischen Bohrungsdarstellung zu. Die Bauteile sind allgemeine Gehäusesymbole und stammen nicht aus modellspezifischen CAD-Zeichnungen. Die Grafik ist als „Simplified ESP arrangement · not to scale“ gekennzeichnet und enthält keine Leistungs-, Maß-, Tiefen- oder Druckangaben.

Die einzelnen Beschreibungen und Originalbilder werden direkt aus dem bisherigen Equipment-Datensatz bezogen. Alle 30 öffentlichen Dateien sowie beide technischen Datendateien sind bytegleich mit Version 15. Die fachlich offenen Quellenfragen werden durch die neue Darstellung nicht neu bewertet.

---

# Ergänzung Version 15 – Auswahlbilder und Kopfzeile

Grundlage ist die zuletzt gelieferte Version 14 einschließlich des korrigierten Pumpen-Datenblatts. Die Startseitenkarte enthielt bisher noch die Pumpenzeichnung; die frühere Angabe in `asset-sources.json`, diese Karte sei bereits in Version 12 umgestellt worden, wurde berichtigt. Ab Version 15 bezieht die Startseite das originale Pumpenfoto aus derselben Datenzuordnung wie die Equipment-Auswahl.

Alle neun vorhandenen Kategorieabbildungen wurden visuell angesehen. Die neuen Karten setzen einen einheitlichen 2:1-Rahmen per CSS um. Fotografien verwenden einen Bildausschnitt, freigestellte Bauteile bleiben innerhalb des Rahmens. Kabel und Sensor sind für die Auswahlansicht per CSS gedreht. Die Originaldateien sowie die Abbildungen in technischen Datenblättern bleiben unverändert. Keine neuen oder generierten Produktfotos und keine neue technische Quellenbewertung.

Die nachfolgenden Abschnitte dokumentieren die bisherigen Bearbeitungen.

---

# Ergänzung Version 14 – Pumpen-Datenblatt

Auf ausdrücklichen Wunsch wurden im Pumpen-PDF die gelbe Zeilenhervorhebung, das Sternchen und die zugehörige Anmerkung entfernt. Die Zahlen und der allgemeine Referenzhinweis bleiben unverändert. Die Downloadbeschreibung wurde entsprechend angepasst. Die bisher dokumentierten Quellenabweichungen sind dadurch nicht fachlich geklärt oder neu freigegeben. Die nachfolgenden Abschnitte dokumentieren den Stand bis Version 13.

---

# Ergänzung Version 13 – PDF-Datenblätter

Version 13 basiert auf der gelieferten Version 12 und ändert das Ausgabeformat der drei tabellarischen Downloads von CSV zu PDF. Sämtliche Pumpen-, Motoren- und Kabelwerte wurden aus den vorhandenen Dateien übernommen und nach PDF-Textextraktion abgeglichen. Es wurden keine neuen technischen Werte ergänzt oder fachliche Freigaben erteilt.

Die Kabel-Downloadbeschreibung enthält keine Typennamen. Im technischen Datenblatt bleiben die Typenkennzeichnungen zur eindeutigen Zuordnung der unterschiedlichen Konstruktionen erhalten. Der bestehende achtseitige REPN-FZCO Product Guide bleibt bytegleich.

Öffentliche Downloads sind ausschließlich die vier PDFs in `public/downloads/`. Die folgenden Quellenangaben dokumentieren die technische Herkunft und die früheren Versionen; historische CSV-Verweise sind keine aktuellen Downloadlinks.

---

# Ergänzung Version 12 – maßgeblich für die aktuellen Änderungen

## Wanda-Kabel

- Gmail: Bestellung `PO_20260630TR_30.06.2026.pdf`, Nachricht `19f187cce473911e`. Zwei bestellte Kabeltypen: QYYFFX-5KV und QYYEQX-5KV, 3 × 33,5 mm² / 2 AWG.
- Technisches Original: `WAND cable Technical Specifications 2026-6-29.xlsx`, in Nachricht `19f174b3e94fcc80`. Verwendet werden nur die beiden bestellten Typen, nicht alle angefragten Varianten. Temperatur: 232 °C bzw. 204 °C; weitere Daten siehe `lib/cable-data.ts`.
- Nachricht vom 30.06.2026 stellt PET-Fasertape klar; die frühere pauschale Bezeichnung Nylon wird nicht übernommen.
- Prüfberichte `26071531.xlsx` und `26071532.xlsx`, in Nachricht `19fc61ee8d44070f`, Testdatum 28.07.2026. Bestätigen Bestellnummer, Typen, Größe, Widerstandsgrenzen und Prüfumfang. Messwerte werden nicht als allgemeine Typenwerte ausgegeben.
- Das Spezifikationsfeld „Nominal Cross-sectional Area“ enthält 6,54 mm und ist falsch beschriftet. 6,54 mm wird durch den Prüfbericht als Leiterdurchmesser bestätigt. Leiterquerschnitt aus Bestellung und Prüfberichten: 33,5 mm². Keine Übernahme des Beschriftungsfehlers.
- Bei QYYFFX unterscheiden sich Isolationsdicken zwischen Spezifikation und späterem Prüfprotokoll. Diese Dicken und daraus abgeleitete Durchmesser werden nicht publiziert. Die übereinstimmende maximale Gesamtabmessung wird verwendet.
- Preise, Margen, Kundendetails, Lieferrouten und originale Bestell-/Prüfdokumente werden nicht in den öffentlichen Website-Dateien oder dem PDF veröffentlicht.

## Pumpen, Motoren und Katalog

- Das originale Pumpenfoto `oil-pump.webp` wird unverändert aus Version 11 verwendet. Herkunft siehe `asset-sources.json`. Keine Behauptung, das fotografierte Werk gehöre REPN-FZCO.
- Gmail, Nachricht `1a08996a22d5a942`: `Catalog REPN-1side.pdf` ist der russische Katalog 2024/25. Die lesbare Extraktion enthält Öl-Pumpen-Leistungsdiagramme. Diese Version wird weder öffentlich angeboten noch als aktuelle englische Quelle behandelt.
- Gmail, Nachricht `19c09215933c4f78`: `Catalog REPN-EN.pdf` ist ein älterer Geothermiekatalog; kein Ersatz für den benötigten Oilfield-Katalog 2025/26.
- Die binären Originalanhänge ließen sich über die bereitgestellten Downloadlinks nicht laden (HTTP 403). Kabeldaten wurden aus den vollständig gelieferten strukturierten Extraktionen gelesen. Beim älteren Öl-Katalog wurde nur die verfügbare Teil-Extraktion ausgewertet; es wird keine vollständige Prüfung behauptet.
- Die öffentliche Herstellerseite zu submersiblen Motoren wurde ergänzend geprüft. Aufgrund fehlender eindeutiger Zuordnung zur neueren englischen Katalogversion wurden ihre Leistungsbereiche und Temperaturgrenzen nicht als neue Ratingtabelle übernommen.
- Neuer öffentlicher Katalog: eigenständig gesetzte achtseitige REPN-FZCO-Produktübersicht aus Website-Referenzdaten. Keine Kopie, Ummarkierung oder Veröffentlichung des ursprünglichen vollständigen technischen Katalogs. Nur REPN-FZCO-Logo und -E-Mail; keine Original-Firmenkontakte, QR-Codes, fremden Links oder eingebetteten Fremddokumente. Metadaten geprüft.
- Fachliche Grenzen der bestehenden Geothermie-Referenzdaten und Diagramme bleiben bestehen; siehe Prüfbericht. TP740/50 Hz ist in Website, Pumpen-CSV und neuem PDF gekennzeichnet.

---

## Historische Quellen bis Version 11 (Kabelangaben durch Version 12 ersetzt)

# Inhaltliche Grundlage – REPN-FZCO (Historie v6–v11)

Aktualisiert: 14. September 2026

## Verbindliche Website-Regeln

- REPN-FZCO wurde im August 2024 gegründet.
- Bestätigter Kontakt: `office@repnfzco.com`, Sergej Mattheis, General Manager.
- Öffentliche Website-Texte und Downloads enthalten keine Verweise auf nicht freigegebene verbundene Unternehmen, deren Standorte oder entsprechende Firmendokumente.
- Produktions- und Fertigungsbilder dürfen neutral als technische Bildwelt verwendet werden; sie erhalten keine geografische oder fremde Unternehmenszuordnung.
- Keine russischsprachigen Dokumente auf der Website.
- Aktuell wird das in Version 8 ausgewählte Original-PNG RF_Gruen_V4.png verwendet. Es ersetzt den früheren SVG-Entwurf.

## Technische Arbeitsquellen

- **Geothermie:** `Catalog-REPN-EN_3.pptx`, bestätigte Arbeitsfassung mit 37 Folien. Die von Stefan am 9. September festgelegte Quellenentscheidung bleibt gültig; eigene Ersatzwerte werden nicht ungefragt eingesetzt.
- **Öl & Gas:** `Catalog REPN-EN-2025-12-02.pdf`, aktuelle englische technische Arbeitsquelle im Projekt.
- **Zusatzmaterial aus E-Mail vom 10. September:** russischer Katalog 2024/25, `EC.pdf`, Logoentwurf und öffentlicher Foto-Freigabelink. Diese Materialien werden nur entsprechend der bestätigten Veröffentlichungsregeln verwendet.
- Der per E-Mail nachgereichte russische Katalog 2024/25 ist älter als die vorhandene englische 2025/26-Quelle und überschreibt diese nicht.

## Service-Inhalte

Die Website soll laut Projektauftrag **Equipment und Service** zeigen. Für v6 wurde eine eigene Service-Seite erstellt. Die Formulierungen sind bewusst projektbezogen: Engineering/Auswahl, Installation/Inbetriebnahme, Monitoring/Fehlersuche, Inspektion/Fehleranalyse, Reparatur/Tests und Austausch-/Optimierungsplanung werden als möglicher, je Projekt zu bestätigender Umfang beschrieben. Dadurch wird kein unbelegtes pauschales Leistungsversprechen erzeugt.

Die interne REPN-FZCO-Projektpräsentation vom Juni 2026 dokumentiert bereits tatsächliche Reparatur- und Montageaktivitäten. Detaillierte Kunden-, Finanz- und Reklamationsinformationen aus dieser Präsentation sind nicht für die öffentliche Website bestimmt.

## Technische Zuordnung

| Websiteinhalt | interne Arbeitsquelle |
| --- | --- |
| TP 677, 50/60 Hz | Geothermie, Folien 10–11 |
| TP 740, 50/60 Hz | Geothermie, Folien 14–15 |
| TP 905, 50/60 Hz | Geothermie, Folien 18–19 |
| QJ 1047, 50/60 Hz | Geothermie, Folien 22–23 |
| 728-Motoren | Geothermie, Folien 26–28 |
| Sensorik | Geothermie, Folie 29 |
| Geothermie-Protektoren | Geothermie, Folien 30–32 |
| VSD | Geothermie, Folie 33 |
| Kabelabmessungen ELB/KELB | Geothermie, Folien 34–35 |
| Öl-Pumpenserien 362, 400, 512 | Öl-/Gas-Katalog 2025/26 |
| Öl-Pumpen FLT/PKT, Shaft-/CR-Codes | Öl-/Gas-Katalog 2025/26 |
| Ansaugsektionen und Wellen-Leistungsübertragung | Öl-/Gas-Katalog 2025/26 |
| Gashandhabung und Betriebsbedingungen | Öl-/Gas-Katalog 2025/26 |
| Öl-Seal Sections / Protectors | Öl-/Gas-Katalog 2025/26 |
| Öl-Motoren | Öl-/Gas-Katalog 2025/26 |
| HVOF-Beschichtungsoption | Öl-/Gas-Katalog 2025/26 |
| Öl-Kabel / CELF | Öl-/Gas-Katalog 2025/26 |

## Neue Öl-/Gas-Details in v6

- Pumpenserien 362 / 400 / 512 mit Gehäuse-OD 92 / 103 / 130 mm und Portfolio-Kontext ca. 315–3.144 BPD.
- FLT = Floater, PKT = Packet; S11–S14 und M11–M14 als Wellenoptionen; CR als korrosionsbeständige Ausführung.
- Asynchroner Ölfield-Motor: katalogseitiger synchroner Wellen-Drehzahlbereich 2.100–4.200 rpm.
- CELF: 5 kV, EPR, Bleimantel und Metallbandarmierung; Querschnitte 10 bis 35 mm²; langfristige katalogseitige Erwärmungstemperatur 230 °C.
- Ansaugsektionen: Materialübersicht und Leistungsübertragung nach 20 / 22 / 25 mm Wellen-Ø sowie T11–T14.
- Gas-Handling: modulbezogene Gasanteil-/Abscheidewerte und allgemeine Betriebsbedingungen, darunter max. 1.400 kg/m³ Fluiddichte, 1 mm²/s kinematische Viskosität, 1 g/L Feststoffe und 170 °C Fluidtemperatur.
- Ölfield-Seal-Sections: ausgewählte Hochtemperatur-, Hochdrehzahl- und Lageroptionen.
- CR2C-Seal-Section: HVOF-Beschichtungsoption mit mindestens 150 µm laut Arbeitskatalog.

Alle Angaben sind Referenzdaten der jeweiligen Katalogkonfiguration. Die Website weist darauf hin, dass die endgültige Auswahl projektbezogen bestätigt werden muss.

## Bilder und Downloads

Öffentliche Downloads:

- `REPN-Geothermal-Pumps.csv`
- `REPN-Geothermal-Motors.csv`
- `REPN-Geothermal-Cables.csv`

Nicht öffentlich eingebunden:

- Originaler Öl-/Gas-Arbeitskatalog
- russischsprachige Dokumente
- `EC.pdf`
- Ursprünglicher PNG-Logoentwurf vom 10. September

`EC.pdf` ist eine EU Declaration of Conformity für mehrere PMSM-R-Motorserien. Das Dokument nennt jedoch Hersteller- und Produktionsstandorte, die nach der bestätigten öffentlichen Website-Regel nicht gezeigt werden sollen. Deshalb wird es nicht in `public/` übernommen und nicht als REPN-FZCO-eigenes Zertifikat dargestellt.

## Bilddarstellung

v6 enthält ein zusätzliches CSS-Sicherheits-Layer: Produkt-/Equipmentbilder werden mit `object-fit: contain` und zentrierter Position dargestellt. Der bisherige Hover-Zoom auf diese technischen Bilder ist deaktiviert, damit Pumpen, Motoren, Protectoren und Kabel nicht angeschnitten werden.

## Überarbeitung v6 – Bildauswahl und Lesbarkeit

Die beiden neuesten Website-Mails von Vladimir Kovalev und Sergej Mattheis vom 10.09.2026 wurden vollständig im relevanten Nachrichtentext gelesen. Sie bestätigen die neutrale Verwendung von Produktionsbildern und die bestehenden Unternehmens-/Veröffentlichungsvorgaben.

Der Fotoordner `https://cloud.mail.ru/public/5p3W/CkD2Zb13W` war zugänglich: 135 Bilddateien gelistet, 17 über den gesamten Ordner verteilte Motive visuell geprüft. Verwendet werden:

- `5Z0A1091.jpg` → `precision-components.jpg`: bearbeitete Metallkomponenten auf der Startseite.
- `5Z0A1112.jpg` → `component-machining.jpg`: Komponentenbearbeitung auf der Unternehmensseite.

Beide Bilder wurden als vollständige 1200 × 800-Pixel-Ansicht direkt vom Freigabedienst übernommen. Keine Retusche, kein zusätzlicher Ausschnitt; keine erkennbare fremde Firmen-/Standortkennzeichnung in den ausgewählten Motiven. Die Bildunterschriften behaupten kein Eigentum von REPN-FZCO an der Produktionsstätte. Weitere Bilder und Videos werden nicht automatisch veröffentlicht.

Alle acht Pumpenkennlinien sind jetzt die unveränderten eingebetteten JPG/JPEG-Originale aus der bestätigten Geothermie-Präsentation. Die früheren Seitenausschnitte mit abgeschnittenen Überschriften und Tabellenrändern wurden ersetzt. Zuordnung und Abmessungen stehen in `asset-sources.json`.

Die Zahlen in `lib/repn-data.ts` und die drei CSV-Dateien sind bytegleich mit der gelieferten Version 5.1. Die akzeptierte technische Arbeitsgrundlage wurde nicht eigenmächtig korrigiert.

## Aktuelles Logo – Version 8

Stefan hat RF_Gruen_V4.png als ausgewählte Variante bereitgestellt und die Gestaltung aller Seiten auf dieser Grundlage beauftragt. Die Originaldatei liegt unverändert in public/assets/repn-fzco-logo.png. Die Vorgängerlogos sind nicht mehr enthalten.

Direkt aus dem Logo ausgelesene Hauptfarben: Dunkelblau #04213c und Grün #14835b. Ergänzend werden abgeleitete helle Grünflächen, dunkles Grün für gut lesbare Links und neutrale Textfarben verwendet.

Technische Bilder, Kennlinien, Katalogdaten und öffentliche CSV-Downloads wurden für Version 8 nicht verändert.

## Gestaltung – Version 9

Version 9 basiert auf der hochgeladenen Version 8. Die Bilddateien, Kennlinien, Datendatei und CSV-Downloads sind bytegleich übernommen. Die Herkunftsangaben oben dokumentieren den übernommenen Projektstand; die ursprünglichen Quellen wurden in diesem Gestaltungsschritt nicht vollständig erneut geprüft.

Das vorhandene `manufacturing-hero.webp` bildet den fotografischen Einstieg. Der Ausschnitt entsteht ausschließlich durch CSS; die Datei bleibt unverändert. `precision-components.jpg` erscheint vollständig im Abschnitt zu Equipment und Projektunterstützung. Die Motive werden weiterhin neutral und ohne Zuordnung einer fremden Produktionsstätte zu REPN-FZCO verwendet.

### Offene technische Quellenabweichung: TP740

Die bereits gewählte Kataloggrundlage bleibt maßgeblich für diese Version. In der übergebenen Version 8 stehen für TP740 bei 50 Hz, 2.910 rpm und 250 m³/h eine Förderhöhe von 11,5 m und eine Leistung von 10,7 kW. Im Mailverlauf wurde eine digitale R740TP250-Kennlinie mit abweichenden Werten von 16,34 m und 16,74 kW bestätigt. Diese Abweichung ist vor einer fachlichen Änderung eindeutig der vorgesehenen Konfiguration und verbindlichen Quelle zuzuordnen. Version 9 setzt keine dieser Zahlen eigenständig neu ein.

Die im Projekt bestätigte Umrechnung für TP677 bei 60 Hz, 30 Stufen und 690 m ist 2.264 ft. Dieser Gestaltungsschritt nimmt keine erneute komplette technische Validierung vor.

## Informationsstruktur – Version 10

Version 10 ordnet die Inhalte aus Version 9 neu. Technische Tabellen sind vollständig und mit identischen Zellen und Quellenbeschriftungen auf ihren jeweiligen Produktseiten erhalten. Sämtliche öffentlichen Originaldateien und die Datendatei sind bytegleich. Zahlenwiederholungen auf Anwendungs- und Unternehmensseiten wurden durch kurze Beschreibungen und Verweise ersetzt. Die Quellenabweichung bei TP740 wird dadurch nicht fachlich neu bewertet.

## Fertigstellung der Website – Version 11

Die Originaldateien und technischen Tabellen sind unverändert übernommen. Die Bildabmessungen wurden aus sämtlichen Originaldateien ausgelesen. `manufacturing-detail.webp` wird auf Services als neutrales Motiv zu Pumpentechnik und Rohrleitungen verwendet. Das Bild zeigt keine Komponentenbearbeitung; Alttext und Bildunterschrift wurden entsprechend formuliert.

Der Betriebspunkt TP740 / 50 Hz trägt jetzt einen sichtbaren Hinweis, dass die Leistungsdaten vor der Auswahl bestätigt werden müssen. Die Zahlen 11,5 m und 10,7 kW wurden weder durch die abweichenden Kennlinienwerte ersetzt noch als neu verifiziert dargestellt.


## Kabel und ESP-Visualisierung – Version 17.7

Öl-/Gaskabel: `Catalog REPN-EN-2025-12-02.pdf`, Seiten 78–79. Neue E-Mails vom 16.09.2026, 06:41 und 07:34 (+03:00), vollständig in den aktuellen relevanten Abschnitten gelesen. Die erste bestätigt diese Seiten; die zweite verlinkt `7_KHKA_neftepogruzhnye_kabeli.pdf` (52 Seiten), dessen zugehörige EPR-/Bleimantel-Ausführung auf Seiten 39–40 zusätzlich geprüft wurde.

Die Kataloge bezeichnen unterschiedliche technische Ausführungen/Standards. Der zweite nennt 35 MPa und pH 6,0–8,5 sowie abweichende Abmessungen. Das bestätigt keinen Ersatz der 40-MPa-Ausführung. Keine Vermischung von Maßtabellen, Mediengrenzen, Prüfspannungen oder Installationsanweisungen. Die gemeinsame EPR-/Bleimantel-Konstruktion und 230 °C Leitertemperatur sind in beiden Unterlagen belegt.

Quellenabweichungen: 13 mm² in der Stromtabelle gegenüber 13,3 mm² in der Maßtabelle; dafür kein öffentlich zugeordneter Stromwert. Bei 35 mm² widerspricht der angegebene isolierte Zwischen-Durchmesser der Summenbildung; dieser Zwischenwert wird nicht gezeigt. Alle 182 Stromwerte der Quelltabelle wurden maschinell gegen die PDF-Tabelle abgeglichen; veröffentlicht sind die 156 eindeutig zugeordneten Werte für sechs Querschnitte.

Die bestehende Geothermal-Spezifikation bleibt unverändert. Keine Umbenennung der Öl-/Gaskabel in REPN-FX oder REPN-QX. Keine Lieferantenlogos oder fremden Kataloge im öffentlichen Download.

ESP-Visualisierung: Überarbeitung des bestehenden SVG, keine produkt- oder maßstabsgetreue Installationszeichnung. Konzeptuelle Reihenfolge Motor → Protector → Einlass/Pumpe → Förderrohr. Strömung bewegt sich im Ringraum am Motor vorbei zum Einlass und weiter durch Pumpe/Förderrohr zur Oberfläche; elektrische Animation vom Schaltschrank zum Motor. Keine erfundenen Betriebswerte.


## Hintergrundbild – Version 17.8

Auf ausdrücklichen Wunsch wurde das bestehende illustrative Geothermie-Motiv mit dem integrierten imagegen bearbeitet. Das Ergebnis bleibt generiert, ohne Behauptung eines realen Standorts oder REPN-Anlageneigentums. Natürliches Tageslicht, matte Metalloberflächen und zurückhaltendere Vegetation ersetzen die ausgeprägte Sonnenuntergangs-Inszenierung. Der Ursprung und der Bearbeitungsprompt sind in asset-sources.json dokumentiert. Originalausgabe: 1672 × 941 PNG; Webausgabe: WebP in identischen Abmessungen, ohne zusätzlichen Ausschnitt oder Retusche.
