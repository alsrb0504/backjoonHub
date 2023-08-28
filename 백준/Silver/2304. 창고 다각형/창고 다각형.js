const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = input
  .slice(1, 1 + N)
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

let answer = 0;

let max = 0;
let maxCnt = 0;

for ([_, y] of nums) {
  max = Math.max(max, y);
}

for ([_, y] of nums) {
  if (y === max) maxCnt++;
}

// if (maxCnt === 1) {
let prev = [0, 0];

for (const [x, y] of nums) {
  if (prev[1] > y) continue;

  if (y === max) {
    answer += (x - prev[0]) * prev[1];
    break;
  }

  answer += (x - prev[0]) * prev[1];
  prev = [x, y];
}

answer += max;
prev = [1001, 0];

for (let i = nums.length - 1; i >= 0; i--) {
  const [x, y] = nums[i];

  if (prev[1] > y) continue;

  if (y === max) {
    answer += (prev[0] - x) * prev[1];
    break;
  }

  answer += (prev[0] - x) * prev[1];
  prev = [x, y];
}

if (maxCnt !== 1) {
  const topX = [];

  for (const [x, y] of nums) {
    if (y === max) topX.push(x);
  }

  answer += (topX.at(-1) - topX[0]) * max;
}

console.log(answer);
