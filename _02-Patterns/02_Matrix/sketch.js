// Global var
let c1;
let c2;
let c3;
let c4;
let c5;
let c;
let charsX;
let charsY;
let charSize = 12;
let numberPerColumn = [];
let flagPerColumn = [];
let flagDrawColumn = [];
let startPerColumn = [];
function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5Container");
  // Detect screen density (retina)
  var density = displayDensity();
  pixelDensity(density);
  background(0);
  c1 = color(0, 59, 0);
  c2 = color(0, 143, 17);
  c3 = color(0, 255, 65);
  c4 = color(179, 255, 198);
  c5 = color(255);
  c = color(255);

  //Number of chars
  charsX = floor(windowWidth/charSize);
  charsY = floor(windowHeight/charSize);

  for (let i=0;i<=charsX;i++){
    numberPerColumn.push(floor(random(1,3+1)));
    startPerColumn.push(floor(random(0,charsY+1))*charSize);
    flagPerColumn.push(1);
    flagDrawColumn.push(floor(random(0,1+1)));
  }
  frameRate(7);
  textSize(charSize);
}

function draw() {
  //Clear
  fill(0);
  rect(0,0,windowWidth,windowHeight);

  for (let i = 0; i <= charsX; i++){
    if(flagDrawColumn[i]){
      drawColumn(i*charSize,startPerColumn[i],numberPerColumn[i]);
      if(flagPerColumn[i]){
        numberPerColumn[i]=numberPerColumn[i]+floor(random(1,3+1));
      }else {
        randInt = floor(random(0,3+1));
        numberPerColumn[i]=numberPerColumn[i]-randInt;
        startPerColumn[i]=startPerColumn[i]+(randInt*charSize);
      }
      if(numberPerColumn[i]*12+startPerColumn[i]>=windowHeight){
        flagPerColumn[i] = 0;
        numberPerColumn[i]--;
      }else if (numberPerColumn[i]<=0) {
        flagPerColumn[i] = 1;
        startPerColumn[i] = floor(random(0,charsY+1))*charSize;
        numberPerColumn[i] = 1;
        flagDrawColumn[i] = 0;

        let notFound = true;
        do{
          randInt = floor(random(0,charsX+1));
          if(!flagDrawColumn[randInt]){
            flagDrawColumn[randInt] = 1;
            notFound = false;
          }
        }while(notFound);
      }
    }
  }
}

function drawColumn(x,y,n){
  if(n==1){
    drawChar(x,y+charSize,c5);
  }else if (n==2) {
    drawChar(x,y+1*charSize,c4);
    drawChar(x,y+2*charSize,c5);
  }else if (n>=3) {
    for(i=charSize;i<=(n-2)*charSize;i+=charSize){
      randInt = floor(random(1,3+1));
      switch (randInt) {
        case 1:
          c = c1;
          break;
        case 2:
          c = c2;
          break;
        case 3:
          c = c3;
          break;
      }
      drawChar(x,y+i,c);
    }
    drawChar(x,y+(n-1)*charSize,c4);
    drawChar(x,y+n*charSize,c5);
  }
}

function drawChar(x,y,c) {
  fill(c);
  let char = String.fromCharCode(random(33,126));
  text(char,x,y);
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
