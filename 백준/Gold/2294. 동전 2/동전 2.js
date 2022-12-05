const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const coins = input.slice(1, 1 + N).map(Number);
const INF = 100001;
const dp = Array.from({ length: 101 }, () => new Array(10001).fill(0));

for (let i = 0; i < K + 1; i++) {
  dp[0][i] = INF;
}

coins.forEach((coin, idx) => {
  for (let i = 1; i < K + 1; i++) {
    if (i < coin) {
      dp[idx + 1][i] = dp[idx][i];
    } else if (i === coin) {
      dp[idx + 1][i] = 1;
    } else {
      dp[idx + 1][i] = Math.min(dp[idx + 1][i - coin] + 1, dp[idx][i]);
    }
  }
});

console.log(dp[N][K] !== INF ? dp[N][K] : -1);
