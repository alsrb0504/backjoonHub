const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, S, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
const dp = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(false));
dp[0][S] = true;

for (let i = 1; i <= N; i++) {
  const curr = nums[i - 1];

  for (let j = 0; j <= M; j++) {
    if (dp[i - 1][j]) {
      if (j - curr >= 0) dp[i][j - curr] = true;
      if (j + curr <= M) dp[i][j + curr] = true;
    }
  }
}

let answer = -1;
for (let i = 0; i <= M; i++) {
  if (dp[N][i]) answer = i;
}

console.log(answer);
