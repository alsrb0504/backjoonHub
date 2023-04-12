const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const dp = Array.from({ length: N }, () => new Array(N).fill(0));
let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (dp[i][j] === 0) dfs(i, j, 1);
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer = Math.max(answer, dp[i][j]);
  }
}

console.log(answer);

function dfs(y, x, cnt) {
  let max = 0;

  for (let i = 0; i < 4; i++) {
    const [ny, nx] = [y + dy[i], x + dx[i]];

    if (ny < 0 || nx < 0 || ny >= N || nx >= N || map[ny][nx] <= map[y][x])
      continue;

    if (dp[y][x] !== 0) {
      max = Math.max(max, dp[ny][nx] + 1);
      continue;
    }

    max = Math.max(max, dfs(ny, nx, cnt + 1) + 1);
  }

  if (max === 0) return (dp[y][x] = 1);
  else return (dp[y][x] = max);
}
