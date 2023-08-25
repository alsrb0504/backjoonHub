const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [A, B, N] = input[0].split(" ").map(Number);

let answer = A % B;

for (let i = 0; i < N - 1; i++) {
  answer *= 10;
  answer %= B;
}

answer *= 10;

console.log(Math.floor(answer / B));
