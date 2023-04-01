const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const scores = input.slice(0, 8).map(Number);

const arr = scores.map((val, idx) => {
  return [val, idx + 1];
});

const filter = arr.sort((a, b) => b[0] - a[0]).filter((val, idx) => idx < 5);

const sum = filter.reduce((acc, cur) => acc + cur[0], 0);
const answer = [];
filter.forEach((val) => {
  answer.push(val[1]);
});
console.log(sum);
console.log(answer.sort((a, b) => a - b).join(" "));