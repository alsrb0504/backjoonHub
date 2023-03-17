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
let answer = 1;

const set = new Set();

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    set.add(map[i][j]);
  }
}

set.forEach((val) => {
  answer = Math.max(answer, solution(val));
});

console.log(answer);

function solution(rain) {
  const visited = Array.from({ length: N }, () => new Array(N).fill(false));
  let landCnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] <= rain && !visited[i][j]) {
        rainBfs(i, j);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        landBfs(i, j);
        landCnt++;
      }
    }
  }

  return landCnt;

  function landBfs(cy, cx) {
    const q = [[cy, cx]];
    visited[cy][cx] = true;

    while (q.length) {
      const [y, x] = q.shift();
      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (ny < 0 || nx < 0 || ny >= N || nx >= N || visited[ny][nx]) continue;

        visited[ny][nx] = true;
        q.push([ny, nx]);
      }
    }
  }

  function rainBfs(cy, cx) {
    const q = [[cy, cx]];
    visited[cy][cx] = true;

    while (q.length) {
      const [y, x] = q.shift();
      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (
          ny < 0 ||
          nx < 0 ||
          ny >= N ||
          nx >= N ||
          visited[ny][nx] ||
          map[ny][nx] > rain
        )
          continue;

        visited[ny][nx] = true;
        q.push([ny, nx]);
      }
    }
  }
}
