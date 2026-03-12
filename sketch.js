let imgs = [];
let imgActual = 0;

let colorShift = 0;
let invertido = false;

let glitchActivo = false;
let fragmentacionActiva = false;
let pixelSortingActivo = false;

let fragmentos = [];

let esMobile = false;

function preload(){

imgs[0] = loadImage("imagen_0.png");
imgs[1] = loadImage("imagen_1.png");
imgs[2] = loadImage("imagen_2.png");

}

function setup(){

createCanvas(windowWidth,windowHeight);
imageMode(CENTER);

esMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

crearFragmentos();

if(esMobile){
crearBotones();
}

}

function windowResized(){

resizeCanvas(windowWidth,windowHeight);

}

function draw(){

background(0);

let img = imgs[imgActual];

push();

translate(width/2,height/2);

let escala = min(width/img.width,height/img.height);
scale(escala);

let temp = img.get();

if(colorShift>0){

temp.loadPixels();

for(let i=0;i<temp.pixels.length;i+=4){
temp.pixels[i]+=colorShift;
}

temp.updatePixels();

}

if(invertido){
temp.filter(INVERT);
}

image(temp,0,0);

pop();

if(glitchActivo) glitch();
if(fragmentacionActiva) actualizarFragmentos();
if(pixelSortingActivo) pixelSort();

}

function keyPressed(){

if(key==="0") imgActual=0;
if(key==="1") imgActual=1;
if(key==="2") imgActual=2;

if(key==="C") colorShift=(colorShift+40)%200;

if(key==="I") invertido=!invertido;

if(key==="G") glitchActivo=!glitchActivo;

if(key==="F") fragmentacionActiva=!fragmentacionActiva;

if(key==="P") pixelSortingActivo=!pixelSortingActivo;

if(key==="R") resetEfectos();

if(key==="S") saveCanvas("captura","png");

}

function resetEfectos(){

colorShift=0;
invertido=false;
glitchActivo=false;
fragmentacionActiva=false;
pixelSortingActivo=false;

}

function glitch(){

for(let i=0;i<12;i++){

let x=random(width);
let y=random(height);

let w=random(40,140);
let h=random(10,60);

copy(x,y,w,h,x+random(-50,50),y);

}

}

function crearFragmentos(){

fragmentos=[];

for(let i=0;i<80;i++){

fragmentos.push({

x:random(width),
y:random(height),

vx:random(-0.4,0.4),
vy:random(-0.4,0.4),

rot:random(TWO_PI),
vr:random(-0.01,0.01),

w:random(60,120),
h:random(60,120)

});

}

}

function actualizarFragmentos(){

let img=imgs[imgActual];

for(let f of fragmentos){

let dx=f.x-mouseX;
let dy=f.y-mouseY;

let d=sqrt(dx*dx+dy*dy);

if(d<120){

f.vx+=dx*0.0006;
f.vy+=dy*0.0006;

}

f.x+=f.vx;
f.y+=f.vy;

f.rot+=f.vr;

push();

translate(f.x,f.y);
rotate(f.rot);

let sx=random(img.width);
let sy=random(img.height);

let frag=img.get(sx,sy,f.w,f.h);

image(frag,0,0);

pop();

}

}

function pixelSort(){

loadPixels();

for(let y=0;y<height;y+=4){

let x=int(random(width));

let index=(x+y*width)*4;

pixels[index]+=random(40);

}

updatePixels();

}

function crearBotones(){

let controles=[

["0",()=>imgActual=0],
["1",()=>imgActual=1],
["2",()=>imgActual=2],

["C",()=>colorShift=(colorShift+40)%200],
["I",()=>invertido=!invertido],

["G",()=>glitchActivo=!glitchActivo],
["F",()=>fragmentacionActiva=!fragmentacionActiva],
["P",()=>pixelSortingActivo=!pixelSortingActivo],

["R",()=>resetEfectos()],
["S",()=>saveCanvas("captura","png")]

];

let x=10;
let y=10;

for(let c of controles){

let btn=createButton(c[0]);

btn.position(x,y);
btn.size(44,44);

btn.style("background","#000");
btn.style("color","#fff");
btn.style("border","1px solid white");
btn.style("font-size","16px");

btn.mousePressed(c[1]);

y+=50;

if(y>250){
y=10;
x+=50;
}

}

}
