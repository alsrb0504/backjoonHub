const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const trees = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a);

let answer = 1;

trees.forEach((tree, idx) => {
  const end = tree + idx + 2;

  answer = Math.max(answer, end);
});

console.log(answer);
