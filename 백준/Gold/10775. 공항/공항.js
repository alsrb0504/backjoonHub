const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const G = Number(input[0]);
const P = Number(input[1]);
const gate = new Array(G + 1).fill(0);
gate.forEach((_, idx) => (gate[idx] = idx));

const planes = input.slice(2, 2 + P).map(Number);
let answer = 0;


for (let i = 0; i < P; i++) {
  const curr = planes[i];
  const curr_gate = getParent(curr);

  if (curr_gate === 0) break;

  unionParent(curr_gate, curr_gate - 1);

  answer++;
}

console.log(answer);

function getParent(num) {
  if (gate[num] === num) return num;

  gate[num] = getParent(gate[num]);
  return gate[num];
}

function unionParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent < bParent) gate[bParent] = aParent;
  else gate[aParent] = bParent;
}
