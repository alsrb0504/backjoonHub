const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const answer = [];
let line = 0;

const dy = [0, 0, -1, 1, -1, -1, 1, 1];
const dx = [-1, 1, 0, 0, -1, 1, -1, 1];

while (true) {
  const [H, W] = input[line].split(" ").map(Number);

  if (H === 0) break;

  const map = input
    .slice(line + 1, line + 1 + H)
    .map((el) => el.trimEnd().split(""));

  for (let y = 0; y < H; y++) {
    let tmp = [];

    for (let x = 0; x < W; x++) {
      if (map[y][x] === "*") tmp.push("*");
      else {
        let cnt = 0;

        for (let i = 0; i < 8; i++) {
          const [ny, nx] = [y + dy[i], x + dx[i]];

          if (ny < 0 || nx < 0 || ny >= H || nx >= W) continue;
          if (map[ny][nx] === "*") cnt++;
        }

        tmp.push(cnt);
      }
    }

    answer.push(tmp.join(""));
  }

  line += H + 1;
}

console.log(answer.join("\n"));