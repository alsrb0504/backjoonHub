const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const arr = [];

for (let i = 1; i <= N; i++) {
  arr.push(Number(input[i]));
}

const sorted = [...arr];
sorted.sort((a, b) => a - b);

const map = new Map();

sorted.forEach((v, idx) => {
  map.set(v, idx);
});

let max = 0;

arr.forEach((v, idx) => {
  const sortedIdx = map.get(v);

  const diff = idx - sortedIdx;

  if (diff > 0) {
    max = max < diff ? diff : max;
  }
});

console.log(Math.abs(max) + 1);
