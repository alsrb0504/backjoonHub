const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const nums = input[1].split(" ").map(Number);
const N = Number(input[2]);
let answer = 0;

nums.sort((a, b) => a - b);

let min = 1;
let max = 1000;

for (let num of nums) {
  if (N < num) {
    max = num - 1;
    break;
  } else {
    min = num + 1;
  }
}

for (let i = min; i <= N; i++) {
  answer += max - N + 1;
}

console.log(answer !== 0 ? answer - 1 : 0);
