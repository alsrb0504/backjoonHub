const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const INF = Infinity;
const N = Number(input[0]);
const path = input[1].split("");
const dp = new Array(N).fill(INF);
dp[0] = 0;

for (let i = 0; i < N; i++) {
  const curr = path[i];

  for (let j = i + 1; j < N; j++) {
    const diff = j - i;
    if (curr === "B" && path[j] === "O" && dp[i] !== INF) {
      dp[j] = Math.min(dp[j], dp[i] + diff * diff);
    }

    if (curr === "O" && path[j] === "J" && dp[i] !== INF) {
      dp[j] = Math.min(dp[j], dp[i] + diff * diff);
    }

    if (curr === "J" && path[j] === "B" && dp[i] !== INF) {
      dp[j] = Math.min(dp[j], dp[i] + diff * diff);
    }
  }
}

console.log(dp[N - 1] !== INF ? dp[N - 1] : -1);
