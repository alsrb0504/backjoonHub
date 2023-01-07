const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
const [h, w] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + h).map((el) => el.split(" ").map(Number));

let answer = 0;

while (true) {
  const visited = Array.from({ length: h }, () => new Array(w).fill(false));
  let group = 0;
  const iced = [];
  const updated_map = map.map((el) => [...el]);

  for (let i = 1; i < h - 1; i++) {
    for (let j = 1; j < w - 1; j++) {
      if (map[i][j] > 0) iced.push([i, j]);
    }
  }

  if (iced.length === 0) {
    console.log(0);
    return;
  }

  iced.forEach((el) => {
    const [y, x] = el;

    if (!visited[y][x]) {
      visited[y][x] = true;
      group++;

      bfs(y, x);
    }
  });

  if (group !== 1) break;

  iced.forEach((el) => {
    const [y, x] = el;

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (map[ny][nx] === 0) {
        updated_map[y][x] =
          updated_map[y][x] - 1 > 0 ? updated_map[y][x] - 1 : 0;
      }
    }
  });

  map = updated_map;
  answer++;

  function bfs(sy, sx) {
    const q = [[sy, sx]];

    while (q.length) {
      const [cy, cx] = q.shift();

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [cy + dy[i], cx + dx[i]];

        if (visited[ny][nx] || map[ny][nx] === 0) continue;

        visited[ny][nx] = true;
        q.push([ny, nx]);
      }
    }
  }
}

console.log(answer);
