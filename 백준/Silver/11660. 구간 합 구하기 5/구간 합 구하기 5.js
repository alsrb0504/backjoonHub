const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const nums = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number));
const sums = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));

const result = [];

for (let i = 1; i <= N; i++) {
  let lineSum = 0;

  for (let j = 1; j <= N; j++) {
    lineSum += nums[i - 1][j - 1];
    sums[i][j] = lineSum;
  }
}

input.slice(1 + N, 1 + N + M).forEach((line) => {
  const [y1, x1, y2, x2] = line.split(" ").map((el) => Number(el));
  let subSum = 0;
  for (let i = y1; i <= y2; i++) {
    subSum += sums[i][x2] - sums[i][x1 - 1];
  }

  result.push(subSum);
});

console.log(result.join("\n").trimEnd());