const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input.slice(1, 1 + N).map(Number);
const max = Math.max(...nums);
const dp = Array.from({ length: max + 1 }, () => new Array(2).fill(0));
const answer = [];

dp[0][0] = 1;

// 예외처리
if (max > 0) dp[1][1] = 1;

for (let i = 2; i <= max; i++) {
  dp[i][0] = dp[i - 2][0] + dp[i - 1][0];
  dp[i][1] = dp[i - 2][1] + dp[i - 1][1];
}

nums.forEach((n) => {
  const find = `${dp[n][0]} ${dp[n][1]}`;
  answer.push(find);
});

console.log(answer.join("\n").trimEnd());
