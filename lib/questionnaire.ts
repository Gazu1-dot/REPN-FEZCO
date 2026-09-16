import JSZip from "jszip";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import wellParameters from "./well-parameters.json" with { type: "json" };
import { optionalEnquiryFields, chemistryFields, contactEnquiryFields } from "./enquiry-helpers.ts";

export const questionnairePath="/downloads/REPN-Equipment-Selection-Questionnaire.docx";
export const completedFilename="REPN-Completed-Enquiry.docx";
export const docxMime="application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export type EnquiryValues=Record<string,string>;
const W="http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const labels:Record<string,string>=Object.fromEntries([...wellParameters,...optionalEnquiryFields,...chemistryFields,...contactEnquiryFields,{name:"notes",label:"Project notes"},{name:"inhibitor",label:"Injected inhibitor composition"},{name:"borehole_unit",label:"Borehole diameter unit"}].map(f=>[f.name,f.label]));
const limits:Record<string,number>={project:150,company:150,equipment:150,location:150,name:100,email:254,notes:6000,inhibitor:2000,power:250};
const required=[...wellParameters.map(f=>f.name),...contactEnquiryFields.map(f=>f.name),"notes"];

export function validateEnquiry(input:unknown):{values:EnquiryValues;error?:string} {
 if(!input||typeof input!=="object"||Array.isArray(input))return {values:{},error:"Please check the enquiry fields."};
 const source=input as Record<string,unknown>,values:EnquiryValues={};
 for(const name of Object.keys(labels)){
  const v=source[name];if(v!==undefined&&typeof v!=="string")return {values,error:"Please check the enquiry fields."};
  const text=String(v??"").trim();if(text.length>(limits[name]??100))return {values,error:`Please shorten ${labels[name]}.`};
  if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text))return {values,error:"Please remove unsupported control characters."};
  values[name]=text;
 }
 for(const name of required)if(!values[name])return {values,error:`Please complete ${labels[name]}.`};
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))return {values,error:"Please enter a valid email address."};
 if(!["Geothermal","Oil & Gas"].includes(values.application))return {values,error:"Please select an application."};
 if(!["mm","inch"].includes(values.borehole_unit))return {values,error:"Please select the borehole diameter unit."};
 const numeric=[...wellParameters.map(f=>f.name),...optionalEnquiryFields.filter(f=>f.type==="number").map(f=>f.name),...chemistryFields.map(f=>f.name)];
 for(const name of numeric){if(!values[name])continue;const n=Number(values[name]);if(!Number.isFinite(n)||(!["temperature","wellhead_pressure","ph"].includes(name)&&n<0)||(name==="gas"&&n>100))return {values,error:`Please check ${labels[name]}.`};}
 return {values};
}

function wrappedLines(value:string):string[]{
 const out:string[]=[];
 for(const line of value.replace(/\r\n?/g,"\n").split("\n")){
  let chars=Array.from(line);
  if(!chars.length){out.push("");continue;}
  while(chars.length>70){let at=chars.slice(0,70).lastIndexOf(" ")+1;if(at<35)at=70;out.push(chars.slice(0,at).join(""));chars=chars.slice(at);}
  out.push(chars.join(""));
 }
 return out;
}

/** Fill the actual downloadable Word template; pictures and style parts are retained. */
export async function buildQuestionnaire(template:Uint8Array,values:EnquiryValues):Promise<Uint8Array>{
 const zip=await JSZip.loadAsync(template);
 const part=zip.file("word/document.xml");if(!part)throw new Error("The questionnaire template is incomplete.");
 const xml=new DOMParser().parseFromString(await part.async("string"),"application/xml");
 const continuation:{label:string;lines:string[]}[]=[];
 const textRun=(text:string)=>{
  const run=xml.createElementNS(W,"w:r");
  text.replace(/\r\n?/g,"\n").split("\n").forEach((line,i)=>{if(i)run.appendChild(xml.createElementNS(W,"w:br"));const t=xml.createElementNS(W,"w:t");t.setAttribute("xml:space","preserve");t.appendChild(xml.createTextNode(line));run.appendChild(t);});return run;
 };
 for(const control of Array.from(xml.getElementsByTagName("w:sdt"))){
  const tag=control.getElementsByTagName("w:tag")[0]?.getAttribute("w:val")??"";
  if(!tag.startsWith("repn:"))continue;
  const key=tag.slice(5),raw=values[key]?.trim();if(!raw)continue;
  const content=control.getElementsByTagName("w:sdtContent")[0];if(!content)continue;
  const max=["notes","inhibitor"].includes(key)?350:(["project","company","location","name","email","equipment","power"].includes(key)?85:40);
  let text=raw;
  if(raw.length>max||raw.split(/\r?\n/).length>5){continuation.push({label:labels[key]??key,lines:wrappedLines(raw)});text="See continued details.";}
  while(content.firstChild)content.removeChild(content.firstChild);
  content.appendChild(textRun(text));
 }
 const body=xml.getElementsByTagName("w:body")[0];const section=Array.from(body.childNodes).find(n=>n.nodeName==="w:sectPr")??null;
 const add=(node:ReturnType<typeof xml.createElementNS>)=>body.insertBefore(node,section);
 for(const entry of continuation){
  for(let offset=0;offset<entry.lines.length;offset+=30){
   const page=xml.createElementNS(W,"w:p"),run=xml.createElementNS(W,"w:r"),br=xml.createElementNS(W,"w:br");br.setAttribute("w:type","page");run.appendChild(br);page.appendChild(run);add(page);
   const title=xml.createElementNS(W,"w:p"),pr=xml.createElementNS(W,"w:pPr"),style=xml.createElementNS(W,"w:pStyle");style.setAttribute("w:val","Title");pr.appendChild(style);title.appendChild(pr);title.appendChild(textRun("Enquiry details continued"));add(title);
   const label=xml.createElementNS(W,"w:p");label.appendChild(textRun(entry.label));add(label);
   const p=xml.createElementNS(W,"w:p"),pPr=xml.createElementNS(W,"w:pPr"),spacing=xml.createElementNS(W,"w:spacing");spacing.setAttribute("w:line","252");spacing.setAttribute("w:lineRule","auto");pPr.appendChild(spacing);p.appendChild(pPr);p.appendChild(textRun(entry.lines.slice(offset,offset+30).join("\n")));add(p);
  }
 }
 zip.file("word/document.xml",new XMLSerializer().serializeToString(xml),{date:new Date("2000-01-01T00:00:00Z")});
 // Stable archive timestamps keep an unchanged retry's attachment byte-identical.
 zip.forEach((_path,part)=>{part.date=new Date("2000-01-01T00:00:00Z");});
 return zip.generateAsync({type:"uint8array",compression:"DEFLATE"});
}

let templatePromise:Promise<Uint8Array>|undefined;
export function loadQuestionnaireTemplate(){
 if(!templatePromise){
  const assets=(window as Window&{REPN_ASSETS?:Record<string,string>}).REPN_ASSETS;
  templatePromise=fetch(assets?.[questionnairePath]??questionnairePath).then(async response=>{if(!response.ok)throw new Error("The questionnaire template could not be loaded. Please try again.");return new Uint8Array(await response.arrayBuffer());}).catch(error=>{templatePromise=undefined;throw error;});
 }
 return templatePromise;
}
export function saveQuestionnaire(bytes:Uint8Array){
 const url=URL.createObjectURL(new Blob([bytes.slice().buffer as ArrayBuffer],{type:docxMime}));
 const link=document.createElement("a");link.href=url;link.download=completedFilename;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
export async function printQuestionnaire(bytes:Uint8Array){
 const frame=document.createElement("iframe");frame.title="Questionnaire print view";frame.className="questionnaire-print-frame";frame.style.cssText="position:fixed;left:-10000px;top:0;width:1123px;height:794px;border:0;";
 document.body.appendChild(frame);
 try{
  const target=frame.contentDocument!,view=frame.contentWindow!;target.title="REPN-FZCO equipment selection questionnaire";
  const {renderAsync}=await import("docx-preview");
  await renderAsync(bytes.slice().buffer,target.body,target.head,{className:"repn-document",inWrapper:false,ignoreWidth:false,ignoreHeight:false,breakPages:true,ignoreLastRenderedPageBreak:true,useBase64URL:true,renderAltChunks:false});
  const style=target.createElement("style");style.textContent="@page{size:A4 landscape;margin:0}html,body{margin:0;padding:0;background:#fff}section.repn-document{margin:0!important;box-shadow:none!important;break-after:page;print-color-adjust:exact;-webkit-print-color-adjust:exact}section.repn-document:last-of-type{break-after:auto}table{table-layout:fixed}td{overflow-wrap:anywhere}img{max-width:100%}";target.head.appendChild(style);
  await Promise.all(Array.from(target.images).map(img=>img.complete?Promise.resolve():new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=()=>reject(new Error("A questionnaire drawing could not be loaded."));})));
  if(target.fonts)await target.fonts.ready;
  view.addEventListener("afterprint",()=>frame.remove(),{once:true});
  view.focus();view.print();
  // A later print removes any abandoned frames; do not interrupt an open dialog.
  for(const old of Array.from(document.querySelectorAll("iframe.questionnaire-print-frame")))if(old!==frame)old.remove();
 }catch(error){frame.remove();throw error;}
}
