const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + H).map((el) => el.split(" ").map(Number));
const dp = Array.from({ length: H + 1 }, () => new Array(W + 1).fill(1));

// 오른쪽, 오른쪽 아래 대각선, 아래쪽
const dy = [0, 1, 1];
const dx = [1, 1, 0];
let answer = 0;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (map[y][x] !== 0) dp[y][x] = 0;
  }
}

for (let y = 0; y <= H; y++) dp[y][W] = 0;
for (let x = 0; x <= W; x++) dp[H][x] = 0;

for (let y = H - 1; y >= 0; y--) {
  for (let x = W - 1; x >= 0; x--) {
    if (map[y][x] === 0) {
      const squreSet = new Set();

      for (let i = 0; i < 3; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        squreSet.add(dp[ny][nx]);
      }

      dp[y][x] = Math.min(...squreSet) + 1;
      answer = Math.max(answer, dp[y][x]);
    }
  }
}

console.log(answer);