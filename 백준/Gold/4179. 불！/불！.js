const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + R).map((el) => el.trimEnd().split(""));
const fires = [];
let [sy, sx] = [0, 0];
let answer = -1;

const visited = Array.from(new Array(R), () => new Array(C).fill(false));
const fireMap = Array.from(new Array(R), () => new Array(C).fill(Infinity));

for (let y = 0; y < R; y++) {
  for (let x = 0; x < C; x++) {
    if (map[y][x] === "F") fires.push([y, x, 0]);
    else if (map[y][x] === "J") [sy, sx] = [y, x];
  }
}

if (sy === 0 || sy === R - 1 || sx === 0 || sx === C - 1) {
  console.log(1);
  return;
}

fires.forEach((el) => {
  const [y, x, _] = el;
  fireMap[y][x] = 0;
});

visited[sy][sx] = true;

fireBfs();

bfs();

console.log(answer !== -1 ? answer : "IMPOSSIBLE");

function bfs() {
  const q = [[sy, sx, 0]];
  visited[sy][sx] = true;

  while (q.length) {
    const [y, x, cnt] = q.shift();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];
      const next_cnt = cnt + 1;

      if (map[ny][nx] === "#" || map[ny][nx] === "F" || visited[ny][nx])
        continue;

      // 불이 번짐
      if (fireMap[ny][nx] <= next_cnt) continue;

      // 종료 : 가장자리 도착
      if (ny === 0 || ny === R - 1 || nx === 0 || nx === C - 1) {
        answer = next_cnt + 1;
        return;
      }

      visited[ny][nx] = true;
      q.push([ny, nx, next_cnt]);
    }
  }
}

function fireBfs() {
  while (fires.length) {
    const [y, x, cnt] = fires.shift();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (!checkBoundary(ny, nx)) continue;
      if (map[ny][nx] === "#" || fireMap[ny][nx] <= cnt + 1) continue;

      fireMap[ny][nx] = cnt + 1;
      fires.push([ny, nx, cnt + 1]);
    }
  }
}

function checkBoundary(y, x) {
  if (y < 0 || x < 0 || y >= R || x >= C) return false;
  return true;
}
