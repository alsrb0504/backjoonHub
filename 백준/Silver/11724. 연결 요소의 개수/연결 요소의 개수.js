const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const lines = input.slice(1, 1 + M).map((el) => el.split(" ").map(Number));
const arr = [...new Array(N + 1).keys()];

lines.forEach(([u, v]) => {
  unionParent(u, v);
});

const set = new Set();

for (let i = 1; i <= N; i++) {
  const tmp = getParent(arr[i]);
  set.add(tmp);
}

console.log(set.size);

function getParent(num) {
  if (arr[num] === num) return num;

  arr[num] = getParent(arr[num]);
  return arr[num];
}

function unionParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent < bParent) arr[bParent] = aParent;
  else arr[aParent] = bParent;
}
