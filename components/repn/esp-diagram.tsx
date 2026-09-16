import * as T from "three";

export type EspPart = "motors" | "protectors" | "pumps" | "cables" | "controls";
export const sequence = [
 {at:0,tag:"THE FIELD",title:"A system.\nBelow the surface.",copy:"Explore the connection between your field, your well and the equipment that brings fluid to the surface.",part:null},
 {at:.13,tag:"THE WELLHEAD",title:"Every well is\na starting point.",copy:"From the surface installation, follow the production tubing and electrical supply into the well.",part:null},
 {at:.27,tag:"THE WELL",title:"Go deeper.\nSee the connection.",copy:"A conceptual section reveals the ESP assembly inside the casing. Equipment selection starts with your operating conditions.",part:null},
 {at:.43,tag:"THE ASSEMBLY",title:"One system.\nEvery component.",copy:"The assembly opens into an exploded view. Discover the role of each component, from the motor to surface control.",part:null},
 {at:.60,tag:"01 / SUBMERSIBLE MOTOR",title:"The drive\nbehind the flow.",copy:"The submersible motor drives the pump. Power, voltage and thermal requirements are matched to the equipment and operating conditions.",part:"motors"},
 {at:.70,tag:"02 / PROTECTOR",title:"A vital\nconnection.",copy:"The protector transfers torque, accommodates motor-oil volume changes and limits formation-fluid ingress into the motor.",part:"protectors"},
 {at:.80,tag:"03 / ESP PUMP",title:"Stage by stage.\nFluid moves up.",copy:"The multistage centrifugal pump lifts fluid through the production tubing. Flow, head and well conditions define the selection.",part:"pumps"},
 {at:.89,tag:"04 / POWER CABLE",title:"Power,\nall the way down.",copy:"The cable connects the surface supply to the motor. Geothermal and Oil & Gas use separate specifications and construction options.",part:"cables"},
 {at:.97,tag:"05 / SURFACE CONTROL",title:"Back at\nthe surface.",copy:"Control and monitoring connect the downhole system with operating requirements. Explore the surface equipment offered for geothermal applications.",part:"controls"},
] as const;
export const chapterStops=[0,.185,.355,.565,.655,.755,.85,.935,1];
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const ease=(v:number)=>{const x=clamp(v);return x*x*(3-2*x)};
const between=(p:number,a:number,b:number)=>ease((p-a)/(b-a));
export function chapterAt(p:number){let n=0;sequence.forEach((s,i)=>{if(p>=s.at)n=i});return n;}
const keys:{at:number;camera:[number,number,number];target:[number,number,number]}[]=[
 {at:0,camera:[35,23,42],target:[0,0,-3]},
 {at:.13,camera:[12,8,17],target:[0,1,0]},
 {at:.23,camera:[8,3,13],target:[0,.2,0]},
 {at:.34,camera:[12,-5,28],target:[0,-8.2,0]},
 {at:.43,camera:[10,-7,29],target:[0,-8.8,0]},
 {at:.58,camera:[12,-7,34],target:[.6,-9.5,0]},
 {at:.655,camera:[5,-14,13],target:[0,-16.4,0]},
 {at:.755,camera:[5,-9,11],target:[0,-11,0]},
 {at:.85,camera:[5,-4,13],target:[0,-6,0]},
 {at:.935,camera:[11,-7,23],target:[2,-8,0]},
 {at:1,camera:[11,-1,13],target:[6.1,-3,0]},
];
export function cameraState(p:number){
 let i=0;while(i<keys.length-2&&p>keys[i+1].at)i++;
 const a=keys[i],b=keys[i+1],t=between(p,a.at,b.at);
 return{position:new T.Vector3(...a.camera).lerp(new T.Vector3(...b.camera),t),target:new T.Vector3(...a.target).lerp(new T.Vector3(...b.target),t)};
}

/** Procedural, illustrative ESP scene. Geometry is not manufacturer CAD or a dimensioned design. */
export function createEspWorld(){
 const scene=new T.Scene();scene.background=new T.Color("#b5c6bd");scene.fog=new T.FogExp2("#b5c6bd",.006);
 const surface=new T.Group(),formation=new T.Group(),assembly=new T.Group();scene.add(surface,formation,assembly);
 const materials:T.Material[]=[];const material=(color:string,metalness=0,roughness=.65)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m};
 const steel=material("#a4b0b4",.88,.3),dark=material("#334c55",.77,.36),chrome=material("#d1dddd",.96,.19),copper=material("#bf804f",.82,.32),green=material("#227665",.65,.32),concrete=material("#8c9791",.02,.91),black=material("#14272d",.12,.8),brass=material("#b99a5e",.82,.32);
 const ground=material("#536f55",0,.96),gravel=material("#7d897b",0,.97),building=material("#cad0c3",.15,.68),roof=material("#4e6261",.55,.48);
 const textures:T.Texture[]=[];
 function noiseTexture(size:number,repeat:number){
  const bytes=new Uint8Array(size*size*4);let seed=41721;
  for(let i=0;i<size*size;i++){seed=(seed*1664525+1013904223)>>>0;const n=125+(seed>>>24)*.47;bytes[i*4]=n;bytes[i*4+1]=n;bytes[i*4+2]=n;bytes[i*4+3]=255}
  const t=new T.DataTexture(bytes,size,size,T.RGBAFormat);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(repeat,repeat);t.magFilter=T.LinearFilter;t.minFilter=T.LinearMipmapLinearFilter;t.generateMipmaps=true;t.needsUpdate=true;textures.push(t);return t;
 }
 ground.map=noiseTexture(256,24);ground.bumpMap=ground.map;ground.bumpScale=.1;
 gravel.map=noiseTexture(128,9);gravel.bumpMap=gravel.map;gravel.bumpScale=.075;
 concrete.map=noiseTexture(128,3);concrete.bumpMap=concrete.map;concrete.bumpScale=.025;
 const glow=new T.MeshBasicMaterial({color:"#91efc7",transparent:true,opacity:.9});materials.push(glow);
 function mesh(g:T.BufferGeometry,m:T.Material,parent:T.Object3D,x=0,y=0,z=0){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 function box(w:number,h:number,d:number,m:T.Material,parent:T.Object3D,x=0,y=0,z=0){return mesh(new T.BoxGeometry(w,h,d),m,parent,x,y,z)}
 function cyl(r:number,h:number,m:T.Material,parent:T.Object3D,x=0,y=0,z=0,r2=r,n=32){return mesh(new T.CylinderGeometry(r,r2,h,n),m,parent,x,y,z)}
 function pipe(points:number[][],r:number,m:T.Material,parent:T.Object3D){return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)),false,"centripetal"),Math.max(12,points.length*6),r,12,false),m,parent)}
 function ring(r:number,tube:number,m:T.Material,parent:T.Object3D,y:number){const o=mesh(new T.TorusGeometry(r,tube,8,36),m,parent,0,y);o.rotation.x=Math.PI/2;return o}
 function bolts(parent:T.Object3D,r:number,y:number,count=8){const geometry=new T.CylinderGeometry(.045,.045,.11,6);const inst=new T.InstancedMesh(geometry,brass,count);const dummy=new T.Object3D();for(let i=0;i<count;i++){const a=i/count*Math.PI*2;dummy.position.set(Math.sin(a)*r,y,Math.cos(a)*r);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix)}inst.castShadow=true;parent.add(inst)}
 function flange(parent:T.Object3D,r:number,y:number){cyl(r,.13,steel,parent,0,y);ring(r*.93,.035,chrome,parent,y+.07);bolts(parent,r*.76,y+.1)}
 // Broad, gently undulating terrain, flat close to the well pads.
 const terrain=new T.PlaneGeometry(150,120,65,55);terrain.rotateX(-Math.PI/2);
 const pos=terrain.attributes.position;
 for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),distance=Math.sqrt(x*x+z*z);const hills=(Math.sin(x*.11+z*.065)*2+Math.cos(z*.105-x*.048)*2.2+.9*Math.sin(x*.27)*Math.cos(z*.15));pos.setY(i,-.28+Math.max(0,Math.min(1,(distance-20)/25))*Math.max(-.25,hills))}
 terrain.computeVertexNormals();mesh(terrain,ground,surface,0,0,-8);
 // Access roads and well pads.
 box(9,.1,11,gravel,surface,0,-.12,0);box(5,.11,58,gravel,surface,-8,-.1,-22);box(37,.1,4.3,gravel,surface,9,-.08,-12);
 box(5,.25,5,concrete,surface,0,.02,0);
 const wellhead=new T.Group();surface.add(wellhead);
 cyl(.67,.23,dark,wellhead,0,.2);cyl(.38,1.35,steel,wellhead,0,.9);flange(wellhead,.55,.38);flange(wellhead,.5,1.25);cyl(.27,.48,green,wellhead,0,1.55);cyl(.1,.4,chrome,wellhead,0,1.95);ring(.46,.045,brass,wellhead,2.13);
 const wheel=mesh(new T.TorusGeometry(.4,.035,8,32),green,wellhead,0,1.16,.65);wheel.rotation.y=.1;
 pipe([[0,1.1,0],[0,1.1,.65],[0,1.1,.9]],.11,dark,wellhead);
 pipe([[.2,.8,0],[1.1,.8,0],[1.65,.8,-.5],[1.8,.8,-2],[1.8,1.2,-3],[5,1.2,-3],[12,1.2,-3],[15,1.2,-6],[15,1.2,-15],[15,1.2,-25]],.24,steel,surface);
 pipe([[-.2,.55,0],[-1,.55,0],[-1.7,.55,-.5],[-1.8,.65,-4],[-1.8,.65,-15],[0,.65,-18],[10,.65,-18],[14,.65,-20],[14,.65,-25]],.17,dark,surface);
 for(let i=0;i<8;i++){box(.2,1.1,1.1,concrete,surface,15,.48,-5-i*2.7);box(1,.65,.18,concrete,surface,-1.8,.28,-3-i*1.65)}
 // Secondary well stations and collection lines.
 for(const [x,z]of [[-17,-18],[22,-18],[-24,12],[25,8]]){box(5,.2,5,concrete,surface,x,0,z);const station=wellhead.clone();station.scale.setScalar(.85);station.position.set(x,0,z);surface.add(station);pipe([[x,.75,z],[x+1,.75,z],[x+2,.75,z-2],[x+2,.75,-29],[14,.75,-29]],.14,steel,surface)}
 // Industrial surface equipment, kept generic rather than attributed to a real installation.
 box(18,4.1,9,building,surface,13,2,-32);box(18.5,.35,9.5,roof,surface,13,4.25,-32);
 for(let i=0;i<6;i++){box(1.55,1.3,.05,black,surface,6+i*2.65,2.6,-27.46);box(.06,1.3,.08,chrome,surface,6+i*2.65,2.6,-27.4)}
 for(let i=0;i<3;i++){cyl(1.5,5.2,steel,surface,27+i*4,2.6,-33);ring(1.5,.05,chrome,surface,0).position.set(27+i*4,4.7,-33)}
 for(let i=0;i<2;i++){const c=cyl(1.05,5,steel,surface,4+i*4,2.5,-40);c.rotation.z=Math.PI/2;box(1.5,1,1.3,concrete,surface,4+i*4,1,-40)}
 // Cable tray from the well to a surface cabinet.
 pipe([[.7,.4,0],[2,.15,0],[4,.15,-1],[4,.6,-1]],.055,black,surface);
 const parts={}as Record<EspPart,T.Group>;
 for(const id of ["motors","protectors","pumps","cables","controls"]as EspPart[]){parts[id]=new T.Group();parts[id].name=id;assembly.add(parts[id])}
 const control=parts.controls;box(1.4,2.35,.62,steel,control,0,1.17);box(1.12,1.93,.07,green,control,0,1.18,.36);box(.67,.4,.05,black,control,-.1,1.7,.41);box(.55,.025,.025,glow,control,-.1,1.7,.448);box(.08,.35,.08,chrome,control,.43,1.03,.43);
 for(let i=0;i<5;i++)box(.63,.025,.04,dark,control,-.1,.55+i*.085,.415);
 for(const x of [-.47,.47])box(.12,.25,.4,dark,control,x,-.1);mesh(new T.SphereGeometry(.055,12,8),glow,control,.4,1.75,.44);
 // Back wall of the schematic geological section, with discrete strata.
 const strata=["#3d5548","#766d53","#555e52","#8c7d5e","#445751","#6f6853","#394e49"];
 for(let i=0;i<7;i++){const m=material(strata[i],0,.98);const g=new T.BoxGeometry(29,2.75,8,24,1,1);const a=g.attributes.position;for(let j=0;j<a.count;j++){const x=a.getX(j);a.setY(j,a.getY(j)+Math.sin(x*.25+i*.8)*.25+Math.sin(x*.57)*.1)}g.computeVertexNormals();mesh(g,m,formation,0,-1.4-i*2.72,-5.7)}
 // Casing and cement are open toward the viewer; the front sector is intentionally removed.
 const casing=new T.Group();formation.add(casing);
 mesh(new T.CylinderGeometry(1.0,1.0,18.9,48,1,true,Math.PI/3,Math.PI*4/3),material("#78867c",0,.9),casing,0,-9.4,0);
 mesh(new T.CylinderGeometry(.87,.87,18.9,48,1,true,Math.PI/3,Math.PI*4/3),dark,casing,0,-9.4,0);
 for(let y=-1.5;y>-19;y-=3.4){const arc=mesh(new T.TorusGeometry(.91,.065,8,40,Math.PI*4/3),steel,casing,0,y);arc.rotation.x=Math.PI/2;arc.rotation.z=-Math.PI/6;}
 const tubing=new T.Group();assembly.add(tubing);cyl(.19,4.9,steel,tubing,0,-2.25);for(const y of [-1,-3.6])cyl(.235,.13,dark,tubing,0,y);
 const covers:{mesh:T.Mesh;amount:number}[]=[];
 function body(parent:T.Group,r:number,h:number){
  const shell=mesh(new T.CylinderGeometry(r,r,h,48,1,true,Math.PI/3,Math.PI*4/3),steel,parent);shell.material=new T.MeshStandardMaterial({color:"#9cabaf",metalness:.9,roughness:.29,side:T.DoubleSide});
  const cover=mesh(new T.CylinderGeometry(r,r,h,32,1,true,-Math.PI/3,Math.PI*2/3),steel,parent);cover.material=new T.MeshStandardMaterial({color:"#93a3a7",metalness:.9,roughness:.28,side:T.DoubleSide});materials.push(shell.material,cover.material);covers.push({mesh:cover,amount:r*2.8});
  flange(parent,r*1.14,h/2);flange(parent,r*1.14,-h/2);cyl(.085,h+.55,chrome,parent);
 }
 const motor=parts.motors;body(motor,.46,4.8);
 const rotor=new T.Group();motor.add(rotor);
 cyl(.19,4.5,dark,rotor);for(let i=0;i<11;i++){const y=-2+i*.4;ring(.27,.085,copper,motor,y);cyl(.205,.25,chrome,rotor,0,y);for(const x of [-.28,.28])box(.075,.23,.13,copper,motor,x,y,.12)}
 cyl(.35,.24,green,motor,0,-2.63);cyl(.27,.18,dark,motor,0,2.6);
 const protector=parts.protectors;body(protector,.47,1.55);for(const y of [-.5,0,.5]){cyl(.3,.12,dark,protector,0,y);ring(.29,.04,brass,protector,y+.08)}
 const intake=cyl(.37,.48,dark,protector,0,1.08);for(let i=0;i<8;i++){const a=i*Math.PI/4;box(.04,.28,.11,black,protector,Math.sin(a)*.37,1.08,Math.cos(a)*.37)}
 const pump=parts.pumps;body(pump,.46,4.4);
 const impellers=new T.Group();pump.add(impellers);
 for(let i=0;i<13;i++){const y=-1.97+i*.325;cyl(.33,.065,chrome,impellers,0,y,0,.26);ring(.295,.032,brass,impellers,y+.08);for(let j=0;j<4;j++){const blade=box(.035,.1,.235,steel,impellers,0,y+.05,.13);blade.rotation.y=j*Math.PI/2+.42;blade.position.x=Math.sin(j*Math.PI/2)*.13;blade.position.z=Math.cos(j*Math.PI/2)*.13}}
 // Three insulated cores in a flat ESP cable. Length and layer sizes are illustrative only.
 const cable=parts.cables;const coreM=material("#292f30",.1,.8);
 for(let i=0;i<3;i++){cyl(.055,12.8,coreM,cable,(i-1)*.13,0);cyl(.037,.6,copper,cable,(i-1)*.13,6.65);cyl(.066,.16,steel,cable,(i-1)*.13,6.33)}
 const armor=box(.46,10.5,.19,steel,cable,0,-1,.015);for(let i=0;i<46;i++){const band=box(.475,.021,.205,dark,cable,0,-6.08+i*.224,.015);band.rotation.z=.17}
 // Assembly-axis guide becomes visible only in the exploded view.
 const guideGeo=new T.BufferGeometry().setFromPoints([new T.Vector3(0,-20,0),new T.Vector3(0,-3,0)]);const guide=new T.Line(guideGeo,new T.LineDashedMaterial({color:"#76c4ab",dashSize:.14,gapSize:.18,transparent:true,opacity:.35}));guide.computeLineDistances();assembly.add(guide);
 // Subtle particles communicate upward fluid movement without implying measured rates.
 const particles=new T.Group();assembly.add(particles);const flowDots:T.Mesh[]=[];
 for(let i=0;i<25;i++){const dot=mesh(new T.SphereGeometry(.028,6,4),glow,particles);flowDots.push(dot)}
 // Broad key, sky fill and restrained rim lighting.
 scene.add(new T.HemisphereLight("#e9f7ef","#46584f",2.6));
 const sun=new T.DirectionalLight("#fff2d7",3.1);sun.position.set(-16,28,19);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-35;sun.shadow.camera.right=35;sun.shadow.camera.top=35;sun.shadow.camera.bottom=-35;sun.shadow.camera.far=100;sun.shadow.normalBias=.04;scene.add(sun);
 const rim=new T.DirectionalLight("#a5e2de",3.0);rim.position.set(10,-3,-9);scene.add(rim);
 const fill=new T.DirectionalLight("#e9f5ff",1.8);fill.position.set(-8,-10,16);scene.add(fill);
 const formationMaterials:T.Material[]=[];
 formation.traverse(o=>{if(o instanceof T.Mesh){const clone=(m:T.Material)=>{const c=m.clone();c.transparent=true;formationMaterials.push(c);return c};o.material=Array.isArray(o.material)?o.material.map(clone):clone(o.material)}});
 // Per-part materials allow emphasis without changing shared surface materials.
 const partMaterials={}as Record<EspPart,T.MeshStandardMaterial[]>;
 for(const id of Object.keys(parts)as EspPart[]){const clones=new Map<T.Material,T.Material>();const list:T.MeshStandardMaterial[]=[];parts[id].traverse(o=>{if(!(o instanceof T.Mesh))return;const replace=(m:T.Material)=>{if(!clones.has(m)){const c=m.clone();clones.set(m,c);if(c instanceof T.MeshStandardMaterial)list.push(c)}return clones.get(m)!};o.material=Array.isArray(o.material)?o.material.map(replace):replace(o.material)});partMaterials[id]=list}
 const anchors:Record<EspPart,T.Vector3>={motors:new T.Vector3(),protectors:new T.Vector3(),pumps:new T.Vector3(),cables:new T.Vector3(),controls:new T.Vector3()};
 let lastChapter=-1;
 const surfaceColor=new T.Color("#b5c6bd"),depthColor=new T.Color("#071c26"),backgroundColor=new T.Color();
 function update(p:number,time:number){
  const underground=between(p,.20,.34),explode=between(p,.43,.58);
  const bg=backgroundColor.copy(surfaceColor).lerp(depthColor,underground);scene.background=bg;(scene.fog as T.FogExp2).color.copy(bg);(scene.fog as T.FogExp2).density=.006+underground*.009;
  surface.visible=p<.40;surface.position.y=0;
  formation.visible=p>.18&&p<.55;formation.position.z=-between(p,.43,.55)*8;formationMaterials.forEach(m=>{m.opacity=1-between(p,.43,.55)});
  casing.visible=p<.52;
  parts.motors.position.set(0,-14-explode*2.4,0);
  parts.protectors.position.set(0,-10.5-explode*.5,0);
  parts.pumps.position.set(0,-7+explode,0);
  parts.cables.position.set(.72+explode*2.0,-7.25,0);
  parts.controls.position.set(4+explode*2.1, .15-explode*4.7,-1+explode);
  assembly.visible=true;
  tubing.visible=p<.56;tubing.scale.y=1-between(p,.43,.56)*.99;
  guide.visible=explode>.05;
  covers.forEach(({mesh,amount})=>{mesh.position.x=explode*amount;mesh.position.z=explode*.75;mesh.rotation.y=explode*.24});
  rotor.rotation.y=time*.6;impellers.rotation.y=time*.28;
  particles.visible=p>.28&&p<.89;
  flowDots.forEach((dot,i)=>{const a=i*.9;dot.position.set(Math.sin(a)*.32,-8.8+((time*.65+i*.34)%5.7),.36+Math.cos(a)*.1)});
  const chapter=chapterAt(p);if(chapter!==lastChapter){lastChapter=chapter;const active=sequence[chapter].part;for(const id of Object.keys(parts)as EspPart[]){for(const m of partMaterials[id]){m.emissive.set(active===id?"#144a3b":"#000000");m.emissiveIntensity=active===id?.24:0}}}
  scene.updateMatrixWorld(true);for(const id of Object.keys(parts)as EspPart[])parts[id].getWorldPosition(anchors[id]);anchors.controls.y+=1.3;
  return cameraState(p);
 }
 function dispose(){const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>();scene.traverse(o=>{if(o instanceof T.Mesh||o instanceof T.Line){gs.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>ms.add(m))}});materials.forEach(m=>ms.add(m));gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());sun.shadow.dispose();textures.forEach(t=>t.dispose())}
 update(0,0);
 return{scene,parts,anchors,update,dispose,rotor,impellers,armor,intake};
}
