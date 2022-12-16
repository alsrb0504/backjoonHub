const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const DIV = 998244353;
const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

const dp = new Array(N).fill(0);
// const sum = new Array(N).fill(0);
dp[0] = 1;

for (let i = 1; i < N; i++) {
  // if(dp[i])
  let sum = 0;

  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      sum += dp[j];
    }
  }

  sum %= DIV;
  dp[i] = sum + 1;
}
// console.table(dp);
console.log(dp.join(" "));