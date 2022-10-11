const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number));

const virusPos = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 2) virusPos.push([i, j]);
  }
}

let answer = Number.MAX_SAFE_INTEGER;

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const virusStack = [];

function dfs(cnt, start) {
  if (cnt === M) {
    const result = bfs();
    if (result !== -1) answer = Math.min(answer, result);
    return;
  }

  for (let i = start; i < virusPos.length; i++) {
    virusStack.push(i);
    dfs(cnt + 1, i + 1);
    virusStack.pop();
  }
}

function bfs() {
  const visited = Array.from({ length: N }, () => new Array(N).fill(false));
  const q = [];

  let maxCnt = 0;

  virusStack.forEach((el) => {
    const [sy, sx] = virusPos[el];
    q.push([sy, sx, 0]);
    visited[sy][sx] = true;
  });

  while (q.length) {
    const [y, x, cnt] = q.shift();

    maxCnt = Math.max(maxCnt, cnt);

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
      if (map[ny][nx] === 1 || visited[ny][nx]) continue;

      visited[ny][nx] = true;
      q.push([ny, nx, cnt + 1]);
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] !== 1 && visited[i][j] === false) return -1;
    }
  }

  return maxCnt;
}

dfs(0, 0);

console.log(answer === Number.MAX_SAFE_INTEGER ? -1 : answer);
