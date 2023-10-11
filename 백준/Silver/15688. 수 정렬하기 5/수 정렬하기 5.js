const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const N = Number(input[0]);
const nums = input
  .slice(1, 1 + N)
  .map(Number)
  .sort((a, b) => a - b);

console.log(nums.join("\n"));
