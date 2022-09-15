function solution(oper) {
  // [r, c]는 중심, [s]는 회전 범위
  let [r, c, s] = oper;
  r--;
  c--;

  // center
  const [cy, cs] = [r, c];

  for (let i = 1; i <= s; i++) {
    rotate(cy, cs, i);
  }
}

function rotate(cy, cx, length) {
  // 시작점에서
  const [sy, sx] = [cy - length, cx - length];
  const moveCnt = length * 2;
  let [y, x] = [sy, sx];
  let prev = map[y][x];
  let tmp = 0;

  for (let i = 1; i <= moveCnt; i++) {
    x++;
    moveValue();
  }

  for (let i = 1; i <= moveCnt; i++) {
    y++;
    moveValue();
  }

  for (let i = 1; i <= moveCnt; i++) {
    x--;
    moveValue();
  }

  for (let i = 1; i <= moveCnt; i++) {
    y--;
    moveValue();
  }

  function moveValue() {
    tmp = map[y][x];
    map[y][x] = prev;
    prev = tmp;
  }
}

const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);

const map_origin = input
  .slice(1, N + 1)
  .map((values) => values.trimEnd().split(" ").map(Number));

const opers = input
  .slice(N + 1, N + K + 1)
  .map((values) => values.trimEnd().split(" ").map(Number));

let map;
let answer = Infinity;

const stack = [];
const visited = new Array(K).fill(false);

dfs(0);

// 돌리는 순서
// 6!
function dfs(cnt) {
  if (cnt === K) {
    map = [];
    map_origin.forEach((line) => {
      map.push([...line]);
    });

    stack.forEach((oper) => {
      solution(oper);
    });

    for (let i = 0; i < N; i++) {
      let sum = 0;
      for (let j = 0; j < M; j++) sum += map[i][j];
      answer = Math.min(answer, sum);
    }
  }

  for (let i = 0; i < K; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    stack.push(opers[i]);
    dfs(cnt + 1);
    stack.pop();
    visited[i] = false;
  }
}

console.log(answer);