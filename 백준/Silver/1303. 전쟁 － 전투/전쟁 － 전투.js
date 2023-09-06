const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [W, H] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.trimEnd().split(""));
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

let bluePower = 0;
let whitePower = 0;

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (visited[i][j]) continue;

    const result = bfs(i, j, map[i][j]);

    if (map[i][j] === "W") whitePower += result ** 2;
    else bluePower += result ** 2;
  }
}

console.log(`${whitePower} ${bluePower}`);

function bfs(sy, sx, color) {
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
        map[ny][nx] !== color
      )
        continue;

      visited[ny][nx] = true;
      q.push([ny, nx]);
      count++;
    }
  }

  return count;
}
