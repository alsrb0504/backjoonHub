const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const MAX = 100;
const N = Number(input[0]);
const healthes = input[1].split(" ").map(Number);
const pleasures = input[2].split(" ").map(Number);
const dp = Array.from({ length: N + 1 }, () => new Array(MAX + 1).fill(-1));
let answer = 0;

dp[0][MAX] = 0;

for (let i = 1; i <= N; i++) {
  const heal = healthes[i - 1];
  const ple = pleasures[i - 1];

  for (let j = 1; j <= MAX; j++) {
    if (j + heal <= MAX && dp[i - 1][j + heal] !== -1) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j + heal] + ple);
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

for (let i = 1; i <= MAX; i++) {
  answer = Math.max(answer, dp[N][i]);
}

console.log(answer);