const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [C, N] = input[0].split(" ").map(Number);
const dp = Array.from({ length: N + 1 }, () => new Array(C + 1).fill(Infinity));

for (let i = 1; i <= N; i++) {
  const [cost, profit] = input[i].split(" ").map(Number);

  for (let j = 1; j <= C; j++) {
    if (j <= profit) {
      dp[i][j] = Math.min(dp[i - 1][j], cost);
    } else {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - profit] + cost);
    }
  }
}

console.log(dp[N][C]);