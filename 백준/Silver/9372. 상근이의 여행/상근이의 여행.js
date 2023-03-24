const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const INF = Infinity;
const tc = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < tc; i++) {
  const [N, M] = input[line].split(" ").map(Number);

  answer.push(solution(N, M));
  line += M + 1;
}
console.log(answer.join("\n"));

function solution(N, M) {
  const edges = input
    .slice(line + 1, line + 1 + M)
    .map((el) => el.split(" ").map(Number));

  return N - 1;
}
