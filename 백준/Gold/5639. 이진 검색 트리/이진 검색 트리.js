const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
     .trimEnd()
  .split("\n");

const answer = [];
const size = input.length;
const nums = input.map(Number);

function solution(root, arr) {
  const length = arr.length;

  let cnt = 0;
  for (i = 0; i < length; i++) {
    if (root < arr[i]) break;
    cnt++;
  }

  const left = arr.slice(1, cnt);
  const right = arr.slice(cnt);

  if (left.length > 0) solution(left[0], left);
  if (right.length > 0) solution(right[0], right);

  answer.push(root);
}

solution(nums[0], nums);
console.log(answer.join("\n"));