const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(BigInt);
let answer = 1n;

for (let i = 0; i < Number(M); i++) {
  answer *= N - BigInt(i);
  answer /= BigInt(i) + 1n;
}

console.log(answer.toString());
