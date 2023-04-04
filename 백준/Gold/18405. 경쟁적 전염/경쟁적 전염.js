const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const [endT, endX, endY] = input[N + 1].split(" ").map(Number);

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const visited = Array.from({ length: N }, () => new Array(N).fill(false));

for (let i = 0; i < endT; i++) {
  const q = [];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (map[y][x] !== 0 && !visited[y][x]) q.push([map[y][x], y, x]);
    }
  }

  q.sort((a, b) => b[0] - a[0]);

  while (q.length) {
    const [val, y, x] = q.pop();
    visited[y][x] = true;

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N || map[ny][nx] !== 0) continue;

      map[ny][nx] = val;
    }
  }
}

console.log(map[endX - 1][endY - 1]);
