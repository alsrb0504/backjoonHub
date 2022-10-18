const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input.slice(1, 1 + N).map(Number);
const stack = [];
let answer = 0;

for (let i = 0; i < nums.length; i++) {
  const now = nums[i];

  let cnt = 1;

  while (stack.length && stack[stack.length - 1][0] < now) {
    const [_, topCnt] = stack.pop();
    answer += topCnt;
  }

  if (stack.length && stack[stack.length - 1][0] === now) {
    const [_, topCnt] = stack.pop();
    answer += topCnt;
    cnt += topCnt;
  }

  if (stack.length > 0) answer++;

  stack.push([now, cnt]);
}
console.log(answer);