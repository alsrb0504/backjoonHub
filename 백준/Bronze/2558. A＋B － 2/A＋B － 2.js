const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const n1 = Number(input[0]);
const n2 = Number(input[1]);

console.log(n1 + n2);