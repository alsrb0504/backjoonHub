const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const tree = Array.from({ length: N + 1 }, () => []);
const union = new Array(N + 1).fill(0);
const depth = new Array(N + 1).fill(0);
const M = Number(input[N]);
const answer = [];

input.slice(1, N).forEach((el) => {
  const [U, V] = el.split(" ").map(Number);
  tree[U].push(V);
  tree[V].push(U);
});

function MakeTree(idx, par, dep) {
  union[idx] = par;
  depth[idx] = dep;

  for (let i = 0; i < tree[idx].length; i++) {
    const curr = tree[idx][i];
    if (curr !== par) MakeTree(curr, idx, dep + 1);
  }
}

function Solution(a, b) {
  while (true) {
    const a_depth = depth[a];
    const b_depth = depth[b];

    if (a_depth < b_depth) {
      b = union[b];
    } else if (a_depth === b_depth) {
      // 종료
      if (a === b) return a;

      a = union[a];
      b = union[b];

      //
    } else {
      a = union[a];
    }
  }
}

MakeTree(1, 0, 1);

input.slice(N + 1, N + M + 1).forEach((el) => {
  const [a, b] = el.split(" ").map(Number);

  if (a === b) answer.push(a);
  else answer.push(Solution(a, b));
});

console.log(answer.join("\n"));