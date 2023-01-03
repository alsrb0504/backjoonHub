const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const MAX = 20 + 1;
const N = Number(input[0]);
const nums = input[1].split(" ").map(BigInt);
const answer = nums.pop();
const dp = Array.from({ length: N - 1 }, () => new Array(MAX).fill(0n));

dp[0][nums[0]] = 1n;

for (let i = 1; i < N - 1; i++) {
  const curr = nums[i];

  for (let j = 0; j <= MAX; j++) {
    if (dp[i - 1][j]) {
      const down = BigInt(j) - curr;
      const up = BigInt(j) + curr;

      if (down >= 0) {
        dp[i][down] += dp[i - 1][j];
      }

      if (up <= 20) {
        dp[i][up] += dp[i - 1][j];
      }
    }
  }
}
console.log(dp[N - 2][answer].toString());
