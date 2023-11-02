const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

const [A, B] = input[0].split(" ").map(Number);
const N = Number(input[1]);
const btns = input.slice(2, 2 + N).map(Number);

let answer = Infinity;

answer = Math.abs(A - B);

for (const btn of btns) {
  if (btn === B) {
    console.log(1);
    return;
  }

  answer = Math.min(answer, Math.abs(btn - B) + 1);
}

console.log(answer);
