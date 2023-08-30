const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const prices = input
  .slice(1, 1 + N)
  .map(Number)
  .sort((a, b) => b - a);

let answer = prices.reduce((acc, curr, idx) => {
  const tip = curr - idx;
  return acc + (tip > 0 ? tip : 0);
}, 0);

console.log(answer);
