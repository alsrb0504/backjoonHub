const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const dy = [0, 0, -1, 1, -1, -1, 1, 1];
const dx = [-1, 1, 0, 0, -1, 1, -1, 1];

const [N, M] = input[0].split(" ").map(Number);
const board = input
  .slice(1, 1 + N)
  .map((el) => el.trimEnd().split(" ").map(Number));
const visited = Array.from({ length: N }, () => new Array(M).fill(0));

let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j] === 0 && board[i][j] !== 0) {
      // answer++;
      if (bfs(i, j, board[i][j])) answer++;
    }
  }
}

function bfs(y, x, curr) {
  const q = [[y, x]];
  visited[y][x] = 1;

  let isPossible = true;

  while (q.length) {
    const [cy, cx] = q.shift();

    for (let i = 0; i < 8; i++) {
      const [ny, nx] = [cy + dy[i], cx + dx[i]];

      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;

      const next = board[ny][nx];

      // 산봉우리가 아님.
      // if (curr < next) return false;
      if (curr < next) {
        isPossible = false;
        continue;
      }

      // 인접한 높이가 같음.
      if (curr === next && visited[ny][nx] === 0) {
        q.push([ny, nx]);
        visited[ny][nx] = 1;
      }

      if (visited[ny][nx] || board[ny][nx] === 0) continue;
    }
  }

  // return true;
  if (isPossible) {
    // console.log(y, x);
    return true;
  } else return false;
}

// console.table(board);
// console.table(visited);
console.log(answer);
