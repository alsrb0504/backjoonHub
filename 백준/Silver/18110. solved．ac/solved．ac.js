const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input
  .slice(1, 1 + N)
  .map(Number)
  .sort((a, b) => a - b);

if (N === 0) {
  console.log(0);
  return;
}

const bottom = Math.round(N * 0.15);
const top = N - bottom;
const rest = top - bottom;

const sum = data.slice(bottom, top).reduce((acc, curr) => acc + curr, 0);

console.log(Math.round(sum / rest));
