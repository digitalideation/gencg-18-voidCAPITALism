// Global var
let numberOfAgents = 99;
let numberOfTargets = 99;
let agents = [];
let ticks = 0;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(0);
  for(let i = 0; i< numberOfAgents; i++){
    agents.push(new Agent(numberOfTargets));
  }
  colorMode(HSB);
}

function draw() {
  if(ticks==500){
    ticks = 0;
    //background(0);
  }else {
    //background(0,5);
  }
  background(0,0,0,0.045);
  ticks++;
  agents.forEach(function(agent){
    agent.draw();
  });
}

function keyPressed() {
  if (key == 't' || key == 'T') {saveThumb(650, 350)}
  if (key == 's' || key == 'S') {savePic(windowWidth,windowHeight)}
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
function savePic(w, h) {
  let img = get( width/2-w/2, height/2-h/2, w, h);
  save(img,'sc.jpg');
}
