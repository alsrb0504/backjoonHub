const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
let budget = Number(input[2]);

let start = 1;
let end = Math.max(...nums);

let answer = 0;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let sum = 0;

  nums.forEach((val) => {
    if (val <= mid) sum += val;
    else {
      sum += mid;
    }
  });

  if (sum <= budget) {
    answer = Math.max(answer, mid);
    start = mid + 1;
  } else {
    end = mid - 1;
  }

}

console.log(answer);