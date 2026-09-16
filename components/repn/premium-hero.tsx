"use client";
import { useEffect, useRef, useState, type ReactNode, type MutableRefObject } from "react";
import { AssetImage } from "./asset-image";
import type { EspPart } from "./esp-diagram";

export function ScrollFrame({children}:{children:ReactNode}){
 return <main id="main" className="scroll-home">{children}</main>;
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
  let cancelled=false,cleanup=()=>{};
  const report=(s:SceneStatus)=>{if(!cancelled){setStatus(s);callbacks.current.onStatus(s)}};
  async function init(){
   try{
    const [T,{OrbitControls},{RoomEnvironment},{createEspWorld,chapterAt,chapterStops}]=await Promise.all([import("three"),import("three/addons/controls/OrbitControls.js"),import("three/addons/environments/RoomEnvironment.js"),import("./esp-diagram")]);
    if(cancelled||!element)return;
    const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.65));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    const canvas=renderer.domElement;canvas.className="exp-webgl";canvas.setAttribute("aria-label","Conceptual 3D ESP installation. Use the chapter buttons for explanations; drag to rotate in inspection mode.");canvas.tabIndex=0;element.appendChild(canvas);
    const world=createEspWorld();
    const camera=new T.PerspectiveCamera(40,1,.05,250);
    const controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.09;controls.enableZoom=false;controls.enablePan=false;controls.enabled=false;controls.minPolarAngle=.2;controls.maxPolarAngle=Math.PI-.2;controls.rotateSpeed=.55;
    const environment=new RoomEnvironment();const generator=new T.PMREMGenerator(renderer);const envTarget=generator.fromScene(environment,.04);world.scene.environment=envTarget.texture;world.scene.environmentIntensity=.65;environment.dispose();generator.dispose();
    let width=1,height=1,frame=0,visible=true,lastTime=0,time=0,current=playback.current.progress,wasInspecting=false,lost=false;
    const resize=()=>{width=Math.max(1,element.clientWidth);height=Math.max(1,element.clientHeight);renderer.setSize(width,height,false);camera.aspect=width/height;camera.setViewOffset(width,height,-width*.19,0,width,height);camera.updateProjectionMatrix()};resize();
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
     const view=world.update(current,time);
     controls.enabled=state.inspect;
     if(!state.inspect){camera.position.copy(view.position);controls.target.copy(view.target);camera.lookAt(view.target)}
     else if(!wasInspecting){controls.target.copy(view.target)}
     wasInspecting=state.inspect;controls.update();camera.updateMatrixWorld();
     pins.forEach(pin=>{const id=pin.dataset.scenePin as EspPart;vector.copy(world.anchors[id]).project(camera);const x=(vector.x*.5+.5)*width,y=(-vector.y*.5+.5)*height;const show=current>.53&&vector.z<1&&x>width*.38&&x<width-120&&y>85&&y<height-110;pin.style.visibility=show?"visible":"hidden";pin.style.transform=`translate(${x}px,${y}px)`;});
     renderer.render(world.scene,camera);
     frame=requestAnimationFrame(render);
    }
    const start=()=>{lastTime=0;if(!frame&&!cancelled&&!lost&&visible&&!document.hidden)frame=requestAnimationFrame(render)};
    const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);if(visible)start();else{cancelAnimationFrame(frame);frame=0}}, {threshold:0});observer.observe(element);
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0}else start()};document.addEventListener("visibilitychange",visibility);
    const contextLost=(e:Event)=>{e.preventDefault();lost=true;cancelAnimationFrame(frame);frame=0;report("unavailable")};canvas.addEventListener("webglcontextlost",contextLost);
    const keyboard=(e:KeyboardEvent)=>{if(!playback.current.inspect)return;if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();controls.rotateLeft(e.key==="ArrowLeft"?.16:-.16)}else if(e.key==="ArrowUp"||e.key==="ArrowDown"){e.preventDefault();controls.rotateUp(e.key==="ArrowUp"?.12:-.12)}};canvas.addEventListener("keydown",keyboard);
    cleanup=()=>{cancelAnimationFrame(frame);ro.disconnect();observer.disconnect();document.removeEventListener("visibilitychange",visibility);canvas.removeEventListener("webglcontextlost",contextLost);canvas.removeEventListener("keydown",keyboard);controls.dispose();world.dispose();envTarget.dispose();renderer.dispose();canvas.remove()};
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
