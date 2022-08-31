const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [_, M] = input[0].split(" ").map(Number);
const woods = input[1].split(" ").map(Number);
const max = Math.max.apply(null, woods);

let answer = 0;
let start = 0;
let end = max;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let sum = 0;

  woods.forEach((wood) => {
    const diff = wood - mid;
    sum += diff > 0 ? diff : 0;
  });

  if (M <= sum) {
    answer = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);