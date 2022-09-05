const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [marinated, fried, half, minMarinated, minFried] = input[0]
  .split(" ")
  .map(Number);

let min = Math.min(minFried, minMarinated);
let answer = Infinity;

const minFriedPrice = Math.min(fried, 2 * half);
const minMarinatedPrice = Math.min(marinated, 2 * half);

for (let i = min; i >= 0; i--) {
  const prices =
    minFriedPrice * (minFried - i) +
    minMarinatedPrice * (minMarinated - i) +
    half * (i * 2);

  answer = Math.min(answer, prices);
}

console.log(answer);