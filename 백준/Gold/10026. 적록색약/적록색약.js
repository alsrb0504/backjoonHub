const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());

const map = [];

const answer = [];

let visited = Array.from({ length: N }, () => new Array(N).fill(false));
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

for (let i = 0; i < N; i++) {
  map[i] = input[i].trimEnd().split("");
}

let norCnt = 0;
let weakCnt = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      norCnt++;
      bfs(i, j, map[i][j]);
    }
  }
}

answer.push(norCnt);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "R") map[i][j] = "G";
  }
}

visited = Array.from({ length: N }, () => new Array(N).fill(false));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      weakCnt++;
      bfs(i, j, map[i][j]);
    }
  }
}

answer.push(weakCnt);

console.log(answer.join(" "));

function bfs(sY, sX, color) {
  const q = [];

  q.push([sY, sX]);

  while (q.length) {
    const [y, x] = q.shift();

    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;

      if (visited[ny][nx]) continue;

      if (color !== map[ny][nx]) continue;

      visited[ny][nx] = true;
      q.push([ny, nx]);
    }
  }
}
