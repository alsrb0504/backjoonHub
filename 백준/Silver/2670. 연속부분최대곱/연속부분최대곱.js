const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = input.slice(1, 1 + N).map(Number);
let answer = 0;

nums.forEach((num, idx) => {
  let curr = 1;

  for (let i = idx; i < N; i++) {
    curr *= nums[i];

    answer = Math.max(answer, curr);
  }
});

console.log(answer.toFixed(3));
