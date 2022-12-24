const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

if (N === 1) {
  console.log(0);
  return;
}

const dp = new Array(N + 1).fill(0);

for (let i = 0; i <= N; i++) {
  const cur = nums[i];

  if (cur === 0) continue;
  if (i !== 0 && dp[i] === 0) continue;

  for (let j = 1; j <= cur; j++) {
    if (i + j >= N) continue;

    if (dp[i + j] === 0) dp[i + j] = dp[i] + 1;
    else dp[i + j] = Math.min(dp[i] + 1, dp[i + j]);
  }
}

console.log(dp[N - 1] === 0 ? -1 : dp[N - 1]);