const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const std = input[1].split(" ").map(Number);
const nums = input[3].split(" ").map(Number);
const answer = [];
const set = new Set([...std]);

nums.forEach((num) => {
  if (set.has(num)) answer.push(1);
  else answer.push(0);
});

console.log(answer.join("\n").trimEnd());
