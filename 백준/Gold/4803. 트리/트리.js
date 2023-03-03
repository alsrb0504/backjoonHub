const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const ONE = "There is one tree.";
const NONE = "No trees.";

const answer = [];
let line = 0;
let cnt = 1;

while (true) {
  const [N, M] = input[line].split(" ").map(Number);

  if (N === 0 && M === 0) break;

  const result = solution(N, M, line);

  if (result === 0) {
    answer.push(`Case ${cnt}: ${NONE}`);
  } else if (result === 1) {
    answer.push(`Case ${cnt}: ${ONE}`);
  } else {
    answer.push(`Case ${cnt}: A forest of ${result} trees.`);
  }

  line += M + 1;
  cnt++;
}

console.log(answer.join("\n"));

function solution(N, M, L) {
  const arr = [...new Array(N + 1).keys()];

  const notTree = new Set();
  const isTree = new Set();

  input.slice(L + 1, L + 1 + M).forEach((el) => {
    const [u, v] = el.split(" ").map(Number);

    if (isSameParent(u, v) || notTree.has(u) || notTree.has(v)) {
      notTree.add(getParent(u));
      notTree.add(getParent(v));
      notTree.add(u);
      notTree.add(v);
    }

    union(u, v);
  });

  for (let i = 1; i <= N; i++) {
    const parent = getParent(arr[i]);

    if (notTree.has(parent)) {
      // notTree.add(i);
    } else isTree.add(parent);
  }

  return isTree.size;

  function getParent(num) {
    if (num === arr[num]) return num;

    arr[num] = getParent(arr[num]);
    return arr[num];
  }

  function union(a, b) {
    const aParent = getParent(a);
    const bParent = getParent(b);

    if (aParent < bParent) arr[bParent] = aParent;
    else arr[aParent] = bParent;
  }

  function isSameParent(a, b) {
    const aParent = getParent(a);
    const bParent = getParent(b);

    if (aParent === bParent) return true;
    else return false;
  }
}
