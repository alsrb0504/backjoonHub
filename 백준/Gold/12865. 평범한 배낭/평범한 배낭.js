const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const items = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () => new Array(K + 1).fill(0));

items.forEach((el, idx) => {
  const [w, c] = el;

  for (let i = 1; i <= K; i++) {
    if (i >= w) dp[idx + 1][i] = Math.max(dp[idx][i], dp[idx][i - w] + c);
    else dp[idx + 1][i] = dp[idx][i];
  }
});

console.log(dp[N][K]);
