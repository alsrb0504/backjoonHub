const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const ROUND = Number(input[1]);
const Targets = input[2].split(" ").map(Number);
const scores = new Array(N + 1).fill(0);

input.slice(3, 3 + ROUND).forEach((line, idx) => {
  const result = line.split(" ").map(Number);
  const currTarget = Targets[idx];
  let failCount = 0;

  result.forEach((num, currPlayer) => {
    if (num !== currTarget) failCount++;
    else {
      scores[currPlayer + 1]++;
    }
  });

  scores[currTarget] += failCount;
});

console.log(scores.slice(1).join("\n"));
