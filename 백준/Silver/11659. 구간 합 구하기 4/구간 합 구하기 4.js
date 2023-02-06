const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
const answer = [];

const sum = new Array(n + 1).fill(0);

for (let i = 0; i < n; i++) sum[i + 1] = sum[i] + nums[i];

input.slice(2, 2 + k).forEach((el) => {
  const [l, r] = el.split(" ").map(Number);

  answer.push(sum[r] - sum[l - 1]);
});

console.log(answer.join("\n"));