const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const COND = 15746n;
const N = Number(input[0]);
const dp = new Array(1, 000, 000 + 1).fill(0n);

dp[1] = 1n;
dp[2] = 2n;

for (let i = 3; i < 1000001; i++) {
  dp[i] = (dp[i - 2] + dp[i - 1]) % COND;
}

console.log(dp[N].toString());
