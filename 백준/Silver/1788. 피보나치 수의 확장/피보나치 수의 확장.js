const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const DIV = 1e9;

if (N > 0) {
  const dp = new Array(N + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i <= N; i++) {
    dp[i] = (dp[i - 2] + dp[i - 1]) % DIV;
  }

  console.log(1 + "\n" + dp[N]);
} else if (N === 0) {
  console.log(0 + "\n" + 0);
} else {
  const absN = Math.abs(N);

  const dp = new Array(absN + 1).fill(0);
  dp[1] = 1;
  dp[2] = -1;

  for (let i = 3; i <= absN; i++) {
    dp[i] = (dp[i - 2] - dp[i - 1]) % DIV;
  }

  console.log(`${dp[absN] > 0 ? 1 : -1}\n${Math.abs(dp[absN])}`);
}
