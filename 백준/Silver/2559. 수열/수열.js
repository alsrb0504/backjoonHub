const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
const sum = new Array(N + 1).fill(0);
nums.unshift(0);

let answer = -Infinity;

for (let i = 1; i <= N; i++) sum[i] = sum[i - 1] + nums[i];
for (let i = K; i <= N; i++) answer = Math.max(answer, sum[i] - sum[i - K]);

console.log(answer);