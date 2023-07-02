const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const answer = [];
const Reg = RegExp("^(100+1+|01)+$");

for (let i = 1; i <= N; i++) {
  answer.push(solution(i));
}

console.log(answer.join("\n"));

// (100+1+ | 01)+
function solution(line) {
  const str = input[line].trimEnd();
  return str.match(Reg) ? "YES" : "NO";
}
