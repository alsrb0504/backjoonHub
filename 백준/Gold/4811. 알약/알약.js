const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const answer = [];
const SIZE = 30;
const dp = Array.from({ length: SIZE + 1 }, () => new Array(SIZE + 2).fill(1n));

for (let i = 1; i <= SIZE; i++) {
  for (let j = 0; j <= SIZE; j++) {
    if (j === 0) dp[i][j] = dp[i - 1][1]; 
    else dp[i][j] = dp[i][j - 1] + dp[i - 1][j + 1];
  }
}

input.forEach((el) => {
  const num = Number(el);

  if (num !== 0) answer.push(dp[num][0]);
});

console.table(answer.join("\n"));