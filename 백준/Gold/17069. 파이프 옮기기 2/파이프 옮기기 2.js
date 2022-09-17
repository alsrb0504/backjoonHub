const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const map = input
  .slice(1, N + 1)
  .map((line) => line.trimEnd().split(" ").map(Number));

// [가로, 대각선, 세로]
const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => new Array(3).fill(0))
);

visited[0][1][0] = 1;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const [wid, cro, hei] = visited[i][j];

    if (wid > 0) {
      if (checkWidth(i, j)) visited[i][j + 1][0] += wid;
      if (checkCross(i, j)) visited[i + 1][j + 1][1] += wid;
    }

    if (cro > 0) {
      if (checkWidth(i, j)) visited[i][j + 1][0] += cro;
      if (checkCross(i, j)) visited[i + 1][j + 1][1] += cro;
      if (checkHeight(i, j)) visited[i + 1][j][2] += cro;
    }

    if (hei > 0) {
      if (checkCross(i, j)) visited[i + 1][j + 1][1] += hei;
      if (checkHeight(i, j)) visited[i + 1][j][2] += hei;
    }
  }
}

function checkWidth(y, x) {
  if (x + 1 < N && map[y][x + 1] !== 1) return true;
  else return false;
}

function checkCross(y, x) {
  if (
    x + 1 < N &&
    y + 1 < N &&
    map[y + 1][x + 1] !== 1 &&
    map[y][x + 1] !== 1 &&
    map[y + 1][x] !== 1
  )
    return true;
  else return false;
}

function checkHeight(y, x) {
  if (y + 1 < N && map[y + 1][x] !== 1) return true;
  else return false;
}

const answer = visited[N - 1][N - 1].reduce((acc, cur) => acc + cur, 0);
console.log(answer);
