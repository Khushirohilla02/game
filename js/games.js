const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
//canvas.style.background="#ff8";
canvas.style.backgroundImage = "url('../images/background.png')";

//PLAYER CREATION CLASS
let newoffset=0;
let offset = 0;
let gravity = 0.5;
class Platform {
  constructor(x, y, width, height,image) {
    this.position = { x: x, y: y };
    this.width = width;
    this.height = height;
    this.image = image;

  }
  draw() {
    //context.fillStyle = "black";
    //context.fillRect(this.position.x, this.position.y, this.width, this.height);
   context.drawImage(this.image,this.position.x,this.position.y);
  }
}
class Player {
  constructor(x, y) {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 1 };
    this.width = 30;
    this.height = 30;
  }
  draw() {
 /* if (this.velocity.x == 0 && this.velocity.y == 0) {
        context.drawImage(imgStandR, 0, 0,174,400,this.x,this.y,this.width,this.height );
 }
    if (this.velocity.x > 0) { context.drawImage(imgMoveR,   0,  0,   340,  400,  this.x, this.y, this.width, this.height);}
 if (this.velocity.x < 0) {  context.drawImage(   imgMoveL,    0,
      0,
        340,
        400,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    if (this.velocity.x == 0 && this.velocity.y == 0) {
      context.drawImage(
        imgStandL,
        0,
        0,
        174,
        400,
        this.x,
        this.y,
        this.width,
        this.height
      );*/

    //context.fillStyle = "red";
    context.fillRect(this.position.x+newoffset,this.position.y,this.width,this.height);
  }

  update() 
  {
  
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }

    //PLATFORM STOP LOGIC
    /*
(this.position.y+this.height+this.velocity.y)>=platform.position.y&&
    (this.position.y+this.height+this.velocity.y)<this.position.y+20)
    */
  
    for (let i = 0; i < platforms.length; i++) {

      if (
        (this.position.x >= platforms[i].position.x) &&
        (this.position.x + this.width-20<=
          platforms[i].position.x + platforms[i].width) &&
       (this.position.y + this.height+this.velocity.y>=platforms[i].position.y )&&
        (this.position.y + this.height<=platforms[i].position.y+platforms[i].height)&&(this.position.y=platforms[i].position.y-this.height)
       )
       {
      this.velocity.y=0;
      }
      if((this.position.x+this.width+this.velocity.x>=platforms[i].position.x)&&
        (this.position.x<=platforms[i].position.x+platforms[i].width)&&
      (this.position.y+this.height>=platforms[i].position.y)&&
      (this.position.y<=platforms[i].position.y+platforms[i].height))
    
{
  this.velocity.x=0;
}
    
      
      
      
      
     platforms[i].position.x += offset;
    }

    //HORIZONTAL STOP LOGIC
   /*if((this.position.x+this.width)>=platforms[i].position.x&&
this.position.y<=platforms[i].position.y&&
this.position.y>=platforms[i].position.y+platforms[i].height)
{
    this.velocity.x=0;
}*/
    //MOVEMENT
    //platforms[i].position.x+=offset;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.draw();
  }
} 
function moveoffset(x) {
  offset = x;
}

//MAIN LOGIC
//CREATE IMAGES
let platforms = [];
const imgStandR = new Image();
const imgStandL = new Image();
const imgMoveR = new Image();
const imgMoveL = new Image();
const backImage = new Image();
const platformImage = new Image();
const platformSmallImage=new Image();
total = 6;
imgStandR.src = "images/spritesStandRight.png";
 imgStandL.src = "images/spritesStandLeft.png";
 imgMoveR.src = "images/spritesRunRight.png";
 imgStandL.src = "images/spritesRunLeft.png";

backImage.src = "../images/hills.png";



 platformImage.src = "../images/platform.png";
 platformSmallImage.src="../images/platformSmallTall.png";

imgStandL.onload = picture;
imgStandR.onload = picture;
imgMoveL.onload = picture;
imgMoveR.onload = picture;

function picture() {
  total--;
  if (total == 0) {
    gameAnimation();
  }
}


const platform=new Platform(0,canvas.height-platformImage.height,platformImage.width,platformImage.height,platformImage);
platform.draw();
const platform1=new Platform(platformImage.width-1,canvas.height-platformImage.height,platformImage.width,platformImage.height,platformImage);
platform1.draw();
const platform2=new Platform(platformImage.width*2+120,canvas.height-platformImage.height,platformImage.width,platformImage.height,platformImage);
platform2.draw();
const platform3=new Platform(600,165,platformSmallImage.width,platformSmallImage.height,platformSmallImage);
platform3.draw();
platforms.push(platform);
platforms.push(platform1);
platforms.push(platform2);
platforms.push(platform3);

//console.log(platforms.length)
const player = new Player();
player.draw();

//ANIMATION FRAME
let startposition = 0;
function gameAnimation() {
  requestAnimationFrame(gameAnimation);
  context.clearRect(0, 0, canvas.width, canvas.height);
  //context.drawImage(backImage,0,0);

  //  platform.draw();
  // platform1.draw();
  startposition = startposition + offset;
  context.drawImage(backImage, startposition, 0);
 
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }
  player.update();
}

gameAnimation();
//EVENT HANDLING
addEventListener("keydown", function (e) {
  if (e.key == "ArrowUp") {
    //if (player.position.y + player.height > canvas.height - 5)
      player.velocity.y = -14;
  }
  if (e.key == "ArrowRight") {
    player.velocity.x = 4;
    moveoffset(-5);
  }
  if (e.key == "ArrowLeft") {
    player.velocity.x = -4;

    moveoffset(5);
  }
})
addEventListener("keyup", function (e) {
  if (e.key == "ArrowRight") {
    player.velocity.x = 0;
    moveoffset(0);
  }

  if (e.key == "ArrowLeft") {
    player.velocity.x = 0;
    moveoffset(0);
  }
})
