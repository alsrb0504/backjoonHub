const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1]
  .split(" ")
  .map((el, idx) => [Number(el), idx])
  .sort((a, b) => a[0] - b[0]);
const target = Number(input[2]);

let answer = 0;

let start = 0;
let end = N - 1;

// console.table(nums);

while (start < end) {
  if (nums[end] > target) {
    end--;
    continue;
  }

  const sum = nums[start][0] + nums[end][0];
  if (sum === target) {
    //
    // console.log(`nums[start] = ${nums[start]}, nums[end] = ${nums[end]}`);
    // if (nums[start][1] < nums[end][1]) {
    // console.log(`nums[start] = ${nums[start]}, nums[end] = ${nums[end]}`);
    // }

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
