const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const parent = Array.from({ length: N + 1 }, (_, idx) => idx);
let answer = 0;

for (let i = 2; i < 2 + M; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  union(a, b);
}

for (let i = 2; i <= N; i++) {
  if (find(i) === 1) answer++;
}

console.log(answer);

function find(num) {
  if (parent[num] === num) return num;
  return (parent[num] = find(parent[num]));
}

function union(n1, n2) {
  const super1 = find(n1);
  const super2 = find(n2);

  if (super1 < super2) {
    parent[super2] = parent[super1];
  } else {
    parent[super1] = parent[super2];
  }
}