let imagenes = [];
let imgActual = 0;

let invertir = false;
let glitch = false;
let fragmentar = false;
let pixelSorting = false;

let colorIndex = 0;

let paleta = [
[255,255,255],
[255,120,120],
[120,255,180],
[120,180,255],
[255,220,120],
[220,120,255]
];

let fragmentos = [];

function preload(){

imagenes[0] = loadImage("imagen_0.png");
imagenes[1] = loadImage("imagen_1.png");
imagenes[2] = loadImage("imagen_2.png");

}

function setup(){

createCanvas(windowWidth,windowHeight);
imageMode(CENTER);

crearFragmentos();

}

function draw(){

background(0);

let img = imagenes[imgActual].get();

if(invertir){
img = invertirImagen(img);
}

if(pixelSorting){
img = pixelSort(img);
}

let escala = min(width/img.width,height/img.height);

let w = img.width*escala;
let h = img.height*escala;

let c = paleta[colorIndex];
tint(c[0],c[1],c[2]);

image(img,width/2,height/2,w,h);

noTint();

if(glitch){
efectoGlitch();
}

if(fragmentar){
fragmentacion(img,escala);
}

}

function invertirImagen(img){

img.loadPixels();

for(let i=0;i<img.pixels.length;i+=4){

img.pixels[i]=255-img.pixels[i];
img.pixels[i+1]=255-img.pixels[i+1];
img.pixels[i+2]=255-img.pixels[i+2];

}

img.updatePixels();
return img;

}

function pixelSort(img){

img.loadPixels();

for(let y=0;y<img.height;y+=6){

let offset=int(random(-10,10));

for(let x=0;x<img.width;x++){

let i=(x+y*img.width)*4;
let j=(constrain(x+offset,0,img.width-1)+y*img.width)*4;

img.pixels[i]=img.pixels[j];
img.pixels[i+1]=img.pixels[j+1];
img.pixels[i+2]=img.pixels[j+2];

}

}

img.updatePixels();
return img;

}

function efectoGlitch(){

for(let i=0;i<10;i++){

let x=random(width);
let y=random(height);
let w=random(20,200);
let h=random(5,40);

copy(x,y,w,h,x+random(-60,60),y+random(-20,20),w,h);

}

}

function crearFragmentos(){

fragmentos=[];

let img=imagenes[0];

for(let i=0;i<35;i++){

fragmentos.push({

sx:random(img.width),
sy:random(img.height),

w:random(40,90),
h:random(40,90),

x:random(width),
y:random(height),

vx:random(-0.4,0.4),
vy:random(-0.4,0.4),

angulo:random(TWO_PI),
vRot:random(-0.01,0.01)

});

}

}

function fragmentacion(img,escala){

for(let f of fragmentos){

// movimiento flotante
f.vx += random(-0.02,0.02);
f.vy += random(-0.02,0.02);

f.vx = constrain(f.vx,-1,1);
f.vy = constrain(f.vy,-1,1);

// repulsion cursor
let dx=mouseX-f.x;
let dy=mouseY-f.y;

let dist=sqrt(dx*dx+dy*dy);

if(dist<160){

f.vx-=dx*0.003;
f.vy-=dy*0.003;

}

// actualizar posicion
f.x+=f.vx;
f.y+=f.vy;

f.vx*=0.97;
f.vy*=0.97;

// rebote bordes
if(f.x<0||f.x>width)f.vx*=-1;
if(f.y<0||f.y>height)f.vy*=-1;

// rotacion
f.angulo += f.vRot;

// dibujar fragmento rotado
push();

translate(f.x,f.y);
rotate(f.angulo);

copy(
img,
f.sx,f.sy,f.w,f.h,
-f.w*escala/2,
-f.h*escala/2,
f.w*escala,
f.h*escala
);

pop();

}

}

function keyPressed(){

if(key=='0') imgActual=0;
if(key=='1') imgActual=1;
if(key=='2') imgActual=2;

if(key=='c'||key=='C'){

colorIndex++;

if(colorIndex>=paleta.length){
colorIndex=0;
}

}

if(key=='i'||key=='I') invertir=!invertir;

if(key=='g'||key=='G') glitch=!glitch;

if(key=='f'||key=='F') fragmentar=!fragmentar;

if(key=='p'||key=='P') pixelSorting=!pixelSorting;

if(key=='r'||key=='R'){

invertir=false;
glitch=false;
fragmentar=false;
pixelSorting=false;
colorIndex=0;

crearFragmentos();

}

if(key=='s'||key=='S'){

saveCanvas("las_mil_y_una_imagenes","png");

}

}

function windowResized(){

resizeCanvas(windowWidth,windowHeight);

}