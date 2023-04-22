const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const dp = Array.from({ length: 31 }, () => new Array(31 + 1).fill(0));

for (let i = 0; i < 31; i++) dp[i][0] = 1;
dp[2][1] = 1;

for (let i = 3; i < 31; i++) {
  for (let j = 1; j <= i; j++) {
    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
  }
}

console.log(dp[N][K - 1]);