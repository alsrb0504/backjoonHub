const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const first = input[0].split(" ").map(Number);
const second = input[1].split(" ").map(Number);

const sums = Array.from({ length: 2 }, () => new Array(9).fill(0));
sums[0][0] = first[0];
sums[1][0] = second[0];

for (let i = 1; i < 9; i++) {
  sums[0][i] = sums[0][i - 1] + first[i];
  sums[1][i] = sums[1][i - 1] + second[i];
}

let isGreater = false;

if (sums[0][0] > 0) isGreater = true;

for (let i = 1; i < 9; i++) {
  if (sums[0][i] > sums[1][i - 1]) isGreater = true;
}

console.log(isGreater ? "Yes" : "No");
