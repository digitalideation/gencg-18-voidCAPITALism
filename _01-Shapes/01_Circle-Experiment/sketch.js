// Global var
let swMax = 50;
let diameterMax = 500;
let swMin = 10;
let diameterMin = 100;

let stepSW = 10;
let stepDiameter = 50;

let sw = swMax;
let diameter = diameterMin;



let mp = false;
let drawn = false;
let decreaseDiameter;
let decreaseSW;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(0);
}

function draw() {
  mouse = new createVector(mouseX,mouseY);
  if(mp&&!drawn){
    noFill();
    stroke(random(0,255+1),random(0,255+1),random(0,255+1));
    if(diameter<=diameterMin){
      decreaseDiameter = false;
    }else if (diameter>=diameterMax) {
      decreaseDiameter = true;
    }
    if(sw<=swMin){
      decreaseSW = false;
    }else if (sw>=swMax) {
      decreaseSW = true;
    }

    if(decreaseDiameter){
      diameter-=stepDiameter;
    }else {
      diameter+=stepDiameter;
    }
    if(decreaseSW){
      sw-=stepSW;
    }else {
      sw+=stepSW;
    }

    strokeWeight(sw);
    ellipse(mouse.x,mouse.y,diameter,diameter);
    drawn = true;
  }
}

function mousePressed(){
  mp = true;
}
function mouseReleased(){
  mp = false;
  drawn = false;
}

function keyPressed() {
  if (key == 's' || key == 'S') saveThumb(650, 350);
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
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
