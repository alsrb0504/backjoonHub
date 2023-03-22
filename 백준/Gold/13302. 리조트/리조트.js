const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const INF = Infinity;
const [N, M] = input[0].split(" ").map(Number);
const block = new Array(110).fill(false);
const MAX_TICKET = 40;

if (M !== 0) {
  const arr = input[1].split(" ").map(Number);
  arr.forEach((el) => {
    block[el] = true;
  });
}

const dp = Array.from({ length: 110 }, () => new Array(MAX_TICKET).fill(INF));

dp[0][0] = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < MAX_TICKET; j++) {
    if (dp[j][i] === INF) continue;

    const curr = dp[j][i];

    // 바로 다음칸
    if (block[i + 1]) {
      dp[j][i + 1] = Math.min(dp[j][i + 1], curr);
    } else {
      dp[j][i + 1] = Math.min(dp[j][i + 1], curr + 10000);
    }
    // 3일
    for (let k = 1; k <= 3; k++) {
      dp[j + 1][i + k] = Math.min(dp[j + 1][i + k], curr + 25000);
    }
    // 5일
    for (let k = 1; k <= 5; k++) {
      dp[j + 2][i + k] = Math.min(dp[j + 2][i + k], curr + 37000);
    }

    // 감소
    if (j >= 3) {
      dp[j - 3][i + 1] = Math.min(dp[j - 3][i + 1], curr);
    }
  }
}

let answer = INF;

for (let i = 0; i < MAX_TICKET; i++) {
  answer = Math.min(answer, dp[i][N]);
}

console.log(answer);