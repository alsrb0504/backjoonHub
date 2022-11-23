const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let sum = 0;
input[0]
  .split(" ")
  .map(Number)
  .forEach((n) => {
    sum += n * n;
  });

console.log(sum % 10);