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
    if (dp[i][j] === 0n || (i === N - 1 && j === N - 1)) continue;

    const rt = j + board[i][j];
    const dw = i + board[i][j];

    if (rt < N) dp[i][rt] += dp[i][j];
    if (dw < N) dp[dw][j] += dp[i][j];
  }
}

console.log(dp[N - 1][N - 1].toString());