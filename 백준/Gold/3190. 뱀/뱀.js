const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

// 상, 우, 하, 좌
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const N = Number(input[0]);
const board = Array.from({ length: N + 2 }, () => new Array(N + 2).fill(0));
const apple_cnt = Number(input[1]);
const apples = input
  .slice(2, 2 + apple_cnt)
  .map((el) => el.split(" ").map(Number));
const move_cnt = Number(input[2 + apple_cnt]);
const moves = input
  .slice(3 + apple_cnt, 3 + apple_cnt + move_cnt)
  .map((el) => el.trimEnd().split(" "));

// 벽
for (let i = 0; i < N + 2; i++) {
  board[0][i] = -1;
  board[N + 1][i] = -1;
  board[i][0] = -1;
  board[i][N + 1] = -1;
}

let time = 0;
let dir = 1;
let move_idx = 0;

// 1: 사과, 2: 뱀.
board[1][1] = 2;

apples.forEach((el) => {
  const [y, x] = el;
  board[y][x] = 1;
});

// 뱀 위치들.
const pos = [[1, 1]];

while (true) {
  // 머리는 항상 맨 앞.
  const [y, x] = pos[0];
  const [ny, nx] = [y + dy[dir], x + dx[dir]];

  time++;

  if (board[ny][nx] === -1 || board[ny][nx] === 2) break;

  if (board[ny][nx] === 1) {
    pos.unshift([ny, nx]);
    board[ny][nx] = 2;
  } else {
    const [ly, lx] = pos.pop();
    board[ly][lx] = 0;

    pos.unshift([ny, nx]);
    board[ny][nx] = 2;
  }

  if (move_idx < move_cnt) {
    const [cond_t, cond_d] = moves[move_idx];
    if (time === Number(cond_t)) {
      if (cond_d === "D") {
        dir = (dir + 1) % 4;
      } else {
        dir = dir - 1 < 0 ? 3 : dir - 1;
      }

      move_idx++;
    }
  }
}

console.log(time);