const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [h, w] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + h).map((el) => el.split(" ").map(Number));
let last_cnt = 0;
let answer = 0;

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

while (countCheese() !== 0) {
  answer++;
  bfs();
}

console.log(answer + "\n" + last_cnt);

function bfs() {
  let visited = Array.from({ length: h }, () => new Array(w).fill(0));

  const q = [[0, 0]];
  visited[0][0] = 1;

  last_cnt = countCheese();

  while (q.length) {
    const [y, x] = q.shift();

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [y + dy[i], x + dx[i]];

      if (ny < 0 || nx < 0 || ny >= h || nx >= w) continue;

      // 가장자리와 맞닿은 벽이라면
      if (map[ny][nx] === 1) {
        visited[ny][nx] = -1;
        continue;
      }

      if (visited[ny][nx] === 1) continue;

      q.push([ny, nx]);
      visited[ny][nx] = 1;
    }
  }

  for (let y = 1; y < h; y++) {
    for (let x = 1; x < w; x++) {
      if (visited[y][x] === -1) map[y][x] = 0;
    }
  }
}

function countCheese() {
  let cnt = 0;

  for (let y = 1; y < h; y++) {
    for (let x = 1; x < w; x++) {
      if (map[y][x] === 1) {
        cnt++;
      }
    }
  }

  return cnt;
}
