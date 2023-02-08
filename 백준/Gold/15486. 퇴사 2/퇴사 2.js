const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const dp = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  const [t, p] = data[i - 1];

  dp[i] = Math.max(dp[i - 1], dp[i]);

  if (i + t - 1 <= N) dp[i + t - 1] = Math.max(dp[i + t - 1], dp[i - 1] + p);
}

console.log(dp[N]);
