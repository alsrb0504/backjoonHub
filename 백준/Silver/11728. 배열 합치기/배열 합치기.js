const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const merged = [];

const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);

A.sort((a, b) => a - b);
B.sort((a, b) => a - b);

let Aidx = 0;
let Bidx = 0;

while (Aidx < N && Bidx < M) {
  if (A[Aidx] < B[Bidx]) {
    merged.push(A[Aidx++]);
  } else {
    merged.push(B[Bidx++]);
  }
}

while (Aidx < N) {
  merged.push(A[Aidx++]);
}

while (Bidx < M) {
  merged.push(B[Bidx++]);
}

console.table(merged.join(" "));