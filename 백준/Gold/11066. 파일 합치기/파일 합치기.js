const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const TC = Number(input[0]);
const answer = [];

for (let i = 0; i < TC; i++) {
  answer.push(solution(i));
}

console.log(answer.join("\n"));

function solution(line) {
  const N = Number(input[2 * line + 1]);
  const nums = input[2 * line + 2].split(" ").map(Number);
  const dp = Array.from({ length: N }, () => new Array(N).fill(0));
  const sum = Array.from({ length: N }, () => new Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    dp[i][i] = nums[i];

    if (i !== N - 1) {
      dp[i][i + 1] = nums[i] + nums[i + 1];
    }
  }

  // 지워줘야 함.
  for (let i = 0; i < N; i++) {
    dp[i][i] = 0;
  }

  for (let i = 0; i < N; i++) {
    let tmp = 0;

    for (let j = i; j < N; j++) {
      tmp += nums[j];

      sum[i][j] = tmp;
    }
  }

  for (let i = 0 + 2; i < N; i++) {
    for (let j = i; j < N; j++) {
      const y = j - i;
      const x = j;

      let min = Infinity;

      for (let k = y; k < x; k++) {
        min = Math.min(min, dp[y][k] + dp[k + 1][x] + sum[y][x]);
      }

      dp[y][x] = min;
    }
  }

  return dp[0][N - 1];
}
