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
    // if (map[i][j] === 1) visited[i][j] = true;
    if (map[i][j] === 2) virusPos.push([i, j]);
  }
}

// 조합으로 바이러스 위치를 지정 후, 호출?
// 50 * 50 => 2500 C 10 = 시간초과

let answer = Number.MAX_SAFE_INTEGER;

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const virusStack = [];

function dfs(cnt, start) {
  if (cnt === M) {
    // console.log(bfs());
    const result = bfs();

    if (result !== -1) answer = Math.min(answer, result);
    return;
    // bfs();
  }

  for (let i = start; i < virusPos.length; i++) {
    virusStack.push(i);
    dfs(cnt + 1, i + 1);
    virusStack.pop();
  }
}

function bfs() {
  const visited = Array.from({ length: N }, () => new Array(N).fill(false));

  const numbers = Array.from({ length: N }, () => new Array(N).fill(-1));

  const q = [];

  let maxCnt = 0;

  const start = [];

  virusStack.forEach((el) => {
    const [sy, sx] = virusPos[el];

    start.push([sy, sx]);
    numbers[sy][sx] = 0;

    q.push([sy, sx, 0]);
    visited[sy][sx] = true;
  });

  while (q.length) {
    const [y, x, cnt] = q.shift();

    // maxCnt = Math.max(maxCnt, cnt);

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
      if (map[ny][nx] === 1 || visited[ny][nx]) continue;

      if (map[ny][nx] === 2) {
        // q.unshift([ny, nx, cnt]);
        // maxCnt = Math.max(maxCnt, cnt + 1);
        // numbers[ny][nx] = cnt;

        // q.unshift([ny, nx, cnt + 1]);

        // 이미 모든 칸이 바이러스로 차 있다면 종료
        if (checkEnd()) {
          // console.log("end : ", maxCnt);

          // if (maxCnt === 3) {
          //   console.log(start);

          //   console.table(map);
          //   console.table(numbers);
          // }

          return maxCnt;
        }

        q.push([ny, nx, cnt + 1]);
      } else {
        q.push([ny, nx, cnt + 1]);
      }

      maxCnt = Math.max(maxCnt, cnt + 1);

      numbers[ny][nx] = cnt + 1;
      visited[ny][nx] = true;
      // q.push([ny, nx, cnt + 1]);
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] !== 1 && visited[i][j] === false) return -1;
    }
  }

  // console.log(maxCnt);
  // console.table(visited);
  // console.table(map);
  // console.table(numbers);

  return maxCnt;

  function checkEnd() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] === 0 && !visited[i][j]) return false;
      }
    }

    return true;
  }
}

// bfs();
dfs(0, 0);

console.log(answer === Number.MAX_SAFE_INTEGER ? -1 : answer);