// Global var
let points = [];
let center;
let radius = 500;
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
  center = createVector(windowWidth/2,windowHeight/2);
}
function draw() {
  background(0);

  noiseSeed(random());
  for(let i=0;i<360;i++){
    points.push(pointCoordinates(center,radius,i));
  }
  for(let i=0;i<points.length;i++){
    points[i].x = points[i].x + noise(points[i].x,points[i].y)*100;
    points[i].y = points[i].y + noise(points[i].x,points[i].y)*100;
  }


  for(let i = 0;i<points.length-1;i++){

    ellipse(points[i].x,points[i].y,1,1);
    line(points[i].x,points[i].y,points[i+1].x,points[i+1].y)
  }
}

function keyPressed() {
  if (key == 't' || key == 'T') {saveThumb(650, 350)}
  if (key == 's' || key == 'S') {savePic(windowWidth,windowHeight)}
}

// Tools
function pointCoordinates(center,r,angle){
  t = toRadians(angle);
  let x = r*cos(t) + center.x;
  let y = r*sin(t) + center.y;
  return createVector(x,y);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
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
function savePic(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'sc.jpg');
}
