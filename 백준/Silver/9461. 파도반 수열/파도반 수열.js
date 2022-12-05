const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const tc = Number(input[0]);
const nums = input.slice(1, 1 + tc).map(Number);
const answer = [];
const dp = new Array(101).fill(0);

dp[1] = 1;
dp[2] = 1;
dp[3] = 1;
dp[4] = 2;
dp[5] = 2;
dp[6] = 3;

for (let i = 7; i < 101; i++) {
  dp[i] = dp[i - 5] + dp[i - 1];
}

nums.forEach((val) => {
  answer.push(dp[val]);
});

console.log(answer.join("\n").trimEnd());
