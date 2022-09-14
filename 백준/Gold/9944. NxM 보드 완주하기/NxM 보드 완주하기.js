const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let line = 0;
let caseCnt = 0;

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

// 상하좌우
const direction = {
  0: [-1, 0],
  1: [1, 0],
  2: [0, -1],
  3: [0, 1],
};

let answer = "";

let map = [];
let stack = [];
let visited = [];
let result = 1000001;
const results = [];
let N;
let M;

while (input[line]) {
  caseCnt++;
  [N, M] = input[line].split(" ").map(Number);
    
  solution(line, N, M);

  line += N + 1;
}

function solution(line, N, M) {
  map = [];
  stack = [];
  visited = Array.from({ length: N }, () => new Array(M).fill(false));
  result = 1000001;

  for (let i = line + 1; i <= line + N; i++) {
    map.push(input[i].trimEnd().split(""));
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === "*") visited[i][j] = true;
      else {
        // [y, x]
        stack.push([i, j]);
      }
    }
  }

  // 예외
  if (stack.length === 1) {
    results.push(0);
    return;
  }

  stack.forEach((el) => {
    const [y, x] = el;
    visited[y][x] = true;

    // 0 , 1, 2, 3 => 상, 하, 좌, 우.
    for (let i = 0; i < 4; i++) {
      const next = direction[i];

      const ny = y + next[0];
      const nx = x + next[1];

      if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;
      if (visited[ny][nx]) continue;

      // 서치 시작
      serach(1, ny, nx, i);
    }

    visited[y][x] = false;
  });

  results.push(result);
}

function checkVisit(cnt) {
  let isComplete = true;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visited[i][j]) {
        isComplete = false;
        break;
      }
    }
  }

  if (isComplete) {
    result = Math.min(result, cnt);
  }
}

function isMovable(y, x) {
  let isMove = false;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;
    if (visited[ny][nx]) continue;

    isMove = true;
  }

  return isMove;
}

function serach(cnt, y, x, dir) {
  visited[y][x] = true;

  // 탐색 불가
  if (!isMovable(y, x)) {
    checkVisit(cnt);
  } else {
    // 상하좌우
    switch (dir) {
      // 0 : 위로 이동
      case 0: {
        const ny = y - 1;

        if (ny < 0 || visited[ny][x]) {
          const rx = x + 1;
          const lx = x - 1;

          if (rx < M && !visited[y][rx]) {
            serach(cnt + 1, y, rx, 3);
          }
          if (lx >= 0 && !visited[y][lx]) {
            serach(cnt + 1, y, lx, 2);
          }
        } else {
          serach(cnt, ny, x, dir);
        }

        break;
      }

      // 1 : 아래로 이동
      case 1: {
        const ny = y + 1;

        if (ny >= N || visited[ny][x]) {
          const rx = x + 1;
          const lx = x - 1;

          if (rx < M && !visited[y][rx]) {
            serach(cnt + 1, y, rx, 3);
          }
          if (lx >= 0 && !visited[y][lx]) {
            serach(cnt + 1, y, lx, 2);
          }
        } else {
          serach(cnt, ny, x, dir);
        }

        break;
      }
      case 2: {
        const nx = x - 1;

        if (nx < 0 || visited[y][nx]) {
          const uy = y + 1;
          const dy = y - 1;

          if (uy < N && !visited[uy][x]) {
            serach(cnt + 1, uy, x, 1);
          }
          if (dy >= 0 && !visited[dy][x]) {
            serach(cnt + 1, dy, x, 0);
          }
        } else {
          serach(cnt, y, nx, dir);
        }

        break;
      }
      case 3: {
        const nx = x + 1;

        if (nx >= M || visited[y][nx]) {
          const uy = y + 1;
          const dy = y - 1;

          if (uy < N && !visited[uy][x]) {
            serach(cnt + 1, uy, x, 1);
          }
          if (dy >= 0 && !visited[dy][x]) {
            serach(cnt + 1, dy, x, 0);
          }
        } else {
          serach(cnt, y, nx, dir);
        }
        break;
      }
      default:
        break;
    }
  }

  visited[y][x] = false;
}

results.forEach((v, idx) => {
  answer += `Case ${idx + 1}: ${v === 1000001 ? -1 : v}\n`;
});

console.log(answer.trimEnd());
