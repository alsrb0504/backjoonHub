const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((line) => line.trimEnd().split(""));

// [Up, Right, Down, Left] = [0, 1, 2, 3]
const direction = {
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};

const doors = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "#") doors.push([i, j]);
  }
}

let answer = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < 4; i++) {
  answer = Math.min(answer, bfs(i));
}

console.log(answer);

function bfs(dirNum) {
  const [sy, sx] = doors[0];
  const [ey, ex] = doors[1];

  map[sy][sx] = "*";

  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => new Array(4).fill(Number.MAX_SAFE_INTEGER))
  );

  // [y, x, cnt, direction]
  const q = [[sy, sx, 0, dirNum]];

  while (q.length) {
    const [y, x, cnt, dir] = q.shift();

    // 무조건 현재 칸에서 직선 방향으로 한 칸 이동
    const [dirY, dirX] = direction[dir];
    let [ny, nx] = [y + dirY, x + dirX];

    if (!checkNext(ny, nx)) continue;

    // 1. 이동 가능 빈 칸
    if (map[ny][nx] === ".") {
      if (visited[ny][nx][dir] > cnt) {
        visited[ny][nx][dir] = cnt;
        q.push([ny, nx, cnt, dir]);
      }
    }

    // 2. 이동 가능 거울 칸
    else {
      if (visited[ny][nx][dir] > cnt) {
        visited[ny][nx][dir] = cnt;
        q.push([ny, nx, cnt, dir]);
      }

      const rotate90 = (dir + 1) % 4;
      if (visited[ny][nx][rotate90] > cnt) {
        visited[ny][nx][rotate90] = cnt + 1;
        q.push([ny, nx, cnt + 1, rotate90]);
      }

      const rotate270 = (dir + 3) % 4;
      if (visited[ny][nx][rotate270] > cnt) {
        visited[ny][nx][rotate270] = cnt + 1;
        q.push([ny, nx, cnt + 1, rotate270]);
      }
    }
  }

  let min = visited[ey][ex][0];

  for (let i = 1; i < 4; i++) {
    min = Math.min(min, visited[ey][ex][i]);
  }

  return min;
}

function checkNext(y, x) {
  if (y < 0 || x < 0 || y >= N || x >= N) return false;
  if (map[y][x] === "*") return false;
  return true;
}