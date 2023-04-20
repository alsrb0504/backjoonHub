const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const findNum = Number(input[1]);
const map = Array.from({ length: N }, () => new Array(N).fill(0));

let [y, x] = [Math.floor(N / 2), Math.floor(N / 2)];
let cur = 1; // 현재 배열에 넣을 값 1 ~ N ^ 2
let dir = 0;

let TurnCnt = 0; // 2번 돌면 달팽이 길이 증가
let accTurnCnt = 1; // 현재 달팽이 길이

// 상, 우, 하, 좌
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

map[y][x] = 1;

while (cur <= N * N) {
  if (TurnCnt < 2) {
    for (let i = 0; i < accTurnCnt; i++) {
      [y, x] = [y + dy[dir], x + dx[dir]];

      if (y < 0 || x < 0 || y >= N || x >= N) {
        cur = Infinity;
        break;
      }

      map[y][x] = ++cur;
    }

    TurnCnt++;
    dir = (dir + 1) % 4;
  }
  // dir === 2인 경우
  else {
    TurnCnt = 0;
    accTurnCnt++;
    continue;
  }
}

const answer = [];

map.forEach((el) => {
  answer.push(el.join(" "));
});

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === findNum) {
      answer.push(`${i + 1} ${j + 1}`);
      break;
    }
  }
}

console.log(answer.join("\n"));