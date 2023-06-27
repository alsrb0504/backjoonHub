const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = [...new Array(N + 1).keys()];

let answer = 1;

let isPossible = false;
const parentGroup = new Map();

input.slice(1, 1 + M).some((info) => {
  const [u, v] = info.split(" ").map(Number);
  const uParent = getParent(u);
  const vParent = getParent(v);

  if (uParent === vParent) {
    isPossible = true;
    return true;
  }

  unionParent(u, v);
  getParent(u);
  getParent(v);

  answer++;
});

console.log(isPossible ? answer : 0);

function dfs(node) {}

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

function findParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent === bParent) return 1;
  else return 0;
}
