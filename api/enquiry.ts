import type { IncomingMessage, ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildQuestionnaire, validateEnquiry, completedFilename } from "../lib/questionnaire.ts";

type Request=IncomingMessage&{body?:unknown};
const recipient="office@repnfzco.com";
const attempts=new Map<string,{count:number;expires:number}>();
const reply=(res:ServerResponse,status:number,value:unknown)=>{res.statusCode=status;res.setHeader("Content-Type","application/json; charset=utf-8");res.setHeader("Cache-Control","no-store");res.end(JSON.stringify(value));};
const configured=()=>Boolean(process.env.RESEND_API_KEY&&process.env.REPN_ENQUIRY_FROM&&!/[\r\n]/.test(process.env.REPN_ENQUIRY_FROM));

export default async function handler(req:Request,res:ServerResponse){
 if(req.method==="GET")return reply(res,200,{available:configured()});
 if(req.method!=="POST"){res.setHeader("Allow","GET, POST");return reply(res,405,{error:"Method not allowed."});}
 if(!configured())return reply(res,503,{error:"Direct sending is currently unavailable. Download the Word questionnaire and email it to office@repnfzco.com."});
 const origin=String(req.headers.origin??""),host=String(req.headers.host??"");
 try{if(!origin||new URL(origin).host!==host)return reply(res,403,{error:"Please send the enquiry from the REPN-FZCO website."});}catch{return reply(res,403,{error:"Please send the enquiry from the REPN-FZCO website."});}
 if(!String(req.headers["content-type"]??"").startsWith("application/json"))return reply(res,415,{error:"Please submit the website form."});
 let body:Record<string,unknown>;
 try{const source=typeof req.body==="string"?req.body:JSON.stringify(req.body);if(!source||Buffer.byteLength(source)>64000)return reply(res,413,{error:"The enquiry is too large."});body=JSON.parse(source);if(!body||Array.isArray(body))throw new Error();}catch{return reply(res,400,{error:"Please check the enquiry fields."});}
 if(body.website)return reply(res,400,{error:"The enquiry could not be accepted."});
 if(typeof body.requestId!=="string"||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.requestId))return reply(res,400,{error:"Please reload the page and try again."});
 const checked=validateEnquiry(body.fields);if(checked.error)return reply(res,400,{error:checked.error});
 // Fixed recipient, same-origin checks, input limits and a small per-instance throttle.
 const ip=String(req.headers["x-forwarded-for"]??req.socket?.remoteAddress??"unknown").split(",")[0].trim(),now=Date.now();
 for(const [key,value]of attempts)if(value.expires<now)attempts.delete(key);
 const count=attempts.get(ip)??{count:0,expires:now+15*60*1000};
 if(count.count>=5){res.setHeader("Retry-After",String(Math.ceil((count.expires-now)/1000)));return reply(res,429,{error:"Please wait before sending another enquiry. You can download the Word file in the meantime."});}
 count.count++;attempts.set(ip,count);
 try{
  const template=await readFile(join(process.cwd(),"public/downloads/REPN-Equipment-Selection-Questionnaire.docx"));
  const attachment=await buildQuestionnaire(new Uint8Array(template),checked.values);
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json","Idempotency-Key":`repn-enquiry/${body.requestId}`},body:JSON.stringify({from:process.env.REPN_ENQUIRY_FROM,to:[recipient],reply_to:checked.values.email,subject:`Website enquiry — ${checked.values.project.replace(/[\r\n]/g," ")}`,text:`A website enquiry has been submitted.\n\nCompany: ${checked.values.company}\nContact: ${checked.values.name}\nEmail: ${checked.values.email}\nProject / well: ${checked.values.project}\n\nThe completed equipment selection questionnaire is attached as a Word document.`,attachments:[{filename:completedFilename,content:Buffer.from(attachment).toString("base64")}] }),signal:AbortSignal.timeout(10000)});
  if(!response.ok)return reply(res,502,{error:"The email service could not accept the enquiry. Download the Word file and email it to office@repnfzco.com, or try again later."});
  const result=await response.json() as {id?:string};if(!result.id)throw new Error("No submission receipt");
  return reply(res,200,{ok:true});
 }catch{return reply(res,502,{error:"Sending could not be confirmed. Retry with the same entries or download the Word file and email it to office@repnfzco.com."});}
}
