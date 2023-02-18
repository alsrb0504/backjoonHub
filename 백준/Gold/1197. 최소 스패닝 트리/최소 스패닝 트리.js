const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [V, E] = input[0].split(" ").map(Number);

if (V === 1) {
  console.log(0);
  return;
}

const index = new Array(V + 1).fill(0);
for (let i = 0; i <= V; i++) index[i] = i;

const lines = input.slice(1, 1 + E).map((el) => {
  return el.split(" ").map(Number);
});

lines.sort((a, b) => a[2] - b[2]);

let cnt = 0;
let answer = 0;

for (let i = 0; i < E; i++) {
  const [l, r, cost] = lines[i];

  if (checkSameParent(l, r)) continue;

  union(l, r);
  answer += cost;

  if (cnt === V) break;
}

console.log(answer);

function findParent(num) {
  if (num === index[num]) return num;

  index[num] = findParent(index[num]);
  return index[num];
}

function union(a, b) {
  const aParent = findParent(a);
  const bParent = findParent(b);

  if (aParent < bParent) index[bParent] = aParent;
  else index[aParent] = bParent;
}

function checkSameParent(a, b) {
  const aParent = findParent(a);
  const bParent = findParent(b);

  if (aParent === bParent) return true;
  else return false;
}
