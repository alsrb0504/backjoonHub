const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const target = Number(input[2]);

let answer = 0;
let start = 0;
let end = N - 1;

while (start < end) {
  if (nums[end] > target) {
    end--;
    continue;
  }

  const sum = nums[start] + nums[end];
  if (sum === target) {
    answer++;
    start++;
    end--;
  } else if (sum < target) {
    start++;
  } else {
    end--;
  }
}

console.log(answer);
