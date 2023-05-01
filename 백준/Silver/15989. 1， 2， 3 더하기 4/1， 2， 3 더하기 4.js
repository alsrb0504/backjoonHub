const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const TC = Number(input[0]);
const answer = [];

const SIZE = 10001;
const dp = Array.from({ length: 3 }, () => new Array(SIZE).fill(0));

dp[0][1] = 1;
dp[0][2] = 1;
dp[1][2] = 1;
dp[0][3] = 1;
dp[1][3] = 1;
dp[2][3] = 1;
dp[0][4] = 3;
dp[1][4] = 1;
dp[2][4] = 0;
dp[0][5] = 4;
dp[1][5] = 1;
dp[2][5] = 0;

for (let i = 6; i < SIZE; i++) {
  dp[0][i] = dp[0][i - 1] + dp[1][i - 1] + dp[2][i - 1];
  dp[1][i] = dp[1][i - 2] + dp[2][i - 2];
  dp[2][i] = dp[2][i - 3];
}

for (let i = 0; i < TC; i++) {
  const num = Number(input[i + 1]);
  answer.push(dp[0][num] + dp[1][num] + dp[2][num]);
}

console.log(answer.join("\n"));