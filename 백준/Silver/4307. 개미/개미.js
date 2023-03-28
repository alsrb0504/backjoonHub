const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const TC = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < TC; i++) {
  const [L, N] = input[line].split(" ").map(Number);

  answer.push(solution(L, N));

  line += N + 1;
}

console.log(answer.join("\n"));

function solution(L, N) {
  const ants = input.slice(line + 1, line + 1 + N).map(Number);

  let max = -Infinity;
  let max_min = 0;

  ants.forEach((ant) => {
    const left = ant;
    const right = L - ant;

    max_min = Math.max(max_min, Math.min(left, right));
    max = Math.max(max, left, right);
  });

  return `${max_min} ${max}`;
}
