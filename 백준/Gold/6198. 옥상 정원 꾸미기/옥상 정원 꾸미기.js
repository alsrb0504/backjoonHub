const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);

const nums = input.slice(1, 1 + N).map(Number);
nums.push(Infinity);

const stack = [];

let answer = 0;

nums.forEach((height, idx) => {
  if (stack.length === 0) {
    stack.push([height, idx]);
  } else {
    let top = stack.at(-1)[0];

    if (top > height) {
      stack.push([height, idx]);
    } else {
      while (stack.length && top <= height) {
        const [_, top_idx] = stack.pop();

        if (stack.length) top = stack.at(-1)[0];

        answer += idx - top_idx - 1;
      }

      stack.push([height, idx]);
    }
  }
});

console.log(answer);