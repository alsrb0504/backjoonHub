const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let [_, firPos] = input[0].split(" ");
let [moveX, moveY] = input[1].split(" ").map(Number);

const quadrant = firPos.trimEnd().split("").map(Number);

// 시작 위치.
let x = 0;
let y = 0;

let size = 2 ** quadrant.length;
let sizeY = 2 ** quadrant.length;
let sizeX = 2 ** quadrant.length;

// console.log(quadrant);

function findInitPos(idx, curSize) {
  if (idx === quadrant.length) return;
  // console.log("cur pos :", quadrant[idx]);

  // 현재 사분면
  const curPos = quadrant[idx];

  if (curPos === 1) {
    x += Math.floor(curSize / 2);
  } else if (curPos === 2) {
    // 그냥 넘어감
  } else if (curPos === 3) {
    y += Math.floor(curSize / 2);
  } else {
    y += Math.floor(curSize / 2);
    x += Math.floor(curSize / 2);
  }

  // console.log(`y = ${y}, x = ${x}`);

  findInitPos(idx + 1, curSize / 2);
}

findInitPos(0, size);

// console.log(`y = ${y}, x = ${x}`);

let destY = y + -1 * moveY;
let destX = x + moveX;

// console.log(destY, destX);

// 예외 처리
if (destY < 0 || destY >= size || destX < 0 || destX >= size) {
  console.log(-1);
  return;
}

const result = [];

function findDestPos(curSize) {
  if (curSize === 1) return;

  const halfSize = curSize / 2;

  if (destY < halfSize && destX >= halfSize) {
    destX -= halfSize;
    result.push(1);
  } else if (destY < halfSize && destX < halfSize) {
    result.push(2);
  } else if (destY >= halfSize && destX < halfSize) {
    destY -= halfSize;
    result.push(3);
  } else {
    destY -= halfSize;
    destX -= halfSize;
    result.push(4);
  }
  // console.log(`curSize : ${curSize}`);
  // console.log(destY, destX);
  // console.log(result);

  findDestPos(curSize / 2);
}

findDestPos(size);

console.log(result.join(""));
