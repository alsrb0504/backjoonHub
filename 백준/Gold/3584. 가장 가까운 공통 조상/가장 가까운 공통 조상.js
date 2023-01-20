const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const MAX = 10001;
const TC = Number(input[0]);
const answer = [];
let line = 1;
const tree = new Array(MAX).fill(0);

function Solution(line_idx) {
  const N = Number(input[line_idx]);
  let [n1, n2] = input[line + N].split(" ").map(Number);

  line += N + 1;

  // 트리 초기화
  for (let i = 0; i < MAX; i++) tree[i] = 0;

  input.slice(line_idx + 1, line_idx + N).forEach((el) => {
    const [A, B] = el.split(" ").map(Number);

    tree[B] = A;
  });

  const set = new Set();
  set.add(n1);
  set.add(n2);

  while (true) {
    if (n1 !== 0 && set.has(tree[n1])) return tree[n1];

    set.add(tree[n1]);
    n1 = tree[n1];

    if (n2 !== 0 && set.has(tree[n2])) return tree[n2];

    set.add(tree[n2]);
    n2 = tree[n2];
  }
}

for (let i = 0; i < TC; i++) {
  answer.push(Solution(line));
}

console.log(answer.join("\n"));