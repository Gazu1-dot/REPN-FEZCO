import * as T from "three";
import {mergeGeometries} from "three/addons/utils/BufferGeometryUtils.js";

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
 {at:0,camera:[45,24,52],target:[10,0,-17]},
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
 const scene=new T.Scene();scene.background=new T.Color("#a4afb4");scene.fog=new T.FogExp2("#a4afb4",.006);
 const surface=new T.Group(),formation=new T.Group(),assembly=new T.Group();scene.add(surface,formation,assembly);
 const materials:T.Material[]=[];const material=(color:string,metalness=0,roughness=.65)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m};
 const steel=material("#a4b0b4",.88,.3),dark=material("#334c55",.77,.36),chrome=material("#d1dddd",.96,.19),copper=material("#bf804f",.82,.32),green=material("#227665",.65,.32),concrete=material("#8c9791",.02,.91),black=material("#14272d",.12,.8),brass=material("#b99a5e",.82,.32);
 const ground=material("#79766d",0,.98),gravel=material("#706c63",0,.98),building=material("#929b9b",.35,.72),roof=material("#424e53",.55,.62);
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
 // A graded industrial wellfield in eroded basalt terrain. All geometry is illustrative.
 let terrainSeed=91271;const random=()=>{terrainSeed=(terrainSeed*1664525+1013904223)>>>0;return terrainSeed/4294967296};
 function height(x:number,z:number){
  const outer=clamp(Math.max((Math.abs(x)-38)/25,(-z-48)/25,(z-22)/28));
  return -.32+outer*(2.6+Math.sin(x*.095+z*.08)*2.2+Math.cos(z*.11)*1.4+Math.sin(x*.39+z*.25)*.38)+Math.pow(clamp((-z-50)/48),1.3)*(14+Math.sin(x*.058)*5+Math.abs(Math.sin(x*.115))*6);
 }
 const terrain=new T.PlaneGeometry(230,190,115,95);terrain.rotateX(-Math.PI/2);terrain.translate(0,0,-24);
 const pos=terrain.attributes.position,colors=new Float32Array(pos.count*3),rockColor=new T.Color();
 for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),y=height(x,z);pos.setY(i,y);rockColor.setHSL(.095,.055,.22+random()*.1+Math.min(.08,y*.01));colors.set([rockColor.r,rockColor.g,rockColor.b],i*3)}
 terrain.setAttribute('color',new T.BufferAttribute(colors,3));terrain.computeVertexNormals();ground.vertexColors=true;ground.color.set('#d0c9bb');mesh(terrain,ground,surface);
 const rockGeo=new T.DodecahedronGeometry(1,0),rockM=material('#55544f',0,1),rocks=new T.InstancedMesh(rockGeo,rockM,360),dummy=new T.Object3D();
 for(let i=0;i<360;i++){let x=(random()-.5)*145;const z=(random()-.5)*110-16;if(Math.abs(x)<39&&z<23&&z>-49)x=Math.sign(x||1)*(40+random()*20);const s=.2+random()*1.1;dummy.position.set(x,height(x,z)+s*.12,z);dummy.scale.set(s*1.6,s*.65,s);dummy.rotation.set(random(),random()*6,random()*.5);dummy.updateMatrix();rocks.setMatrixAt(i,dummy.matrix)}rocks.castShadow=true;rocks.receiveShadow=true;surface.add(rocks);
 // Graded hardstanding, roads, drainage, and concrete equipment plinths.
 box(78,.12,58,gravel,surface,0,-.22,-17);box(6,.07,89,gravel,surface,-11,-.12,-9);
 const asphalt=material('#444748',0,.98);asphalt.map=noiseTexture(128,16);
 box(5,.045,85,asphalt,surface,-11,-.125,-9);box(66,.045,4,asphalt,surface,3,-.125,-16);
 box(8,.2,9,concrete,surface,0,-.08,0);box(6,.22,6,concrete,surface,0,.03,0);
 for(const x of [-3.5,3.5])box(.16,.12,9,dark,surface,x,.04,0);
 // Engineering helpers: straight pipework and stiff steelwork with true endpoints.
 function beam(a:number[],b:number[],r:number,m:T.Material,parent:T.Object3D){const av=new T.Vector3(...a),bv=new T.Vector3(...b),v=bv.clone().sub(av);const o=cyl(r,v.length(),m,parent,0,0,0,r,10);o.position.copy(av.add(bv).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize());return o}
 function run(points:number[][],r:number,m:T.Material,parent:T.Object3D){for(let i=1;i<points.length;i++)beam(points[i-1],points[i],r,m,parent);for(const p of points.slice(1,-1))mesh(new T.SphereGeometry(r,10,8),m,parent,...p as [number,number,number]);}
 const safety=material('#ac8d41',.35,.58);
 function handrail(x:number,y:number,z:number,length:number,parent:T.Object3D){for(let i=0;i<=length;i+=1.5)beam([x+i,y,z],[x+i,y+1,z],.025,safety,parent);for(const h of [.5,1])beam([x,y+h,z],[x+length,y+h,z],.025,safety,parent)}
 const wellhead=new T.Group();surface.add(wellhead);
 cyl(.67,.23,dark,wellhead,0,.2);cyl(.38,1.35,steel,wellhead,0,.9);flange(wellhead,.55,.38);flange(wellhead,.5,1.25);cyl(.27,.48,dark,wellhead,0,1.55);cyl(.1,.4,chrome,wellhead,0,1.95);ring(.46,.045,safety,wellhead,2.13);
 for(let j=0;j<4;j++){const a=j*Math.PI/2;beam([0,2.13,0],[Math.sin(a)*.44,2.13,Math.cos(a)*.44],.025,safety,wellhead)}
 run([[0,1.1,0],[0,1.1,.7]],.12,dark,wellhead);const wheel=mesh(new T.TorusGeometry(.33,.035,8,24),safety,wellhead,0,1.1,.8);wheel.rotation.y=0;
 run([[.2,.8,0],[1.8,.8,0],[1.8,.8,-4],[13,.8,-4],[13,.8,-9],[13,2.2,-9],[13,2.2,-29]],.23,steel,surface);
 run([[-.2,.55,0],[-1.8,.55,0],[-1.8,.55,-7],[12,.55,-7],[12,.55,-10],[12,1.7,-10],[12,1.7,-29]],.15,dark,surface);
 for(const x of [2.7,5.2,8,10.5]){box(.3,.65,1,concrete,surface,x,.3,-4);box(.75,.16,1.1,dark,surface,x,.68,-4)}
 // Instruments and cable conduit around the central wellhead.
 for(const x of [-.6,.6]){run([[x,.9,0],[x,1.55,0],[x,1.55,.18]],.025,chrome,wellhead);const gauge=cyl(.12,.06,building,wellhead,x,1.55,.2);gauge.rotation.x=Math.PI/2;beam([x,1.55,.24],[x+.065,1.6,.24],.009,dark,wellhead)}
 for(const x of [-2.7,2.7]){cyl(.075,.8,safety,surface,x,.4,2.7);cyl(.078,.16,black,surface,x,.57,2.7)}
 for(const [x,z]of [[-24,-7],[23,-7],[-25,-29]]){box(8,.2,8,concrete,surface,x,-.05,z);const station=wellhead.clone();station.position.set(x,0,z);surface.add(station);run([[x,.8,z],[x+2,.8,z],[x+2,.8,z-4],[10,.8,z-4],[10,2.2,z-4],[10,2.2,-31]],.17,steel,surface)}
 // The collection rack has multiple supported lines, crossbeams and bracing.
 for(let z=-10;z>=-38;z-=4){for(const x of [9.3,14.5]){box(.5,.3,.7,concrete,surface,x,.08,z);box(.14,3,.18,dark,surface,x,1.6,z)}box(5.5,.18,.18,dark,surface,11.9,2.55,z);beam([9.3,.2,z],[14.5,2.55,z],.035,dark,surface)}
 for(let i=0;i<4;i++)run([[9.9+i*1.1,2.85,-10],[9.9+i*1.1,2.85,-38],[18+i,2.85,-38]],.12+i*.025,steel,surface);
 // Open process skids replace the domestic-looking building.
 box(28,.26,16,concrete,surface,16,-.01,-37);
 for(const z of [-30,-43])for(const x of [3,10,17,24,29]){box(.22,6,.24,dark,surface,x,3,z);box(6.4,.18,.18,dark,surface,x+2.7,5.85,z)}
 for(const x of [3,10,17,24,29]){box(.18,.18,13,dark,surface,x,5.85,-36.5);beam([x,.3,-43],[x,5.6,-38],.05,dark,surface)}
 // Only a narrow weather canopy; the plant remains visually open and mechanical.
 box(29,.13,3.2,roof,surface,16,6.05,-42);
 for(let i=0;i<3;i++){
  const x=5.8+i*7.4,z=-35;
  const vessel=cyl(1.15,7,steel,surface,x,2.1,z);vessel.rotation.x=Math.PI/2;
  for(const dz of [-3.5,3.5]){const cap=mesh(new T.SphereGeometry(1.15,20,12),steel,surface,x,2.1,z+dz);cap.scale.z=.32}
  for(const dz of [-2.3,2.3]){box(1.65,1.1,.45,dark,surface,x,.65,z+dz);const collar=ring(1.17,.055,dark,surface,0);collar.rotation.x=0;collar.position.set(x,2.1,z+dz)}
  run([[x,3.1,z],[x,4.4,z],[x+2,4.4,z],[x+2,4.4,-40]],.12,steel,surface);
  box(3.2,.17,8,dark,surface,x+2.3,3.4,z);handrail(x+.75,3.5,z+4,3,surface);
  for(let j=0;j<10;j++)beam([x+2,0.35+j*.32,z+4.1],[x+2.65,.35+j*.32,z+4.1],.025,steel,surface);
  for(const dx of [2,2.65])beam([x+dx,0,z+4.1],[x+dx,3.9,z+4.1],.035,steel,surface);
 }
 for(let i=0;i<3;i++){
  const x=30+i*2.4,z=-34;cyl(.95,6.5,steel,surface,x,3.3,z);mesh(new T.SphereGeometry(.95,16,10),steel,surface,x,6.52,z).scale.y=.38;
  for(const y of [1,3,5]){const collar=ring(.97,.035,dark,surface,0);collar.position.set(x,y,z)}
  run([[x,6.8,z],[x,7.3,z],[x,7.3,-40],[24,7.3,-40],[24,4,-40]],.08,dark,surface);
 }
 // Ribbed switchgear enclosure and steel louvres, not a house facade.
 box(8,3.2,3.5,building,surface,-1,1.6,-43);box(8.2,.12,3.7,roof,surface,-1,3.25,-43);
 const ribs=new T.InstancedMesh(new T.BoxGeometry(.045,3.1,.045),roof,60);
 for(let i=0;i<60;i++){dummy.position.set(-4.85+i*.13,1.6,-41.23);dummy.rotation.set(0,0,0);dummy.scale.set(1,1,1);dummy.updateMatrix();ribs.setMatrixAt(i,dummy.matrix)}surface.add(ribs);
 for(let i=0;i<2;i++){box(1.1,2.3,.07,dark,surface,-3+i*2,1.2,-41.18);box(.055,.3,.04,chrome,surface,-2.6+i*2,1.3,-41.12)}
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
 const sky=new T.HemisphereLight("#d2dce5","#3d3830",1.3);scene.add(sky);
 const sun=new T.DirectionalLight("#ffead1",2.4);sun.position.set(-16,28,19);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-35;sun.shadow.camera.right=35;sun.shadow.camera.top=35;sun.shadow.camera.bottom=-35;sun.shadow.camera.far=100;sun.shadow.normalBias=.04;scene.add(sun);
 const rim=new T.DirectionalLight("#bbd1db",.65);rim.position.set(10,-3,-9);scene.add(rim);
 const fill=new T.DirectionalLight("#e9f5ff",.2);fill.position.set(-8,-10,16);scene.add(fill);
 // Batch static surface geometry by material and attribute layout to reduce draw calls.
 surface.updateMatrixWorld(true);
 const batches=new Map<string,{material:T.Material;objects:T.Mesh[];geometries:T.BufferGeometry[]}>();
 surface.traverse(o=>{if(!(o instanceof T.Mesh)||o instanceof T.InstancedMesh||Array.isArray(o.material))return;
  const key=o.material.uuid+':'+Object.keys(o.geometry.attributes).sort().join(',');let batch=batches.get(key);if(!batch){batch={material:o.material,objects:[],geometries:[]};batches.set(key,batch)}
  const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(o.matrixWorld);batch.objects.push(o);batch.geometries.push(g);
 });
 const oldSurfaceGeometry=new Set<T.BufferGeometry>();
 for(const batch of batches.values()){const combined=mergeGeometries(batch.geometries,false);if(combined){mesh(combined,batch.material,surface);for(const o of batch.objects){oldSurfaceGeometry.add(o.geometry);o.removeFromParent()}}batch.geometries.forEach(g=>g.dispose())}
 oldSurfaceGeometry.forEach(g=>g.dispose());
 const formationMaterials:T.Material[]=[];
 formation.traverse(o=>{if(o instanceof T.Mesh){const clone=(m:T.Material)=>{const c=m.clone();c.transparent=true;formationMaterials.push(c);return c};o.material=Array.isArray(o.material)?o.material.map(clone):clone(o.material)}});
 // Per-part materials allow emphasis without changing shared surface materials.
 const partMaterials={}as Record<EspPart,T.MeshStandardMaterial[]>;
 for(const id of Object.keys(parts)as EspPart[]){const clones=new Map<T.Material,T.Material>();const list:T.MeshStandardMaterial[]=[];parts[id].traverse(o=>{if(!(o instanceof T.Mesh))return;const replace=(m:T.Material)=>{if(!clones.has(m)){const c=m.clone();clones.set(m,c);if(c instanceof T.MeshStandardMaterial)list.push(c)}return clones.get(m)!};o.material=Array.isArray(o.material)?o.material.map(replace):replace(o.material)});partMaterials[id]=list}
 const anchors:Record<EspPart,T.Vector3>={motors:new T.Vector3(),protectors:new T.Vector3(),pumps:new T.Vector3(),cables:new T.Vector3(),controls:new T.Vector3()};
 let lastChapter=-1;
 const surfaceColor=new T.Color("#a4afb4"),depthColor=new T.Color("#071c26"),backgroundColor=new T.Color();
 function update(p:number,time:number){
  const underground=between(p,.20,.34),explode=between(p,.43,.58);
  const bg=backgroundColor.copy(surfaceColor).lerp(depthColor,underground);scene.background=bg;(scene.fog as T.FogExp2).color.copy(bg);(scene.fog as T.FogExp2).density=.006+underground*.009;
  sky.intensity=1.3+underground*.5;rim.intensity=.65+underground*1.8;fill.intensity=.2+underground*1.5;
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
