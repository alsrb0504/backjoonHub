const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const stack = [];

input.slice(1, 1 + N).forEach((el) => {
  const num = Number(el);

  if (stack.length === 0) stack.push(num);
  else {
    while (stack.length && stack.at(-1) <= num) {
      stack.pop();
    }

    stack.push(num);
  }
});

console.log(stack.length);
