// document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector(".grid");
const robo = document.createElement("div");
let roboLeftSpace = 50;
let roboBottomSpace = 150;
let platformCount = 5;
let isGameOver = false;
let platforms = [];
let upTimeId;
let downTimeId;
let isJumping = true;

function createRobo() {
  grid.appendChild(robo);
  robo.classList.add("robo");
  // below ensures that robo starts above first platform when crated
  roboLeftSpace = platforms[0].left;
  robo.style.left = roboLeftSpace + "px";
  robo.style.bottom = roboBottomSpace + "px";
}

class Platform {
  constructor(newPlatformBottom) {
    this.bottom = newPlatformBottom;
    this.left = Math.random() * 315;
    this.visual = document.createElement("div");

    const visual = this.visual;
    visual.classList.add("platform");
    visual.style.left = this.left + "px";
    visual.style.bottom = this.bottom + "px";
    grid.appendChild(visual);
  }
}

function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platformGap = 600 / platformCount;
    let newPlatformBottom = 100 + i * platformGap;
    let newPlatform = new Platform(newPlatformBottom);
    platforms.push(newPlatform);
    console.log(platforms);
  }
}

function movePlatforms() {
  if (roboBottomSpace > 200) {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + "px";
    });
  }
}

//everything in this function happens every 30 miliseconds
function jump() {
  clearInterval(downTimeId);
  isJumping = true;
  upTimeId = setInterval(function () {
    roboBottomSpace += 20;
    robo.style.bottom = roboBottomSpace + "px";
    if (roboBottomSpace > 350) {
      fall();
    }
  }, 30);
}

function fall() {
  clearInterval(upTimeId);
  isJumping = false;
  downTimeId = setInterval(function () {
    roboBottomSpace -= 5;
    robo.style.bottom = roboBottomSpace + "px";
    if (roboBottomSpace <= 0) {
      gameOver();
    }
    // all below conditions must be true for robo to land on platform
    platforms.forEach((platform) => {
      if (
        roboLeftSpace >= platform.bottom &&
        roboBottomSpace <= platform.bottom + 15 &&
        roboLeftSpace + 60 >= platform.left &&
        roboLeftSpace <= platform.left + 85 &&
        !isJumping
      ) {
          console.log('landed')
          jump()
      }
    });
  }, 30);
}

function gameOver() {
  console.log("GAME OVER");
  isGameOver = true;
  clearInterval(upTimeId);
  clearInterval(downTimeId);
}

// function to control robo with keys
function control(e) {
  if (e.key === "leftArrow") {
    // move left
  } else if (e.key === "rightArrow") {
    // move right
  } else if (e.key === "upArrow") {
    // move up
  }
}

function start() {
  if (!isGameOver) {
    createPlatforms();
    createRobo();
    setInterval(movePlatforms, 30);
    jump();
  }
}
//create start button to attach
start();
// })
