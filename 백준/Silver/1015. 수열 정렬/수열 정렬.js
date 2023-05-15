const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const answer = new Array(N).fill(0);
const nums = input[1]
  .split(" ")
  .map(Number)
  .map((el, idx) => [el, idx]);

nums.sort((a, b) => a[0] - b[0]);

nums.forEach((el, sortedIdx) => {
  const [_, idx] = el;

  answer[idx] = sortedIdx;
});

console.log(answer.join(" "));
