const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.split("").map(Number));
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
let isPossible = false;

for (let i = 0; i < W; i++) {
  if (visited[0][i] || map[0][i] === 1) continue;

  bfs(0, i);
}

for (let i = 0; i < W; i++) {
  if (visited[H - 1][i]) {
    isPossible = true;
    break;
  }
}

console.log(isPossible ? "YES" : "NO");

function bfs(sy, sx) {
  const q = [{ y: sy, x: sx }];
  visited[sy][sx] = true;

  while (q.length) {
    const { y, x } = q.shift();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (
        ny < 0 ||
        nx < 0 ||
        ny >= H ||
        nx >= W ||
        visited[ny][nx] ||
        map[ny][nx] === 1
      )
        continue;

      visited[ny][nx] = true;
      q.push({ y: ny, x: nx });
    }
  }
}
