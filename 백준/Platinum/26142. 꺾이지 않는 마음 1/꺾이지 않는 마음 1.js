const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const dragons = input.slice(1, N + 1).map((str) => str.split(" ").map(Number));
const dp = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));
let answer = [];

dragons.sort((a, b) => a[0] - b[0]);

for (let i = 1; i <= N; i++) {
  for (let j = i; j <= N; j++) {
    dp[i][j] = Math.max(
      dp[i][j - 1],
      dp[i - 1][j - 1] + dragons[j - 1][1] + dragons[j - 1][0] * (i - 1)
    );
  }
}

for (let i = 1; i <= N; i++) {
  answer.push(dp[i][N]);
}

// console.table(dp);
// console.table(dragons);

console.log(answer.join("\n"));
