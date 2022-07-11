const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let N = Number(input.shift());

const lines = input[0]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let sum = 0;

lines.reduce((acc, cur) => {
  sum += acc + cur;
  return acc + cur;
}, 0);

console.log(sum);