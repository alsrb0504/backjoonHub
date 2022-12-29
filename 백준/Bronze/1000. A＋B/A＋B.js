const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [a, b] = input[0].split(' ').map(Number);

console.log(a + b);
