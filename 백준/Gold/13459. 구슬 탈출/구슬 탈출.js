const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

// up, down, left, right
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1, 1 + N).map((line) => line.trimEnd().split(""));

let r = [];
let b = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "B") {
      b = [i, j];
    }
    if (board[i][j] === "R") {
      r = [i, j];
    }
  }
}

// console.table(board);

function bfs() {
  // [ry, rx, by, bx, cnt];
  const q = [[r[0], r[1], b[0], b[1], 0]];

  while (q.length) {
    // console.table(q);
    const [ry, rx, by, bx, cnt] = q.shift();

    // 이동 가능 방향 탐색.
    for (let i = 0; i < 4; i++) {
      // 빨간 구슬
      let nry = ry + dy[i];
      let nrx = rx + dx[i];

      let nby = by;
      let nbx = bx;

      const cby = by + dy[i];
      const cbx = bx + dx[i];

      if (board[nry][nrx] === "#" && board[cby][cbx] === "#") continue;

      // 빨간구슬 이동
      [nry, nrx, nby, nbx, isPush, isEnd] = move(ry, rx, by, bx, i);

      if (isEnd) return 1;

      if (isPush && cnt < 9) {
        q.push([nry, nrx, nby, nbx, cnt + 1]);
      }
    }
  }

  return 0;
}

console.log(bfs());

// 빨간 구슬 이동
function move(ry, rx, by, bx, dir) {
  let nry = ry;
  let nrx = rx;
  let nby = by;
  let nbx = bx;

  let isRedPossible = false;
  let isBluePossible = false;

  // console.log(`dir = ${dir}`);

  // up
  if (dir === 0) {
    // 빨간 색 먼저 이동
    if (ry < by) {
      [nry, nrx, isRedPossible] = moveRed(nry, nrx, nby, nbx, dir);
      [nby, nbx, isBluePossible] = moveBlue(nry, nrx, nby, nbx, dir);
    } else {
      [nby, nbx, isBluePossible] = moveBlue(nry, nrx, nby, nbx, dir);

      // 실패
      if (isBluePossible) {
        return [0, 0, 0, 0, false, false];
      }

      [nry, nrx, isRedPossible] = moveRed(nry, nrx, nby, nbx, dir);
    }
  }
  // down
  else if (dir === 1) {
    if (ry > by) {
      [nry, nrx, isRedPossible] = moveRed(nry, nrx, nby, nbx, dir);
      [nby, nbx, isBluePossible] = moveBlue(nry, nrx, nby, nbx, dir);
    } else {
      [nby, nbx, isBluePossible] = moveBlue(nry, nrx, nby, nbx, dir);

      // 실패
      if (isBluePossible) {
        return [0, 0, 0, 0, false, false];
      }

      [nry, nrx, isRedPossible] = moveRed(nry, nrx, nby, nbx, dir);
    }
  }
  // left
  else if (dir === 2) {
    if (rx < bx) {
      [nry, nrx, isRedPossible] = moveRed(nry, nrx, nby, nbx, dir);
      [nby, nbx, isBluePossible] = moveBlue(nry, nrx, nby, nbx, dir);
    } else {
      [nby, nbx, isBluePossible] = moveBlue(nry, nrx, nby, nbx, dir);

      // 실패
      if (isBluePossible) {
        return [0, 0, 0, 0, false, false];
      }

      [nry, nrx, isRedPossible] = moveRed(nry, nrx, nby, nbx, dir);
    }
  } else if (dir === 3) {
    if (rx > bx) {
      [nry, nrx, isRedPossible] = moveRed(nry, nrx, nby, nbx, dir);
      [nby, nbx, isBluePossible] = moveBlue(nry, nrx, nby, nbx, dir);
    } else {
      [nby, nbx, isBluePossible] = moveBlue(nry, nrx, nby, nbx, dir);

      // 실패
      if (isBluePossible) {
        return [0, 0, 0, 0, false, false];
      }

      [nry, nrx, isRedPossible] = moveRed(nry, nrx, nby, nbx, dir);
    }
  }

  //      // 빨간공 || 파란공
  // 성공      o         x
  // 실패      o         o
  // 실패      x         o
  // 그냥 이동 x         x

  // return [..., isPush, isEnd]
  if (isRedPossible && !isBluePossible) {
    return [nry, nrx, nby, nbx, false, true];
  }

  if (isBluePossible) {
    return [0, 0, 0, 0, false, false];
  }

  return [nry, nrx, nby, nbx, true, false];
}

function moveRed(ry, rx, by, bx, dir) {
  let nry = ry;
  let nrx = rx;

  while (true) {
    let cy = nry + dy[dir];
    let cx = nrx + dx[dir];

    if (board[cy][cx] === "#" || (cy === by && cx === bx)) {
      break;
    }

    if (board[cy][cx] === "O") {
      return [0, 0, true];
    }

    nry = cy;
    nrx = cx;
  }

  return [nry, nrx, false];
}

function moveBlue(ry, rx, by, bx, dir) {
  let nby = by;
  let nbx = bx;

  while (true) {
    let cy = nby + dy[dir];
    let cx = nbx + dx[dir];

    if (board[cy][cx] === "#" || (cy === ry && cx === rx)) {
      break;
    }

    if (board[cy][cx] === "O") {
      return [0, 0, true];
    }

    nby = cy;
    nbx = cx;
  }

  return [nby, nbx, false];
}
