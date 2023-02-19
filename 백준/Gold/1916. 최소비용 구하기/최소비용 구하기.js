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

const N = Number(input[0]);
const M = Number(input[1]);
const [start, target] = input[2 + M].split(" ").map(Number);
const g = Array.from({ length: N + 1 }, () => []);

input.slice(2, 2 + M).forEach((data) => {
  const [srt, end, cost] = data.split(" ").map(Number);
  g[srt].push([end, cost]);
});

const dist = new Array(N + 1).fill(Infinity);
const visited = new Array(N + 1).fill(false);
let cnt = 0;

dijkstra(start);

console.log(dist[target]);

function dijkstra(start) {
  dist[start] = 0;
  visited[start] = true;

  const minHeap = new MinHeap();
  minHeap.push({
    vertex: start,
    cost: 0,
  });

  while (minHeap.size() > 0) {
    const { vertex, cost } = minHeap.pop();
    visited[vertex] = true;

    cnt++;
    if (cnt === N) return;

    for (let i = 0; i < g[vertex].length; i++) {
      // g[vertex][i] = [v, cost] ?

      const cur = g[vertex][i];
      const next = cur[0];
      const nextCost = cur[1];

      // 이미 방문한 값이라면 pass
      if (visited[next]) continue;

      // 미방문 값이라면
      if (dist[next] > dist[vertex] + nextCost) {
        dist[next] = dist[vertex] + nextCost;

        // 값이 갱신된다면 push?
        minHeap.push({ vertex: next, cost: dist[vertex] + nextCost });
      }
    }
  }
}