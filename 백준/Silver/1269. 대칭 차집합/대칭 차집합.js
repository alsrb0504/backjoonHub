const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const A = input.shift().split(" ").map(Number);
const B = input.shift().split(" ").map(Number);

const union = new Map();

A.forEach((num) => {
  union.set(num, false);
});

B.forEach((num) => {
  if (union.has(num)) {
    union.set(num, true);
  } else {
    union.delete(num);
  }
});

let unionCnt = 0;
union.forEach((val) => (val ? unionCnt++ : null));

const result = A.length + B.length - 2 * unionCnt;
console.log(result);
