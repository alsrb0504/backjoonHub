const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const stairs = input.slice(1, 1 + N).map(Number);
const dp = Array.from({ length: 301 }, () => new Array(2).fill(0));

dp[0][0] = stairs[0];
// 예외처리 필요
if (N > 1) {
  dp[1][0] = stairs[1];
  dp[1][1] = stairs[0] + stairs[1];
}

for (let i = 2; i < N; i++) {
  const curr = stairs[i];
  const [f1, f2] = dp[i - 2];
  const [s1, s2] = dp[i - 1];

  dp[i][0] = Math.max(f1 + curr, f2 + curr);
  dp[i][1] = s1 + curr;
}

console.log(Math.max(dp[N - 1][0], dp[N - 1][1]));