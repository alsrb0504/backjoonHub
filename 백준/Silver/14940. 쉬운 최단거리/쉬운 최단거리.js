const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.split(" ").map(Number));
const visited = Array.from({ length: H }, () => new Array(W).fill(-1));

const start = { x: 0, y: 0 };

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === 2) {
      start.y = i;
      start.x = j;
      visited[i][j] = 0;
    }
  }
}

const q = [{ y: start.y, x: start.x, cnt: 0 }];

while (q.length) {
  const { y, x, cnt } = q.shift();

  for (let i = 0; i < 4; i++) {
    const [ny, nx] = [y + dy[i], x + dx[i]];

    if (
      ny < 0 ||
      nx < 0 ||
      ny >= H ||
      nx >= W ||
      map[ny][nx] === 0 ||
      visited[ny][nx] !== -1
    )
      continue;

    visited[ny][nx] = cnt + 1;
    q.push({ y: ny, x: nx, cnt: cnt + 1 });
  }
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === 0) {
      start.y = i;
      start.x = j;
      visited[i][j] = 0;
    }
  }
}

console.log(visited.map((el) => el.join(" ")).join("\n"));
