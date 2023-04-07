const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const SUCCESS = "yes";
const FAIL = "no";
const answer = [];
let line = 0;

while (true) {
  if (input[line] === ".") break;

  answer.push(solution(line++));
}

console.log(answer.join("\n"));

function solution(l) {
  const str = input[l].trimEnd();
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(" || str[i] === "[") stack.push(str[i]);

    if (str[i] === ")") {
      if (stack.at(-1) === "(") stack.pop();
      else return FAIL;
    } else if (str[i] === "]") {
      if (stack.at(-1) === "[") stack.pop();
      else return FAIL;
    }
  }

  if (stack.length === 0) return SUCCESS;
  else return FAIL;
}
