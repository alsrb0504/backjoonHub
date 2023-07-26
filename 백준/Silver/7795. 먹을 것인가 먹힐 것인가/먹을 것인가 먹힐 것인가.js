const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const TC = Number(input[0]);
const answer = [];

for (let i = 0; i < TC; i++) {
  answer.push(solution(3 * i + 1));
}

console.log(answer.join("\n"));

function solution(line) {
  const [N, M] = input[line].split(" ").map(Number);

  const a = input[line + 1]
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);
  const b = input[line + 2]
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

  let count = 0;
  let bIdx = 0;

  for (let i = 0; i < N; i++) {
    while (bIdx < M && a[i] <= b[bIdx]) {
      bIdx++;
    }

    count += M - bIdx;
  }

  console.log(count);
}
