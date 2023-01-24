const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const answer = [];

const dp = new Array(70).fill(1n);
dp[2] = 2n;
dp[3] = 4n;

for (let i = 4; i < 70; i++)
  dp[i] = dp[i - 4] + dp[i - 3] + dp[i - 2] + dp[i - 1];

input.slice(1, 1 + N).forEach((el) => {
  answer.push(dp[Number(el)].toString());
});

console.log(answer.join("\n"));