const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.split(" ").map(Number));
const visited = Array.from({ length: H }, () => new Array(W).fill(false));

const answer = {
  cnt: 0,
  max: 0,
};

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === 1 && !visited[i][j]) {
      answer.cnt++;
      const result = bfs(i, j);

      answer.max = Math.max(answer.max, result);
    }
  }
}

console.log(`${answer.cnt}\n${answer.max}`);

function bfs(sy, sx) {
  const q = [[sy, sx]];
  let count = 0;
  visited[sy][sx] = true;

  while (q.length) {
    const [y, x] = q.shift();
    count++;

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (
        (ny < 0) | (nx < 0) ||
        ny >= H ||
        nx >= W ||
        visited[ny][nx] ||
        map[ny][nx] === 0
      )
        continue;

      visited[ny][nx] = true;
      q.push([ny, nx]);
    }
  }

  return count;
}
