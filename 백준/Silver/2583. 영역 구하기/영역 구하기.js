const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W, K] = input[0].split(" ").map(Number);
const map = Array.from({ length: H }, () => new Array(W).fill(0));
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const answer = [];

for (let i = 1; i <= K; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map(Number);

  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      map[y][x]++;
    }
  }
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (!visited[i][j] && map[i][j] === 0) {
      answer.push(bfs(i, j));
    }
  }
}

console.log(answer.length + "\n" + answer.sort((a, b) => a - b).join(" "));

function bfs(cy, cx) {
  const q = [[cy, cx]];
  visited[cy][cx] = true;
  let cnt = 1;

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
        map[ny][nx] > 0
      )
        continue;

      visited[ny][nx] = true;
      cnt++;
      q.push([ny, nx]);
    }
  }

  return cnt;
}
