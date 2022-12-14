const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const MAX = 50000;
const N = Number(input[0]);
const dp = new Array(MAX + 1).fill(0);
const squares = [0];

let pow = 1;
while (pow * pow <= MAX) {
  const square = pow * pow;
  dp[square] = 1;
  squares.push(square);
  pow++;
}

pow = 1;
for (let i = 2; i <= MAX; i++) {
  if (dp[i] === 1) {
    pow++;
    continue;
  }

  dp[i] = Number.MAX_SAFE_INTEGER;

  for (let j = 1; j <= pow; j++) {
    dp[i] =
      dp[i] < dp[j * j] + dp[i - j * j] ? dp[i] : dp[j * j] + dp[i - j * j];
  }
}

console.log(dp[N]);
