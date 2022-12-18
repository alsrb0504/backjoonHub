const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const dp = new Array(81).fill(0n);

dp[0] = 1n;
dp[1] = 1n;

for (let i = 2; i < 81; i++) {
  dp[i] = dp[i - 2] + dp[i - 1];
}

const answer = dp[N] * 2n + dp[N - 1] * 2n;

console.log(answer.toString());
