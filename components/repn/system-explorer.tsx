"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { equipment } from "@/lib/repn-data";
import { EspDiagram, type EspPart } from "./esp-diagram";

const parts: {id:EspPart;label:string;title:string;description:string;location:string}[] = [
 {id:"controls",label:"Surface control",title:"It starts at the surface.",description:"Control and monitoring equipment connects operating requirements with the downhole system. Explore the surface equipment available for geothermal applications.",location:"At the surface"},
 {id:"cables",label:"Power cable",title:"Power, all the way down.",description:"The cable connects the surface supply to the submersible motor. Construction, temperature rating and electrical properties are selected for the application.",location:"Surface to downhole"},
 {id:"pumps",label:"ESP pump",title:"Built to move your fluid.",description:"Multistage centrifugal pumps lift fluid through the production tubing. The operating point and well conditions define the pump selection.",location:"Downhole / fluid production"},
 {id:"protectors",label:"Protector",title:"A vital connection.",description:"Between the pump and motor, the protector limits formation-fluid ingress, accommodates motor-oil volume changes and transfers torque.",location:"Downhole / between pump and motor"},
 {id:"motors",label:"Motor",title:"The drive behind the flow.",description:"The submersible motor drives the pump. Power, voltage and thermal requirements are matched to the selected equipment and operating conditions.",location:"Downhole / drive assembly"},
];

export function SystemExplorer() {
 const [active,setActive]=useState<EspPart>("controls");
 const section=useRef<HTMLElement>(null);
 const [paused,setPaused]=useState(false);
 const [inView,setInView]=useState(false);
 useEffect(()=>{
  let frame=0;
  const root=section.current;
  if(!root)return;
  function update(){
   frame=0;if(!root)return;
   const bounds=root.getBoundingClientRect();
   const visible=bounds.bottom>0&&bounds.top<window.innerHeight;
   setInView(visible);if(!visible)return;
   const focus=window.innerWidth<=760?window.innerHeight*.68:window.innerHeight*.5;
   let nearest:EspPart="controls",distance=Infinity;
   root.querySelectorAll<HTMLElement>("[data-system-step]").forEach(el=>{
    const rect=el.getBoundingClientRect();
    const next=Math.abs(rect.top+rect.height*.5-focus);
    if(next<distance){distance=next;nearest=el.dataset.systemStep as EspPart;}
   });
   setActive(nearest);
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule);update();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule)};
 },[]);
 const index=parts.findIndex(part=>part.id===active);
 function jump(id:EspPart){
  setActive(id);
  const target=document.getElementById(`system-${id}`);
  target?.scrollIntoView({behavior:"auto",block:"center"});
  target?.focus({preventScroll:true});
 }
 return <section ref={section} className="scroll-system system-explorer" id="esp-system" aria-labelledby="esp-system-title" data-motion={paused?"paused":"playing"} data-in-view={inView}>
  <div className="container">
   <div className="scroll-section-meta"><span>02 / THE ESP SYSTEM</span><span>SURFACE TO DEPTH</span></div>
   <div className="scroll-system-heading"><h2 id="esp-system-title">Follow the system.<br/><span>Understand the connection.</span></h2><p>Scroll through the assembly.<br/>Or choose a component to jump straight in.</p></div>
   <div className="scroll-system-workspace">
    <div className="scroll-system-visual">
     <div className="scroll-system-readout"><span><i/>SYSTEM OVERVIEW</span><span>0{index+1} / 05</span></div>
     <figure className="system-figure">
      <div className="system-stage">
       <EspDiagram active={active}/>
       <span className="system-surface-label">SURFACE</span><span className="system-depth-label">DOWNHOLE</span>
       <nav className="system-hotspots" aria-label="Explore ESP components">
        {parts.map((part,i)=><button key={part.id} type="button" aria-current={active===part.id?"step":undefined} aria-controls={`system-${part.id}`} className="system-hotspot" data-part={part.id} onClick={()=>jump(part.id)}><span aria-hidden="true">0{i+1}</span><span>{part.label}</span><i aria-hidden="true"/></button>)}
       </nav>
      </div>
      <figcaption><div className="system-flow-key"><span><i className="flow-key-fluid"/>Fluid flow</span><span><i className="flow-key-power"/>Electrical supply</span></div><button type="button" className="system-motion-control" onClick={()=>setPaused(!paused)} aria-label={paused?"Resume system animation":"Pause system animation"}>{paused?<Play size={13}/>:<Pause size={13}/>}<span>{paused?"Resume":"Pause"}</span></button></figcaption>
      <p className="system-illustration-note">Conceptual cutaway · not to scale</p>
     </figure>
    </div>
    <div className="scroll-system-story">
     {parts.map((part,i)=>{const product=equipment.find(item=>item.slug===part.id)!;return <article className="scroll-system-step" key={part.id} id={`system-${part.id}`} data-system-step={part.id} data-active={active===part.id} tabIndex={-1} aria-labelledby={`system-title-${part.id}`}>
      <div className="scroll-step-inner"><div className="scroll-step-meta"><span>0{i+1} / {part.label.toUpperCase()}</span><span className="scroll-step-line"/></div><h3 id={`system-title-${part.id}`}>{part.title}</h3><p>{part.description}</p><span className="scroll-step-location">{part.location}</span><Link href={`/equipment/${part.id}/${part.id==="controls"?"?application=geothermal":""}`} className="scroll-inline-link">Explore {product.name.toLowerCase()} <ArrowUpRight size={18}/></Link></div>
     </article>})}
    </div>
   </div>
   <div className="scroll-system-bottom"><span>Every selection starts with your operating conditions.</span><Link href="/contact/" className="scroll-inline-link">Tell us about your well <ArrowUpRight size={18}/></Link></div>
  </div>
 </section>;
}
