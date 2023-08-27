const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = input
  .slice(1, 1 + N)
  .map(Number)
  .sort((a, b) => a - b);

const editedNums = [];
const answer = [];

for (let i = 1; i < N; i++) {
  editedNums.push(nums[i] - nums[i - 1]);
}

let answerGCD = editedNums[0];

for (let i = 1; i < editedNums.length; i++) {
  answerGCD = gcd(answerGCD, editedNums[i]);
}

for (let i = 2; i <= Math.sqrt(answerGCD); i++) {
  if (answerGCD % i === 0) {
    answer.push(i);

    if (i !== Math.sqrt(answerGCD)) answer.push(answerGCD / i);
  }
}

answer.push(answerGCD);

console.log(answer.sort((a, b) => a - b).join(" "));

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
