export type EspPart = "controls" | "cables" | "pumps" | "protectors" | "motors";

/** Conceptual cutaway: relative component order and flow direction, not installation dimensions. */
export function EspDiagram({active}:{active:EspPart}) {
 const edge=(part:EspPart)=>active===part?"#9eedc3":"#93a6ae";
 const bolts=(y:number)=>[355,365,392,402].map(x=><g key={x}><rect x={x-2} y={y} width="4" height="9" rx="1" fill="#253b47"/><path d={`M${x-1} ${y+1}v7`} stroke="#d8e0dc" strokeWidth="1"/></g>);
 const power="M490 130H460Q425 130 425 160V526H400";
 return <svg id="esp-system-drawing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 620" aria-hidden="true" focusable="false">
  <defs>
   <linearGradient id="esp-metal"><stop stopColor="#263e49"/><stop offset=".16" stopColor="#748b94"/><stop offset=".32" stopColor="#e1e9e8"/><stop offset=".43" stopColor="#a2b3b9"/><stop offset=".7" stopColor="#5c747f"/><stop offset=".88" stopColor="#364f5a"/><stop offset="1" stopColor="#192f3b"/></linearGradient>
   <linearGradient id="esp-flange" x2="0" y2="1"><stop stopColor="#d1dcd9"/><stop offset=".38" stopColor="#84989f"/><stop offset=".65" stopColor="#324b56"/><stop offset="1" stopColor="#152c39"/></linearGradient>
   <linearGradient id="esp-rock" x2="0" y2="1"><stop stopColor="#3c4c49"/><stop offset=".4" stopColor="#223e43"/><stop offset="1" stopColor="#122c3b"/></linearGradient>
   <linearGradient id="esp-copper"><stop stopColor="#765140"/><stop offset=".4" stopColor="#e9b987"/><stop offset=".6" stopColor="#bc8152"/><stop offset="1" stopColor="#50352b"/></linearGradient>
   <linearGradient id="esp-ground-fade"><stop stopColor="#19313e" stopOpacity="0"/><stop offset=".28" stopColor="#476154" stopOpacity=".55"/><stop offset="1" stopColor="#355747" stopOpacity=".3"/></linearGradient>
   <radialGradient id="esp-halo"><stop stopColor="#75dda7" stopOpacity=".2"/><stop offset="1" stopColor="#75dda7" stopOpacity="0"/></radialGradient>
   <pattern id="esp-rock-grain" width="37" height="29" patternUnits="userSpaceOnUse"><path d="M2 9l8 -2m12 14l10 -3M17 4l4 1M4 25l3 -1" stroke="#91a28d" strokeWidth=".7" opacity=".15"/><circle cx="25" cy="8" r=".8" fill="#c1ba91" opacity=".16"/></pattern>
   <pattern id="esp-cement" width="7" height="9" patternUnits="userSpaceOnUse"><path d="M0 9L7 0" stroke="#74908d" strokeWidth="1" opacity=".4"/></pattern>
  </defs>
  {/* Surface terrain and sectioned formation. */}
  <path d="M259 147l38 -24 27 7 44 -29 43 15 24 -8 40 20 31 -10 76 34v20H259Z" fill="url(#esp-ground-fade)"/>
  <path d="M282 175H590V597H282Z" fill="url(#esp-rock)"/>
  <path d="M282 215Q379 196 476 218T590 224V282Q493 299 417 277T282 288Z" fill="#665e49" opacity=".25"/>
  <path d="M282 325Q385 295 490 326T590 325V376Q490 391 412 369T282 386Z" fill="#6e7861" opacity=".17"/>
  <path d="M282 454Q392 432 481 454T590 462V548Q472 517 401 547T282 545Z" fill="#7e7752" opacity=".2"/>
  <path d="M282 175H590V597H282Z" fill="url(#esp-rock-grain)"/>
  {[216,284,331,378,458,540].map((y,i)=><path key={y} d={`M282 ${y}Q386 ${y-22} 474 ${y+3}T590 ${y+8}`} fill="none" stroke={i%2?"#9a9972":"#86958a"} strokeOpacity=".16"/ >)}
  {/* Cement sheath, steel casing and fluid-filled annulus. */}
  <path d="M302 178H451V597H302Z" fill="#52615c"/>
  <path d="M302 178H451V597H302Z" fill="url(#esp-cement)"/>
  <rect x="311" y="178" width="132" height="419" fill="#0b2434"/>
  <path d="M315 178V597M439 178V597" stroke="#bed0ca" strokeWidth="3"/>
  <path d="M320 180V596M434 180V596" stroke="#425e68" strokeWidth="2"/>
  {[250,420,574].map(y=><path key={y} d={`M307 ${y}h11m117 0h12`} stroke="#a8b7b2" strokeWidth="6"/>)}
  <path d="M280 170H592" stroke="#96a598" strokeWidth="3"/>
  <rect x="328" y="165" width="99" height="12" rx="2" fill="#5b6c6c"/><path d="M328 165h99" stroke="#c1c8bb"/>
  {/* Production tubing, wellhead, side outlet and valves. */}
  <rect x="369" y="158" width="21" height="120" fill="url(#esp-metal)" stroke="#8da6af"/>
  {[209,254].map(y=><rect key={y} x="366" y={y} width="27" height="7" rx="1" fill="url(#esp-flange)"/>)}
  <rect x="354" y="133" width="48" height="32" rx="4" fill="url(#esp-metal)" stroke="#91a4a7"/>
  <path d="M357 142H334Q324 142 324 150V157H284" fill="none" stroke="#203d4b" strokeWidth="16"/>
  <path d="M357 139H334Q322 139 322 150V154H284" fill="none" stroke="#94a6a7" strokeWidth="9"/>
  <rect x="346" y="133" width="8" height="19" rx="1" fill="url(#esp-flange)"/>
  <rect x="350" y="156" width="56" height="10" rx="2" fill="url(#esp-flange)"/>{bolts(157)}
  <rect x="367" y="119" width="24" height="15" fill="url(#esp-metal)"/><path d="M379 121V107" stroke="#899da5" strokeWidth="4"/>
  <ellipse cx="379" cy="106" rx="18" ry="5" fill="none" stroke="#b47b4d" strokeWidth="3"/><path d="M361 106h36" stroke="#b47b4d" strokeWidth="2"/>
  <path d="M399 147h10v-21" stroke="#8c9da1" strokeWidth="3" fill="none"/><circle cx="409" cy="122" r="9" fill="#d7dfd8" stroke="#71818a" strokeWidth="3"/><path d="M409 122l4 -4" stroke="#1e3b47" strokeWidth="1.5"/>
  <g data-part="controls" data-active={active==="controls"}>
   {active==="controls"&&<ellipse cx="533" cy="102" rx="90" ry="70" fill="url(#esp-halo)"/>}
   <path d="M487 52l15 -10h80l-14 10Z" fill="#8da0a6"/><path d="M568 52l14 -10v92l-14 10Z" fill="#324c59" stroke="#778e96"/>
   <rect x="487" y="52" width="81" height="92" rx="2" fill="url(#esp-metal)" stroke={edge("controls")} strokeWidth="1.5"/>
   <rect x="497" y="64" width="45" height="27" rx="2" fill="#081d2b" stroke="#647e85"/>
   <path className="esp-screen-signal" d="M502 82h8l4 -10 5 7 4 -3 4 6h10" fill="none" stroke="#8ee9b8" strokeWidth="1.4"/>
   <circle className="esp-status-led" cx="551" cy="70" r="2.4" fill="#9fe4b1"/><rect x="550" y="94" width="4" height="15" rx="1" fill="#142f3c"/>
   {[102,107,112,117,122].map(y=><path key={y} d={`M500 ${y}h35`} stroke="#324c59" strokeWidth="2"/>)}
   <path d="M495 145v19m64 -19v19" stroke="#71858c" strokeWidth="5"/>
   <path d="M484 165h87" stroke="#465e66" strokeWidth="5"/>
  </g>
  <g data-part="cables" data-active={active==="cables"}>
   <path d={power} fill="none" stroke="#061a24" strokeWidth="10"/><path d={power} fill="none" stroke={active==="cables"?"#d5ad71":"#8b7959"} strokeWidth="5"/><path d={power} fill="none" stroke="#edd0a0" strokeWidth="1" opacity=".4"/>
   <path className="esp-power-flow" d={power} fill="none" stroke="#ffda91" strokeWidth="2" strokeDasharray="3 23"/>
   {[245,315,367,413,487].map(y=><path key={y} d={`M399 ${y}h28`} stroke="#899999" strokeWidth="3"/>)}
  </g>
  <g data-part="pumps" data-active={active==="pumps"}>
   {active==="pumps"&&<ellipse cx="378" cy="324" rx="86" ry="103" fill="url(#esp-halo)"/>}
   <rect x="353" y="277" width="50" height="98" rx="5" fill="url(#esp-metal)" stroke={edge("pumps")} strokeWidth="1.5"/>
   <rect x="369" y="290" width="24" height="70" rx="2" fill="#0c2b38" stroke="#536e75"/>
   <path d="M380 288v73" stroke="#c4d4d4" strokeWidth="3"/>
   {[296,308,320,332,344].map((y,i)=><g key={y}><path d={`M371 ${y}q9 8 20 0v5q-10 8 -20 0Z`} fill="url(#esp-flange)"/><path className="esp-impeller-shimmer" style={{animationDelay:`${i*-.25}s`}} d={`M373 ${y+2}q7 4 15 0`} fill="none" stroke="#bbefd9" strokeWidth="1.2"/></g>)}
   {[275,366].map(y=><g key={y}><rect x="348" y={y} width="60" height="9" rx="2" fill="url(#esp-flange)" stroke={edge("pumps")}/>{bolts(y)}</g>)}
   <rect x="357" y="376" width="42" height="21" rx="3" fill="url(#esp-metal)" stroke="#9cacae"/>
   {[362,369,376,383,390].map(x=><path key={x} d={`M${x} 381v11`} stroke="#102c3a" strokeWidth="3"/>)}
  </g>
  <g data-part="protectors" data-active={active==="protectors"}>
   {active==="protectors"&&<ellipse cx="378" cy="425" rx="76" ry="62" fill="url(#esp-halo)"/>}
   <rect x="353" y="399" width="50" height="53" rx="4" fill="url(#esp-metal)" stroke={edge("protectors")} strokeWidth="1.5"/>
   <rect x="372" y="410" width="17" height="30" rx="2" fill="#16363f" stroke="#5e7881"/>
   {[415,422,429,436].map(y=><path key={y} d={`M374 ${y}h13`} stroke="#a8b9b6" strokeWidth="2"/>)}
   <path d="M381 408v35" stroke="#d1dcd5" strokeWidth="2"/>
   {[400,444].map(y=><g key={y}><rect x="349" y={y} width="58" height="7" rx="2" fill="url(#esp-flange)"/>{bolts(y)}</g>)}
  </g>
  <rect x="363" y="453" width="31" height="12" fill="url(#esp-metal)" stroke="#7e99a3"/>
  <g data-part="motors" data-active={active==="motors"}>
   {active==="motors"&&<ellipse cx="378" cy="518" rx="86" ry="94" fill="url(#esp-halo)"/>}
   <rect x="353" y="465" width="50" height="109" rx="9" fill="url(#esp-metal)" stroke={edge("motors")} strokeWidth="1.5"/>
   <rect x="369" y="482" width="24" height="72" rx="3" fill="#102c37" stroke="#7f949c"/>
   {[484,490,496,502,508,514,520,526,532,538,544,550].map(y=><g key={y}><rect x="371" y={y} width="7" height="3" rx=".6" fill="url(#esp-copper)"/><rect x="384" y={y} width="7" height="3" rx=".6" fill="url(#esp-copper)"/></g>)}
   <rect x="379" y="481" width="4" height="75" fill="url(#esp-metal)"/><path className="esp-shaft-shimmer" d="M380 484v69" stroke="#e5f1e8" strokeWidth="1"/>
   <rect x="349" y="466" width="58" height="9" rx="2" fill="url(#esp-flange)" stroke={edge("motors")}/>{bolts(466)}
   <rect x="397" y="518" width="10" height="19" rx="2" fill="#4b635b" stroke="#b2c6b4"/>
   <ellipse cx="378" cy="569" rx="19" ry="3" fill="#263f4a"/>
  </g>
  {/* Fluid travels up the annulus past the motor, into the intake, then up the production tubing. */}
  <g fill="none" stroke="#77d5b5" strokeWidth="2" strokeLinecap="round">
   <path className="esp-fluid-flow" d="M335 589V399Q335 385 356 385" strokeDasharray="5 19"/>
   <path className="esp-fluid-flow" d="M415 589V400Q415 386 400 386" strokeDasharray="5 19"/>
   <path className="esp-fluid-flow esp-fluid-riser" d="M381 363V168Q381 145 357 145H333Q329 145 329 157H285" strokeDasharray="5 19"/>
  </g>
  <g fill="#86dab9" opacity=".7"><path d="M332 469l3 -6 3 6m74 0l3 -6 3 6M378 230l3 -6 3 6"/></g>
  <g fill="none" strokeWidth="1" strokeDasharray="2 5" opacity=".7">
   <path d="M206 78H477" stroke={edge("controls")}/><path d="M206 202H268L290 215H420" stroke={edge("cables")}/><path d="M206 313H344" stroke={edge("pumps")}/><path d="M206 418H344" stroke={edge("protectors")}/><path d="M206 524H344" stroke={edge("motors")}/>
  </g>
 </svg>;
}
