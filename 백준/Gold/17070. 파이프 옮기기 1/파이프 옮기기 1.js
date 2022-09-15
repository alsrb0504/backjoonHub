const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const map = input
  .slice(1, N + 1)
  .map((line) => line.trimEnd().split(" ").map(Number));

let answer = 0;

dfs(0, 0, 1);
console.log(answer);

function dfs(form, y, x) {
  if (y === N - 1 && x === N - 1) {
    answer++;
    return;
  }

  //
  switch (form) {
    // 가로
    case 0: {
      // 가로, 대각선 이동 가능
      if (x + 1 < N && map[y][x + 1] === 0) {
        dfs(0, y, x + 1);
      }

      if (
        x + 1 < N &&
        y + 1 < N &&
        map[y][x + 1] === 0 &&
        map[y + 1][x + 1] === 0 &&
        map[y + 1][x] === 0
      ) {
        dfs(2, y + 1, x + 1);
      }
      break;
    }
    // 세로
    case 1: {
      // 세로, 대각선 이동 가능
      if (y + 1 < N && map[y + 1][x] === 0) {
        dfs(1, y + 1, x);
      }

      if (
        x + 1 < N &&
        y + 1 < N &&
        map[y][x + 1] === 0 &&
        map[y + 1][x + 1] === 0 &&
        map[y + 1][x] === 0
      ) {
        dfs(2, y + 1, x + 1);
      }
      break;
    }
    // 대각선
    case 2: {
      if (x + 1 < N && map[y][x + 1] === 0) {
        dfs(0, y, x + 1);
      }

      if (y + 1 < N && map[y + 1][x] === 0) {
        dfs(1, y + 1, x);
      }

      if (
        x + 1 < N &&
        y + 1 < N &&
        map[y][x + 1] === 0 &&
        map[y + 1][x + 1] === 0 &&
        map[y + 1][x] === 0
      ) {
        dfs(2, y + 1, x + 1);
      }
      break;
    }
    default:
      break;
  }
}
