const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const answer = [];
let line = 0;

while (true) {
  const nums = input[line++].trimEnd().split("");

  if (nums[0] === "0") break;

  if (solution(nums)) answer.push("yes");
  else answer.push("no");
}

console.log(answer.join("\n").trimEnd());

function solution(nums) {
  const size = nums.length;
  const half_size = Math.floor(size / 2);
  const isEven = size % 2 === 0 ? true : false;

  const stack = [];

  for (let i = 0; i < half_size; i++) {
    stack.push(nums[i]);
  }

  const rest = isEven ? half_size : half_size + 1;

  for (let i = rest; i < size; i++) {
    const top = stack.pop();

    if (top !== nums[i]) return false;
  }

  return true;
}