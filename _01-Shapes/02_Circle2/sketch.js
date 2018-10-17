// Global var
let mp = false;
let diameterStart = 500;
let diameter = diameterStart;
let diameterStep = 5;
let posOffset = 2.5;
let weight = 1;
let pos;
let startPos;
let flagLtoR=true;
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(0);
  stroke(255);
  noFill();
  strokeWeight(weight);
  pos = createVector(diameter/2,windowHeight/2);
  startPos = pos.copy();
}

function draw() {
  if(mp){
    ellipse(pos.x,pos.y,diameter,diameter);
    if(flagLtoR){
      pos.x+=posOffset;
    }else {
      pos.x-=posOffset;
    }
    if(diameter>0){
      diameter-=diameterStep;
    }else {
      diameter = diameterStart;
      pos.x = startPos.x+(diameter)+75;
      startPos = pos.copy();
    }
  }
}

function mousePressed(){
  mp = true;
}
function mouseReleased(){
  mp = false;
  flagLtoR = !flagLtoR;
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
