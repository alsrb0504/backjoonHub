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


function solution(n, paths, gates, summits) {
  const INF = Infinity;
  let minCost = Infinity;
  let minNode = Infinity;

  let dist = new Array(n + 1).fill(INF);
  let visited = new Array(n + 1).fill(false);
  const g = Array.from({ length: n + 1 }, () => []);

  const gateSet = new Set(gates);
  const summitSet = new Set(summits);

  paths.forEach((el) => {
    const [u, v, cost] = el;

    g[u].push([v, cost]);
    g[v].push([u, cost]);
  });

  dijkstra();

  // console.table(dist);
  // console.table(summits);

  summits.forEach((summit) => {
    if (minCost >= dist[summit]) {
      if (minCost === dist[summit]) {
        minNode = Math.min(minNode, summit);
      } else {
        minNode = summit;
      }

      minCost = dist[summit];
    }
  });

  // console.table(g);
  // console.table(dist);
  // console.table(maxCost);

  return [minNode, minCost];

  function dijkstra(start) {
    const minHeap = new MinHeap();

    gates.forEach((gate) => {
      dist[gate] = 0;
      visited[gate] = true;

      minHeap.push({
        vertex: gate,
        cost: 0,
      });
    });

    while (minHeap.size() > 0) {
      const { vertex, cost } = minHeap.pop();

      if (summitSet.has(vertex)) continue;

      // 추가된 내용
      if (dist[vertex] < cost) continue;

      // console.log();
      // console.log(`vertex = ${vertex}, cost = ${cost}`);
      // console.table(dist);

      visited[vertex] = true;

      for (let i = 0; i < g[vertex].length; i++) {
        const [next, nextCost] = g[vertex][i];

        // console.log(next, nextCost);

        // gate면 pass 
        if (gateSet.has(next)) continue;

        // 이미 방문한 값이라면 pass
        // if (visited[next]) continue;

        // 미방문 값이라면 혹은 더 작은 값이 올 수 있다면
        const finalCost = Math.max(cost, nextCost);

        if (dist[next] > finalCost) {
          dist[next] = finalCost;

          // 산봉우리라면 값 갱신 후, pass
          // if (summitSet.has(next)) continue;

          // console.log("push : ", next, nextCost);

          minHeap.push({ vertex: next, cost: finalCost });
        }
      }
    }
  }
}