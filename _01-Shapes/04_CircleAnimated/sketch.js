// Global var
let mp = false;
let diameterStart;
let diameter;
let diameterStep = 2;
let posOffset = 1;
let weight = 1;
let pos;
let flagLtoR=true;
let c;
let flagAnimate = false;
//Ugly but ok for now
let dictDia = [];
let dictPos = [];
let dictAnimateFlag = [];
let flagOut = true;
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(0);

  noFill();
  strokeWeight(weight);
  diameterStart = windowHeight;
  diameter = diameterStart;
  pos = createVector(windowWidth/2,windowHeight/2);
  //Upper boundary not included!!! -.-
  colorMode(HSB,100+1);
  c1 = color(50,100,100);
  c2 = color(90,100,100);
}

function draw() {
  if(mp&&diameter>0){
    c = lerpColor(c1,c2,(1-(diameter/diameterStart)));
    stroke(c);
    ellipse(pos.x,pos.y,diameter,diameter);
    dictDia.push(diameter);
    dictPos.push(pos.copy());
    if(flagAnimate){
      dictAnimateFlag.push(1);
    }else {
      dictAnimateFlag.push(0);
    }
    if(flagLtoR){
      pos.x+=posOffset;
    }else {
      pos.x-=posOffset
    }
    diameter-=diameterStep;
  }
  if(diameter<=0){
    background(0);
    for(let i=0;i<dictDia.length;i++){
      c = lerpColor(c1,c2,(1-(dictDia[i]/diameterStart)));
      stroke(c);
      if(dictAnimateFlag[i]){
        if(flagOut){
          dictPos[i].x==dictPos[i-1]+1;
        }else{
          dictPos[i].x==dictPos[i-1]-1;
        }
      }
      ellipse(dictPos[i].x,dictPos[i].y,dictDia[i],dictDia[i]);
    }
    flagOut = !flagOut;
  }
}

function mousePressed(){
  mp = true;
}
function mouseReleased(){
  mp = false;
  flagLtoR = !flagLtoR;
  flagAnimate = true;
}

function keyPressed() {
  if (key == 't' || key == 'T') {saveThumb(650, 350)}
  if (key == 's' || key == 'S') {savePic(windowWidth,windowHeight)}
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
  //pos = createVector(windowWidth/2,windowHeight/2)
}

// Int conversion
function toInt(value) {
  return ~~value;
}

// Timestamp
function timestamp() {
  return Date.now();
}

// Thumb
function saveThumb(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'thumb.jpg');
}
function savePic(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'sc.jpg');
}
