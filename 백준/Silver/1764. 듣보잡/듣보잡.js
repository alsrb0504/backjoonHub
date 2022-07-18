const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = new Map();
const answer = [];

for (let i = 0; i < N; i++) {
  const person = input[i].trimEnd();
  map.set(person, false);
}

for (let i = N; i < N + M; i++) {
  const person = input[i].trimEnd();

  if (map.has(person)) answer.push(person);
}

answer.sort();
let result = answer.length + "\n";
answer.forEach((c) => (result += c + "\n"));

console.log(result.trimEnd());