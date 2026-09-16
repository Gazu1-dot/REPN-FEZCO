export const applications = [
  { id: "geothermal", label: "Geothermal", href: "/geothermal/" },
  { id: "oil-and-gas", label: "Oil & Gas", href: "/oil-and-gas/" },
] as const;

export const mainNavigation = [
  { href: "/equipment/", label: "Equipment" },
  { href: "/services/", label: "Services" },
  { href: "/company/", label: "Company" },
  { href: "/resources/", label: "Downloads" },
] as const;

export type ApplicationId = typeof applications[number]["id"];
export type EquipmentFilterId = ApplicationId | "all";

export function applicationFromSearch(search: string): EquipmentFilterId {
  const value = new URLSearchParams(search.split("#")[0]).get("application");
  return applications.find(application => application.id === value)?.id ?? "all";
}

export function applicationLabel(id: EquipmentFilterId): string {
  return applications.find(application => application.id === id)?.label ?? "";
}

export function enquiryHref(equipmentName: string, application?: ApplicationId): string {
  const query = new URLSearchParams({ equipment: equipmentName });
  if (application) query.set("application", application);
  return `/contact/?${query}`;
}

export function productApplication(location: string, available: readonly ApplicationId[]): ApplicationId {
  const hash = location.split("#")[1] ?? "";
  if (hash.startsWith("oilfield") && available.includes("oil-and-gas")) return "oil-and-gas";
  if (hash === "geothermal" && available.includes("geothermal")) return "geothermal";
  const selected = applicationFromSearch(location);
  return selected !== "all" && available.includes(selected) ? selected : available[0];
}

export function equipmentHref(application: EquipmentFilterId = "all") {
  return application === "all" ? "/equipment/" : `/equipment/?application=${application}`;
}

export const equipmentGroups = [
  { id: "pumping", title: "Pumping & drive", description: "The core downhole assembly.", slugs: ["pumps", "motors", "protectors"] },
  { id: "power", title: "Power & monitoring", description: "Electrical supply, operating data and surface control.", slugs: ["cables", "sensors", "controls"] },
  { id: "fluid", title: "Fluid handling & protection", description: "Components matched to the fluid and operating environment.", slugs: ["intakes", "gas-handling", "coatings"] },
] as const;

export const downloads = [
  { id: "product-guide", title: "REPN-FZCO product guide", description: "Eight-page overview of Geothermal and Oil & Gas equipment, pump and motor reference data, ESP cable specifications and service scope.", href: "/downloads/REPN-FZCO-Product-Guide.pdf", equipment: "portfolio", format: "PDF" },
  { id: "pump-data", title: "Geothermal pump data", description: "Eight operating points across four pump families, with frequency, speed, flow, head, power, efficiency and operating ranges.", href: "/downloads/REPN-Geothermal-Pumps.pdf", equipment: "pumps", format: "PDF" },
  { id: "motor-data", title: "728-series motor data", description: "Thirteen motor configurations with power and voltage ratings, dimensions and cooling-flow values.", href: "/downloads/REPN-Geothermal-Motors.pdf", equipment: "motors", format: "PDF" },
  { id: "cable-data", title: "ESP cable specifications", description: "Separate Geothermal and Oil & Gas specifications, including cable construction, dimensions, fluid limits and oilfield current ratings.", href: "/downloads/REPN-ESP-Cable-Specifications.pdf", equipment: "cables", format: "PDF" },
] as const;
