const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) answer.push(solution(i * 2 + 1));

console.log(answer.join("\n"));

function solution(line) {
  const N = Number(input[line]);
  const nums = input[line + 1].split(" ").map(Number);
  const dp = Array.from({ length: N }, () => new Array(N).fill(0));
  let max = -Infinity;

  for (let i = 0; i < N; i++) {
    dp[i][i] = nums[i];
    max = Math.max(max, dp[i][i]);
  }

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      dp[i][j] = dp[i][j - 1] + nums[j];
      max = Math.max(max, dp[i][j]);
    }
  }

  return max;
}
