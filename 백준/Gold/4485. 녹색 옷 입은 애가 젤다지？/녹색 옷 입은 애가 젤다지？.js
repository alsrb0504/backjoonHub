const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const answer = [];
let line = 0;
let tc = 1;

while (true) {
  const N = Number(input[line]);
  if (N === 0) break;

  const board = input
    .slice(line + 1, line + 1 + N)
    .map((el) => el.trimEnd().split(" ").map(Number));

  const visited = Array.from({ length: N }, () => new Array(N).fill(9 * 126));
  const q = [[0, 0]];
  visited[0][0] = board[0][0];

  while (q.length) {
    const [y, x] = q.shift();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;

      if (visited[ny][nx] > visited[y][x] + board[ny][nx]) {
        visited[ny][nx] = visited[y][x] + board[ny][nx];
        q.push([ny, nx]);
      }
    }
  }

  answer.push(`Problem ${tc}: ${visited[N - 1][N - 1]}`);

  tc++;
  line += N + 1;
}

console.log(answer.join("\n"));
