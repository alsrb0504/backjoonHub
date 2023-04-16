const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const K = Number(input[1]);
const coinInfo = input.slice(2, 2 + K).map((el) => el.split(" ").map(Number));
const dp = new Array(N + 1).fill(0);

dp[0] = 1;

coinInfo.forEach((info) => {
  const [price, cnt] = info;

  for (let idx = N; idx >= 0; idx--) {
    for (let k = 1; k <= cnt && idx - price * k >= 0; k++) {
      dp[idx] += dp[idx - price * k];
    }
  }
});

console.table(dp[N]);