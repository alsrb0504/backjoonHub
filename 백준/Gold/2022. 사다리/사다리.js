const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [x, y, c] = input[0].split(" ").map(Number);

let answer = 0;
let start = 0;
let end = Math.min(x, y);

while (start <= end) {
  const mid = (start + end) / 2;

  const h1 = Math.sqrt(Math.max(0, x * x - mid * mid));
  const h2 = Math.sqrt(Math.max(0, y * y - mid * mid));

  const condition = (h1 * h2) / (h1 + h2);

  if (condition >= c) {
    answer = Math.max(answer, mid);
    start = mid + 0.000001;
  } else {
    end = mid - 0.000001;
  }
}

console.log(answer.toFixed(3));