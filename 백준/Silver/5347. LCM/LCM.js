const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const test = Number(input[0]);
const answer = [];

for (let i = 1; i <= test; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  const gcd = GCD(a, b);

  answer.push((a * b) / gcd);
}

console.log(answer.join("\n"));

function GCD(a, b) {
  return b === 0 ? a : GCD(b, a % b);
}
