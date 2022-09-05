const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const chars = input[0].split("");
let prev = null;
let answer = 1;

chars.forEach((v) => {
  if (v === "c") {
    if (prev === "c") {
      answer *= 25;
    } else {
      answer *= 26;
    }
  } else {
    if (prev === "d") {
      answer *= 9;
    } else {
      answer *= 10;
    }
  }

  prev = v;
});

console.log(answer);