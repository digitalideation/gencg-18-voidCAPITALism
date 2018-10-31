// Global var
let numberOfCircles = 10;
let noiseFactor = 100;
let colorSpeed = 0;
let circles = [];
let drawLines = false;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);

  p5.disableFriendlyErrors = true

  colorMode(HSB);
  background(0);
  noFill();

  initCircle();
}
let tick=0;
function draw() {
  background(0);
  noiseFactor = map(mouseX,0,width,0,300,true);
  colorSpeed = floor(map(mouseY,0,height,0,100,true));
  push()
  translate(-noiseFactor/2,0);
  for(let i = 0;i<numberOfCircles;i++){
    drawCircle(circles[i],tick)
  }
  pop()
  tick++;
}

function keyPressed() {
  if (key == 't' || key == 'T') {saveThumb(650, 350)}
  if (key == 's' || key == 'S') {savePic(width,height)}
}

// Tools
function drawCircle(points,tick){
  for(let i = 0;i<points.length-1;i++){
    let string = 'hsb('+((i+(tick*colorSpeed))%360)+', 100%, 100%)'
    c = color(string);
    stroke(c);
    ellipse(
      points[i].x + noise(points[i].x,points[i].y,tick)*noiseFactor,
      points[i].y,
      3,3
    );
    if(drawLines){
      line(
        points[i].x + noise(points[i].x,points[i].y,tick)*noiseFactor,
        points[i].y,
        points[i+1].x + noise(points[i+1].x,points[i+1].y,tick)*noiseFactor,
        points[i+1].y,
      );
    }
  }
  if(drawLines){
    line(points[0].x + noise(points[0].x,points[0].y,tick)*noiseFactor,
      points[0].y,
      points[points.length-1].x + noise(points[points.length-1].x,points[points.length-1].y,tick)*noiseFactor,
      points[points.length-1].y
    );
  }
}

function initCircle(){
  circles = [];
  let center = createVector(width/2,height/2);
  let radiusStart = height/2;

  for(let i = 0;i<numberOfCircles;i++){
    circles.push(circlePoints(center,radiusStart-i*(height/2/numberOfCircles)));
  }
}

function circlePoints(center,radius){
  let points = [];
  for(let i=0;i<360+1;i++){
    points.push(pointCoordinates(center,radius,i));
  }
  return points;
}

function pointCoordinates(center,r,angle){
  t = toRadians(angle);
  let x = r*cos(t) + center.x;
  let y = r*sin(t) + center.y;
  return createVector(x,y);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function mousePressed(){
  drawLines = !drawLines;
}

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
  initCircle();
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
