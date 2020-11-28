var Tower, towerImage, Ghost, ghostImage, Door, doorImage, Climber, climberImage;
var invisibleBlock, Sound;
var climberGroup, doorGroup, ic, icGroup;
var gameState = "PLAY";


function preload(){
  
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  
  Sound = loadSound("spooky.wav");
  
}


function setup(){
  
  createCanvas(600,600);

  Tower = createSprite(300,300,100,100);
  Tower.addImage(towerImage);
  Tower.velocityY = 1;
  
  invisibleBlock = createSprite(300,500,100,3);
  invisibleBlock.visible = false;
  
  Ghost = createSprite(300,200,50,50);
  Ghost.addImage(ghostImage);
  Ghost.scale = 0.4;
  Ghost.setCollider("rectangle", 0,0,180,250); 
  
  doorGroup = new Group();
  climberGroup = new Group();
  icGroup = new Group();
}

function draw(){
  background("black");
  
  if(gameState==="PLAY"){
  
  Sound.play();
  
  if(Tower.y>500){
    Tower.y=300;
  }
  
  if(keyDown("space")){
    Ghost.velocityY = -3;
    invisibleBlock.destroy();
  }
  
  if(keyDown("left_arrow")){
    Ghost.x=Ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    Ghost.x=Ghost.x+3;
  }
  
  Ghost.velocityY=Ghost.velocityY+0.3;
  Ghost.collide(invisibleBlock);
  Ghost.collide(climberGroup);
  
  if(climberGroup.isTouching(Ghost)){
    Ghost.velocityY = 0;
  }
  if(Ghost.y>600 || icGroup.isTouching(Ghost)){
    gameState = "END";
  }
  spawnDoors();
  }
  
  if(gameState==="END"){
    textSize(30);
    fill("Yellow")
    text("GAME OVER", 220,300)
    Ghost.destroy(); 
    icGroup.destroyEach();
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    Tower.destroy();
  }
  
  
  
  drawSprites();
}



function spawnDoors(){
  if(frameCount % 240 === 0){
  Door = createSprite(Math.round(random(100,500)),100,50,50);
  Door.addImage(doorImage);
  Door.velocityY = 1;
  
  Climber = createSprite(100,150,10,10);
  Climber.addImage(climberImage);
  Climber.velocityY = 1;
  Climber.x=Door.x;
  Ghost.depth=Door.depth;
  Ghost.depth=Ghost.depth+1
  ic = createSprite(100,180,100,3);
  ic.x = Climber.x;
  ic.velocityY = 1;
  ic.visible= false;
  
    
  doorGroup.add(Door);
  climberGroup.add(Climber);
  icGroup.add(ic);
    
  doorGroup.lifetime = 600;
  climberGroup.lifetime = 600;
  }
}
