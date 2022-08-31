const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [K, N] = input[0].split(" ").map(Number);

const cables = [];

for (let i = 1; i <= K; i++) {
  cables.push(Number(input[i]));
}

const max = Math.max.apply(null, cables);

let answer = 0;
let high = max;
let low = 1;

while (low <= high) {
  const mid = Math.floor((high + low) / 2);
  let cnt = 0;

  cables.forEach((v) => {
    const pieces = Math.floor(v / mid);
    cnt += pieces;
  });

  if (cnt < N) {
    high = mid - 1;
  } else {
    answer = mid;
    low = mid + 1;
  }
}

console.log(answer);
