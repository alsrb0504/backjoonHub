const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [h, w] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.trimEnd().split(""));

const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];

// 최대 지연 시간.
const Max = h + w - 2;

// n초 뒤 맵의 상황을 나타낼 3차원 배열 생성.
const afterMap = Array.from({ length: h }, () =>
  Array.from({ length: w }, () => [])
);

const waters = [];
const start = [];

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    // afterMap[i][j].push(map[i][j]);
    afterMap[i][j] = new Array(Max).fill(map[i][j]);

    if (map[i][j] === "*") waters.push([i, j]);

    if (map[i][j] === "S") start.push(i, j);
  }
}

waterBFS();

console.log(findBFS());

// console.table(afterMap);

function findBFS() {
  const q = [[start[0], start[1], 0]];

  const visited = Array.from({ length: h }, () => new Array(w).fill(false));
  visited[start[0]][start[1]] = true;

  while (q.length) {
    const [y, x, t] = q.shift();

    if (map[y][x] === "D") return t;

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      // 범위를 벗어나는 경우.
      if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;

      // 방문한 적이 있는 경우.
      if (visited[ny][nx]) continue;

      // 이동하려는 다음 칸이 현재 시점에 물이거나 돌인 경우.
      if (afterMap[ny][nx][t] === "*" || afterMap[ny][nx][t] === "X") continue;

      // 이동하려는 칸이 다음 초에 다음 시점에 물인 경우.
      if (afterMap[ny][nx][t + 1] === "*") continue;

      q.push([ny, nx, t + 1]);
      visited[ny][nx] = true;
    }
  }

  return "KAKTUS";
}

function waterBFS() {
  const q = [];

  waters.forEach((water) => q.push([...water, 0]));

  while (q.length) {
    const [y, x, t] = q.shift();

    // console.log(q);
    // console.log(y, x, t, afterMap[y][x][t]);

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      // 범위를 벗어나는 경우.
      if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;

      // 이동하려는 다음 칸이 현재 시점에 '.'이 아닌 경우.
      if (afterMap[ny][nx][t] !== ".") continue;

      // 이동하려는 칸이 다음 초에 다음 시점에 '.'이 아닌 경우.
      if (afterMap[ny][nx][t + 1] !== ".") continue;

      for (let j = t + 1; j < Max; j++) {
        afterMap[ny][nx][j] = "*";
      }

      q.push([ny, nx, t + 1]);
    }
  }
}