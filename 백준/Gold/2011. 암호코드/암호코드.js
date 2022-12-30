const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const DIV = 1000000;
const nums = input[0].trimEnd().split("").map(Number);
const size = nums.length;
const dp = new Array(size).fill(0);

if (nums[0] === 0) {
  console.log(0);
  return;
}

dp[0] = 1;

if (size > 1) {
  if (nums[1] === 0) {
    if (nums[0] === 1 || nums[0] === 2) {
      dp[1] = 1;
    }
    // 종료
    else {
      console.log(0);
      return;
    }
  } else {
    if (nums[0] === 1) {
      dp[1] = 2;
    } else if (nums[0] === 2 && nums[1] <= 6) {
      dp[1] = 2;
    } else {
      dp[1] = 1;
    }
  }
}

for (let i = 2; i < size; i++) {
  // 0으로 끝나는 경우.
  if (nums[i] === 0) {
    // 종료
    if (nums[i - 1] === 0 || nums[i - 1] > 2) {
      console.log(0);
      return;
    }
    if (nums[i - 2] === 0) {
      dp[i] = dp[i - 1];
    } else {
      // dp[i] = dp[i - 1] - 1;
      dp[i] = dp[i - 2];
    }
  }

  // 0이 아닌 경우
  else {
    if (nums[i - 1] === 1) {
      dp[i] = (dp[i - 2] + dp[i - 1]) % DIV;
    } else if (nums[i - 1] === 2) {
      if (1 <= nums[i] && nums[i] <= 6) {
        dp[i] = (dp[i - 2] + dp[i - 1]) % DIV;
      } else {
        dp[i] = dp[i - 1];
      }
    } else {
      dp[i] = dp[i - 1];
    }
  }
}

console.log(dp[size - 1]);