const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const [W, H] = input[0].split(" ").map(Number);
const N = Number(input[1]);
const stores = input.slice(2, 2 + N).map((el) => el.split(" ").map(Number));
const [startDir, startPos] = input[2 + N].split(" ").map(Number);
let answer = 0;

const northOrSouth = [1, 2];
const westOrEast = [3, 4];

// dir
// [북, 남, 서, 동] = [1, 2, 3, 4]
for (const [dir, pos] of stores) {
  // 1. start가 북 or 남
  if (northOrSouth.includes(startDir)) {
    // 1-1. 가게가 북 or 남
    if (northOrSouth.includes(dir)) {
      // 1-1-1. 일직선 상에 존재
      if (dir === startDir) {
        answer += Math.abs(startPos - pos);
      }
      // 1-1-2. 반대편에 존재
      else {
        const minDist = Math.min(pos + startPos, W - pos + W - startPos);
        answer += minDist + H;
      }
    }
    // 1-2. 가게가 서 or 동
    else {
      // 1-2-1. 가게가 서
      if (dir === 3) {
        answer += startPos;
      }
      // 1-2-2. 가게가 동
      else {
        answer += W - startPos;
      }

      // 1-2 공통
      // 1-2-3. 시작점이 북
      if (startDir === 1) {
        answer += pos;
      }
      // 1-2-4. 시작점이 남
      else {
        answer += H - pos;
      }
    }
  }
  // 2. 서 or 동
  else {
    // 2-1. 가게가 서 or 동
    if (westOrEast.includes(dir)) {
      // 2-1-1. 일직선 상에 존재
      if (dir === startDir) {
        answer += Math.abs(startPos - pos);
      }
      // 2-1-2. 반대편에 존재
      else {
        const minDist = Math.min(pos + startPos, 2 * H - (pos + startPos));
        answer += minDist + W;
      }
    }
    // 2-2. 가게가 북 or 남
    else {
      // 2-2-1. 가게가 북
      if (dir === 1) {
        answer += startPos;
      }
      // 2-2-2. 가게가 남
      else {
        answer += H - startPos;
      }

      // 2-2 공통
      // 2-2-3. 시작점이 서
      if (startDir === 3) {
        answer += pos;
      }
      // 2-2-4. 시작점이 동
      else {
        answer += W - pos;
      }
    }
  }
}

console.log(answer);
