const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const tops = input[1].split(" ").map(Number);

const answer = new Array(N).fill(0);

const stack = [];

for (let i = N - 1; i >= 0; i--) {
  const curr = tops[i];

  if (stack.length === 0) {
    stack.push([curr, i]);
  } else if (stack.at(-1)[0] > curr) {
    stack.push([curr, i]);
  } else {
    while (stack.length && stack.at(-1)[0] < curr) {
      const [_, idx] = stack.pop();
      answer[idx] = i + 1;
    }

    stack.push([curr, i]);
  }
}

console.log(answer.join(" "));