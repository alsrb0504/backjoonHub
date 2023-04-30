const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const dp = new Array(36).fill(1n);

for (let i = 2; i <= 35; i++) {
  dp[i] = 0n;

  for (let j = 0; j < i; j++) {
    dp[i] += dp[j] * dp[i - j - 1];
  }
}

console.log(dp[N].toString());