const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

// right, up, left, down.
const dy = [0, -1, 0, 1];
const dx = [1, 0, -1, 0];
const SIZE = 101;

const N = Number(input[0]);
const visited = Array.from({ length: SIZE }, () => new Array(SIZE).fill(0));
let answer = 0;

input.slice(1, 1 + N).forEach((el) => {
  const [x, y, dir, gen] = el.split(" ").map(Number);
  const [ny, nx] = [y + dy[dir], x + dx[dir]];

  // 시작점과 끝점.
  // 모든 좌표들을 90도 회전.
  visited[y][x] = 1;
  visited[ny][nx] = 1;

  const stack = [
    [y, x],
    [ny, nx],
  ];

  for (let i = 0; i < gen; i++) {
    Rotate();
  }

  function Rotate() {
    const [sy, sx] = stack.at(-1);
    const cur_size = stack.length;

    for (let k = cur_size - 2; k >= 0; k--) {
      const [cy, cx] = stack[k];
      const x_diff = cx - sx;
      const y_diff = cy - sy;

      const [ny, nx] = [sy + x_diff, sx + -1 * y_diff];

      stack.push([ny, nx]);
      visited[ny][nx] = 1;
    }
  }
});

for (let i = 0; i < SIZE - 1; i++) {
  for (let j = 0; j < SIZE - 1; j++) {
    if (
      visited[i][j] &&
      visited[i][j + 1] &&
      visited[i + 1][j] &&
      visited[i + 1][j + 1]
    )
      answer++;
  }
}

console.log(answer);