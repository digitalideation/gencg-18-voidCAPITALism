// Global var
let deg = 0;
let positions = [];
let posTo;
let posCurrent;
let direction;
let multiplier = 1;
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(0);
  c1 = color('#591ab8');
  c2 = color('#a81ab8');
  c3 = color('#1a2ab8');
  noFill();
  angleMode(DEGREES);

  posTo = createVector(0,0);
  posCurrent = createVector(0,0);
  direction = createVector(0,0);
  diff = createVector(0,0);
}

function draw() {
  drawStar(posCurrent);
  direction = p5.Vector.sub(posTo,posCurrent);
  diff = direction.copy()
  direction.normalize();
  if(abs(direction.x*multiplier)<abs(diff.x)&&abs(direction.y*multiplier)<abs(diff.y)){
    direction = direction.mult(multiplier);
  }
  posCurrent.add(direction);
  if(closeEnough(posCurrent,posTo,1.0)){
    if(positions.length>0){
      posTo = positions[0].copy();
      positions.shift();
    }
  }
}

function closeEnough(posCurrent,posTo,delta){
  let diffX = abs(posCurrent.x - posTo.x);
  let diffY = abs(posCurrent.y - posTo.y);

  return diffX<delta && diffY<delta
}

function keyPressed() {
  if (key == 't' || key == 'T') {saveThumb(650, 350)}
  if (key == 's' || key == 'S') {savePic(windowWidth,windowHeight)}
  if (key == 'a' || key == 'A') {multiplier++}
  if (key == 'd' || key == 'D') {multiplier--}
}

// Tools
function drawStar(pos){
  push();
  stroke(c1)
  translate(pos.x,pos.y);
  rotate(deg);
  line(0,0,0,50);
  pop();

  push();
  stroke(c2)
  translate(pos.x,pos.y);
  rotate(deg+120);
  line(0,0,0,50);
  pop();

  push();
  stroke(c3)
  translate(pos.x,pos.y);
  rotate(deg+240);
  line(0,0,0,50);
  pop();

  deg+=1;
}
// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
}

function mousePressed(){
  positions.push(createVector(mouseX,mouseY));
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
