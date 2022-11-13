const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const S = BigInt(input[0]);
let acc = 0n;

if (S === 1n) {
  console.log(1n.toString());
}

for (let i = 0n; i <= S; i++) {
  acc += i;

  if (acc > S) {
    console.log((i - 1n).toString());
    break;
  }
}