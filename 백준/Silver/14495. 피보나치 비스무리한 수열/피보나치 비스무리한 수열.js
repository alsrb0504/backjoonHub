const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const dp = new Array(N + 1).fill(1n);

for (let i = 4; i <= N; i++) {
  dp[i] = dp[i - 1] + dp[i - 3];
}

console.log(dp[N].toString());
