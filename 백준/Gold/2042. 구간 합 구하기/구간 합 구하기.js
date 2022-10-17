const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, 1 + N).map(BigInt);
const data = input.slice(1 + N, 1 + N + M + K);
let answer = "";

const seg = new Array(N * 4);

function init(node, start, end) {
  if (start === end) return (seg[node] = arr[start]);

  const mid = Math.floor((start + end) / 2);

  return (seg[node] =
    init(node * 2, start, mid) + init(node * 2 + 1, mid + 1, end));
}

function query(node, start, end, left, right) {
  // 1. 범위 밖
  if (left > end || right < start) return 0n;

  // 2. 범위 넘침 (lt, rt가 더 큼)
  if (left <= start && end <= right) return seg[node];

  const mid = Math.floor((start + end) / 2);

  // 3. 완전포함
  // 4. 일부 포함
  return (
    query(node * 2, start, mid, left, right) +
    query(node * 2 + 1, mid + 1, end, left, right)
  );
}

function update(node, start, end, index, diff) {
  // 1. 범위 밖
  if (start > index || end < index) return;

  seg[node] += diff;

  if (start !== end) {
    const mid = Math.floor((start + end) / 2);
    update(node * 2, start, mid, index, diff);
    update(node * 2 + 1, mid + 1, end, index, diff);
  }
}

init(1, 0, N - 1);

data.forEach((commnad) => {
  const info = commnad.trimEnd().split(" ");

  const com = Number(info[0]);
  const n1 = Number(info[1]) - 1;

  if (com === 1) {
    const diff = BigInt(info[2]) - arr[n1];
    arr[n1] = BigInt(info[2]);

    update(1, 0, N - 1, n1, diff);
  } else {
    const n2 = info[2] - 1;

    answer += query(1, 0, N - 1, n1, n2) + "\n";
  }
});

console.log(answer.trimEnd());