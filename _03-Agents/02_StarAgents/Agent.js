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

    //Init Agents position with random values and posTo with same value.
    //This is necessary for proximity check to work so a first real target from the list of targets can be chosen.
    this.posCurrent = createVector(floor(random(0,width+1)),floor(random(0,height+1)));
    this.posTo = this.posCurrent.copy();
    this.direction = createVector(0,0);
    this.diff = createVector(0,0);

    //Create some random target points
    for(let i=0;i<this.numberOfTargets;i++){
      this.positions.push(createVector(random(0,width+1),random(0,height+1)));
    }
    //Move speed
    this.multiplier = random(1,5+1);
  }

   draw(){
    this.drawStar(this.posCurrent);

    //Which direction to go
    this.direction = p5.Vector.sub(this.posTo,this.posCurrent);
    this.diff = this.direction.copy()
    this.direction.normalize();
    //If distance to target is greater than mutliplier, apply multiplier, otherwise use normal vector unchanged.
    if(abs(this.direction.x*this.multiplier)<abs(this.diff.x)&&abs(this.direction.y*this.multiplier)<abs(this.diff.y)){
      this.direction = this.direction.mult(this.multiplier);
    }
    this.posCurrent.add(this.direction);

    //Proximity check
    if(this.closeEnough(this.posCurrent,this.posTo,1.0)){
      //Are there any more targets?
      if(this.positions.length>0){
        //Set next target and remove it from the backlog of targets
        this.posTo = this.positions[0].copy();
        this.positions.shift();
      }
    }
  }

  //Proximit < threshold(delta)?
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
