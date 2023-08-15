const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const trees = input.slice(1, 1 + N).map(Number);
const distances = [];
let answer = 0;

for (let i = 1; i < N; i++) {
  const dist = trees[i] - trees[i - 1];
  distances.push(dist);
}

distances.sort((a, b) => a - b);

let prevGcd = distances[0];
for (let i = 1; i < distances.length; i++) {
  prevGcd = gcd(prevGcd, distances[i]);
}

distances.forEach((dist) => {
  answer += dist / prevGcd - 1;
});

console.log(answer);

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
