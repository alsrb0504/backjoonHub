const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const INF = Infinity;

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

function dijkstra(start) {
  // vertex는 현재 정점
  // cost: 현재까지 비용
  // oil: 현재까지 최소 오일 비용
  const minHeap = new MinHeap();
  minHeap.push({
    vertex: start,
    cost: 0,
    oil: gas[0],
  });

  while (minHeap.size() > 0) {
    const { vertex, cost, oil } = minHeap.pop();

    for (let i = 0; i < g[vertex].length; i++) {
      const cur = g[vertex][i];
      const [next, nextDist] = cur;

      if (dist[next][oil] > cost + nextDist * oil) {
        dist[next][oil] = cost + nextDist * oil;

        minHeap.push({
          vertex: next,
          cost: cost + nextDist * oil,
          oil: Math.min(oil, gas[next]),
        });
      }
    }
  }
}

const [N, M] = input[0].split(" ").map(Number);
const gas = input[1].split(" ").map(Number);
const dist = Array.from({ length: N }, () => new Array(6).fill(INF));
const g = Array.from({ length: N }, () => []);

input.slice(2, 2 + M).forEach((info) => {
  let [u, v, cost] = info.split(" ").map(Number);
  u--;
  v--;

  g[u].push([v, cost]);
  g[v].push([u, cost]);
});

dijkstra(0);

console.log(Math.min(...dist[N - 1]));
