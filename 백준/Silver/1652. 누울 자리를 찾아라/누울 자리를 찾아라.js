const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const board = input.slice(1, 1 + N).map((el) => el.trimEnd().split(""));

let row_cnt = 0;
let col_cnt = 0;

for (let i = 0; i < N; i++) {
  let isPossible = false;

  for (let j = 0; j < N - 1; j++) {
    if (
      isPossible === false &&
      board[i][j] === "." &&
      board[i][j + 1] === "."
    ) {
      row_cnt++;
      isPossible = true;
    } else if (board[i][j] === "X") {
      isPossible = false;
    }
  }
}

for (let i = 0; i < N; i++) {
  let isPossible = false;

  for (let j = 0; j < N - 1; j++) {
    if (
      isPossible === false &&
      board[j][i] === "." &&
      board[j + 1][i] === "."
    ) {
      col_cnt++;
      isPossible = true;
    } else if (board[j][i] === "X") {
      isPossible = false;
    }
  }
}

console.log(`${row_cnt} ${col_cnt}`);