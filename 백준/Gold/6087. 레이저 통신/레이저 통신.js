const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [w, h] = input.shift().split(" ").map(Number);

const map = [];

for (let i = 0; i < h; i++) {
  map[i] = input[i].trimEnd().split("");
}

const target = [];

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (map[i][j] === "C") target.push([i, j]);
  }
}

// const visited = Array.from({ length: h }, () => new Array(w).fill(9999));
const visited = Array.from({ length: h }, () =>
  Array.from({ length: w }, () => new Array(4).fill(9999))
);

// 레이저의 진행 방향을 나타내기 위해.
// 시계 방향 : 상 => 우 => 하 => 좌
const moveMap = new Map();
moveMap.set(0, [-1, 0]);
moveMap.set(1, [0, 1]);
moveMap.set(2, [1, 0]);
moveMap.set(3, [0, -1]);

const dirMap = new Map();
// [직진, 오른쪽, 왼쪽]
dirMap.set(0, [0, 1, 3]);
dirMap.set(1, [1, 2, 0]);
dirMap.set(2, [2, 3, 1]);
dirMap.set(3, [3, 0, 2]);

function bfs(str) {
  // [y, x, 방향, 거울 수]
  const q = [];

  for (let i = 0; i < 4; i++) {
    q.push([...str, i, 0]);
  }

  while (q.length) {
    const [y, x, mov, cnt] = q.shift();

    // [직진, 오른쪽, 왼쪽]
    const dirArr = dirMap.get(mov);
    // const [straight, right, left] = dirArr;

    // 직진
    let [dy, dx] = moveMap.get(dirArr[0]);
    let ny = y + dy;
    let nx = x + dx;

    if (ny < h && ny > -1 && nx < w && nx > -1) {
      if (map[ny][nx] !== "*") {
        if (visited[ny][nx][mov] > cnt) {
          q.push([ny, nx, mov, cnt]);
          visited[ny][nx][mov] = cnt;
        }
      }
    }

    // 방향전환
    for (let i = 1; i < 3; i++) {
      [dy, dx] = moveMap.get(dirArr[i]);

      ny = y + dy;
      nx = x + dx;

      if (ny < h && ny > -1 && nx < w && nx > -1) {
        if (map[ny][nx] !== "*") {
          if (visited[ny][nx][dirArr[i]] > cnt + 1) {
            q.push([ny, nx, dirArr[i], cnt + 1]);
            visited[ny][nx][dirArr[i]] = cnt + 1;
          }
        }
      }
    }
  }
}

bfs(target[0]);

const [destY, destX] = target[1];

console.log(Math.min(...visited[destY][destX]));