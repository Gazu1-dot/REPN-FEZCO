"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type MutableRefObject } from "react";
import { AssetImage } from "./asset-image";
import type { EspPart } from "./esp-diagram";

const MotionContext=createContext({paused:false,toggle:()=>{}});
export const usePageMotion=()=>useContext(MotionContext);
export function ScrollFrame({children}:{children:ReactNode}){
 const root=useRef<HTMLElement>(null);const[paused,setPaused]=useState(false);
 useEffect(()=>{
  const main=root.current;if(!main)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const layers=Array.from(main.querySelectorAll<HTMLElement>('[data-parallax]'));
  const reveals=Array.from(main.querySelectorAll<HTMLElement>('[data-reveal]'));
  const cards=Array.from(main.querySelectorAll<HTMLElement>('[data-tilt]'));
  let frame=0;const active=new Set<HTMLElement>();const values=new Map<HTMLElement,number>();
  const disabled=()=>paused||media.matches;
  const tick=()=>{frame=0;let unsettled=false;const h=innerHeight;
   main.style.setProperty('--page-progress',String(Math.max(0,Math.min(1,scrollY/Math.max(1,document.documentElement.scrollHeight-h)))));
   for(const node of active){const region=node.closest<HTMLElement>('[data-parallax-region]')||node.parentElement!;const rect=region.getBoundingClientRect();const range=Number(node.dataset.parallax)||40;const target=disabled()?0:Math.max(-1,Math.min(1,(h*.5-rect.top-rect.height*.5)/(h*.5+rect.height*.5)))*range;const old=values.get(node)||0;const value=disabled()?0:old+(target-old)*.14;values.set(node,value);node.style.setProperty('--parallax-y',`${value.toFixed(2)}px`);if(Math.abs(target-value)>.08)unsettled=true}
   if(unsettled)frame=requestAnimationFrame(tick);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(tick)};
  const observer=new IntersectionObserver(entries=>{for(const e of entries){const n=e.target as HTMLElement;if(e.isIntersecting){active.add(n);schedule()}else active.delete(n)}},{rootMargin:'180px'});layers.forEach(n=>observer.observe(n));
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){(e.target as HTMLElement).dataset.revealed='true';revealObserver.unobserve(e.target)}}),{threshold:.12});reveals.forEach(n=>revealObserver.observe(n));
  const pointer=(e:PointerEvent)=>{const card=(e.target as HTMLElement).closest<HTMLElement>('[data-tilt]');if(!card||disabled())return;const r=card.getBoundingClientRect();card.style.setProperty('--tilt-x',`${((e.clientY-r.top)/r.height-.5)*-2.4}deg`);card.style.setProperty('--tilt-y',`${((e.clientX-r.left)/r.width-.5)*2.4}deg`)};
  const reset=(e:PointerEvent)=>{const card=(e.target as HTMLElement).closest<HTMLElement>('[data-tilt]');if(card&&!card.contains(e.relatedTarget as Node|null)){card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')}};
  if(disabled())cards.forEach(n=>{n.style.setProperty('--tilt-x','0deg');n.style.setProperty('--tilt-y','0deg')});
  const change=()=>{main.dataset.motion=disabled()?'off':'on';schedule()};change();
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);media.addEventListener('change',change);main.addEventListener('pointermove',pointer);main.addEventListener('pointerout',reset);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();revealObserver.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);media.removeEventListener('change',change);main.removeEventListener('pointermove',pointer);main.removeEventListener('pointerout',reset)};
 },[paused]);
 return <MotionContext.Provider value={{paused,toggle:()=>setPaused(v=>!v)}}><main id="main" ref={root} className="scroll-home"><div className="page-reading-progress" aria-hidden="true"/>{children}<button className="page-motion" type="button" aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?'▶ Resume motion':'Ⅱ Pause motion'}</button></main></MotionContext.Provider>;
}
export type ScenePlayback={progress:number;paused:boolean;inspect:boolean;reduced:boolean};
export type SceneStatus="loading"|"ready"|"unavailable";
export function EspCanvas({playback,onStatus,onSelect}:{playback:MutableRefObject<ScenePlayback>;onStatus:(status:SceneStatus)=>void;onSelect:(part:EspPart)=>void}){
 const host=useRef<HTMLDivElement>(null);
 const [status,setStatus]=useState<SceneStatus>("loading");
 const callbacks=useRef({onStatus,onSelect});
 useEffect(()=>{callbacks.current={onStatus,onSelect}},[onStatus,onSelect]);
 useEffect(()=>{
  const element=host.current;if(!element)return;
  let cancelled=false;const resources:(()=>void)[]=[];const cleanup=()=>{resources.splice(0).reverse().forEach(dispose=>dispose())};
  const report=(s:SceneStatus)=>{if(!cancelled){setStatus(s);callbacks.current.onStatus(s)}};
  async function init(){
   try{
    const [T,{OrbitControls},{RoomEnvironment},{createEspWorld,chapterAt,chapterStops}]=await Promise.all([import("three"),import("three/addons/controls/OrbitControls.js"),import("three/addons/environments/RoomEnvironment.js"),import("./esp-diagram")]);
    if(cancelled||!element)return;
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:"high-performance"});resources.push(()=>{renderer.dispose();renderer.domElement.remove()});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.65));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    const canvas=renderer.domElement;canvas.className="exp-webgl";canvas.setAttribute("aria-label","Conceptual 3D ESP installation. Use the chapter buttons for explanations; drag to rotate in inspection mode.");canvas.tabIndex=0;element.appendChild(canvas);
    const world=createEspWorld();resources.push(()=>world.dispose());
    const camera=new T.PerspectiveCamera(40,1,.05,250);
    const controls=new OrbitControls(camera,canvas);resources.push(()=>controls.dispose());controls.enableDamping=true;controls.dampingFactor=.09;controls.enableZoom=false;controls.enablePan=false;controls.enabled=false;controls.minPolarAngle=.2;controls.maxPolarAngle=Math.PI-.2;controls.rotateSpeed=.55;
    const environment=new RoomEnvironment();const generator=new T.PMREMGenerator(renderer);const envTarget=generator.fromScene(environment,.04);resources.push(()=>envTarget.dispose());world.scene.environment=envTarget.texture;world.scene.environmentIntensity=.65;environment.dispose();generator.dispose();
    let pointerX=0,pointerY=0,driftX=0,driftY=0;
    const pointer=(e:PointerEvent)=>{const r=element.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5};const leave=()=>{pointerX=0;pointerY=0};element.addEventListener("pointermove",pointer);element.addEventListener("pointerleave",leave);
    let needsRender=true,lastRendered=-1;
    let width=1,height=1,frame=0,visible=true,lastTime=0,time=0,current=playback.current.progress,wasInspecting=false,lost=false;
    const resize=()=>{needsRender=true;width=Math.max(1,element.clientWidth);height=Math.max(1,element.clientHeight);renderer.setSize(width,height,false);camera.aspect=width/height;camera.setViewOffset(width,height,-width*.19,0,width,height);camera.updateProjectionMatrix()};resize();
    const ro=new ResizeObserver(resize);ro.observe(element);
    const vector=new T.Vector3();
    const pins=Array.from(element.querySelectorAll<HTMLElement>("[data-scene-pin]"));
    function render(now:number){
     frame=0;if(cancelled||lost||!visible||document.hidden)return;
     const dt=Math.min(.05,(now-(lastTime||now))/1000);lastTime=now;
     const state=playback.current;
     current=state.reduced?chapterStops[chapterAt(state.progress)]:current+(state.progress-current)*(1-Math.exp(-dt*11));
     if(!state.reduced&&Math.abs(current-state.progress)<.00005)current=state.progress;
     if(!state.paused&&!state.reduced)time+=dt;
     if((state.paused||state.reduced)&&!state.inspect&&!wasInspecting&&!needsRender&&Math.abs(current-lastRendered)<.00001&&Math.abs(driftX)+Math.abs(driftY)<.001){frame=requestAnimationFrame(render);return}
     const view=world.update(current,time);
     controls.enabled=state.inspect;
     if(!state.inspect){const allow=!state.paused&&!state.reduced;driftX+=((allow?pointerX:0)-driftX)*Math.min(1,dt*4);driftY+=((allow?pointerY:0)-driftY)*Math.min(1,dt*4);camera.position.copy(view.position);camera.position.x+=driftX*.55;camera.position.y-=driftY*.3;controls.target.copy(view.target);camera.lookAt(view.target)}
     else if(!wasInspecting){controls.target.copy(view.target)}
     wasInspecting=state.inspect;controls.update();camera.updateMatrixWorld();
     pins.forEach(pin=>{const id=pin.dataset.scenePin as EspPart;vector.copy(world.anchors[id]).project(camera);const x=(vector.x*.5+.5)*width,y=(-vector.y*.5+.5)*height;const show=current>.53&&vector.z<1&&x>width*.38&&x<width-120&&y>85&&y<height-110;pin.style.visibility=show?"visible":"hidden";pin.style.transform=`translate(${x}px,${y}px)`;});
     renderer.render(world.scene,camera);needsRender=false;lastRendered=current;
     frame=requestAnimationFrame(render);
    }
    const start=()=>{lastTime=0;if(!frame&&!cancelled&&!lost&&visible&&!document.hidden)frame=requestAnimationFrame(render)};
    const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);if(visible)start();else{cancelAnimationFrame(frame);frame=0}}, {threshold:0});observer.observe(element);
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else start()};document.addEventListener("visibilitychange",visibility);
    const contextLost=(e:Event)=>{e.preventDefault();lost=true;cancelAnimationFrame(frame);frame=0;report("unavailable")};canvas.addEventListener("webglcontextlost",contextLost);
    const keyboard=(e:KeyboardEvent)=>{if(!playback.current.inspect)return;if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();controls.rotateLeft(e.key==="ArrowLeft"?.16:-.16)}else if(e.key==="ArrowUp"||e.key==="ArrowDown"){e.preventDefault();controls.rotateUp(e.key==="ArrowUp"?.12:-.12)}};canvas.addEventListener("keydown",keyboard);
    resources.push(()=>{element.removeEventListener("pointermove",pointer);element.removeEventListener("pointerleave",leave);cancelAnimationFrame(frame);ro.disconnect();observer.disconnect();document.removeEventListener("visibilitychange",visibility);canvas.removeEventListener("webglcontextlost",contextLost);canvas.removeEventListener("keydown",keyboard);});
    if(cancelled){cleanup();return}start();report("ready");
   }catch(error){cleanup();if(!cancelled){console.warn("3D experience unavailable",error);report("unavailable")}}
  }
  init();return()=>{cancelled=true;cleanup()};
 },[playback]);
 return <div ref={host} className="exp-scene" data-status={status}>
  <div className="exp-poster"><AssetImage src="/assets/manufacturing-hero.webp" alt="Illustrative geothermal field" fetchPriority="high"/></div>
  {([['motors','01','Motor'],['protectors','02','Protector'],['pumps','03','ESP pump'],['cables','04','Cable'],['controls','05','Control']]as const).map(([id,n,label])=><button key={id} type="button" data-scene-pin={id} className="exp-pin" onClick={()=>callbacks.current.onSelect(id)} aria-label={`Explore ${label}`}><span>{n}</span><b>{label}</b></button>)}
 </div>;
}
