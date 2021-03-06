// Global var
let cubeDimension = 50;
let cubeDiagonale = cubeDimension*Math.sqrt(2);
let cubesX;
let cubesY;

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
  background(0);
  angleMode(DEGREES);
  fill(255);
  noStroke();

  cubesX = windowWidth / cubeDiagonale+1;
  cubesY = windowHeight / (cubeDiagonale/2+cubeDimension);
}

function draw() {
  //Big Cubes
  push()
  for(let y=0;y<=cubesY;y++){
    //EVEN
    if(y&1==1){
      push();
      translate(-(cubeDiagonale/2),0);
      for(let x=0;x<=cubesX;x++){
        drawCube();
        translate(cubeDiagonale,0);
      }
    //UNEVEN
    }else {
      push();
      for(let x=0;x<=cubesX;x++){
        drawCube();
        translate(cubeDiagonale,0);
      }
    }
    pop();
    translate(0,cubeDimension+cubeDiagonale/2);
  }
  pop()

  //Mini Cubes
  push()
  for(let y=0;y<=cubesY;y++){
    //EVEN
    if(y&1==1){
      push();
      translate(cubeDiagonale/2-.25*cubeDiagonale/2,cubeDimension);
      scale(.25,.25);
      for(let x=0;x<=cubesX;x++){
        drawCube();
        translate(cubeDiagonale*4,0);
      }
      pop();
    //UNEVEN
    }else {
      push();
      translate(cubeDiagonale-.25*cubeDiagonale/2,cubeDimension);
      scale(.25,.25);
      for(let x=0;x<=cubesX;x++){
        drawCube();
        translate(cubeDiagonale*4,0);
      }
      pop();
    }
    translate(0,cubeDimension+cubeDiagonale/2);
  }
  pop()
}

function drawCube(){
  fill(100);
  quad(0,0,cubeDiagonale/2,-cubeDiagonale/2,cubeDiagonale,0,cubeDiagonale/2,(cubeDiagonale/2));
  fill(75);
  quad(0,0,cubeDiagonale/2,(cubeDiagonale/2),cubeDiagonale/2,(cubeDiagonale/2+cubeDimension),0,cubeDimension);
  fill(50);
  quad(cubeDiagonale/2,cubeDiagonale/2,cubeDiagonale/2,cubeDiagonale/2+cubeDimension,cubeDiagonale,cubeDimension,cubeDiagonale,0);
}

function keyPressed() {
  if (key == 't' || key == 'T') {saveThumb(650, 350)}
  if (key == 's' || key == 'S') {savePic(windowWidth,windowHeight)}
}

// Tools

// resize canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, false);
  cubesX = windowWidth / cubeDiagonale+1;
  cubesY = windowHeight / (cubeDiagonale/2+cubeDimension);
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
