const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
let answer = 0;

for (let i = 1; i <= N; i++) {
  if (solution(i)) answer++;
}

console.log(answer);

function solution(line) {
  const str = input[line].trimEnd().split("");
  const stack = [];

  if (str.length % 2 !== 0) return false;

  for (const ch of str) {
    if (stack.length === 0) stack.push(ch);
    else {
      if (stack.at(-1) === ch) stack.pop();
      else {
        stack.push(ch);
      }
    }
  }

  return stack.length === 0;
}
