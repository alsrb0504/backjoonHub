const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < tc; i++) {
  const [N, M] = input[line].split(" ").map(Number);

  answer.push(N - 1);
  line += M + 1;
}
console.log(answer.join("\n"));