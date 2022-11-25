const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const K = Number(input[1]);
const censors = [...new Set(input[2].split(" ").map(Number))].sort(
  (a, b) => a - b
);

// 예외처리 : 0
const diff = [0];
let prev = censors[0];

for (let i = 1; i < censors.length; i++) {
  const curr = censors[i];
  const next_dist = curr - prev;

  diff.push(next_dist);
  prev = curr;
}

diff.sort((a, b) => a - b);

for (let i = 0; i < K - 1; i++) {
  diff.pop();
}

// console.table(diff);

const sum = diff.reduce((acc, cur) => acc + cur, 0);
console.log(sum);