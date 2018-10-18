// Global var
let mp = false;
let diameterStart = 300;
let diameter = diameterStart;
let diameterStep = 2;
let posOffset = 1;
let weight = 1;
let pos;
let flagLtoR=true;
let gridX;
let gridY;
let c;
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
  pos = createVector(diameter/2,diameter/2);
  gridX = Math.floor((windowWidth-diameter)/diameter);
  gridY = Math.floor((windowHeight-diameter)/diameter);
  //Upper boundary not included!!! -.-
  colorMode(HSB,100+1);
  c1 = color(50,100,100);
  c2 = color(90,100,100);
}

function draw() {
  if(mp&&diameter>0){
    for(let x = 0;x<=gridX;x++){
      for(let y = 0; y<=gridY;y++){
        c = lerpColor(c1,c2,(1-(diameter/diameterStart)));
        stroke(c);
        ellipse(pos.x+(x*diameterStart),pos.y+(y*diameterStart),diameter,diameter);
      }
    }

    if(flagLtoR){
      pos.x+=posOffset;
    }else {
      pos.x-=posOffset
    }
    if(diameter>0){
      diameter-=diameterStep;
    }

  }
}

function mousePressed(){
  mp = true;
}
function mouseReleased(){
  mp = false;
  flagLtoR = !flagLtoR;
  //Color change on dir change
  //c = color(random(50,100+1),100,100);
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
