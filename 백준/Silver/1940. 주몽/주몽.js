const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const arr = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let left = 0;
let right = N - 1;
let answer = 0;

while (left < right) {
  const sum = arr[left] + arr[right];

  if (sum === M) {
    answer++;
    left++;
    right--;
  } else if (sum < M) {
    left++;
  } else {
    right--;
  }
}

console.log(answer);
