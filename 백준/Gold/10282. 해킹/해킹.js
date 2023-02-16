const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  getMin() {
    return this.heap[1] ? this.heap[1] : null;
  }

  size() {
    return this.heap.length - 1;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx].cost > this.heap[curIdx].cost) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }

  pop() {
    const min = this.heap[1];
    if (this.heap.length <= 2) this.heap = [null];
    else this.heap[1] = this.heap.pop();

    let curidx = 1;
    let leftidx = curidx * 2;
    let rightidx = curidx * 2 + 1;

    if (!this.heap[leftidx]) return min;
    if (!this.heap[rightidx]) {
      if (this.heap[leftidx].cost < this.heap[curidx].cost) {
        this.swap(leftidx, curidx);
      }
      return min;
    }

    while (
      leftidx < this.size() &&
      (this.heap[leftidx].cost < this.heap[curidx].cost ||
        this.heap[rightidx].cost < this.heap[curidx].cost)
    ) {
      const minidx =
        this.heap[leftidx].cost > this.heap[rightidx].cost ? rightidx : leftidx;
      this.swap(minidx, curidx);
      curidx = minidx;
      leftidx = curidx * 2;
      rightidx = curidx * 2 + 1;
    }

    return min;
  }
}

const tc = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < tc; i++) {
  answer.push(solution(line));
}

console.log(answer.join("\n"));

function solution(l) {
  const [N, D, start] = input[l].split(" ").map(Number);
  line += D + 1;

  const visited = new Array(N + 1).fill(false);
  const graph = Array.from({ length: N + 1 }, () => []);

  const heap = new MinHeap();

  input.slice(l + 1, l + 1 + D).forEach((el) => {
    const [st, ed, cost] = el.split(" ").map(Number);

    graph[ed].push([st, cost]);
  });

  const dist = new Array(N + 1).fill(Infinity);
  dist[start] = 0;
  heap.push({ vertix: start, cost: 0 });

  while (heap.size()) {
    const { vertix, cost } = heap.pop();
    visited[vertix] = true;

    for (let i = 0; i < graph[vertix].length; i++) {
      const [next, next_cost] = graph[vertix][i];

      if (visited[next]) continue;

      if (dist[next] > dist[vertix] + next_cost) {
        dist[next] = dist[vertix] + next_cost;
        heap.push({ vertix: next, cost: dist[next] });
      }
    }
  }

  let cnt = 0;
  let total_cost = 0;

  for (let i = 1; i <= N; i++) {
    if (visited[i]) {
      cnt++;

      total_cost = Math.max(total_cost, dist[i]);
    }
  }

  return `${cnt} ${total_cost}`;
}
