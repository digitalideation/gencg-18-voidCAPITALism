class Agent{
  constructor(numberOfTargets) {
    this.deg = 0;
    this.positions = [];
    this.posTo;
    this.posCurrent;
    this.direction;
    this.multiplier;
    this.numberOfTargets = numberOfTargets;
    this.c1 = color('#591ab8');
    this.c2 = color('#a81ab8');
    this.c3 = color('#1a2ab8');
    angleMode(DEGREES);


    this.posCurrent = createVector(floor(random(0,windowWidth+1)),floor(random(0,windowHeight+1)));
    this.posTo = this.posCurrent.copy();
    this.direction = createVector(0,0);
    this.diff = createVector(0,0);

    for(let i=0;i<this.numberOfTargets;i++){
      this.positions.push(createVector(random(0,windowWidth+1),random(0,windowHeight+1)));
    }

    this.multiplier = random(1,5+1);
  }

   draw(){
    this.drawStar(this.posCurrent);
    this.direction = p5.Vector.sub(this.posTo,this.posCurrent);
    this.diff = this.direction.copy()
    this.direction.normalize();
    if(abs(this.direction.x*this.multiplier)<abs(this.diff.x)&&abs(this.direction.y*this.multiplier)<abs(this.diff.y)){
      this.direction = this.direction.mult(this.multiplier);
    }
    this.posCurrent.add(this.direction);
    if(this.closeEnough(this.posCurrent,this.posTo,1.0)){
      if(this.positions.length>0){
        this.posTo = this.positions[0].copy();
        this.positions.shift();
      }
    }
  }

  closeEnough(posCurrent,posTo,delta){
    let diffX = abs(posCurrent.x - posTo.x);
    let diffY = abs(posCurrent.y - posTo.y);

    return diffX<delta && diffY<delta
  }

  drawStar(pos){
    push();
    stroke(this.c1)
    translate(pos.x,pos.y);
    rotate(this.deg);
    line(0,0,0,50);
    pop();

    push();
    stroke(this.c2)
    translate(pos.x,pos.y);
    rotate(this.deg+120);
    line(0,0,0,50);
    pop();

    push();
    stroke(this.c3)
    translate(pos.x,pos.y);
    rotate(this.deg+240);
    line(0,0,0,50);
    pop();

    this.deg+=1;
  }
}
