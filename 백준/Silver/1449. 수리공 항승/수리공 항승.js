const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, L] = input[0].split(" ").map(Number);
const holes = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = 0;

if (N === 1) {
  console.log(1);
  return;
}

if (L === 1) {
  console.log(N);
  return;
}

let cur = holes[0];
let dist = 0;
let endFlag = false;

for (let i = 1; i < N; i++) {
  endFlag = false;
  dist = holes[i] - cur + 1; // 양쪽 0.5

  if (dist === L) {
    answer++;
    cur = holes[i + 1] && holes[i + 1];
    endFlag = true;
  }

  if (dist > L) {
    answer++;
    cur = holes[i];
  }
}

if (!endFlag) answer++;

console.log(answer);
