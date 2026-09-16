"use client";
import { EquipmentCardImage } from "./equipment-card-image";
import { useEffect, useRef, useState } from "react";
import wellParameters from "@/lib/well-parameters.json";
import { buildQuestionnaire, loadQuestionnaireTemplate, saveQuestionnaire, printQuestionnaire } from "@/lib/questionnaire";
import Link from "next/link";
import { TechnicalImage } from "./technical-image";
import { ArrowUpRight, Download, Copy, Mail, Printer, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "@/components/ui/table";
import { geothermalPumps, geothermalMotors, equipment } from "@/lib/repn-data";
import { applicationFromSearch, applicationLabel, equipmentGroups } from "@/lib/site-structure";
import { useLocation, updateLocation } from "@/lib/use-location";
import { pumpSelection, motorSpeed, emailDraft, optionalEnquiryFields, chemistryFields, contactEnquiryFields } from "@/lib/enquiry-helpers";

export function SpecificationTable({caption,headings,rows}:{caption:string;headings:string[];rows:(string|number)[][]}){const wide=headings.length>4;return <div className="table-block">{wide&&<p className="table-scroll-hint">Scroll horizontally to view all columns. Units are shown in the headings or values.</p>}<div className={`spec-table ${wide?"wide-table":""}`} tabIndex={0} role="region" aria-label={caption}><Table><TableCaption>{caption}</TableCaption><TableHeader><TableRow>{headings.map(h=><TableHead scope="col" key={h}>{h}</TableHead>)}</TableRow></TableHeader><TableBody>{rows.map((r,i)=><TableRow key={i}>{r.map((c,j)=><TableCell key={j}>{c}</TableCell>)}</TableRow>)}</TableBody></Table></div></div>;}

const curveImages: Record<string,{src:string;width:number;height:number}> = {"curve-tp677-60": {"src": "/assets/curve-tp677-60.jpg", "width": 1221, "height": 675}, "curve-tp677-50": {"src": "/assets/curve-tp677-50.jpeg", "width": 1716, "height": 946}, "curve-tp740-60": {"src": "/assets/curve-tp740-60.jpg", "width": 1174, "height": 644}, "curve-tp740-50": {"src": "/assets/curve-tp740-50.jpeg", "width": 1693, "height": 904}, "curve-tp905-60": {"src": "/assets/curve-tp905-60.jpg", "width": 1178, "height": 646}, "curve-tp905-50": {"src": "/assets/curve-tp905-50.jpeg", "width": 1851, "height": 943}, "curve-qj1047-60": {"src": "/assets/curve-qj1047-60.jpg", "width": 1164, "height": 639}, "curve-qj1047-50": {"src": "/assets/curve-qj1047-50.jpeg", "width": 1770, "height": 930}};

function ChoiceButtons({label,value,choices,onChange}:{label:string;value:string;choices:{value:string;label:string}[];onChange:(value:string)=>void}) {
 return <div className="data-options" role="group" aria-label={label}>{choices.map(choice=><button key={choice.value} type="button" aria-pressed={value===choice.value} onClick={()=>onChange(choice.value)}>{choice.label}</button>)}</div>;
}

export function PumpSelector() {
 const location=useLocation();
 const {series,hz}=pumpSelection(location);
 const pump=geothermalPumps.find(item=>item.id===series)!;
 const point=pump.points[hz];
 const curve=curveImages[`curve-${pump.id}-${hz}`];
 return <div className="pump-selector"><div className="selector-toolbar"><ChoiceButtons label="Pump series" value={series} choices={geothermalPumps.map(item=>({value:item.id,label:item.name}))} onChange={value=>updateLocation({series:value})}/><div className="frequency-control"><span>Frequency</span><ChoiceButtons label="Pump frequency" value={hz} choices={[{value:"50",label:"50 Hz"},{value:"60",label:"60 Hz"}]} onChange={value=>updateLocation({hz:value})}/></div></div><div className="pump-data" aria-live="polite"><div className="pump-data-head"><div><h3>{pump.name}</h3><p>{pump.construction}</p></div><span>{point.rpm.toLocaleString("en-US")} rpm · Single stage</span></div><div className="metric-grid">{[[`${point.flow}`,"m³/h","Rated flow"],[`${point.head}`,"m","Head per stage"],[`${point.power}`,"kW","Power per stage"],[`${point.efficiency}`,"%","Efficiency"]].map(([v,u,l])=><div key={l}><span>{l}</span><strong>{v}<small>{u}</small></strong></div>)}</div><div className="pump-details"><p>Operating range <strong>{point.min}–{point.max} m³/h</strong></p><p>Pump outside diameter <strong>{pump.diameter} mm</strong></p></div><p className="data-confirmation">{pump.id==="tp740"&&hz==="50"?"This operating point is pending confirmation. ":""}Some original curve labels and values differ from the tabulated operating points. Contact REPN-FZCO for confirmed performance data before equipment selection.</p><h4 className="curve-title">Single-stage performance curve</h4><TechnicalImage className="curve" src={curve.src} width={curve.width} height={curve.height} alt={`${pump.name} performance curve — ${hz} Hz, ${point.rpm} rpm`} caption={`Performance curve · ${pump.name} · ${hz} Hz. Head, power and efficiency for a single stage. Enlarge to inspect the axes and operating range.`}/></div></div>;
}

export function MotorSelector() {
 const location=useLocation();
 const speed=motorSpeed(location);
 const high=speed==="3600";
 return <div className="motor-selector"><div className="selector-toolbar"><ChoiceButtons label="Motor speed" value={speed} choices={[{value:"3000",label:"3,000 rpm"},{value:"3600",label:"3,600 rpm"}]} onChange={value=>updateLocation({speed:value})}/><span className="subtle-label">13 configurations · Housing OD 185 mm</span></div><SpecificationTable caption={`728-series motor ratings at ${Number(speed).toLocaleString("en-US")} rpm. Model codes remain as specified.`} headings={["Model code","Power, kW","Voltage, V","Current, A","Length, mm","Weight, kg","Min. flow, m/s"]} rows={geothermalMotors.map(m=>[`728-${m.hp}HP`,high?m.kw3600:m.kw3000,high?m.v3600:m.v3000,m.amps,m.length,m.weight,m.velocity.toFixed(2)])}/><p className="spec-note">Full model designation: PMSM-R-728-[HP]-3600RPM. Thermal and corrosion-resistant configurations are listed below.</p></div>;
}

export function EquipmentFilter() {
 const location=useLocation();
 const selected=applicationFromSearch(location);
 const filter=selected==="oil-and-gas"?"oil-and-gas":"geothermal";
 const shown=equipment.filter(item=>item.applications.includes(applicationLabel(filter)));
 return <div className="catalogue">
  <div className="catalogue-filter"><div><p>Application</p><ChoiceButtons label="Filter equipment by application" value={filter} choices={[{value:"geothermal",label:"Geothermal"},{value:"oil-and-gas",label:"Oil & Gas"}]} onChange={value=>updateLocation({application:value},true)}/></div><span aria-live="polite">{shown.length} product families</span></div>
  {equipmentGroups.map(group=>{const products=group.slugs.map(slug=>shown.find(item=>item.slug===slug)).filter(item=>item!==undefined);return products.length>0&&<section key={group.id} className="catalogue-group" aria-labelledby={`group-${group.id}`}><div className="catalogue-group-heading"><h2 id={`group-${group.id}`}>{group.id==="power"&&filter==="oil-and-gas"?"Power transmission":group.title}</h2><p>{group.id==="power"&&filter==="oil-and-gas"?"Power cables for oilfield submersible motors.":group.description}</p></div><div className="catalogue-grid">{products.map(item=><Link key={item.slug} className="catalogue-card" href={`/equipment/${item.slug}/?application=${filter}`}><EquipmentCardImage image={item.image} alt={item.name} slug={item.slug}/><div className="catalogue-card-copy"><h3>{item.name}</h3><p>{item.slug==="cables"?(filter==="oil-and-gas"?"Flat 5 kV ESP cables with EPR insulation, lead-sheathed cores and a 230 °C conductor temperature rating.":"Flat 5 kV ESP cables in REPN-FX and REPN-QX constructions, with 3 × 33.5 mm² copper conductors."):item.description.split(". ")[0].replace(/\.$/,"")+"."}</p><span>View product<ArrowUpRight size={18}/></span></div></Link>)}</div></section>;})}
 </div>;
}

function enquiryValues(form:HTMLFormElement):Record<string,string> {
 return Object.fromEntries(Array.from(new FormData(form),([key,value])=>[key,String(value).trim()]));
}
function enquiryText(form:HTMLFormElement) {
 const values=enquiryValues(form);const val=(name:string)=>values[name]||"Not provided";
 const lines=["REPN-FZCO — PROJECT / SERVICE ENQUIRY","",...contactEnquiryFields.map(field=>`${field.label}: ${val(field.name)}`),"","REQUIRED WELL PARAMETERS — SKETCH REFERENCES 1–7",...wellParameters.map(field=>`${field.number}. ${field.label} (${field.name==="borehole_diameter"?values.borehole_unit:field.unit}): ${val(field.name)}`),"","ADDITIONAL OPERATING INFORMATION",...optionalEnquiryFields.map(field=>`${field.number}. ${field.label}${field.unit?` (${field.unit})`:""}: ${val(field.name)}`),"","WATER CHEMISTRY — IF AVAILABLE",...chemistryFields.map(field=>`${field.label}${field.unit?` (${field.unit})`:""}: ${val(field.name)}`),`Injected inhibitor composition: ${val("inhibitor")}`,"","Additional information:",val("notes"),""];
 return lines.join("\n");
}
function RequiredMark(){return <span className="required-marker" aria-hidden="true">*</span>;}

export function EnquiryForm(){
 const ref=useRef<HTMLFormElement>(null);
 const location=useLocation();const search=location.split("#")[0];
 const initialEquipment=new URLSearchParams(search).get("equipment")||"";
 const [applicationOverride,setApplication]=useState<string|null>(null);
 const application=applicationOverride??applicationLabel(applicationFromSearch(search));
 const [equipmentOverride,setEquipmentName]=useState<string|null>(null);
 const equipmentName=equipmentOverride??initialEquipment;
 const [status,setStatus]=useState("");const [applicationInvalid,setApplicationInvalid]=useState(false);
 const [busy,setBusy]=useState<string|null>(null);const working=useRef(false);
 const [sendAvailable,setSendAvailable]=useState(false);const printButton=useRef<HTMLButtonElement>(null);
 const requestRef=useRef<{fingerprint:string;id:string}|null>(null);
 useEffect(()=>{
  let active=true;
  if(!(window as Window&{REPN_ASSETS?:unknown}).REPN_ASSETS)fetch("/api/enquiry").then(r=>r.ok?r.json():null).then(data=>{if(active)setSendAvailable(data?.available===true);}).catch(()=>{});
  const keyboard=(event:KeyboardEvent)=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="p"){event.preventDefault();printButton.current?.click();}};
  window.addEventListener("keydown",keyboard);return()=>{active=false;window.removeEventListener("keydown",keyboard);};
 },[]);
 function compose(){
  const f=ref.current!;
  for(const field of f.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>("input[required],textarea[required]"))field.setCustomValidity(field.value.trim()?"":"Please complete this required field.");
  const valid=f.reportValidity();
  if(!application){setApplicationInvalid(true);setStatus("Please select an application.");f.querySelector<HTMLButtonElement>("[role=combobox]")?.focus();return null;}
  if(!valid){setStatus("Please complete the required fields and check the entered values.");return null;}
  setApplicationInvalid(false);return enquiryText(f);
 }
 async function run(label:string,task:()=>Promise<void>){
  if(working.current)return;working.current=true;setBusy(label);setStatus("");
  try{await task();}catch(error){setStatus(error instanceof Error?error.message:"The enquiry could not be prepared. Please try again.");}finally{working.current=false;setBusy(null);}
 }
 async function word(values:Record<string,string>){return buildQuestionnaire(await loadQuestionnaireTemplate(),values);}
 function download(){if(!compose())return;const values=enquiryValues(ref.current!);void run("Preparing Word file…",async()=>{saveQuestionnaire(await word(values));setStatus("Your completed Word questionnaire is ready.");});}
 function openEmail(event:React.FormEvent){event.preventDefault();if(!compose())return;const values=enquiryValues(ref.current!);void run("Preparing email attachment…",async()=>{saveQuestionnaire(await word(values));const draft=emailDraft(values.project);const link=document.createElement("a");link.href=draft.href;link.click();setStatus("The Word questionnaire has been downloaded. Attach REPN-Completed-Enquiry.docx in your email app, then send it to office@repnfzco.com.");});}
 async function copy(){const text=compose();if(!text)return;try{await navigator.clipboard.writeText(text);setStatus("Enquiry copied. Send it to office@repnfzco.com.");}catch{setStatus("Copying is unavailable in this browser. Use Download enquiry instead.");}}
 function print(){const values=enquiryValues(ref.current!);void run("Preparing print view…",async()=>{await printQuestionnaire(await word(values));setStatus("The print view uses the completed Word questionnaire, including both drawings.");});}
 function send(){
  if(!sendAvailable||!compose())return;
  const values=enquiryValues(ref.current!),fingerprint=JSON.stringify(values);
  if(requestRef.current?.fingerprint!==fingerprint)requestRef.current={fingerprint,id:crypto.randomUUID()};
  const requestId=requestRef.current.id;
  void run("Sending enquiry…",async()=>{
   const response=await fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fields:values,website:values._website||"",requestId})});
   const result=await response.json().catch(()=>null);
   if(!response.ok||result?.ok!==true)throw new Error(result?.error||"Your enquiry could not be sent. Download the Word file and email it to office@repnfzco.com.");
   setStatus("Your enquiry with the completed Word questionnaire has been submitted to REPN-FZCO.");
  });
 }
 return <form ref={ref} className="enquiry-form" onSubmit={openEmail}
  onInputCapture={event=>{const target=event.target;if(target instanceof HTMLInputElement||target instanceof HTMLTextAreaElement)target.setCustomValidity("");}}
  onInvalidCapture={event=>{const target=event.target as HTMLInputElement;const details=target.closest("details");if(details)details.open=true;if(target.name==="application"){event.preventDefault();setApplicationInvalid(true);ref.current?.querySelector<HTMLButtonElement>("[role=combobox]")?.focus();}setStatus("Please complete the required fields and check the entered values.");}}>
  <h2>Prepare an enquiry</h2><p className="form-help form-required-note">Fields marked * are required. Water chemistry and additional operating information are optional.</p>
  <fieldset className="enquiry-fieldset"><legend>Project details</legend><div className="form-grid">
   <label className="full">Project / well name <RequiredMark/><input name="project" required maxLength={150} placeholder="e.g. Production well 01"/></label>
   <div className="field"><label id="application-label">Application <RequiredMark/></label><Select name="application" required value={application} onValueChange={value=>{setApplication(value);setApplicationInvalid(false);}}><SelectTrigger aria-labelledby="application-label" aria-required="true" aria-invalid={applicationInvalid||undefined} className="form-select"><SelectValue placeholder="Select application"/></SelectTrigger><SelectContent><SelectItem value="Geothermal">Geothermal</SelectItem><SelectItem value="Oil & Gas">Oil &amp; Gas</SelectItem></SelectContent></Select></div>
   <label>Equipment / service <RequiredMark/><input name="equipment" required value={equipmentName} onChange={e=>setEquipmentName(e.target.value)} maxLength={150} placeholder="Complete system, component or service"/></label>
   <label>Project location <RequiredMark/><input name="location" required maxLength={150} placeholder="Country / field"/></label>
  </div></fieldset>
  <fieldset className="enquiry-fieldset"><legend>Your contact details</legend><div className="form-grid">
   <label>Company <RequiredMark/><input name="company" required autoComplete="organization" maxLength={150}/></label>
   <label>Contact name <RequiredMark/><input name="name" required autoComplete="name" maxLength={100}/></label>
   <label>Email <RequiredMark/><input name="email" required type="email" autoComplete="email" maxLength={254}/></label>
  </div></fieldset>
  <fieldset className="enquiry-fieldset required-well-fields"><legend>Required well parameters</legend><p className="form-help">Use references 1–7 in the well sketch.</p><div className="form-grid">
   {wellParameters.map(field=><div className="field well-parameter" key={field.name}><label htmlFor={`well-${field.name}`}><span className="parameter-number">{field.number}</span>{field.label} <RequiredMark/></label><div className="field-with-unit"><input id={`well-${field.name}`} name={field.name} required type="number" min={["temperature","wellhead_pressure"].includes(field.name)?undefined:0} step="any" inputMode="decimal" aria-describedby={`help-${field.name}`}/>{field.name==="borehole_diameter"?<select name="borehole_unit" defaultValue="mm" aria-label="Borehole diameter unit"><option value="mm">mm</option><option value="inch">inch</option></select>:<span>{field.unit}</span>}</div><p id={`help-${field.name}`} className="field-hint">{field.help}</p></div>)}
  </div></fieldset>
  <details className="technical-form-details operating-information" id="additional-operating-information"><summary>Additional operating information<span>Optional</span></summary><p className="form-help">Match references 8–14 in the sketch to the fields below. Leave anything you do not know blank.</p><TechnicalImage className="operating-reference" src="/assets/operating-information.svg" width={460} height={700} alt="Additional operating information — references 8 to 14" caption="Pump duty, installation dimensions, fluid data and power supply. Numbers match the optional fields below."/><div className="form-grid">{optionalEnquiryFields.map(field=><label className="operating-field" htmlFor={`operating-${field.name}`} key={field.name}><span className="operating-field-label"><span className="parameter-number operating-number">{field.number}</span>{field.label}{field.unit&&<span className="operating-unit">{field.unit}</span>}</span><input id={`operating-${field.name}`} name={field.name} type={field.type} min={field.type==="number"?0:undefined} max={field.name==="gas"?100:undefined} step={field.type==="number"?"any":undefined} inputMode={field.type==="number"?"decimal":undefined} maxLength={field.name==="power"?250:150} aria-describedby={`operating-help-${field.name}`}/><span id={`operating-help-${field.name}`} className="field-hint">{field.help}</span></label>)}</div></details>
  <details className="technical-form-details water-chemistry"><summary>Chemical composition of water<span>Optional — provide only if available</span></summary><p className="form-help">Leave values blank if no analysis is available. pH is dimensionless.</p><div className="form-grid">{chemistryFields.map(field=><label key={field.name}>{field.label}{field.unit&&<span> {field.unit}</span>}<input name={field.name} type="number" min={field.name==="ph"?undefined:0} step="any" inputMode="decimal"/></label>)}<label className="full">Chemical composition of the injected inhibitor<textarea name="inhibitor" rows={3} maxLength={2000}/></label></div></details>
  <div className="form-grid enquiry-notes"><label className="full">How can we help? <RequiredMark/><textarea name="notes" required rows={4} maxLength={6000} placeholder="Describe your equipment, project or service requirements…"/></label></div>
  <p className="enquiry-send-help">Send your enquiry with the completed Word questionnaire, or download the file to send it yourself.</p>
  <label className="enquiry-honeypot" aria-hidden="true">Leave this field empty<input name="_website" tabIndex={-1} autoComplete="off"/></label>
  <div className="form-actions"><button className="button button-red" type="button" disabled={!sendAvailable||busy!==null} onClick={send}>Send enquiry <Send size={18}/></button><button type="button" className="button button-outline" disabled={busy!==null} onClick={download}>Download enquiry <Download size={18}/></button></div>
  {!sendAvailable&&<p className="form-help">Direct sending is currently unavailable. Download the Word questionnaire and email it to office@repnfzco.com.</p>}
  <div className="form-secondary-actions"><button className="form-copy" type="submit" disabled={busy!==null}>Open email app <Mail size={16}/></button><button type="button" className="form-copy" onClick={copy} disabled={busy!==null}>Copy text <Copy size={16}/></button></div>
  <div className="form-print-actions"><button ref={printButton} type="button" className="button button-outline" onClick={print} disabled={busy!==null}>Print questionnaire <Printer size={18}/></button><p>Print the completed Word layout or a blank questionnaire, including both numbered drawings.</p></div>
  <p className="form-notice">Downloads and print views are prepared in your browser. Direct submission sends your details to REPN-FZCO.</p><p className="form-status" role="status" aria-live="polite">{busy||status}</p>
  <p className="questionnaire-print-instruction">Use the Print questionnaire button on the contact page to print the completed Word layout with your latest entries.</p>
 </form>;
}
