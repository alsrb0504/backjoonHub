const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const board = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const dp = Array.from({ length: N }, () => new Array(N).fill(0n));

dp[0][0] = 1n;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < i; k++) {
      if (board[k][j] + k === i) {
        dp[i][j] += dp[k][j];
      }
    }

    for (let k = 0; k < j; k++) {
      if (board[i][k] + k === j) {
        dp[i][j] += dp[i][k];
      }
    }
  }
}

console.log(dp[N - 1][N - 1].toString());