const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

function solution(N) {
  const hs = input
    .slice(0, 1 + N)
    .map(BigInt)
    .filter((_, idx) => idx !== 0);

  const seg = new Array(N * 4);

  function seg_init(node, start, end) {
    if (start === end) return (seg[node] = start);

    const mid = Math.floor((start + end) / 2);
    const l_idx = seg_init(node * 2, start, mid);
    const r_idx = seg_init(node * 2 + 1, mid + 1, end);

    return (seg[node] = hs[l_idx] <= hs[r_idx] ? l_idx : r_idx);
  }

  function seg_query(node, start, end, left, right) {
    if (left > end || right < start) return -1;
    if (left <= start && end <= right) return seg[node];

    const mid = Math.floor((start + end) / 2);
    const l_idx = seg_query(node * 2, start, mid, left, right);
    const r_idx = seg_query(node * 2 + 1, mid + 1, end, left, right);

    if (l_idx === -1) return r_idx;
    if (r_idx === -1) return l_idx;
    return hs[l_idx] <= hs[r_idx] ? l_idx : r_idx;
  }

  function seg_solve(lt, rt) {
    if (lt > rt) return;

    const index = seg_query(1, 0, N - 1, lt, rt);
    const calc = hs[index] * BigInt(rt - lt + 1);
    answer = answer > calc ? answer : calc;

    seg_solve(lt, index - 1);
    seg_solve(index + 1, rt);
  }

  let answer = 0;

  seg_init(1, 0, N - 1);

  seg_solve(0, N - 1);

  return answer.toString();
}

const SIZE = Number(input[0]);

console.log(solution(SIZE));
