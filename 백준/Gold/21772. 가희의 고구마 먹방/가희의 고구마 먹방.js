const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W, T] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.trimEnd().split(""));

const start = [];
let goguma_cnt = 0;

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === "G") {
      start.push(i);
      start.push(j);
      map[i][j] = ".";
    }
    if (map[i][j] === "S") {
      goguma_cnt++;
    }
  }
}

const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let answer = 0;

dfs(0, start[0], start[1], 0);

console.log(answer);

function dfs(time, y, x, cnt) {
  if (time === T || cnt === goguma_cnt) {
    answer = Math.max(answer, cnt);
    return;
  }

  for (const [dy, dx] of direction) {
    const [ny, nx] = [y + dy, x + dx];

    if (ny < 0 || nx < 0 || ny >= H || nx >= W || map[ny][nx] === "#") continue;

    if (map[ny][nx] === "S") {
      map[ny][nx] = ".";
      dfs(time + 1, ny, nx, cnt + 1);
      map[ny][nx] = "S";
    } else {
      dfs(time + 1, ny, nx, cnt);
    }
  }
}
