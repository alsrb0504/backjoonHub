const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, T] = input[0].split(" ").map(Number);
const data = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const dp = Array.from({ length: N + 1 }, () => new Array(T + 1).fill(0));
let answer = 0;

for (let i = 1; i <= N; i++) {
  const [cost, benefit] = data[i - 1];

  for (let j = 0; j <= T; j++) {
    if (j < cost) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - cost] + benefit);
    }
  }
}

console.log(dp[N][T]);