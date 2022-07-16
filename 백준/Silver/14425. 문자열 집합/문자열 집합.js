const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = new Map();
let answer = 0;

for (let i = 0; i < N; i++) {
  const word = input[i];

  if (!map.has(word)) map.set(word, true);
}

for (let i = N; i < N + M; i++) {
  const word = input[i];

  if (map.has(word)) {
    answer++;
  }
}

console.log(answer);
