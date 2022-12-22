const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");
const [M, N] = input[0].split(" ").map(BigInt);

console.log((M / N).toString(), (M % N).toString());
