const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
const tc = Number(input[0]);
const answer = [];

let line = 1;

for (let i = 0; i < tc; i++) {
  const [W, H, K] = input[line].split(" ").map(Number);

  answer.push(solution(W, H, K));

  line += K + 1;
}

console.log(answer.join("\n"));

function solution(W, H, K) {
  const position = input
    .slice(line + 1, line + 1 + K)
    .map((el) => el.split(" ").map(Number));

  const visited = Array.from({ length: H }, () => new Array(W).fill(false));
  const map = Array.from({ length: H }, () => new Array(W).fill(0));

  let cnt = 0;

  position.forEach((el) => {
    const [x, y] = el;
    map[y][x] = 1;
  });

  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (!visited[i][j] && map[i][j] === 1) {
        bfs(i, j);
        cnt++;
      }
    }
  }

  return cnt;

  function bfs(cy, cx) {
    const q = [[cy, cx]];
    visited[cy][cx] = true;

    while (q.length) {
      const [y, x] = q.shift();

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (
          ny < 0 ||
          nx < 0 ||
          ny >= H ||
          nx >= W ||
          visited[ny][nx] ||
          map[ny][nx] === 0
        )
          continue;

        visited[ny][nx] = true;
        q.push([ny, nx]);
      }
    }
  }
}
