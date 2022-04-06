// document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector(".grid");
const robo = document.createElement("div");
let startPoint = 150;
let roboLeftSpace = 50;
let roboBottomSpace = startPoint;
let platformCount = 5;
let isGameOver = false;
let platforms = [];
let upTimeId;
let downTimeId;
let isJumping = true;
let isGoingLeft = false;
let isGoingRight = false;
let leftTimerId;
let rightTimerId;
let score = 0;

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
      if (platform.bottom < 10) {
        let firstPlatform = platforms[0].visual;
        firstPlatform.classList.remove("platform");
        //   shift will get rid of first item in platforms array
        platforms.shift();
        console.log(platforms);
        let newPlatform = new Platform(600);
        platforms.push(newPlatform);
        score++;
        console.log(score);
      }
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
    if (roboBottomSpace > startPoint + 200) {
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
        roboBottomSpace >= platform.bottom &&
        roboBottomSpace <= platform.bottom + 15 &&
        roboLeftSpace + 60 >= platform.left &&
        roboLeftSpace <= platform.left + 85 &&
        !isJumping
      ) {
        console.log("landed");
        startPoint = roboBottomSpace;
        jump();
      }
    });
  }, 30);
}

function gameOver() {
  console.log("GAME OVER");
  isGameOver = true;
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  grid.innerHTML = score;
  clearInterval(upTimeId);
  clearInterval(downTimeId);
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
}

// function to control robo with keys
function control(e) {
  if (e.key === "ArrowLeft") {
    moveLeft();
  } else if (e.key === "ArrowRight") {
    moveRight();
  } else if (e.key === "ArrowUp") {
    moveStraight();
  }
}

function moveLeft() {
  if ((isGoingRight = true)) {
    isGoingRight = false;
    clearInterval(rightTimerId);
  }
  isGoingLeft = true;
  leftTimerId = setInterval(function () {
    if (roboLeftSpace >= 0) {
      roboLeftSpace -= 5;
      robo.style.left = roboLeftSpace + "px";
    } else {
      moveRight();
    }
  }, 30);
}

function moveRight() {
  if ((isGoingLeft = true)) {
    isGoingLeft = false;
    clearInterval(leftTimerId);
  }
  isGoingRight = true;
  rightTimerId = setInterval(function () {
    if (roboLeftSpace <= 340) {
      roboLeftSpace += 5;
      robo.style.left = roboLeftSpace + "px";
    } else {
      moveLeft();
    }
  }, 30);
}

function moveStraight() {
  isGoingLeft = false;
  isGoingRight = false;
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
}

function start() {
  if (!isGameOver) {
    createPlatforms();
    createRobo();
    setInterval(movePlatforms, 30);
    jump();
    document.addEventListener("keydown", control);
  }
}
//create start button to attach
start();
// })
