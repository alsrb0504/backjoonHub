const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

// [+, -]
const dp = Array.from({ length: N }, () => [1, 1]);

for (let i = 1; i < N; i++) {
  if (nums[i] >= nums[i - 1]) dp[i][0] = dp[i - 1][0] + 1;
  if (nums[i] <= nums[i - 1]) dp[i][1] = dp[i - 1][1] + 1;
}

let answer = 1;

for (let i = 1; i < N; i++) {
  answer = answer > dp[i][0] ? answer : dp[i][0];
  answer = answer > dp[i][1] ? answer : dp[i][1];
}

console.log(answer);