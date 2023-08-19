const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((line) => line.trimEnd().split(""));
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

let answer = {
  sheep: 0,
  wolf: 0,
};

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === "#" || visited[i][j]) continue;

    bfs(i, j);
  }
}

console.log(answer.sheep, answer.wolf);

function bfs(sy, sx) {
  const q = [[sy, sx]];
  visited[sy][sx] = true;

  let sheep = 0;
  let wolf = 0;

  while (q.length) {
    const [y, x] = q.shift();
    const curr = map[y][x];

    if (curr === "v") wolf++;
    if (curr === "o") sheep++;

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (
        ny < 0 ||
        nx < 0 ||
        ny >= H ||
        nx >= W ||
        map[ny][nx] === "#" ||
        visited[ny][nx]
      )
        continue;

      visited[ny][nx] = true;
      q.push([ny, nx]);
    }
  }

  if (wolf >= sheep) {
    answer.wolf += wolf;
  } else {
    answer.sheep += sheep;
  }
}
