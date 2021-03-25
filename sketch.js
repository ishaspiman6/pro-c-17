var towerImage
var tower 
var ghost
var ghostImage
var gameState ="play"
var climbersGroup
var doorsGroup
var invisibleBlockGroup





function preload(){
 towerImage = loadImage("tower.png") 
  ghostImage = loadImage ("ghost-jumping.png")
  doorImage = loadImage ("door.png")
  climberImage = loadImage("climber.png")
}




function setup() {
  createCanvas(600, 600);
tower = createSprite(300,300,600,600)
 tower.addImage(towerImage)
tower.velocityY = 1
  
  

  ghost = createSprite(300,300,15,15)
ghost.addImage(ghostImage)
ghost.scale = 0.4


invisibleBlockGroup = new Group();
doorsGroup = new Group();
  climbersGroup = new Group();


ghost.debug = true
ghost.setCollider("rectangle",0,0,150,150)
}



function draw() {

  if(tower.y > 400){
  tower.y = 300
  }
  
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
  
   spawnDoors();
  
  }
if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
  
  
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
 tower.destroy();
  doorsGroup.destroyEach();
 climbersGroup.destroyEach();
 invisibleBlockGroup.destroyEach();
  
  }
  
  
  
  
  
  
  
  
  
  
 
drawSprites()
}


function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
  
    ghost.depth = door.depth;
    ghost.depth +=1;
   door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;


   doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  
  
  
  }
}