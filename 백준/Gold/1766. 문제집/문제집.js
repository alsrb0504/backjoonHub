const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

// 최근 구현
class MinHeap {
  constructor() {
    this.heap = [null];
  }

  size() {
    return this.heap.length - 1;
  }

  add(num) {
    if (this.size() === 0) {
      this.heap.push(num);
      return;
    }

    this.heap.push(num);

    let cur_idx = this.size();
    let par_idx = Math.floor(cur_idx / 2);

    while (this.heap[cur_idx] < this.heap[par_idx] && cur_idx !== 1) {
      [this.heap[cur_idx], this.heap[par_idx]] = [
        this.heap[par_idx],
        this.heap[cur_idx],
      ];

      cur_idx = par_idx;
      par_idx = Math.floor(cur_idx / 2);
    }
  }

  pop() {
    const curr_size = this.size();

    if (curr_size === 0) {
      return -1;
    }

    if (curr_size === 1) {
      return this.heap.pop();
    }

    const min = this.heap[1];
    this.heap[1] = this.heap.pop();

    let cur_idx = 1;
    let lt_idx = cur_idx * 2;
    let rt_idx = cur_idx * 2 + 1;

    // 자식이 없다면
    if (!this.heap[lt_idx]) {
      return min;
    }

    // 자식이 하나라면
    if (!this.heap[rt_idx]) {
      if (this.heap[cur_idx] > this.heap[lt_idx]) {
        this.swap(cur_idx, lt_idx);
      }
      return min;
    }

    // 자식이 둘 이상
    while (
      this.heap[lt_idx] < this.heap[cur_idx] ||
      this.heap[rt_idx] < this.heap[cur_idx]
    ) {
      const min_idx = this.heap[lt_idx] > this.heap[rt_idx] ? rt_idx : lt_idx;

      this.swap(cur_idx, min_idx);

      cur_idx = min_idx;
      lt_idx = cur_idx * 2;
      rt_idx = cur_idx * 2 + 1;
    }

    return min;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

const [N, K] = input[0].split(" ").map(Number);
const g = new Array(N + 1).fill(0).map(() => []);
const indegree = new Array(N + 1).fill(0);
const answer = [];

for (let i = 1; i <= K; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  g[a].push(b);
  indegree[b] += 1;
}
const q = new MinHeap();

for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) {
    q.add(i);
  }
}

while (q.size()) {
  const cur = q.pop();
  answer.push(cur);
  for (const next of g[cur]) {
    indegree[next] -= 1;
    if (indegree[next] === 0) {
      q.add(next);
    }
  }
}

console.log(answer.join(" "));
