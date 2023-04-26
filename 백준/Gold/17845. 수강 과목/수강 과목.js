const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const subs = input.slice(1, 1 + K).map((el) => el.split(" ").map(Number));

const dp = Array.from({ length: 1001 }, () => new Array(10001).fill(0));

for (let i = 1; i <= K; i++) {
  const [curVal, curTime] = subs[i - 1];

  for (let j = 1; j <= N; j++) {
    if (curTime <= j) {
      dp[i][j] = Math.max(dp[i - 1][j], curVal + dp[i - 1][j - curTime]);
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

console.log(Math.max(...dp[K]));
