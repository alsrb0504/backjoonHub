const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const answer = {
  12345678: "ascending",
  87654321: "descending",
};

const data = input[0].split(" ").join("");

console.log(answer[data] ? answer[data] : "mixed");