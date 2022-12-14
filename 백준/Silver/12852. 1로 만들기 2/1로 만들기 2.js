const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const dp = new Array(1000001).fill(0);
dp[1] = 0;
dp[2] = 1;
dp[3] = 1;

for (let i = 4; i <= 1000001; i++) {
  // 2와 3 모두 나눠지는 경우
  if (i % 3 === 0 && i % 2 === 0) {
    dp[i] = Math.min(dp[i / 3], dp[i / 2], dp[i - 1]) + 1;
  }
  // 3으로 나눠지는 경우
  else if (i % 3 === 0) {
    dp[i] = Math.min(dp[i / 3], dp[i - 1]) + 1;
  }
  // 2로 나눠지는 경우
  else if (i % 2 === 0) {
    dp[i] = Math.min(dp[i / 2], dp[i - 1]) + 1;
  }
  // 2, 3으로 나눠지지 않는 경우
  else {
    dp[i] = dp[i - 1] + 1;
  }
}

let path = [];
let idx = N;

while (idx > 0) {
  path.push(idx);

  if (idx % 3 === 0 && idx % 2 === 0) {
    let min = idx / 3;
    min = dp[min] < dp[idx / 2] ? min : idx / 2;
    min = dp[min] < dp[idx - 1] ? min : idx - 1;
    idx = min;
  } else if (idx % 3 === 0) {
    idx = dp[idx / 3] < dp[idx - 1] ? idx / 3 : idx - 1;
  } else if (idx % 2 === 0) {
    idx = dp[idx / 2] < dp[idx - 1] ? idx / 2 : idx - 1;
  } else {
    idx--;
  }
}

console.log(dp[N] + "\n" + path.join(" "));