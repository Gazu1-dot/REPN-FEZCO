import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Remove only explicitly retired public assets when uploading over an older version.
const retired = [
  "downloads/REPN-Geothermal-Pumps.csv",
  "downloads/REPN-Geothermal-Motors.csv",
  "downloads/REPN-ESP-Cable-Specifications.csv",
  "downloads/REPN-Geothermal-Cables.csv",
  "downloads/REPN-Oilfield-Catalogue.pdf",
  ...["tp677", "tp740", "tp905", "qj1047"].flatMap(series => [50, 60].map(hz => `assets/curve-${series}-${hz}.webp`)),
];
for (const asset of retired) rmSync(fileURLToPath(new URL(`../public/${asset}`, import.meta.url)), { force: true });
