"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AssetImage } from "./asset-image";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, Pause, Play } from "lucide-react";

export function ScrollFrame({children}:{children:ReactNode}) {
 const ref=useRef<HTMLElement>(null);
 useEffect(()=>{
  const root=ref.current;if(!root)return;
  let frame=0;
  const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)");
  function draw(){
   frame=0;if(!root)return;
   const rect=root.getBoundingClientRect();
   const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-window.innerHeight)));
   root.style.setProperty("--page-progress",String(progress));
   root.style.setProperty("--hero-shift",reduced?.matches?"0px":`${Math.min(65,Math.max(0,-rect.top)*.12)}px`);
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw)};
  window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);reduced?.addEventListener("change",schedule);draw();
  const observer="IntersectionObserver" in window?new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){(e.target as HTMLElement).dataset.revealed="true";observer?.unobserve(e.target)}})},{threshold:.12}):null;
  root.querySelectorAll("[data-reveal]").forEach(el=>observer?.observe(el));
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);reduced?.removeEventListener("change",schedule);observer?.disconnect()};
 },[]);
 return <main ref={ref} id="main" className="scroll-home"><div className="scroll-progress" aria-hidden="true"/>{children}</main>;
}

export function PremiumHero() {
 const [paused,setPaused]=useState(false);
 return <section className="scroll-hero" aria-labelledby="hero-title" data-motion={paused?"paused":"playing"}>
  <div className="scroll-hero-photo"><AssetImage src="/assets/manufacturing-hero.webp" alt="Illustrative geothermal field with wellheads and production pipelines" width={1672} height={941} fetchPriority="high"/></div>
  <div className="container scroll-hero-content">
   <div className="scroll-hero-top"><span className="scroll-kicker"><i/>REPN-FZCO</span><span>GEOTHERMAL / OIL &amp; GAS</span></div>
   <div className="scroll-hero-copy"><p className="scroll-label">ELECTRIC SUBMERSIBLE PUMPING SYSTEMS</p><h1 id="hero-title">Built around<br/><span>your well.</span></h1><p className="scroll-hero-intro">From surface control to the downhole assembly.<br/>Equipment and support for your application.</p><div className="scroll-actions"><Link href="/equipment/" className="scroll-button">Explore equipment <ArrowUpRight size={18}/></Link><Link href="/contact/" className="scroll-text-link">Discuss your project <ArrowUpRight size={17}/></Link></div></div>
   <div className="scroll-hero-bottom"><a href="#applications" className="scroll-cue"><span><ArrowDown size={18}/></span>Scroll to explore</a><span className="scroll-hero-coordinate">THE FIELD / THE SYSTEM / YOUR PROJECT</span><button className="scroll-motion" type="button" onClick={()=>setPaused(!paused)} aria-label={paused?"Resume background motion":"Pause background motion"}>{paused?<Play size={14}/>:<Pause size={14}/>}<span>{paused?"Resume motion":"Pause motion"}</span></button></div>
  </div>
 </section>;
}
