const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const dp = new Array(10001).fill(0n);
dp[1] = 1n;

for (let i = 2; i < 10001; i++) {
  dp[i] = dp[i - 2] + dp[i - 1];
}

console.log(dp[N].toString());
