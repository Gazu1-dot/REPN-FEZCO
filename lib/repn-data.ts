export const geothermalPumps = [
  { id:"tp677", name:"TP 677", diameter:172, construction:"Diffusers assembled inside a housing", source:[10,11], points:{"60":{rpm:3500,flow:200,head:23,power:22.4,efficiency:75,min:150,max:250},"50":{rpm:2910,flow:165,head:15.9,power:12.9,efficiency:75,min:125,max:208}} },
  { id:"tp740", name:"TP 740", diameter:188, construction:"Diffusers assembled inside a housing", source:[14,15], points:{"60":{rpm:3500,flow:300,head:16.6,power:18.7,efficiency:73.6,min:210,max:360},"50":{rpm:2910,flow:250,head:11.5,power:10.7,efficiency:73.6,min:170,max:290}} },
  { id:"tp905", name:"TP 905", diameter:230, construction:"Diffusers assembled inside a housing", source:[18,19], points:{"60":{rpm:3500,flow:490,head:38,power:52.3,efficiency:72.5,min:400,max:625},"50":{rpm:2910,flow:405,head:26.3,power:30.1,efficiency:72.5,min:330,max:520}} },
  { id:"qj1047", name:"QJ 1047", diameter:266, construction:"Bolted diffusers without a continuous outer housing", source:[22,23], points:{"60":{rpm:3500,flow:425,head:56.2,power:89.8,efficiency:73.5,min:250,max:550},"50":{rpm:2910,flow:350,head:38.8,power:51.6,efficiency:73.5,min:208,max:455}} },
];
export const geothermalMotors = [
  {hp:326,kw3000:200,kw3600:240,v3000:2800,v3600:3360,amps:45,length:3937,weight:592,velocity:.20},
  {hp:408,kw3000:250,kw3600:300,v3000:3300,v3600:3960,amps:48,length:4353,weight:665,velocity:.25},
  {hp:489,kw3000:300,kw3600:360,v3000:3100,v3600:3720,amps:61,length:4769,weight:738,velocity:.30},
  {hp:570,kw3000:350,kw3600:420,v3000:3500,v3600:4200,amps:63,length:5185,weight:811,velocity:.40},
  {hp:652,kw3000:400,kw3600:480,v3000:3100,v3600:3720,amps:81,length:5601,weight:884,velocity:.40},
  {hp:734,kw3000:450,kw3600:540,v3000:3500,v3600:4200,amps:81,length:6017,weight:958,velocity:.40},
  {hp:815,kw3000:500,kw3600:600,v3000:3300,v3600:3960,amps:97,length:6017,weight:958,velocity:.45},
  {hp:897,kw3000:550,kw3600:660,v3000:3800,v3600:4560,amps:92,length:6433,weight:1030,velocity:.45},
  {hp:978,kw3000:600,kw3600:720,v3000:3900,v3600:4680,amps:98,length:7265,weight:1176,velocity:.45},
  {hp:1060,kw3000:650,kw3600:780,v3000:4500,v3600:5400,amps:90,length:7681,weight:1249,velocity:.50},
  {hp:1142,kw3000:700,kw3600:840,v3000:3800,v3600:4560,amps:117,length:8097,weight:1322,velocity:.50},
  {hp:1224,kw3000:750,kw3600:900,v3000:4000,v3600:4800,amps:119,length:8513,weight:1395,velocity:.55},
  {hp:1305,kw3000:800,kw3600:960,v3000:4700,v3600:5640,amps:106,length:8929,weight:1468,velocity:.60},
];
export const cableRows = [[16,4.50,2,8.50,.85,10.20,"13.8 × 36.2"],[21.15,5.19,2,9.19,.85,10.89,"14.5 × 38.3"],[25,5.65,2,9.65,.85,11.35,"14.9 × 39.5"],[33.6,6.55,2,10.55,.85,12.25,"15.8 × 42.4"]];
export const equipment = [
  {slug:"pumps",name:"ESP pumps",tag:"HYDRAULIC PERFORMANCE",image:"oil-pump",applications:"Geothermal · Oil & Gas",description:"Multistage submersible centrifugal pumps for geothermal fluid and oilfield production. Explore the series, operating points and performance curves.",features:["Four geothermal pump families","Oilfield series 362, 400 and 512","Oilfield portfolio approximately 315–3,144 BPD"]},
  {slug:"motors",name:"Submersible motors",tag:"DOWNHOLE DRIVE",image:"motor",applications:"Geothermal · Oil & Gas",description:"Permanent magnet and induction motors for submersible pumping systems, with power and thermal options matched to the application.",features:["728-series geothermal permanent magnet motors","Induction and permanent magnet oilfield motors","Standard and high-temperature configurations"]},
  {slug:"protectors",name:"Protectors & seal sections",tag:"MOTOR PROTECTION",image:"protector",applications:"Geothermal · Oil & Gas",description:"Installed between the motor and pump, the protector limits formation-fluid ingress, accommodates motor-oil volume changes and transfers torque.",features:["Single-housing and tandem arrangements","Labyrinth and diaphragm chamber configurations","Standard and reinforced thrust-bearing options"]},
  {slug:"gas-handling",name:"Gas handling",tag:"GAS-LIQUID FLOW",image:"gas-handling",applications:"Oil & Gas",description:"Gas separators, dispersants and combined modules support ESP operation where formation fluid contains free gas.",features:["Hydrocyclone gas separators","Gas dispersants","Combined separator–dispersant modules"]},
  {slug:"intakes",name:"Intake sections",tag:"PUMP INLET",image:"intake",applications:"Oil & Gas",description:"Intake modules guide formation fluid into the pump and connect the lower system components to the pumping section.",features:["Corrosion-resistant steel housing","Hard-alloy radial bearings","High-strength shaft options"]},
  {slug:"cables",name:"Cable systems",tag:"POWER TRANSMISSION",image:"cable",applications:"Geothermal · Oil & Gas",description:"Flat 5 kV power cables for submersible motors. Select your application to compare cable construction, dimensions and operating limits.",features:["5 kV ESP power cables","Application-specific construction and ratings","Copper conductors with protective armour"]},
  {slug:"sensors",name:"Downhole monitoring",tag:"OPERATING DATA",image:"sensor",applications:"Geothermal",description:"Downhole sensing provides operating information for monitoring the submersible motor and well conditions.",features:["Temperature and pressure monitoring","Connection to surface monitoring equipment","Sensor options matched to the motor configuration"]},
  {slug:"controls",name:"Variable speed drives",tag:"SURFACE CONTROL",image:"vsd",applications:"Geothermal",description:"Surface drive equipment controls motor operation and supports monitoring and protective functions within the ESP system.",features:["Induction and permanent magnet motor control","SCADA and I/O integration","Sine-wave filtering and operating-event logs"]},
  {slug:"coatings",name:"Corrosion-resistant coatings",tag:"SURFACE TECHNOLOGY",image:"coating",applications:"Oil & Gas",description:"HVOF metallic coating options provide corrosion-resistant surface protection for selected oilfield equipment configurations.",features:["High-velocity oxygen fuel process","Selected CR2C option: minimum 150 µm coating","Configuration-specific surface protection"]},
];
