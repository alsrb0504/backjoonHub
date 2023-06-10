const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const answer = [];

for (let i = 1; i <= N; i++) {
  answer.push(solution(i));
}

console.log(answer.join("\n"));

function solution(idx) {
  const frontStack = [];
  const rearStack = [];
  const str = input[idx].trimEnd();

  for (let ch of str) {
    if (ch === "<") {
      if (frontStack.length) {
        rearStack.push(frontStack.pop());
      }
    } else if (ch === ">") {
      if (rearStack.length) {
        frontStack.push(rearStack.pop());
      }
    } else if (ch === "-") {
      if (frontStack.length) {
        frontStack.pop();
      }
    } else {
      frontStack.push(ch);
    }
  }

  return frontStack.join("") + rearStack.reverse().join("");
}
