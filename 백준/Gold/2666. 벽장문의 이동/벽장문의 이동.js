const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const INF = Infinity;
const N = Number(input[0]);
const [m1, m2] = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const M = Number(input[2]);
const orders = input.slice(3, 3 + M).map(Number);
let answer = INF;

const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => new Array(M + 1).fill(INF))
);

dp[m1][m2][0] = 0;

orders.forEach((next, idx) => {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (dp[i][j][idx] !== INF) {
        const curr = dp[i][j][idx];

        if (next < i) {
          const diff = i - next;
          dp[next][j][idx + 1] = Math.min(dp[next][j][idx + 1], curr + diff);
        } else if (j < next) {
          const diff = next - j;
          dp[i][next][idx + 1] = Math.min(dp[i][next][idx + 1], curr + diff);
        } else {
          const upDiff = next - i;
          dp[next][j][idx + 1] = Math.min(dp[next][j][idx + 1], curr + upDiff);

          const downDiff = j - next;
          dp[i][next][idx + 1] = Math.min(
            dp[i][next][idx + 1],
            curr + downDiff
          );
        }
      }
    }
  }
});

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    answer = Math.min(answer, dp[i][j][M]);
  }
}

console.log(answer);