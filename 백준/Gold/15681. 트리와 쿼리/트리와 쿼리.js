const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, R, Q] = input[0].split(" ").map(Number);

const tree = Array.from({ length: N + 1 }, () => []);
const treeCnt = new Array(N + 1).fill(0);
const answer = [];

input.slice(1, N).forEach((el) => {
  const [U, V] = el.split(" ").map(Number);
  tree[U].push(V);
  tree[V].push(U);
});

function CalcTree(idx, parent) {
  let cnt = 1;

  for (let i = 0; i < tree[idx].length; i++) {
    const sub = tree[idx][i];
    if (sub !== parent) cnt += CalcTree(sub, idx);
  }

  treeCnt[idx] = cnt;
  return cnt;
}

CalcTree(R, -1);

input.slice(N, N + 1 + Q).forEach((el) => {
  answer.push(treeCnt[Number(el)]);
});

console.log(answer.join("\n"));