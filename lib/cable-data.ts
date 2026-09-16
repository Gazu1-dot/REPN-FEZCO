// Technical specification dated 2026-06-29; purchased types checked against
// PO 20260630TR and reports 26071531/26071532 dated 2026-07-28.
// Commercial documents stay outside the public project.
export const cableSpecifications = [
  { code: "REPN-FX", temperature: 232, insulation: "Polyimide composite film + FEP", sheath: "FEP", size: "14.1 × 35.7 mm", resistance: "5,000 MΩ·km", layers: ["Copper conductor", "Polyimide composite film + FEP", "FEP sheath", "PET fibre tape", "Stainless steel armour"] },
  { code: "REPN-QX", temperature: 204, insulation: "Polyimide composite film + EPDM", sheath: "Lead", size: "17.4 × 44.5 mm", resistance: "1,290 MΩ·km", layers: ["Copper conductor", "Polyimide composite film + EPDM", "Lead sheath", "PET fibre tape", "Stainless steel armour"] },
] as const;

export const cableComparisonRows = [
  ["Cable designation", "REPN-FX-5KV", "REPN-QX-5KV"],
  ["Rated voltage", "5 kV", "5 kV"],
  ["Conductors", "3 × 33.5 mm² / 2 AWG", "3 × 33.5 mm² / 2 AWG"],
  ["Nominal conductor diameter", "6.54 mm", "6.54 mm"],
  ["Conductor material", "Copper / TU1M07", "Copper / TU1M07"],
  ["Specified temperature rating", "232 °C", "204 °C"],
  ["Insulation", "Polyimide composite film + FEP", "Polyimide composite film + EPDM"],
  ["Individual core sheath", "FEP", "Lead"],
  ["Cushion layer", "PET fibre tape, 0.17 mm", "PET fibre tape, 0.17 mm"],
  ["Armour", "Stainless steel tape", "Stainless steel tape"],
  ["Armour tape thickness × width", "0.5 × 12.7 mm", "0.5 × 12.7 mm"],
  ["Maximum overall size (thickness × width)", "14.1 × 35.7 mm", "17.4 × 44.5 mm"],
  ["Maximum conductor DC resistance at 20 °C", "0.54 Ω/km", "0.54 Ω/km"],
  ["Minimum insulation resistance at 15.6 °C", "5,000 MΩ·km", "1,290 MΩ·km"],
];

// Oilfield reference construction: REPN catalogue 2025-12-02, pp. 78–79,
// confirmed as the requested reference by email 2026-09-16.
// Separate supplier catalogue (TU 16.K73.106-2012) has different dimensions/limits.
export const oilCableDimensions = [["3 × 10", "3.56", "12.8 × 33.1"], ["3 × 13.3", "4.11", "13.5 × 35.1"], ["3 × 16", "4.50", "13.8 × 36.2"], ["3 × 21.15", "5.19", "14.5 × 38.3"], ["3 × 25", "5.65", "14.9 × 39.5"], ["3 × 33.6", "6.55", "15.8 × 42.4"], ["3 × 35", "6.60", "15.9 × 42.5"]];
export const oilCableEnvironment = [["Production-water pH", "5.0–8.5", "3.0–9.0"], ["Maximum hydrogen sulphide", "0.01 g/L", "1.25 g/L"], ["Maximum hydrostatic pressure", "40 MPa", "40 MPa"], ["Maximum water content", "100%", "100%"]];
export const oilCableChemistry = [["Carbon dioxide (CO₂)", "1.15"], ["Chloride (Cl⁻)", "75"], ["Bicarbonate (HCO₃⁻)", "1"], ["Calcium (Ca²⁺)", "9"], ["Sodium + potassium (Na⁺ + K⁺)", "40"]];
// Current table: omit source column 13 mm²; mapping to 13.3 mm² is not confirmed.
export const oilCableCurrentHeadings = ["Ambient °C", "10 mm²", "16 mm²", "21.15 mm²", "25 mm²", "33.6 mm²", "35 mm²"];
export const oilCableCurrentOil = [[40, 118, 157, 187, 207, 228, 255], [60, 112, 148, 177, 196, 216, 241], [80, 105, 139, 166, 184, 202, 226], [100, 98, 130, 155, 171, 188, 211], [120, 90, 119, 142, 158, 173, 194], [140, 81, 108, 129, 143, 157, 175], [160, 72, 95, 113, 126, 138, 155], [170, 66, 88, 105, 116, 128, 143], [175, 63, 84, 101, 112, 123, 137], [180, 60, 80, 96, 106, 117, 131], [200, 47, 62, 74, 82, 91, 101], [220, 27, 36, 43, 48, 52, 58], [228, 12, 16, 19, 21, 23, 26]];
export const oilCableCurrentGas = [[40, 96, 127, 151, 167, 182, 204], [60, 91, 120, 143, 158, 173, 193], [80, 86, 113, 134, 148, 162, 181], [100, 80, 105, 125, 138, 151, 169], [120, 73, 97, 115, 127, 139, 155], [140, 66, 88, 104, 115, 126, 140], [160, 59, 77, 92, 101, 111, 124], [170, 54, 72, 85, 94, 103, 115], [175, 52, 68, 81, 90, 98, 110], [180, 49, 65, 77, 86, 94, 105], [200, 38, 51, 60, 66, 73, 81], [220, 22, 29, 35, 38, 42, 47], [228, 10, 13, 15, 17, 19, 21]];
