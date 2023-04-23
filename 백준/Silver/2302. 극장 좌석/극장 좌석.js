const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const fixed = [];
let answer = 1;

const dp = new Array(41).fill(1);
dp[2] = 2;

for (let i = 3; i <= 40; i++) dp[i] = dp[i - 2] + dp[i - 1];

input.slice(2, 2 + M).forEach((el) => {
  fixed.push(Number(el));
});

fixed.push(N + 1);

let prev = 1;
fixed.forEach((fix) => {
  const diff = fix - prev;

  answer *= dp[diff];
  prev = fix + 1;
});

console.log(answer);
