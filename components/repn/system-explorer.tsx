"use client";
import {useCallback,useEffect,useRef,useState}from"react";
import Link from"next/link";
import {ArrowDown,ArrowUpRight,Pause,Play,Rotate3D,Mouse,ArrowLeft,ArrowRight}from"lucide-react";
import{EspCanvas,usePageMotion,type ScenePlayback,type SceneStatus}from"./premium-hero";
import{chapterAt,chapterStops,sequence,type EspPart}from"./esp-diagram";
const stops=chapterStops;
const nav=[{name:"The field",index:0},{name:"The well",index:1},{name:"Below ground",index:2},{name:"Exploded view",index:3}];
export function SystemExplorer(){
 const section=useRef<HTMLElement>(null),pin=useRef<HTMLDivElement>(null);
 const playback=useRef<ScenePlayback>({progress:0,paused:false,inspect:false,reduced:false});
 const{paused,toggle}=usePageMotion();
 const[chapter,setChapter]=useState(0),[inspect,setInspect]=useState(false),[reduced,setReduced]=useState(false),[status,setStatus]=useState<SceneStatus>("loading");
 useEffect(()=>{playback.current.paused=paused;playback.current.inspect=inspect;playback.current.reduced=reduced},[paused,inspect,reduced]);
 useEffect(()=>{
  const root=section.current,stage=pin.current;if(!root||!stage)return;
  let frame=0;
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  const preference=()=>setReduced(media.matches);preference();media.addEventListener("change",preference);
  const update=()=>{frame=0;const top=parseFloat(getComputedStyle(stage).top)||88;const rect=root.getBoundingClientRect();const p=Math.max(0,Math.min(1,(top-rect.top)/Math.max(1,root.offsetHeight-stage.offsetHeight)));const previous=playback.current.progress;playback.current.progress=p;stage.style.setProperty("--experience-progress",String(p));setChapter(chapterAt(p));if(Math.abs(previous-p)>.002)setInspect(false)};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);update();
  return()=>{cancelAnimationFrame(frame);media.removeEventListener("change",preference);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule)};
 },[]);
 const jump=useCallback((index:number)=>{const root=section.current,stage=pin.current;if(!root||!stage)return;setInspect(false);const offset=parseFloat(getComputedStyle(stage).top)||88;const top=window.scrollY+root.getBoundingClientRect().top-offset;window.scrollTo({top:top+stops[index]*(root.offsetHeight-stage.offsetHeight),behavior:"instant"});playback.current.progress=stops[index];setChapter(index)},[]);
 const select=useCallback((part:EspPart)=>{const index=sequence.findIndex(s=>s.part===part);if(index>=0)jump(index)},[jump]);
 const onStatus=useCallback((s:SceneStatus)=>setStatus(s),[]);
 const step=sequence[chapter];const activeNav=Math.min(chapter,3);
 return <section ref={section} className="exp-scroll" id="experience" aria-label="Explore the ESP system in 3D">
  <div className="exp-stage" ref={pin} data-chapter={chapter} data-inspect={inspect} data-status={status}>
   <EspCanvas playback={playback} onStatus={onStatus} onSelect={select}/>
   <div className="exp-shade"/>
   <div className="exp-topline"><span className="exp-badge"><i/>REPN / IMMERSIVE SYSTEM VIEW</span><a href="#applications">Skip to equipment <ArrowUpRight size={13}/></a></div>
   <h1 className="sr-only">REPN-FZCO — ESP systems, from field to components</h1>
   <div className="exp-copy" key={chapter}>
    <p className="exp-eyebrow"><span>{String(chapter+1).padStart(2,'0')}</span>{step.tag}</p>
    {chapter===0?<h2>A system.<br/><em>Below the surface.</em></h2>:<h2>{step.title.split('\n')[0]}<br/><em>{step.title.split('\n')[1]}</em></h2>}
    <p className="exp-description">{step.copy}</p>
    <div className="exp-copy-actions">{step.part?<Link className="exp-action" href={`/equipment/${step.part}/${step.part==='controls'?'?application=geothermal':''}`}>Product specifications <ArrowUpRight size={18}/></Link>:<button className="exp-action" type="button" onClick={()=>jump(chapter+1)}> {chapter===0?'Start the descent':chapter===3?'Explore the components':'Continue the journey'} <ArrowDown size={17}/></button>}<Link className="exp-secondary" href="/contact/">Discuss your well <ArrowUpRight size={14}/></Link></div>
    {chapter>=4&&<div className="exp-component-switcher" aria-label="Component selection">{sequence.slice(4).map((s,i)=><button key={s.part} type="button" onClick={()=>jump(i+4)} aria-pressed={chapter===i+4}><span>0{i+1}</span>{s.part==='motors'?'Motor':s.part==='protectors'?'Protector':s.part==='pumps'?'Pump':s.part==='cables'?'Cable':'Control'}</button>)}</div>}
   </div>
   <div className="exp-view-tools"><button type="button" onClick={()=>setInspect(v=>!v)} disabled={status!=="ready"} aria-pressed={inspect}><Rotate3D size={15}/>{inspect?'Return to scroll':'Inspect in 3D'}</button>{!reduced&&<button type="button" onClick={toggle} aria-pressed={paused} aria-label={paused?'Resume ambient animation':'Pause ambient animation'}>{paused?<Play size={14}/>:<Pause size={14}/>}</button>}</div>
   {inspect&&<div className="exp-inspect-hint"><Mouse size={13}/> Drag to rotate · Focus the scene and use arrow keys</div>}
   {status!=="ready"&&<p className="exp-load-status" role="status">{status==='loading'?'Preparing the 3D scene…':'3D is unavailable in this browser. The chapter descriptions and product links remain available.'}</p>}
   <div className="exp-side-index" aria-hidden="true"><span>{chapter<2?'SURFACE':chapter<4?'DOWNHOLE':'COMPONENT VIEW'}</span><i/><span>{String(chapter+1).padStart(2,'0')} / 09</span></div>
   <div className="exp-footer"><div className="exp-foot-top"><span className="exp-concept">Conceptual 3D illustration · not to scale</span><span className="exp-scroll-hint"><Mouse size={13}/>{reduced?'Use the chapter controls or scroll':'Scroll to explore'}</span><div className="exp-step-buttons"><button type="button" aria-label="Previous chapter" disabled={chapter===0} onClick={()=>jump(chapter-1)}><ArrowLeft size={15}/></button><button type="button" aria-label="Next chapter" disabled={chapter===8} onClick={()=>jump(chapter+1)}><ArrowRight size={15}/></button></div></div><div className="exp-track"><i/></div><nav className="exp-chapters" aria-label="3D journey chapters">{nav.map((item,i)=><button key={item.name} type="button" aria-current={activeNav===i?'step':undefined} onClick={()=>jump(item.index)}><span>0{i+1}</span>{item.name}<span className="exp-nav-dot"/></button>)}<a href="#applications"><span>05</span>Your application<ArrowUpRight size={13}/></a></nav></div>
  </div>
 </section>;
}
