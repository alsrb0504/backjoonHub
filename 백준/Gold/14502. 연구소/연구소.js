const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [h, w] = input[0].split(" ").map(Number);

const board = [];
const virus = [];
const empty = [];
const DFSstack = [];
let Max = 0;

for (let i = 1; i <= h; i++) {
  board[i - 1] = input[i].split(" ").map(Number);
}

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (board[i][j] === 2) virus.push([i, j]);
    else if (board[i][j] === 0) empty.push([i, j]);
  }
}

function DFS(cnt, start) {
  if (cnt === 3) {
    BFS();
    return;
  }

  for (let i = start; i < empty.length; i++) {
    DFSstack.push(empty[i]);
    DFS(cnt + 1, i + 1);
    DFSstack.pop();
  }
}

function BFS() {
  const moves = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const copy = board.map((v) => [...v]);

  const q = [];
  let safe = 0;

  DFSstack.forEach((pos) => {
    const [y, x] = pos;
    copy[y][x] = 1;
  });

  virus.forEach((pos) => {
    q.push(pos);
  });

  while (q.length !== 0) {
    const [y, x] = q.shift();

    for (let i = 0; i < 4; i++) {
      const nextY = y + moves[i][0];
      const nextX = x + moves[i][1];

      if (nextY > -1 && nextY < h && nextX > -1 && nextX < w) {
        if (copy[nextY][nextX] === 0) {
          copy[nextY][nextX] = 2;
          q.push([nextY, nextX]);
        }
      }
    }
  }

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (copy[i][j] === 0) safe++;
    }
  }

  if (safe > Max) Max = safe;
}

DFS(0, 0);

console.log(Max);