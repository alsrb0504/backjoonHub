const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const TC = Number(input[0]);
const answer = [];

for (let i = 0; i < TC; i++) {
  solution(i);
}

function solution(line) {
  const set = new Set();

  input[line * 4 + 2]
    .split(" ")
    .map(Number)
    .forEach((num) => {
      set.add(num);
    });

  input[line * 4 + 4]
    .split(" ")
    .map(Number)
    .forEach((num) => {
      if (set.has(num)) answer.push(1);
      else answer.push(0);
    });
}

console.log(answer.join("\n"));
