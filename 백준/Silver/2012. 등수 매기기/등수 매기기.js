const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const rating = input
  .slice(1, 1 + N)
  .map(Number)
  .sort((a, b) => a - b);

let answer = 0;

rating.forEach((n, idx) => {
  const edit_raiting = n - 1;
  const diff = Math.abs(edit_raiting - idx);

  answer += diff;
});

console.log(answer);
