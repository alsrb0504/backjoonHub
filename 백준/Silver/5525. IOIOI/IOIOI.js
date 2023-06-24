const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const str = input[2];

let answer = 0;
let stack = [];

for (let ch of str) {
  if (ch === "I") {
    if (stack.length === 0 || stack.at(-1) === "O") {
      const size = stack.length / 2;
      if (size >= N) answer++;
      stack.push(ch);
    } else {
      stack = ["I"];
    }
  } else {
    if (stack.at(-1) === "I") stack.push(ch);
    else {
      stack = [];
    }
  }
}

console.log(answer);
