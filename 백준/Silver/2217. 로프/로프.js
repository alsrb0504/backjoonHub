const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const ropes = input
  .slice(1, 1 + N)
  .map(Number)
  .sort((a, b) => b - a);

let answer = ropes[0];
let cnt = 1;

for (let i = 1; i < N; i++) {
  const select_next = ropes[i] * (cnt + 1);
  const select_all = ropes[i] * (i + 1);

  if (select_next > answer) {
    cnt++;
    answer = select_next;
  } else if (select_all > answer) {
    cnt = i + 1;
    answer = select_all;
  }
}

console.log(answer);