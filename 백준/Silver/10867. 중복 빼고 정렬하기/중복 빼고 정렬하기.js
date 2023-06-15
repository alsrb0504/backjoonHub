const readFileSyncAddress =

  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")

  .readFileSync(readFileSyncAddress)

  .toString()

  .trimEnd()

  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const set = new Set(nums);

const answer = [...set].sort((a, b) => a - b);

console.log(answer.join(" "));