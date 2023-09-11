const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const data = input.slice(1, 1 + H).map((el) => el.trimEnd().split(""));
const visited = Array.from({ length: H }, () => new Array(W).fill(false));
let answer = 0;

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    const curr = data[i][j];

    if (visited[i][j]) continue;

    visited[i][j] = true;

    if (curr === "-") {
      for (let k = j + 1; k < W; k++) {
        const next = data[i][k];

        if (next === "-") {
          visited[i][k] = true;
        } else {
          break;
        }
      }
    }

    if (curr === "|") {
      for (let k = i + 1; k < H; k++) {
        const next = data[k][j];

        if (next === "|") {
          visited[k][j] = true;
        } else {
          break;
        }
      }
    }

    answer++;
  }
}

console.log(answer);
