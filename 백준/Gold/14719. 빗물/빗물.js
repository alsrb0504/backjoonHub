const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, N] = input[0].split(" ").map(Number);
const walls = input[1].split(" ").map(Number);
let answer = 0;

let [isEnd, lastIdx] = solution(walls);

if (!isEnd) {
  const reverseWalls = walls.slice(lastIdx).reverse();
  solution(reverseWalls);
}

console.log(answer);

function solution(arr) {
  let acc = 0;
  let top = 0;
  let topIdx = 0;

  arr.forEach((wall, idx) => {
    if (top <= wall) {
      answer += acc;
      top = wall;
      topIdx = idx;
      acc = 0;
    } else {
      acc += top - wall;
    }
  });

  if (topIdx === N - 1) return [true, topIdx];
  return [false, topIdx];
}
