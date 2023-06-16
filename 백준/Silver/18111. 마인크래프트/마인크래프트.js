const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W, B] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.split(" ").map(Number));
let answer = Infinity;
let maxAnswerHeight = 0;

let currSum = 0;

for (let i = 0; i < H; i++) {
  currSum += map[i].reduce((acc, cur) => acc + cur, 0);
}

for (let i = 0; i <= currSum + B; i++) {
  const result = calcCost(i);
  if (result === Infinity) break;

  if (answer >= result) {
    answer = result;
    maxAnswerHeight = i;
  }
}

console.log(answer, maxAnswerHeight);

function calcCost(std) {
  let ableBlock = B;
  let cost = 0;

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (map[i][j] > std) {
        cost += 2 * (map[i][j] - std);
        ableBlock += map[i][j] - std;
      }
    }
  }

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (map[i][j] < std) {
        cost += std - map[i][j];
        ableBlock -= std - map[i][j];
      }
    }
  }

  if (ableBlock < 0) return Infinity;
  return cost;
}