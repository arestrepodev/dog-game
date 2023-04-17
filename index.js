import { animationsStates, spriteAnimations } from "./constants.js";
const $ = (name) => document.querySelector(name)
const $canvas1 = $("#canvas1");
const ctx = $canvas1.getContext("2d");

const CANVAS_WIDTH = $canvas1.width = 600;
const CANVAS_HEIGHT = $canvas1.height = 600;

let playerState = "idle";
const dropDownAnimation = $("#animations");
dropDownAnimation.addEventListener("change", (e) => { 
  playerState = e.target.value;
})
const playerImage = new Image();
playerImage.src = "./assets/shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrame = 6;

animationsStates.forEach((state, index) => { 
  let frames = {
    loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x: positionX, y: positionY});
  }
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);


function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position = Math.floor(gameFrame/staggerFrame) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();