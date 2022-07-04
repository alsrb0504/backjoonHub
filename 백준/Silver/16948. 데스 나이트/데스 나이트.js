const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const size = Number(input[0]);
const [y1, x1, y2, x2] = input[1].split(" ").map(Number);

function bfs() {
  const q = [[y1, x1, 0]];

  const moves = [
    [-2, -1],
    [-2, 1],
    [0, -2],
    [0, 2],
    [2, -1],
    [2, 1],
  ];

  while (q.length !== 0) {
    const [curY, curX, cnt] = q.shift();

    if (visited[curY][curX]) continue;

    visited[curY][curX] = true;
    board[curY][curX] = cnt;

    for (let i = 0; i < 6; i++) {
      const [moveY, moveX] = moves[i];
      const nextY = curY + moveY;
      const nextX = curX + moveX;

      if (0 <= nextY && nextY < size && 0 <= nextX && nextX < size) {
        q.push([nextY, nextX, cnt + 1]);
      }
    }
  }
}

const board = new Array(size);
const visited = new Array(size);

for (let i = 0; i < size; i++) {
  board[i] = new Array(size).fill(0);
  visited[i] = new Array(size).fill(false);
}

bfs();

console.log(board[y2][x2] === 0 ? -1 : board[y2][x2]);