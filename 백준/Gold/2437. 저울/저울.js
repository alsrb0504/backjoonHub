const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let acc = nums[0];

if (acc !== 1) {
  console.log(1);
  return;
}

for (let i = 1; i < N; i++) {
  if (acc < nums[i] && acc + 1 !== nums[i]) {
    console.log(acc + 1);
    return;
  } else {
    acc += nums[i];
  }
}

console.log(acc + 1);