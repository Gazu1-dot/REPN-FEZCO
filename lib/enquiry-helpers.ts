import { geothermalPumps } from "./repn-data.ts";

export function pumpSelection(location: string) {
  const query = new URLSearchParams(location.split("#")[0]);
  const series = geothermalPumps.find(item => item.id === query.get("series"))?.id ?? geothermalPumps[0].id;
  const hz: "50" | "60" = query.get("hz") === "50" ? "50" : "60";
  return { series, hz };
}

export function motorSpeed(location: string): "3000" | "3600" {
  return new URLSearchParams(location.split("#")[0]).get("speed") === "3000" ? "3000" : "3600";
}

export function emailDraft(project: string) {
 const subject=`REPN-FZCO enquiry — ${project.replace(/[\r\n]/g," ").slice(0,150)}`;
 const body=`Hello REPN-FZCO,\n\nPlease find my completed equipment selection questionnaire attached.\n\nProject / well: ${project}\n\n[Please attach REPN-Completed-Enquiry.docx before sending.]`;
 return {href:`mailto:office@repnfzco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}

export const optionalEnquiryFields = [
 {number:8,help:"Required pump head in metres. This is not the pump installation depth.",name:"head",label:"Required head",unit:"m",type:"number"},
 {number:9,help:"Planned pump depth below ground level. State the reference point used in your notes.",name:"depth",label:"Pump installation depth",unit:"m",type:"number"},
 {number:10,help:"Clear inside diameter of the casing, not the borehole diameter.",name:"diameter",label:"Casing inside diameter",unit:"mm",type:"number"},
 {number:11,help:"Density of the pumped fluid, if known, in kg/m³.",name:"density",label:"Fluid density",unit:"kg/m³",type:"number"},
 {number:12,help:"Free-gas percentage at pump-intake conditions, if known.",name:"gas",label:"Free gas at pump intake",unit:"%",type:"number"},
 {number:13,help:"Concentration of suspended solids in the fluid, if known, in mg/L.",name:"solids",label:"Suspended solids",unit:"mg/L",type:"number"},
 {number:14,help:"Available power supply and existing VSD details, if known.",name:"power",label:"Existing power supply / VSD",unit:"",type:"text"},
];
export const chemistryFields = [
 {name:"ph",label:"pH",unit:""},
 {name:"hco3",label:"HCO3",unit:"mg/L"},
 {name:"co3",label:"CO3",unit:"mg/L"},
 {name:"chloride",label:"Cl",unit:"mg/L"},
 {name:"sulphate",label:"SO4",unit:"mg/L"},
 {name:"h2s",label:"H2S",unit:"mg/L"},
];
export const contactEnquiryFields = [
 {name:"project",label:"Project / well"}, {name:"application",label:"Application"},
 {name:"equipment",label:"Equipment / service"}, {name:"company",label:"Company"},
 {name:"name",label:"Contact name"}, {name:"email",label:"Email"}, {name:"location",label:"Project location"},
];
