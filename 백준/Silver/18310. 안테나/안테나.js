const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = nums[0];
let dist = 0;
let min_dist = 0;

for (let i = 1; i < N; i++) {
  const diff = nums[i] - nums[0];
  dist += diff;
}

min_dist = dist;

for (let i = 1; i < N; i++) {
  const diff = nums[i] - nums[i - 1];

  dist -= diff * (N - i);
  dist += diff * i;

  if (min_dist > dist) {
    min_dist = dist;
    answer = nums[i];
  }
}

console.log(answer);