var dogUp, dogDown;
var database;
var foodS, foodStock;
var dogUpImg, dogDownImg;
var count;

function preload(){
  dogUpImg = loadImage("images/dogImg.png");
  dogDownImg = loadImage("images/dogImg1.png");
}

function setup() {
  database= firebase.database();
  createCanvas(500, 500);
  
  //count = 20;
  
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogUpImg);
  dog.scale= 0.25;

  
  foodStock= database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogDownImg);
  }


  drawSprites();

  textSize(20);
  stroke(2);
  fill("black");
  text("Food Stock: "+ foodS, 170, 150);

  text("Note: Press up arrow key to feed milk", 90, 50);
}


function readStock(data){
  foodS= data.val();
}

function writeStock(x){
  if(x < 0){
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    Food:x
  })
}

