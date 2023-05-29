const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

// 음수용 최대힙
class MaxHeap {
  constructor() {
    this.q = [null];
  }

  size() {
    return this.q.length - 1;
  }

  add(item) {
    this.q.push(item);

    let curidx = this.size();
    let paridx = Math.floor(curidx / 2);

    // 부모가 자신보다 커야함.
    while (this.q[curidx] > this.q[paridx] && curidx !== 1) {
      [this.q[curidx], this.q[paridx]] = [this.q[paridx], this.q[curidx]];
      curidx = paridx;
      paridx = Math.floor(curidx / 2);
    }
  }

  pop() {
    // 빈 경우
    if (this.size() === 0) return -1;

    const min = this.q[1];

    if (this.size() === 1) {
      return this.q.pop();
    } else this.q[1] = this.q.pop();

    let curidx = 1;
    let leftidx = curidx * 2;
    let rightidx = curidx * 2 + 1;

    // 자식이 없는 경우
    if (this.q[leftidx] === null) return min;

    // 자식이 하나
    if (this.q[rightidx] === null) {
      if (this.q[curidx] < this.q[leftidx]) {
        [this.q[curidx], this.q[leftidx]] = [this.q[leftidx], this.q[curidx]];
      }
      return min;
    }

    // 자식이 둘 다 존재.
    while (
      this.q[curidx] < this.q[leftidx] ||
      this.q[curidx] < this.q[rightidx]
    ) {
      const maxidx = this.q[leftidx] < this.q[rightidx] ? rightidx : leftidx;

      [this.q[curidx], this.q[maxidx]] = [this.q[maxidx], this.q[curidx]];

      curidx = maxidx;
      leftidx = maxidx * 2;
      rightidx = maxidx * 2 + 1;
      //
    }

    return min;
  }
}

// 양수용 최소힙
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

const N = Number(input[0]);
const maxHeap = new MaxHeap();
const minHeap = new MinHeap();
const answer = [];

for (let i = 1; i <= N; i++) {
  const num = Number(input[i]);

  if (num > 0) minHeap.add(num);
  else if (num < 0) maxHeap.add(num);
  else {
    const maxSize = maxHeap.size();
    const minSize = minHeap.size();

    if (maxSize > 0 && minSize > 0) {
      const minus = maxHeap.pop();
      const plus = minHeap.pop();

      if (plus >= Math.abs(minus)) {
        answer.push(minus);
        minHeap.add(plus);
      } else {
        answer.push(plus);
        maxHeap.add(minus);
      }
    } else if (maxSize > 0 && minSize === 0) {
      answer.push(maxHeap.pop());
    } else if (maxSize === 0 && minSize > 0) {
      answer.push(minHeap.pop());
    } else {
      answer.push(0);
    }
  }
}

console.log(answer.join("\n"));