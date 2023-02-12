const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.split(" ").map(Number));

// 좌, 우, 상, 하
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

// 그 딱 만났을 때 값을 기억해두면 됨.
// const dp = Array.from({ length: H }, () => new Array(W).fill(0));
const dp = Array.from({ length: H }, () => new Array(W).fill(-1));

dp[H - 1][W - 1] = 1;
dfs(0, 0);

// console.table(dp);

console.log(dp[0][0]);

function dfs(y, x) {
  // console.log(y, x);
  dp[y][x] = 0;

  if (y === H - 1 && x === W - 1) {
    return 1;
  }

  for (let i = 0; i < 4; i++) {
    const [ny, nx] = [y + dy[i], x + dx[i]];

    if (ny < 0 || nx < 0 || ny >= H || nx >= W) continue;

    if (map[ny][nx] >= map[y][x]) continue;

    if (dp[ny][nx] > 0) {
      dp[y][x] += dp[ny][nx];
    } else if (dp[ny][nx] === 0) continue;
    else {
      dp[y][x] += dfs(ny, nx);
    }
  }

  return dp[y][x];
}