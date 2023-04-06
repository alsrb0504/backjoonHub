const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [a, b] = input[0].split(" ").map(Number);
console.log(Math.abs(a - b));