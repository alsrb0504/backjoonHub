const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) {
  answer.push(`Class ${i + 1}`);
  answer.push(solution(i + 1));
}

console.log(answer.join("\n"));

function solution(line) {
  const nums = input[line].split(" ").map(Number);
  const N = nums.shift();

  nums.sort((a, b) => a - b);
  let maxGap = 0;
  const max = Math.max(...nums);
  const min = Math.min(...nums);

  for (let i = 1; i < N; i++) {
    const gap = nums[i] - nums[i - 1];
    maxGap = Math.max(gap, maxGap);
  }

  return `Max ${max}, Min ${min}, Largest gap ${maxGap}`;
}
