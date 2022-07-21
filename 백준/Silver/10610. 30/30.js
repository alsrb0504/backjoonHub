const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("")
  .map(Number);

// 예외조건.
if (!input.includes(0)) {
  console.log(-1);
  return;
}

const sum = input.reduce((acc, cur) => acc + cur, 0);

if (sum % 3 !== 0) {
  console.log(-1);
  return;
} else {
  input.sort((a, b) => b - a);
  console.log(input.join(""));
}
