const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");
const [x1, y1] = input[0].split(" ").map(Number);
const [x2, y2] = input[1].split(" ").map(Number);
const [x3, y3] = input[2].split(" ").map(Number);

const result = x1 * y2 + x2 * y3 + x3 * y1 - (x1 * y3 + x2 * y1 + x3 * y2);

let answer = 0;
if (result > 0) {
  answer = 1;
} else if (result < 0) {
  answer = -1;
}

console.log(answer);
