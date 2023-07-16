const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W, K] = input[0].split(" ").map(Number);
const map = Array.from({ length: H }, () => new Array(W).fill(0));
const visited = Array.from({ length: H }, () => new Array(W).fill(0));
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
let answer = 0;

input.slice(1, 1 + K).forEach((info) => {
  const [y, x] = info.split(" ").map((el) => Number(el) - 1);
  map[y][x] = 1;
});

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === 1 && !visited[i][j]) {
      answer = Math.max(answer, bfs(i, j));
    }
  }
}

console.log(answer);

function bfs(sy, sx) {
  const q = [[sy, sx]];
  let count = 1;
  visited[sy][sx] = true;

  while (q.length) {
    const [y, x] = q.shift();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (
        ny < 0 ||
        nx < 0 ||
        ny >= H ||
        nx >= W ||
        visited[ny][nx] ||
        map[ny][nx] === 0
      )
        continue;

      visited[ny][nx] = true;
      count++;
      q.push([ny, nx]);
    }
  }

  return count;
}
