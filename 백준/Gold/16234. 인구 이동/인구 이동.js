const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const [N, L, R] = input[0].split(" ").map(Number);
const board = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));

let visited = Array.from({ length: N }, () => new Array(N).fill(false));
let isPossible = false;

let answer = 0;

while (!isPossible) {
  visited = Array.from({ length: N }, () => new Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        if (bfs(i, j)) {
          isPossible = true;
        }
      }
    }
  }

  if (isPossible) {
    answer++;
    isPossible = false;
  } else break;
}

console.log(answer);

function bfs(y, x) {
  let stack = [[y, x]];
  let q = [[y, x]];
  let acc = board[y][x];

  visited[y][x] = true;

  while (q.length) {
    const [cy, cx] = q.shift();
    const curr = board[cy][cx];

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [cy + dy[i], cx + dx[i]];
      if (ny < 0 || nx < 0 || ny >= N || nx >= N || visited[ny][nx]) continue;

      const diff = Math.abs(curr - board[ny][nx]);
      if (diff < L || diff > R) continue;

      visited[ny][nx] = true;
      acc += board[ny][nx];
      stack.push([ny, nx]);
      q.push([ny, nx]);
    }
  }

  const result = Math.floor(acc / stack.length);

  stack.forEach((el) => {
    const [cy, cx] = el;
    board[cy][cx] = result;
  });

  if (stack.length > 1) return true;
  else return false;
}
