const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = [-1, ...input[1].split(" ").map(Number)];
const Q = Number(input[2]);

input.slice(3, 3 + Q).forEach((data) => {
  const [gender, n] = data.split(" ").map(Number);

  if (gender === 1) {
    for (let i = n; i <= N; i += n) nums[i] = nums[i] === 1 ? 0 : 1;
  } else {
    let left = n;
    let right = n;

    while (left - 1 > 0 && right + 1 <= N) {
      if (nums[left - 1] !== nums[right + 1]) break;

      left--;
      right++;
    }

    for (let i = left; i <= right; i++) nums[i] = nums[i] === 1 ? 0 : 1;
  }
});

const answer = [];
let stack = [];

for (let i = 1; i <= N; i++) {
  if (i % 20 !== 0) stack.push(nums[i]);
  else {
    stack.push(nums[i]);
    answer.push(stack.join(" "));
    stack = [];
  }
}

answer.push(stack.join(" "));
console.log(answer.join("\n"));