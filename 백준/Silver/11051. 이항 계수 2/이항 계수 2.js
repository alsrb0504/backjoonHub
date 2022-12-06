const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const DIV = 10007n;
const SIZE = 1001;
const [N, K] = input[0].split(" ").map(Number);
const dp = Array.from({ length: SIZE + 1 }, () => new Array(SIZE + 1).fill(1n));

// 파스칼의 삼각형
for (let i = 2; i <= SIZE; i++) {
  for (let j = 1; j < i; j++) {
    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % DIV;
  }
}

console.table(dp[N][K].toString());
