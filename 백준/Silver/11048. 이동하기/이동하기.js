const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const dy = [0, 1, 1];
const dx = [1, 1, 0];

const [N, M] = input[0].split(" ").map(Number);
const board = input
  .slice(1, 1 + N)
  .map((el) => [0, ...el.split(" ").map(Number)]);
board.unshift(new Array(M + 1).fill(0));

const dp = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    const curr = board[i][j];
    dp[i][j] = Math.max(
      dp[i - 1][j - 1] + curr,
      dp[i][j - 1] + curr,
      dp[i - 1][j] + curr
    );
  }
}

console.log(dp[N][M]);