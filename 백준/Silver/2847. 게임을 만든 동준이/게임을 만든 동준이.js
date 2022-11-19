const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const scores = input.slice(1, 1 + N).map(Number);

answer = 0;

for (let i = N - 2; i >= 0; i--) {
  const next = scores[i + 1];

  let curr = scores[i];

  while (next <= curr) {
    curr--;
    answer++;
  }
  scores[i] = curr;
}

console.log(answer);