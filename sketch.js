
var ironmanImg, ironman;
var bg, backgroundImg;
var brick, brickImg, bricksGroup, generateBricks;
var diamond, diamondGroup, generateDiamonds, diamondImg;
var diamondScore;

function preload() {
  bgImg = loadImage("images/bg.jpg");
  ironmanImg = loadImage("images/iron.png");
  brickImg = loadImage("images/stone.png");
  diamondImg = loadImage("images/diamond.png");
}

function setup() {
  createCanvas(1000, 600);
  //create background sprite
  bg = createSprite(580, 300);
  bg.addImage(bgImg);
  bg.scale = 2;
  ironman = createSprite(200, 490);
  ironman.addImage(ironmanImg);
  ironman.scale = 0.3;
  ironman.debug = true;
  ironman.setCollider("rectangle", 100, 0, 200, 400);
  bricksGroup = new Group();
  diamondGroup = new Group();


}

function draw() {

  if (keyDown("up")) {
    ironman.velocityY = -10;
  }
  if (keyDown("left")) {
    ironman.x = ironman.x - 5;
  }
  if (keyDown("right")) {
    ironman.x = ironman.x + 5;
  }
  ironman.velocityY = ironman.velocityY + 0.5;

  if (ironman.x < 200) {
    ironman.x = 200;
  }
  //prevent mario moving out from top
  if (ironman.y < 50) {
    ironman.y = 50;
  }

  //gravity
  ironman.velocityY = ironman.velocityY + 0.5;

  //call the function to generate bricks
  generateBricks();

  for (var i = 0; i < (bricksGroup).length; i++) {
    var temp = (bricksGroup).get(i);

    if (temp.isTouching(ironman)) {
      ironman.collide(temp);
    }
  }

  for (var i = 0; i < (diamondGroup).length; i++) {
    var temp = (diamondGroup).get(i);

    if (temp.isTouching(ironman)) {
      diamondScore++;
      temp.destroy();
      temp = null;
    }
  }



  generateDiamonds();
  drawSprites();
}
function generateBricks() {
  if (frameCount % 50 === 0) {
    var brick = createSprite(1200, 120, 40, 10);
    brick.y = random(50, 450);
    brick.addImage(brickImg);
    brick.scale = 0.5;
    brick.velocityX = -4;
    brick.lifetime = 250;
    bricksGroup.add(brick);
  }
}
function generateDiamonds() {
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200, 120, 40, 10);
    diamond.y = random(80, 350);
    diamond.addImage(diamondImg);
    diamond.scale = 0.5;
    diamond.velocityX = -5;
    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
  }
}
