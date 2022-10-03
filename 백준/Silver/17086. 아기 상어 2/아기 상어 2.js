const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [h, w] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + h).map((line) => line.split(" ").map(Number));
const visited = Array.from({ length: h }, () => new Array(w).fill(102));

// 상하좌우 대각선
const dy = [0, 0, -1, 1, -1, -1, 1, 1];
const dx = [-1, 1, 0, 0, 1, -1, 1, -1];

let answer = 0;

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (map[i][j] === 1) {
      bfs(i, j);
    }
  }
}

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (map[i][j] === 0) {
      answer = Math.max(answer, visited[i][j]);
    }
  }
}

console.log(answer);

function bfs(sy, sx) {
  const q = [[sy, sx, 0]];
  visited[sy][sx] = 0;

  let find = false;

  while (q.length && !find) {
    const [y, x, cnt] = q.shift();

    for (let i = 0; i < 8; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny < 0 || nx < 0 || ny >= h || nx >= w) continue;
      if (visited[ny][nx] <= cnt + 1) continue;

      visited[ny][nx] = cnt + 1;
      q.push([ny, nx, cnt + 1]);
    }
  }
}