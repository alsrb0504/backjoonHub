const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input
  .slice(1, 1 + N)
  .map((el) => el.trimEnd().split(" ").map(Number));
const board = Array.from({ length: 101 }, () => new Array(101).fill(false));
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
let answer = 0;

for (const [cx, cy] of data) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board[cy + i][cx + j] = true;
    }
  }
}

for (let y = 0; y < 101; y++) {
  for (let x = 0; x < 101; x++) {
    if (board[y][x]) continue;

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];
      if (ny < 0 || nx < 0 || ny >= 101 || nx >= 101) continue;

      if (board[ny][nx]) answer++;
    }
  }
}

console.log(answer);
