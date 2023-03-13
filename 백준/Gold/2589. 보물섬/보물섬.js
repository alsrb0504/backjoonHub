const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.trimEnd().split(""));
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

let answer = 0;

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === "L") {
      answer = Math.max(answer, bfs(i, j));
    }
  }
}

console.log(answer);

function bfs(cy, cx) {
  const visited = Array.from({ length: H }, () => new Array(W).fill(false));
  const q = [[cy, cx, 0]];
  visited[cy][cx] = true;

  let max = 0;

  while (q.length) {
    const [y, x, cnt] = q.shift();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (
        ny < 0 ||
        nx < 0 ||
        ny >= H ||
        nx >= W ||
        visited[ny][nx] ||
        map[ny][nx] === "W"
      )
        continue;

      visited[ny][nx] = true;
      max = Math.max(max, cnt + 1);
      q.push([ny, nx, cnt + 1]);
    }
  }

  return max;
}
