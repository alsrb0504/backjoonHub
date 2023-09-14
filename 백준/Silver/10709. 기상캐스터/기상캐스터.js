const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.trimEnd().split(""));

const answer = Array.from({ length: H }, () => new Array(W).fill(Infinity));

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === "c") {
      for (let k = j; k < W; k++) {
        answer[i][k] = Math.min(answer[i][k], k - j);
      }
    }
  }
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (answer[i][j] === Infinity) answer[i][j] = -1;
  }
}

const result = answer.map((el) => el.join(" "));

console.table(result.join("\n"));
