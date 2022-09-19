const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number));
const enemy = [];
let visited = [];
let answer = 0;

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

function solution() {
  const emptys = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) {
        emptys.push([i, j]);
      }
    }
  }

  for (let i = 0; i < emptys.length; i++) {
    for (let j = i + 1; j < emptys.length; j++) {
      let acc = 0;

      const [fy, fx] = emptys[i];
      const [sy, sx] = emptys[j];

      board[fy][fx] = 1;
      board[sy][sx] = 1;

      // BFS 탐색
      // 모든 적 바둑돌 위치를 탐색
      visited = Array.from({ length: N }, () => new Array(M).fill(false));
      enemy.forEach((pos) => {
        const [y, x] = pos;

        acc += enemyBfs(y, x);
      });

      board[fy][fx] = 0;
      board[sy][sx] = 0;

      answer = Math.max(answer, acc);
    }
  }
}

function enemyBfs(y, x) {
  // 이미 탐색이 완료된 곳이면 리턴
  if (visited[y][x]) return 0;

  const q = [[y, x]];
  let [cy, cx] = [y, x];
  visited[cy][cx] = true;
  let cnt = 1;

  // 중요!, board[ny][nx] === 0 일 때, 리턴하면 bfs가 제대로 안 됨.
  let flag = false;

  while (q.length) {
    [cy, cx] = q.shift();

    for (let i = 0; i < 4; i++) {
      const ny = cy + dy[i];
      const nx = cx + dx[i];

      if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
        if (board[ny][nx] === 0) {
          flag = true;
          continue;
        }

        if (board[ny][nx] === 1 || visited[ny][nx]) continue;

        if (board[ny][nx] === 2) {
          visited[ny][nx] = true;
          q.push([ny, nx]);

          cnt++;
        }
      }
    }
  }

  if (flag) return 0;
  else return cnt;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 2) {
      enemy.push([i, j]);
    }
  }
}

solution();
console.log(answer);