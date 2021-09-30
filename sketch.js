var tower,towerImage;
var climber,climberImage,climberGroup;
var door,doorImage,doorGroup;
var ghost,ghostImage;
var invisibleblockGroup,invisibleBlock;
var gameState="play";
function preload(){
  
  towerImage=loadImage("tower.png");
  
  doorImage=loadImage("door.png");
  
  climberImage=loadImage("climber.png");
  
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.4;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleblockGroup=new Group();
}

function draw(){
  background(0);
  
  if(gameState==="play"){
     if(tower.y>400){
     tower.y=300
     }
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-3
     }
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+3
     }
  if(keyDown("space")){
     ghost.velocityY=-5;
     }
  ghost.velocityY=ghost.velocityY+0.8;
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
  
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy();
    gameState="end";
     }
  
  spawnDoors();
  
  drawSprites();
     }
  
  if(gameState==="end"){
     stroke("green")
    fill("blue")
    textSize(30)
    text("GAME OVER",200,300)
      
     }
}

function spawnDoors(){
  if(frameCount%300===0){
     var door =createSprite(200,-50);
    door.addImage(doorImage);
    var climber=createSprite(200,10);
    climber.addImage(climberImage);
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.height=2;
    invisibleBlock.width=climber.width;
    door.x=Math.round(random(120,400));
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    door.velocityY=1;
    climber.x=door.x;
    climber.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth+=1
    climber.lifetime=590;
    door.lifetime=590;
    climberGroup.debug=true
    invisibleblockGroup.add(invisibleBlock);
    doorGroup.add(door);
    climberGroup.add(climber);
     }
}