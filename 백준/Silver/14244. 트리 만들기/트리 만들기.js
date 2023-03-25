const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const rest = N - M - 1;

let curr = 0;

const answer = [];

for (let i = 0; i <= rest; i++) {
  answer.push(`${i} ${i + 1}`);
  curr++;
}

for (let i = 0; i < M - 1; i++) {
  answer.push(`${curr} ${curr + i + 1}`);
}

console.log(answer.join("\n"));
