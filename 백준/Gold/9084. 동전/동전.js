const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const TC = Number(input[0]);
const answer = [];

for (let i = 0; i < TC; i++) {
  answer.push(solution(i));
}

console.log(answer.join("\n"));

function solution(tc) {
  const line = 3 * tc;

  const N = Number(input[line + 1]);
  const coins = input[line + 2].split(" ").map(Number);
  const goal = Number(input[line + 3]);
  const dp = Array.from({ length: N + 1 }, () => new Array(goal + 1).fill(0));

  for (let i = 0; i <= goal; i++) {
    if (i % coins[0] === 0) {
      dp[1][i] = 1;
    }
  }

  for (let i = 2; i <= N; i++) {
    const curr = coins[i - 1];

    for (let j = 0; j <= goal; j++) {
      if (j < curr) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - curr];
      }
    }
  }

  return dp[N][goal];
}