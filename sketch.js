var boy,edges;
var obstacle, boost;
var background,bg;
var score = 0,a;
var gameState = "play";

function preload(){
    boyImage = loadImage("boy.png");
    backgroundImage = loadImage("city.png");
    obstacleImage = loadImage("obstacle.png");
    boostImage = loadImage("arrow.png");
}


function setup(){
    canvas = createCanvas(1350,600);
    bg = createSprite(700,170);
    bg.addImage(backgroundImage);
    bg.velocityX = -7;
    bg.scale = 3;
    boy = createSprite(100,400,50,50);
    boy.addImage(boyImage);
    boy.scale = 0.2;
    boostGroup = new Group();
    obstacleGroup = new Group();
    a = createSprite(200,400);
    a.visible = false;
}

function draw() {
    background("bg");

    if(gameState === "play"){
        score = score+Math.round(frameCount/60);

        if(bg.x<600){
            bg.x = 760;
        }
        
        if(keyDown("space") && boy.y>450){
            boy.velocityY = -10;
        }

        boy.velocityY = boy.velocityY+0.5;

        speedUp();
        obstacles();

        if(obstacleGroup.isTouching(boy)){
           gameState = "end";
           boy.velocityY = 0;
        }
    
        
    fill ("purple");
    textSize(30);
    text ("Score:"+score,width-350,100);
    edges = createEdgeSprites();
    boy.collide(edges[3]);
    
    drawSprites();
}

if(gameState === "end"){
    fill ("red");
    textSize(60);
    text("Gameover",width-800,350);
    score = 0;
}
}
function speedUp(){
    if(frameCount%100 === 0){
    boost = createSprite(1350,440,77,50);
    boost.y = Math.round(random(300,500))
    boost.velocityX = -(1+score/100);
    boost.addImage(boostImage);
    boost.scale = 0.2;
    boost.lifetime = 193;
    boostGroup.add(boost);
    }
}

function obstacles(){
    if(frameCount%150 === 0){
        obstacle = createSprite(1350,440,77,50);
        obstacle.y = Math.round(random(100,600));
        obstacle.velocityX = -(1+score/60);
        obstacle.addImage(obstacleImage);
        obstacle.scale = 0.2;
        obstacle.lifetime = 193;
        obstacleGroup.add(obstacle);
        }
}