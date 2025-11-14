let scene = 0;
let index = 0;
let offsetX = 0
let offsetY = 0;

let bg;
let imgzom;
let imgstart;

let heartX =430, heartY =60,heartW =120, heartH= 120;
let armX=430, armY = 200, armW =120, armH = 120;
let zombieX = 10, zombieY = 120, zombieW = 250, zombieH = 200;

let changedToHeart = false;
let changedToArm = false;
let draggingHeart = false;
let draggingArm = false;

let bugs = [];
let numBugs = 10;

let smushImg;
let winImg;
let loseImg;

let win = false;
let lose = false;

let scene1TimeLeft = 10;

let buttons = [
  {x: 330, y: 280, size: 50, fill: [94, 180, 17], textCol: [133, 42, 35]},
//{x: 300, y: 300, size: 60, fill: [94, 180, 17]},
//{x: 250, y: 300, size: 70, fill: [94, 180, 17],} //ADD TEXT START OVER
];

function preload() {
  bg = loadImage("https://static.vecteezy.com/system/resources/previews/029/784/761/original/brain-seamless-pattern-texture-background-vector.jpg");
  imgzom = loadImage("zombieface.png");
  imgstart = loadImage("starting zombie.png");
  imgheart = loadImage("heart zombie.png");
  imgarm = loadImage("arm zombie.png");
  imgstart_heart = loadImage("sec zombie.png");
  imgstart_arm = loadImage("final zombie.png");
  imgstart_full = loadImage("final zombie.png");
  imgroom = loadImage("room.jpg");
  imgbug = loadImage("bug.png");
  imgtable = loadImage("table.jpg");
  imgborder = loadImage("border.png");
  imgsceneborder = loadImage("sceneborder.png");
  smushImg = loadImage("smush.png");
  winImg = loadImage("win.jpg");
  loseImg = loadImage("lose.jpg");
}

let texts = [
  "Morning Already? (1/4)",
  "I don’t feel whole. (2/4)",
  "Maybe it's because I'm missing some parts... (3/4)",
  "Can you help me find them? (4/4)"
];

function setup() {
  createCanvas(600, 400); //shoudve made this larger
  textAlign(CENTER, CENTER);
  textSize(24);

  for (let i = 0; i< numBugs; i++) {
    bugs.push({
      x: random(50, width- 100),
      y: random(50, height- 100),
      w: 60,
      h: 60,
      clicked: false //watched vid regarding how to do the click stuff...starts at false because the bugs are going to be clicked (hopefully)
    });
  } 
}

function draw() {
  switch (scene) {
    case 0:
      background(bg);
      push();
      noStroke();
      fill(211, 230, 225);
      rect(55, 175, 500, 50);
      pop();
      image(imgsceneborder,-200,-200, width +695, height +575);
      image(imgzom, -110, 55, width -160, height -130);
      fill(94, 180, 17);
      text('Tip: hit spacebar for text', 355, 250);
      text(texts[index], width /2 +60, height /2);

      let b0 = buttons[0]; 

      fill(b0.fill);
      noStroke();
      rect(b0.x,b0.y, b0.size,b0.size, 10);
      fill(b0.textCol);
      textSize(16);
      textAlign(CENTER, CENTER);
      text("Start", b0.x + b0.size / 2, b0.y + b0.size / 2);

      break;

    //gamepart
    case 1:
      push();
      image(imgtable, 0, 0, width, height);
      pop();
      push();
      image(imgsceneborder, -200, -200, width + 695, height + 575);
      pop();
      fill(255);
      textSize(15);
      text("Tip: click roaches to smush", 500, 390);
      image(imgborder, -170, -20, width - 15, height - 250);

      if (frameCount % 60=== 0 && scene1TimeLeft> 0) { 
      scene1TimeLeft--; // used refrence. subtracts 1 everysecond (60 frames) if the time num is greater than one.
      } 
      push();
      textSize(25);
      fill(94, 180, 17);
      text("Time:"+ scene1TimeLeft, 110,55);
      pop();

      if (!win&&!lose){
      for (let b of bugs) {
        if (!b.clicked) { //only non-clicked bugs move
          b.x += random(-15, 15);
          b.y += random(-15, 15);
          b.x =constrain(b.x, 0, width-b.w);
          b.y = constrain(b.y, 0, height-b.h);
        }

    image(b.clicked? smushImg:imgbug, b.x,b.y,b.w, b.h);
      }} //change image on click

      //win
      if (!win && bugs.every(b => b.clicked)) {
      win = true;
      }

      if (win) {
      imageMode(CENTER);
      image(winImg, width/ 2, height/ 2, 300, 200);
      imageMode(CORNER);
        push();
        fill("white");
        textSize(20);
        text('You collected:', 305, 130);
        pop();
        push();
        textSize(10);
        text('a cold heart', 240, 240);
        text('a strangely green arm', 340, 240);
        pop();
        push();
        textSize(10);
        fill(94, 180, 17);
        text('press spacebar to continue', 305, 285);
        pop();
      }

      if (!win && scene1TimeLeft <= 0 && !bugs.every(b => b.clicked)) {
        lose = true;
      }

      if (lose) {
        image(loseImg, 100, 90, width-200, height-180);
        push();
        textSize(25);
        fill(94, 180, 17);
        text('GAME OVER', 300, 200);
        pop();
      }

      break;

    //room
    case 2:
      image(imgroom, 0, 0, width, height);
      image(imgsceneborder, -200, -200, width + 695, height + 575);
      image(imgborder, -150, 25, width - 50, height - 10);

      if (changedToHeart && changedToArm) {
        image(imgstart_full, 10, 120, 250, 200);
      } else if (changedToHeart) {
        image(imgstart_heart, 10, 120, 250, 200);
      } else if (changedToArm) {
        image(imgstart_arm, 10, 120, 250, 200);
      } else {
        image(imgstart, 10, 120, 250, 200);
      }

      textSize(15);
      fill(63, 22, 97);
      text('make me whole!', 117, 340);

      if (!changedToHeart) image(imgheart, heartX, heartY, heartW, heartH);
      if (!changedToArm) image(imgarm, armX, armY, armW, armH);

      if (draggingHeart) {
        heartX = mouseX + offsetX;
        heartY = mouseY + offsetY;
      }

      if (draggingArm) {
        armX = mouseX + offsetX;
        armY = mouseY + offsetY;
      }

      break;
  }
}

function keyPressed() {
  if (scene=== 0 && key === ' '){
    index++;
    if (index >= texts.length) {
      index = 0;
      scene = 1;
 }}
  else if (scene === 1 && win) {
    scene = 2;
  }
}
function mousePressed() {
  if (scene === 0) {
    let b = buttons[0];
    if (
      mouseX > b.x && mouseX < b.x + b.size &&
      mouseY > b.y && mouseY < b.y + b.size)
       {scene = 1;
      return;
    }
  }

  //dragging part
  
  //heart
  if (scene === 2 &&!changedToHeart &&
    mouseX > heartX && mouseX < heartX + heartW &&
    mouseY > heartY && mouseY < heartY + heartH) {
    draggingHeart= true;
    offsetX= heartX -mouseX;
    offsetY = heartY -mouseY;
  }

  //arm
  if (scene === 2 &&
    !changedToArm &&
    mouseX > armX && mouseX <armX + armW &&
    mouseY > armY && mouseY <armY +armH){
    draggingArm = true;
    offsetX= armX -mouseX;
    offsetY = armY -mouseY;
  }

  if (scene === 1 && !win && !lose) {
    for (let b of bugs) {
      if (
        !b.clicked &&
        mouseX > b.x && mouseX < b.x + b.w &&
        mouseY > b.y && mouseY < b.y + b.h
      ) {
        b.clicked = true;
        break;
      }
      }
 
    }
}

function mouseReleased() { //refrenced and edited. works because if heart or arm are in contact with the zombie and the zombie changes images succsesfully, the dragging function will end. 
  if (draggingHeart) {
    if (heartX + heartW > zombieX && heartX < zombieX + zombieW &&
      heartY + heartH > zombieY && heartY < zombieY + zombieH) {
      changedToHeart = true;
    }
  }
  if (draggingArm) {
  if (armX + armW > zombieX && armX < zombieX + zombieW &&
    armY + armH > zombieY && armY < zombieY + zombieH){
    changedToArm = true;
 }
  }
  draggingHeart = false;
  draggingArm = false;
}
