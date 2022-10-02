const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const jumbCnt = Number(input[0]);
const [w, h] = input[1].split(" ").map(Number);
const board = input.slice(2, 2 + h).map((line) => line.split(" ").map(Number));
const visited = Array.from({ length: h }, () =>
  Array.from({ length: w }, () =>
    new Array(jumbCnt + 1).fill(Number.MAX_SAFE_INTEGER)
  )
);

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
const jy = [-2, -2, -1, -1, 1, 1, 2, 2];
const jx = [-1, 1, -2, 2, -2, 2, -1, 1];

let answer = -1;

function bfs() {
  // [y, x, cnt, jumbCnt];
  const q = [[0, 0, 0, 0]];

  for (let i = 0; i < jumbCnt; i++) {
    visited[0][0][i] = 0;
  }

  while (q.length) {
    const [y, x, cnt, jc] = q.shift();

    // 종료 조건이 필요할까? => bfs라 가장 먼저 도착한게 작지 않을까?
    if (y === h - 1 && x === w - 1) {
      // if (answer === -1) answer = cnt;
      // else answer = Math.min(answer, cnt);

      // continue;

      answer = cnt;
      break;
    }

    // 인접 이동
    for (let i = 0; i < 4; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (!checkBoundary(ny, nx)) continue;
      if (board[ny][nx] === 1) continue;
      if (cnt + 1 >= visited[ny][nx][jc]) continue;

      visited[ny][nx][jc] = cnt + 1;
      q.push([ny, nx, cnt + 1, jc]);
    }

    // 점프 이동
    if (jc < jumbCnt) {
      for (let i = 0; i < 8; i++) {
        const ny = y + jy[i];
        const nx = x + jx[i];

        if (!checkBoundary(ny, nx)) continue;
        if (board[ny][nx] === 1) continue;
        if (cnt + 1 >= visited[ny][nx][jc + 1]) continue;

        visited[ny][nx][jc + 1] = cnt + 1;
        q.push([ny, nx, cnt + 1, jc + 1]);
      }
    }
  }
}

function checkBoundary(cy, cx) {
  if (cy < 0 || cx < 0 || cy >= h || cx >= w) return false;
  return true;
}

bfs();

console.log(answer);
