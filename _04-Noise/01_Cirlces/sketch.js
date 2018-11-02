// Global var
let numberOfCircles = 10;
let noiseFactor = 100;
let colorSpeed = 0;
let circles = [];
let offsets = [];
let drawLines = false;
let history = false;

function setup() {
  //Fullscreen
  const allowFullScreen = event => {
  	event.preventDefault();
    	event = event || window.event;
      if(event.ctrlKey && event.keyCode==70 && event.shiftKey) {
          document.documentElement.mozRequestFullScreen();
      }
  }
  document.addEventListener('keyup', allowFullScreen)

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
  //Draw history?
  history ? background(0,0.5) : background(0,1);

  noiseFactor = map(mouseX,0,width,0,300,true);
  colorSpeed = floor(map(mouseY,0,height,0,100,true));

  push();
  //Correct poition according to current noise
  translate(-noiseFactor/2,0);
  for(let i = 0;i<numberOfCircles;i++){
    drawCircle(circles[i],tick,offsets[i]);
  }
  pop();

  tick++;
}

function keyPressed() {
  if (key == 't' || key == 'T') {saveThumb(650, 350)}
  if (key == 's' || key == 'S') {savePic(width,height)}
  if (key == 'a' || key == 'A') {history=!history}
}

// Tools
function drawCircle(points,tick,offset){
  for(let i = 0;i<points.length-1;i++){
    //String concatenation for the color String e.g 'hsb(190,100%,100%)'
    let string = 'hsb('+(((i+offset)+(tick*colorSpeed))%360)+', 100%, 100%)'
    c = color(string);
    stroke(c);
    ellipse(
      points[i].x + noise(points[i].x,points[i].y,tick)*noiseFactor,
      points[i].y,
      3,3
    );
    //Lines between points
    if(drawLines){
      line(
        points[i].x + noise(points[i].x,points[i].y,tick)*noiseFactor,
        points[i].y,
        points[i+1].x + noise(points[i+1].x,points[i+1].y,tick)*noiseFactor,
        points[i+1].y,
      );
    }
  }
  //Line between first and last point
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
  //Looks not very nice, so no random here.
  //offsets.push(floor(random(0,50+1)));
    offsets.push(i*10);
  }
}

//Calculates all points on the outline of given circle and returns them as an array
function circlePoints(center,radius){
  let points = [];
  for(let i=0;i<360+1;i++){
    points.push(pointCoordinates(center,radius,i));
  }
  return points;
}
//Returns a point (vector) on the outline of a given circle
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
