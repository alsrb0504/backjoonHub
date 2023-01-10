const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

// 반시계 : 북, 서, 남, 동
const ry = [-1, 0, 1, 0];
const rx = [0, -1, 0, 1];

const [h, w] = input[0].split(" ").map(Number);
let [y, x, dir] = input[1].split(" ").map(Number);
const map = input.slice(2, 2 + h).map((el) => el.split(" ").map(Number));
let answer = 0;

// 방향 통일
if (dir === 3) dir = 1;
else if (dir === 1) dir = 3;

const q = [[y, x, dir]];

while (q.length) {
  const [cy, cx, dir] = q.shift();

  if (map[cy][cx] === 0) {
    answer++;
    map[cy][cx] = 2; // 방문처리
  }

  let [ny, nx, nd] = [cy, cx, dir];
  let isPossible = false;

  // 현재 칸의 왼쪽부터 4방향 탐색.
  for (let i = 1; i < 5; i++) {
    const next_dir = (dir + i) % 4;

    [ny, nx, nd] = [cy + ry[next_dir], cx + rx[next_dir], next_dir];

    if (ny < 1 || nx < 1 || ny >= h - 1 || nx >= w - 1 || map[ny][nx] !== 0)
      continue;

    isPossible = true;
    break;
  }

  if (isPossible) {
    q.push([ny, nx, nd]);
  } else {
    // 후진
    const rev_dir = (dir + 2) % 4;
    [ny, nx] = [cy + ry[rev_dir], cx + rx[rev_dir]];

    if (ny < 1 || nx < 1 || ny >= h - 1 || nx >= w - 1 || map[ny][nx] === 1) {
      break;
    }

    q.push([ny, nx, dir]);
  }
}

console.log(answer);