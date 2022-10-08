const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const Move = [
  [2, -1, 0],
  [8, 1, 0],
  [4, 0, 1],
  [1, 0, -1],
];

const [w, h] = input[0].split(" ").map(Number);
const map = input
  .slice(1, 1 + h)
  .map((line) => line.trimEnd().split(" ").map(Number));

let groupNum = 0;
const groupCnt = [];
let groupMax = 0;

const visited = Array.from({ length: h }, () => new Array(w).fill(-1));

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (visited[i][j] === -1) {
      const gc = bfs(i, j);
      groupNum++;

      groupMax = Math.max(groupMax, gc);

      groupCnt.push(gc);
    }
  }
}

let groupSum = groupMax;

// console.log(6 & 1 ? true : false);
// console.log(6 & 2 ? true : false);
// console.log(6 & 4 ? true : false);
// console.log(6 & 8 ? true : false);

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const curGroup = visited[y][x];
    const curWall = map[y][x];

    for (let i = 0; i < 4; i++) {
      const isWall = curWall & Move[i][0] ? true : false;

      if (isWall === true) {
        const [ny, nx] = [y + Move[i][1], x + Move[i][2]];

        if (ny < 0 || nx < 0 || ny >= h || nx >= w) continue;
        if (visited[ny][nx] === curGroup) continue;

        const otherGroup = visited[ny][nx];

        groupSum = Math.max(
          groupSum,
          groupCnt[curGroup] + groupCnt[otherGroup]
        );
      }
    }
  }
}

let result = groupNum + "\n" + groupMax + "\n" + groupSum;

console.log(result);

// console.table(visited);

// console.log(groupCnt);

// console.log(`그룹 수 : ${groupNum}`);
// console.log(`그룹 아이템 최대 수 : ${groupMax}`);
// console.log(`그룹 합친 아이템 최대 수 : ${groupSum}`);

// console.log(groupSum);

function bfs(sy, sx) {
  const q = [[sy, sx]];
  visited[sy][sx] = groupNum;

  let cnt = 0;

  while (q.length) {
    //
    cnt++;

    const [y, x] = q.shift();
    const walls = map[y][x];

    for (let i = 0; i < 4; i++) {
      // 비트 마스크 포함
      if (walls & Move[i][0]) continue;

      const [ny, nx] = [y + Move[i][1], x + Move[i][2]];

      if (ny < 0 || nx < 0 || ny >= h || nx >= w) continue;
      if (visited[ny][nx] !== -1) continue;

      visited[ny][nx] = groupNum;
      q.push([ny, nx]);

      // if (visited[ny][nx])
    }
  }

  return cnt;
}
