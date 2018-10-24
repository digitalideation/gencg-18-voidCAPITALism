// Global var
let mp = false;
let deg = 0;
let positions = [];
let posTo;
let posCurrent;
let direction;
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
}

function draw() {
  drawStar(posCurrent);
  direction = p5.Vector.sub(posTo,posCurrent);
  direction = direction.normalize();
  direction = direction.mu
  posCurrent.add(direction);
  if((floor(posCurrent.x)+1==posTo.x||floor(posCurrent.x)-1==posTo.x||floor(posCurrent.x)==posTo.x)&&(floor(posCurrent.y)+1==posTo.y||floor(posCurrent.y)-1==posTo.y||floor(posCurrent.y)==posTo.y)){
    if(positions.length>0){
      posTo = positions[0].copy();
      positions.shift();
    }
  }
}

function keyPressed() {
  if (key == 't' || key == 'T') {saveThumb(650, 350)}
  if (key == 's' || key == 'S') {savePic(windowWidth,windowHeight)}
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
  mp = true;
  positions.push(createVector(mouseX,mouseY));
}
function mouseReleased(){
  mp = false;
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
