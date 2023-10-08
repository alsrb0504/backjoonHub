const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const [H, W, N] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((line) => line.split(""));
const first = map.map((line) => [...line]);
const second = Array.from({ length: H }, () => new Array(W).fill("O"));
const third = Array.from({ length: H }, () => new Array(W).fill("O"));
const fifth = Array.from({ length: H }, () => new Array(W).fill("O"));

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (map[y][x] === "O") {
      third[y][x] = ".";

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];
        if (ny < 0 || nx < 0 || ny >= H || nx >= W) continue;
        third[ny][nx] = ".";
      }
    }
  }
}

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (third[y][x] === "O") {
      fifth[y][x] = ".";

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];
        if (ny < 0 || nx < 0 || ny >= H || nx >= W) continue;
        fifth[ny][nx] = ".";
      }
    }
  }
}

if (N === 1) {
  console.log(printMap(first));
} else if (N % 2 === 0) {
  console.log(printMap(second));
} else {
  console.log(N % 4 === 1 ? printMap(fifth) : printMap(third));
}

function printMap(arr) {
  return arr.map((line) => line.join("")).join("\n");
}
