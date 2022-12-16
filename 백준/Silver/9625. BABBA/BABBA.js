const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const dp = Array.from({ length: 46 }, () => new Array(2).fill(0));
dp[0][0] = 1;
dp[1][1] = 1;

for (let i = 2; i < 46; i++) {
  dp[i][0] = dp[i - 2][0] + dp[i - 1][0];
  dp[i][1] = dp[i - 2][1] + dp[i - 1][1];
}

console.log(`${dp[N][0]} ${dp[N][1]}`);