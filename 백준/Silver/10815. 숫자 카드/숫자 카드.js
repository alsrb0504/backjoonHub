const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const result = [];

const N = Number(input.shift());
const map = new Map();

input
  .shift()
  .split(" ")
  .map(Number)
  .forEach((val) => {
    map.set(val, true);
  });

const M = Number(input.shift());

input[0]
  .split(" ")
  .map(Number)
  .forEach((val) => {
    if (map.has(val)) result.push(1);
    else result.push(0);
  });

console.log(result.join(" "));