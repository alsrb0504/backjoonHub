const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [h, w] = input[0].split(" ").map(Number);

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const map = input.slice(1, 1 + h).map((line) => line.split(" ").map(Number));
const groupVisited = Array.from({ length: h }, () => new Array(w).fill(0));
let groupNum = 1;

const groupMap = new Map();
const candidates = [];

let answer = 0;

function bfs(y, x, gn) {
  const q = [[y, x]];
  groupVisited[y][x] = gn;

  let gCnt = 1;

  while (q.length) {
    const [cy, cx] = q.shift();

    for (let i = 0; i < 4; i++) {
      const ny = cy + dy[i];
      const nx = cx + dx[i];

      if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;
      if (map[ny][nx] === 0) continue;
      if (groupVisited[ny][nx] !== 0) continue;

      groupVisited[ny][nx] = gn;
      q.push([ny, nx]);
      gCnt++;
    }
  }

  return gCnt;
}

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (map[i][j] === 1 && groupVisited[i][j] === 0) {
      const cnt = bfs(i, j, groupNum);
      groupMap.set(groupNum++, cnt);
    }

    if (map[i][j] === 0) {
      for (let k = 0; k < 4; k++) {
        const ny = i + dy[k];
        const nx = j + dx[k];

        if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;

        if (map[ny][nx] === 1) {
          candidates.push([i, j]);
          break;
        }
      }
    }
  }
}

candidates.forEach((pos) => {
  const [y, x] = pos;

  let sum = 1;

  const visited = [];

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;

    if (map[ny][nx] === 1) {
      const gn = groupVisited[ny][nx];

      if (visited.find((el) => el === gn) === undefined) {
        const gc = groupMap.get(gn);
        sum += gc;

        visited.push(gn);
      }
    }
  }

  answer = Math.max(answer, sum);
});

console.log(answer);